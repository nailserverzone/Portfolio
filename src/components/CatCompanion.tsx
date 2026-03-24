"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CAT_MESSAGES } from "@/data/projects";

export default function CatCompanion() {
  const [msg, setMsg] = useState("");
  const [face, setFace] = useState("🐱");

  useEffect(() => {
    const iv = setInterval(() => {
      if (Math.random() > 0.5) {
        setMsg(CAT_MESSAGES[Math.floor(Math.random() * CAT_MESSAGES.length)]);
        setTimeout(() => setMsg(""), 4000);
      }
      setFace(["🐱", "😺", "😽", "🐱💤", "🐱✨"][Math.floor(Math.random() * 5)]);
    }, 6000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div style={{ position: "fixed", bottom: 6, left: 16, zIndex: 90 }}>
      <AnimatePresence>
        {msg && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{
              position: "absolute", bottom: 44, left: 0,
              background: "var(--bg)", border: "1px solid var(--bg-3)",
              borderRadius: 10, padding: "6px 10px",
              fontFamily: "'Silkscreen',monospace", fontSize: "0.45rem",
              color: "var(--ink-2)", whiteSpace: "nowrap",
              boxShadow: "0 3px 10px rgba(0,0,0,0.06)",
            }}
          >
            {msg}
            <div style={{
              position: "absolute", bottom: -5, left: 10,
              borderLeft: "5px solid transparent",
              borderRight: "5px solid transparent",
              borderTop: "5px solid var(--bg)",
            }} />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        onClick={() => {
          setMsg(CAT_MESSAGES[Math.floor(Math.random() * CAT_MESSAGES.length)]);
          setTimeout(() => setMsg(""), 3000);
        }}
        style={{ fontSize: "1.7rem", cursor: "pointer", userSelect: "none" }}
      >
        {face}
      </motion.div>
    </div>
  );
}
