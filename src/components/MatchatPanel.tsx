"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase, EDGE_FN_URL } from "@/lib/supabase";

interface Message {
  id: string;
  message: string;
  color: string;
  created_at: string;
}

const COLORS = [
  { name: "Peach", hex: "#f8b1aa" },
  { name: "Lavender", hex: "#c4a0ff" },
  { name: "Mint", hex: "#b8e986" },
  { name: "Sky", hex: "#7ddbf4" },
  { name: "Rose", hex: "#d64479" },
  { name: "Amber", hex: "#fdba2f" },
  { name: "Sage", hex: "#687b3d" },
  { name: "Ocean", hex: "#7596c8" },
];

export default function MatchatPanel() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [selectedColor, setSelectedColor] = useState(COLORS[0].hex);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [adminMode, setAdminMode] = useState(false);
  const [adminPw, setAdminPw] = useState("");
  const [adminAuthed, setAdminAuthed] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const holdTimer = useRef<NodeJS.Timeout | null>(null);
  const wallRef = useRef<HTMLDivElement>(null);

  /* ── Fetch messages ── */
  const fetchMessages = useCallback(async () => {
    const { data, error } = await supabase
      .from("matchat_messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setMessages(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  /* ── Send message ── */
  const handleSend = async () => {
    if (!text.trim() || sending) return;
    setSending(true);
    const { error } = await supabase
      .from("matchat_messages")
      .insert({ message: text.trim(), color: selectedColor });
    if (!error) {
      setText("");
      setSent(true);
      setTimeout(() => setSent(false), 2500);
      fetchMessages();
    }
    setSending(false);
  };

  /* ── Admin delete ── */
  const handleDelete = async (id: string) => {
    const res = await fetch(EDGE_FN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: adminPw, message_id: id, action: "delete" }),
    });
    if (res.ok) {
      setMessages((prev) => prev.filter((m) => m.id !== id));
    }
  };

  /* ── Admin login via long press on logo ── */
  const startHold = () => {
    holdTimer.current = setTimeout(() => setShowAdminLogin(true), 3000);
  };
  const endHold = () => {
    if (holdTimer.current) clearTimeout(holdTimer.current);
  };

  const tryAdminLogin = () => {
    if (adminPw.length > 0) {
      setAdminAuthed(true);
      setAdminMode(true);
      setShowAdminLogin(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 0, padding: "24px 28px 20px" }}>
      {/* ── Header ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <motion.img
          src="/icons/matchat.svg"
          alt="Matchat"
          draggable={false}
          onPointerDown={startHold}
          onPointerUp={endHold}
          onPointerLeave={endHold}
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: 48, height: 48, objectFit: "contain", cursor: "pointer" }}
        />
        <div>
          <h3 style={{
            fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800,
            fontSize: "1.6rem", color: "var(--green)", margin: 0, lineHeight: 1.1,
          }}>
            Matchat
          </h3>
          <p style={{
            fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem",
            color: "var(--ink-2)", margin: 0, fontStyle: "italic",
          }}>
            Send Naila an anonymous note - be kind &amp; positive!
          </p>
        </div>
        {adminMode && (
          <span style={{
            marginLeft: "auto", fontFamily: "'Silkscreen',monospace",
            fontSize: "0.6rem", color: "var(--pink)", background: "var(--bg-2)",
            padding: "3px 10px", borderRadius: 8,
          }}>
            ADMIN
          </span>
        )}
      </div>

      {/* ── Admin login modal ── */}
      <AnimatePresence>
        {showAdminLogin && !adminAuthed && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              background: "var(--bg-2)", border: "2px solid var(--pink)",
              borderRadius: 14, padding: 16, marginBottom: 14,
            }}
          >
            <span style={{
              fontFamily: "'Silkscreen',monospace", fontSize: "0.7rem",
              color: "var(--pink)", display: "block", marginBottom: 8,
            }}>
              ADMIN LOGIN
            </span>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                type="password"
                value={adminPw}
                onChange={(e) => setAdminPw(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && tryAdminLogin()}
                placeholder="Enter admin password"
                style={{
                  flex: 1, padding: "8px 12px", borderRadius: 10,
                  border: "2px solid var(--bg-3)", background: "var(--bg)",
                  fontFamily: "'DM Sans',sans-serif", fontSize: "0.85rem",
                  outline: "none", color: "var(--ink)",
                }}
              />
              <motion.button
                onClick={tryAdminLogin}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: "8px 16px", borderRadius: 10,
                  background: "var(--pink)", border: "none", color: "white",
                  fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700,
                  fontSize: "0.8rem", cursor: "pointer",
                }}
              >
                Enter
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Message wall ── */}
      <div
        ref={wallRef}
        style={{
          flex: 1, overflowY: "auto", minHeight: 0,
          marginBottom: 14, padding: "4px 0",
        }}
      >
        {loading ? (
          <div style={{ textAlign: "center", padding: 40 }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              style={{
                width: 32, height: 32, border: "3px solid var(--bg-3)",
                borderTopColor: "var(--green)", borderRadius: "50%",
                margin: "0 auto",
              }}
            />
          </div>
        ) : messages.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 20px" }}>
            <span style={{ fontSize: "3rem", display: "block", marginBottom: 12 }}>💌</span>
            <p style={{
              fontFamily: "'DM Sans',sans-serif", fontStyle: "italic",
              fontSize: "1.1rem", color: "var(--ink-2)",
            }}>
              No messages yet. Be the first to send one!
            </p>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180, 1fr))",
            gap: 10,
          }}>
            <AnimatePresence mode="popLayout">
              {messages.map((msg, i) => (
                <motion.div
                  key={msg.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: i * 0.03, type: "spring", stiffness: 200, damping: 20 }}
                  style={{
                    background: msg.color,
                    borderRadius: 14,
                    padding: "16px 14px",
                    position: "relative",
                    minHeight: 80,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    boxShadow: `0 3px 12px ${msg.color}40`,
                    transform: `rotate(${((i % 5) - 2) * 1.5}deg)`,
                  }}
                >
                  <p style={{
                    fontFamily: "'DM Sans',sans-serif", fontSize: "0.9rem",
                    fontWeight: 500, color: isLightColor(msg.color) ? "#1b1b1b" : "#fff",
                    margin: 0, lineHeight: 1.4, wordBreak: "break-word",
                  }}>
                    {msg.message}
                  </p>
                  <span style={{
                    fontFamily: "'Silkscreen',monospace", fontSize: "0.45rem",
                    color: isLightColor(msg.color) ? "rgba(0,0,0,0.35)" : "rgba(255,255,255,0.5)",
                    marginTop: 8, display: "block",
                  }}>
                    {timeAgo(msg.created_at)}
                  </span>

                  {/* Admin delete button */}
                  {adminMode && adminAuthed && (
                    <motion.button
                      onClick={() => handleDelete(msg.id)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      style={{
                        position: "absolute", top: 6, right: 6,
                        width: 22, height: 22, borderRadius: "50%",
                        background: "rgba(0,0,0,0.3)", border: "none",
                        color: "white", fontSize: "0.7rem", cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}
                    >
                      ✕
                    </motion.button>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* ── Compose area ── */}
      <div style={{
        borderTop: "2px solid var(--bg-3)", paddingTop: 14,
        flexShrink: 0,
      }}>
        {/* Color picker */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <span style={{
            fontFamily: "'Silkscreen',monospace", fontSize: "0.6rem",
            color: "var(--ink-2)", letterSpacing: 1,
          }}>
            COLOR
          </span>
          <div style={{ display: "flex", gap: 5 }}>
            {COLORS.map((c) => (
              <motion.button
                key={c.hex}
                onClick={() => setSelectedColor(c.hex)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  width: 22, height: 22, borderRadius: "50%",
                  background: c.hex, border: selectedColor === c.hex ? "3px solid var(--ink)" : "2px solid var(--bg-3)",
                  cursor: "pointer", transition: "border 0.15s",
                }}
                title={c.name}
              />
            ))}
          </div>
        </div>

        {/* Input + send */}
        <div style={{ display: "flex", gap: 8 }}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your anonymous message..."
            maxLength={500}
            style={{
              flex: 1, padding: "10px 14px", borderRadius: 12,
              border: `2px solid ${selectedColor}`,
              background: "var(--bg)", fontFamily: "'DM Sans',sans-serif",
              fontSize: "0.9rem", outline: "none", color: "var(--ink)",
              transition: "border-color 0.2s",
            }}
          />
          <motion.button
            onClick={handleSend}
            disabled={!text.trim() || sending}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: "10px 20px", borderRadius: 12,
              background: sending ? "var(--bg-3)" : selectedColor,
              border: "none", color: isLightColor(selectedColor) ? "#1b1b1b" : "white",
              fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700,
              fontSize: "0.85rem", cursor: text.trim() ? "pointer" : "not-allowed",
              opacity: text.trim() ? 1 : 0.5,
              transition: "background 0.2s, opacity 0.2s",
            }}
          >
            {sending ? "..." : "Send"}
          </motion.button>
        </div>

        {/* Sent confirmation */}
        <AnimatePresence>
          {sent && (
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem",
                color: "var(--green)", marginTop: 8, textAlign: "center",
                fontWeight: 600,
              }}
            >
              💌 Message sent anonymously!
            </motion.p>
          )}
        </AnimatePresence>

        <p style={{
          fontFamily: "'Silkscreen',monospace", fontSize: "0.5rem",
          color: "var(--ink-3)", textAlign: "center", marginTop: 8, lineHeight: 1.6,
        }}>
          {text.length}/500 &middot; Messages are anonymous &middot; Be kind 💛
          <br />
          For work inquiries, please email{" "}
          <a href="mailto:noornaila04@gmail.com" style={{ color: "var(--green)", textDecoration: "underline" }}>
            noornaila04@gmail.com
          </a>{" "}
          instead
        </p>
      </div>
    </div>
  );
}

/* ── Helpers ── */
function isLightColor(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 150;
}

function timeAgo(dateStr: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const mins = Math.floor(seconds / 60);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return `${Math.floor(days / 30)}mo ago`;
}
