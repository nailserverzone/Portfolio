import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/* ══════════════════════════════════════
   Matchat Moderation API
   - Approve / Deny / Delete pending messages
   - Server-side admin password verification
   ══════════════════════════════════════ */

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const ADMIN_PASSWORD = process.env.MATCHAT_ADMIN_PASSWORD;

/* ── Rate limiter for admin attempts ── */
const loginAttempts = new Map<string, { count: number; blockedUntil: number }>();
const MAX_ATTEMPTS = 5;
const BLOCK_DURATION = 300_000; // 5 minutes

function isLoginBlocked(ip: string): boolean {
  const entry = loginAttempts.get(ip);
  if (!entry) return false;
  if (Date.now() > entry.blockedUntil) {
    loginAttempts.delete(ip);
    return false;
  }
  return entry.count >= MAX_ATTEMPTS;
}

function recordFailedAttempt(ip: string) {
  const entry = loginAttempts.get(ip) || { count: 0, blockedUntil: 0 };
  entry.count++;
  if (entry.count >= MAX_ATTEMPTS) {
    entry.blockedUntil = Date.now() + BLOCK_DURATION;
  }
  loginAttempts.set(ip, entry);
}

function getIp(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || req.headers.get("x-real-ip")
    || "unknown";
}

/* ══ GET — Fetch pending messages (admin only) ══ */
export async function GET(req: NextRequest) {
  const ip = getIp(req);
  if (isLoginBlocked(ip)) {
    return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429 });
  }

  const password = req.headers.get("x-admin-password");
  if (!password || password !== ADMIN_PASSWORD) {
    recordFailedAttempt(ip);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("matchat_messages")
    .select("*")
    .eq("status", "pending")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: "Failed to fetch pending messages" }, { status: 500 });
  }
  return NextResponse.json({ messages: data });
}

/* ══ POST — Approve / Deny / Delete a message ══ */
export async function POST(req: NextRequest) {
  const ip = getIp(req);
  if (isLoginBlocked(ip)) {
    return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429 });
  }

  let body: { password?: string; message_id?: string; action?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { password, message_id, action } = body;

  /* Validate admin password (server-side) */
  if (!password || password !== ADMIN_PASSWORD) {
    recordFailedAttempt(ip);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  /* Validate inputs */
  if (!message_id || typeof message_id !== "string") {
    return NextResponse.json({ error: "message_id is required" }, { status: 400 });
  }
  // UUID format validation
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(message_id)) {
    return NextResponse.json({ error: "Invalid message_id format" }, { status: 400 });
  }

  if (!action || !["approve", "deny", "delete"].includes(action)) {
    return NextResponse.json({ error: "Action must be approve, deny, or delete" }, { status: 400 });
  }

  /* Execute action */
  if (action === "approve") {
    const { error } = await supabase
      .from("matchat_messages")
      .update({ status: "approved" })
      .eq("id", message_id);
    if (error) return NextResponse.json({ error: "Failed to approve" }, { status: 500 });
  } else if (action === "deny" || action === "delete") {
    const { error } = await supabase
      .from("matchat_messages")
      .delete()
      .eq("id", message_id);
    if (error) return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }

  return NextResponse.json({ success: true, action });
}
