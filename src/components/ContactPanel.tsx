"use client";
import { motion } from "framer-motion";

export default function ContactPanel() {
  const links = [
    { icon: "✉", label: "Email", value: "noornaila04@gmail.com", href: "mailto:noornaila04@gmail.com" },
    { icon: "in", label: "LinkedIn", value: "/in/noornaila", href: "https://www.linkedin.com/in/noornaila/" },
    { icon: "◆", label: "GitHub", value: "nailserverzone", href: "https://github.com/nailserverzone" },
    { icon: "▦", label: "Notion", value: "Portfolio", href: "https://noornaila.notion.site/" },
  ];

  return (
    <div style={{ textAlign: "center" }}>
      <h2 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: "1.1rem", marginBottom: 18 }}>Let's connect</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, maxWidth: 360, margin: "0 auto" }}>
        {links.map(c => (
          <motion.a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer"
            whileHover={{ y: -3, borderColor: "var(--pink)" }}
            style={{ display:"flex",flexDirection:"column",gap:3,padding:14,borderRadius:10,background:"var(--bg-2)",borderWidth:"1.5px",borderStyle:"solid",borderColor:"var(--bg-3)",textAlign:"left",transition:"all 0.2s" }}>
            <span style={{ fontSize: "1.1rem" }}>{c.icon}</span>
            <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,fontSize:"0.78rem",color:"var(--ink)" }}>{c.label}</span>
            <span style={{ fontFamily:"'Silkscreen',monospace",fontSize:"0.4rem",color:"var(--ink-2)" }}>{c.value}</span>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
