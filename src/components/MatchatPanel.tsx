"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  message: string;
  color: string;
  status: string;
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
  const [pendingMessages, setPendingMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [selectedColor, setSelectedColor] = useState(COLORS[0].hex);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState("");
  const [adminMode, setAdminMode] = useState(false);
  const [adminPw, setAdminPw] = useState("");
  const [adminAuthed, setAdminAuthed] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminError, setAdminError] = useState("");
  const [viewTab, setViewTab] = useState<"approved" | "pending">("approved");
  const holdTimer = useRef<NodeJS.Timeout | null>(null);
  const wallRef = useRef<HTMLDivElement>(null);

  /* ── Fetch approved messages via API route ── */
  const fetchMessages = useCallback(async () => {
    try {
      const res = await fetch("/api/matchat");
      const data = await res.json();
      if (data.messages) setMessages(data.messages);
    } catch {
      console.error("Failed to fetch messages");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  /* ── Fetch pending messages (admin only) ── */
  const fetchPending = useCallback(async () => {
    if (!adminAuthed || !adminPw) return;
    try {
      const res = await fetch("/api/matchat/moderate", {
        headers: { "x-admin-password": adminPw },
      });
      const data = await res.json();
      if (data.messages) setPendingMessages(data.messages);
    } catch {
      console.error("Failed to fetch pending");
    }
  }, [adminAuthed, adminPw]);

  useEffect(() => {
    if (adminAuthed) fetchPending();
  }, [adminAuthed, fetchPending]);

  /* ── Send message via API (goes to pending queue) ── */
  const handleSend = async () => {
    if (!text.trim() || sending) return;
    setSending(true);
    setSendError("");
    try {
      const res = await fetch("/api/matchat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text.trim(), color: selectedColor }),
      });
      const data = await res.json();
      if (res.ok) {
        setText("");
        setSent(true);
        setTimeout(() => setSent(false), 3500);
      } else {
        setSendError(data.error || "Failed to send");
        setTimeout(() => setSendError(""), 4000);
      }
    } catch {
      setSendError("Network error. Try again.");
      setTimeout(() => setSendError(""), 4000);
    }
    setSending(false);
  };

  /* ── Moderate message (approve / deny / delete) ── */
  const handleModerate = async (id: string, action: "approve" | "deny" | "delete") => {
    try {
      const res = await fetch("/api/matchat/moderate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: adminPw, message_id: id, action }),
      });
      if (res.ok) {
        setPendingMessages((prev) => prev.filter((m) => m.id !== id));
        if (action === "delete") {
          setMessages((prev) => prev.filter((m) => m.id !== id));
        }
        if (action === "approve") fetchMessages();
      }
    } catch {
      console.error("Moderation failed");
    }
  };

  /* ── Admin login via long press on logo ── */
  const startHold = (e: React.PointerEvent | React.TouchEvent) => {
    e.preventDefault(); // prevent context menu on mobile long-press
    holdTimer.current = setTimeout(() => {
      setShowAdminLogin(true);
      // vibrate on mobile if supported
      if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(50);
    }, 2000);
  };
  const endHold = () => {
    if (holdTimer.current) clearTimeout(holdTimer.current);
  };

  const tryAdminLogin = async () => {
    if (!adminPw.length) return;
    setAdminError("");
    try {
      const res = await fetch("/api/matchat/moderate", {
        headers: { "x-admin-password": adminPw },
      });
      if (res.ok) {
        setAdminAuthed(true);
        setAdminMode(true);
        setShowAdminLogin(false);
      } else {
        const data = await res.json();
        setAdminError(data.error || "Wrong password");
      }
    } catch {
      setAdminError("Network error");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 0, padding: "24px 28px 20px" }}>
      {/* ── Header ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <motion.img
          src="/icons/matchat.svg"
          alt="Matchat — hold to admin"
          draggable={false}
          onPointerDown={startHold}
          onPointerUp={endHold}
          onPointerLeave={endHold}
          onTouchStart={startHold}
          onTouchEnd={endHold}
          onTouchCancel={endHold}
          onContextMenu={(e) => e.preventDefault()}
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: 48, height: 48, objectFit: "contain", cursor: "pointer", touchAction: "none", userSelect: "none" }}
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
            {adminError && (
              <p style={{
                fontFamily: "'DM Sans',sans-serif", fontSize: "0.75rem",
                color: "#e53935", marginTop: 8, marginBottom: 0,
              }}>
                {adminError}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Admin tabs (approved / pending) ── */}
      {adminMode && adminAuthed && (
        <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
          {(["approved", "pending"] as const).map((t) => (
            <motion.button
              key={t}
              onClick={() => { setViewTab(t); if (t === "pending") fetchPending(); }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: "5px 14px", borderRadius: 10,
                background: viewTab === t ? "var(--pink)" : "var(--bg-2)",
                color: viewTab === t ? "white" : "var(--ink-2)",
                border: "none", fontFamily: "'Silkscreen',monospace",
                fontSize: "0.55rem", cursor: "pointer", letterSpacing: 1,
                position: "relative",
              }}
            >
              {t.toUpperCase()}
              {t === "pending" && pendingMessages.length > 0 && (
                <span style={{
                  position: "absolute", top: -4, right: -4,
                  width: 16, height: 16, borderRadius: "50%",
                  background: "#e53935", color: "white",
                  fontSize: "0.5rem", display: "flex", alignItems: "center",
                  justifyContent: "center", fontFamily: "'DM Sans',sans-serif",
                }}>
                  {pendingMessages.length}
                </span>
              )}
            </motion.button>
          ))}
        </div>
      )}

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
        ) : (
          <>
            {/* Approved messages */}
            {viewTab === "approved" && (
              messages.length === 0 ? (
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
                  gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                  gap: 10,
                }}>
                  <AnimatePresence mode="popLayout">
                    {messages.map((msg, i) => (
                      <MessageCard
                        key={msg.id}
                        msg={msg}
                        index={i}
                        adminMode={adminMode && adminAuthed}
                        onAction={(action) => handleModerate(msg.id, action)}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              )
            )}

            {/* Pending messages (admin only) */}
            {viewTab === "pending" && adminMode && adminAuthed && (
              pendingMessages.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 20px" }}>
                  <span style={{ fontSize: "2.5rem", display: "block", marginBottom: 12 }}>✅</span>
                  <p style={{
                    fontFamily: "'DM Sans',sans-serif", fontStyle: "italic",
                    fontSize: "1rem", color: "var(--ink-2)",
                  }}>
                    No pending messages — all caught up!
                  </p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <AnimatePresence mode="popLayout">
                    {pendingMessages.map((msg, i) => (
                      <motion.div
                        key={msg.id}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20, scale: 0.9 }}
                        transition={{ delay: i * 0.03, type: "spring", stiffness: 200, damping: 20 }}
                        style={{
                          background: msg.color,
                          borderRadius: 14,
                          padding: "14px 16px",
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          boxShadow: `0 2px 10px ${msg.color}30`,
                          border: "2px dashed rgba(0,0,0,0.1)",
                        }}
                      >
                        <p style={{
                          flex: 1, fontFamily: "'DM Sans',sans-serif", fontSize: "0.9rem",
                          fontWeight: 500, color: isLightColor(msg.color) ? "#1b1b1b" : "#fff",
                          margin: 0, lineHeight: 1.4, wordBreak: "break-word",
                        }}>
                          {msg.message}
                        </p>
                        <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                          <motion.button
                            onClick={() => handleModerate(msg.id, "approve")}
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.9 }}
                            title="Approve"
                            style={{
                              width: 32, height: 32, borderRadius: "50%",
                              background: "rgba(76,175,80,0.9)", border: "none",
                              color: "white", fontSize: "1rem", cursor: "pointer",
                              display: "flex", alignItems: "center", justifyContent: "center",
                            }}
                          >
                            ✓
                          </motion.button>
                          <motion.button
                            onClick={() => handleModerate(msg.id, "deny")}
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.9 }}
                            title="Deny & Delete"
                            style={{
                              width: 32, height: 32, borderRadius: "50%",
                              background: "rgba(229,57,53,0.9)", border: "none",
                              color: "white", fontSize: "1rem", cursor: "pointer",
                              display: "flex", alignItems: "center", justifyContent: "center",
                            }}
                          >
                            ✕
                          </motion.button>
                        </div>
                        <span style={{
                          fontFamily: "'Silkscreen',monospace", fontSize: "0.4rem",
                          color: isLightColor(msg.color) ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.4)",
                          position: "absolute", bottom: 4, right: 10,
                        }}>
                          {timeAgo(msg.created_at)}
                        </span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )
            )}
          </>
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
                fontWeight: 600, marginBottom: 0,
              }}
            >
              💌 Message sent! It will appear after Naila reviews it.
            </motion.p>
          )}
          {sendError && (
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                fontFamily: "'DM Sans',sans-serif", fontSize: "0.8rem",
                color: "#e53935", marginTop: 8, textAlign: "center",
                fontWeight: 600, marginBottom: 0,
              }}
            >
              ⚠️ {sendError}
            </motion.p>
          )}
        </AnimatePresence>

        <p style={{
          fontFamily: "'Silkscreen',monospace", fontSize: "0.5rem",
          color: "var(--ink-3)", textAlign: "center", marginTop: 8, lineHeight: 1.6,
        }}>
          {text.length}/500 &middot; Messages reviewed before posting &middot; Be kind 💛
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

/* ── Message card component ── */
function MessageCard({ msg, index, adminMode, onAction }: {
  msg: Message; index: number; adminMode: boolean;
  onAction: (action: "approve" | "deny" | "delete") => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ delay: index * 0.03, type: "spring", stiffness: 200, damping: 20 }}
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
        transform: `rotate(${((index % 5) - 2) * 1.5}deg)`,
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
      {adminMode && (
        <motion.button
          onClick={() => onAction("delete")}
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
