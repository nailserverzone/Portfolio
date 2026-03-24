import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

/* ══════════════════════════════════════
   Matchat API — Submit & Fetch Messages
   - Rate limiting (IP-based, in-memory)
   - Input validation & sanitization
   - Moderation queue (pending → approved)
   ══════════════════════════════════════ */

/* ── Rate limiter (in-memory, per-IP) ── */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5; // max 5 messages per minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

// Cleanup stale entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap) {
    if (now > entry.resetAt) rateLimitMap.delete(ip);
  }
}, 300_000);

/* ── Allowed colors (whitelist) ── */
const ALLOWED_COLORS = new Set([
  "#f8b1aa", "#c4a0ff", "#b8e986", "#7ddbf4",
  "#d64479", "#fdba2f", "#687b3d", "#7596c8",
]);

/* ── Input sanitization ── */
function sanitize(input: string): string {
  return input
    .replace(/[<>]/g, "") // strip HTML angle brackets
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
    .trim();
}

/* ── Profanity / spam heuristics ── */
function isSpam(text: string): boolean {
  const lower = text.toLowerCase();
  // Repeated characters (e.g., "aaaaaa")
  if (/(.)\1{7,}/.test(lower)) return true;
  // Too many URLs
  if ((lower.match(/https?:\/\//g) || []).length > 1) return true;
  // Common spam patterns
  if (/\b(buy now|click here|free money|crypto|bitcoin|earn \$)\b/i.test(lower)) return true;
  return false;
}

/* ══ GET — Fetch approved messages ══ */
export async function GET() {
  const { data, error } = await getSupabase()
    .from("matchat_messages")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
  return NextResponse.json({ messages: data });
}

/* ══ POST — Submit a new message (goes to pending queue) ══ */
export async function POST(req: NextRequest) {
  /* Rate limiting */
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || req.headers.get("x-real-ip")
    || "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many messages. Please wait a minute before sending another." },
      { status: 429 }
    );
  }

  /* Parse & validate body */
  let body: { message?: string; color?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { message, color } = body;

  // Required fields
  if (!message || typeof message !== "string") {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }
  if (!color || typeof color !== "string") {
    return NextResponse.json({ error: "Color is required" }, { status: 400 });
  }

  // Length validation
  const trimmed = message.trim();
  if (trimmed.length === 0) {
    return NextResponse.json({ error: "Message cannot be empty" }, { status: 400 });
  }
  if (trimmed.length > 500) {
    return NextResponse.json({ error: "Message too long (max 500 chars)" }, { status: 400 });
  }

  // Color whitelist
  if (!ALLOWED_COLORS.has(color)) {
    return NextResponse.json({ error: "Invalid color" }, { status: 400 });
  }

  // Sanitize
  const cleanMessage = sanitize(trimmed);

  // Spam check
  if (isSpam(cleanMessage)) {
    return NextResponse.json({ error: "Message flagged as spam" }, { status: 400 });
  }

  /* Insert as pending */
  const { error } = await getSupabase()
    .from("matchat_messages")
    .insert({
      message: cleanMessage,
      color,
      status: "pending",
    });

  if (error) {
    console.error("[matchat] Insert error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }

  /* Notify admin (best-effort, non-blocking) */
  notifyAdmin(cleanMessage, color).catch(() => {});

  return NextResponse.json({
    success: true,
    message: "Message sent! It will appear after review.",
  });
}

/* ── Email notification (optional — uses Resend) ── */
async function notifyAdmin(message: string, color: string) {
  const resendKey = process.env.RESEND_API_KEY;
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!resendKey || !adminEmail) return;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Matchat <noreply@resend.dev>",
      to: adminEmail,
      subject: "🐱 New Matchat message awaiting review",
      html: `
        <div style="font-family:sans-serif;max-width:500px;margin:0 auto;padding:20px;">
          <h2 style="color:#d64479;">New Matchat Message</h2>
          <div style="background:${color};border-radius:12px;padding:20px;margin:16px 0;">
            <p style="font-size:16px;margin:0;color:#1b1b1b;">${message}</p>
          </div>
          <p style="color:#666;">Log into your admin panel to approve or deny this message.</p>
          <a href="${siteUrl}" style="display:inline-block;background:#d64479;color:white;padding:10px 24px;border-radius:8px;text-decoration:none;font-weight:bold;">
            Open Portfolio
          </a>
        </div>
      `,
    }),
  });
}
