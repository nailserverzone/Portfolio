"use client";
import { motion } from "framer-motion";

export default function Modal({ children, onClose, title, noPadding }: { children: React.ReactNode; onClose: () => void; title: string; noPadding?: boolean }) {
  return (
    <motion.div
      style={{ position:"fixed",inset:0,zIndex:500,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(27,27,27,0.5)",backdropFilter:"blur(16px)" }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        style={{ width:"min(920px,96vw)",maxHeight:"min(88vh,860px)",background:"var(--bg)",border:"2px solid var(--bg-3)",borderRadius:22,overflow:"hidden",display:"flex",flexDirection:"column",boxShadow:"0 30px 80px rgba(27,27,27,0.25)" }}
        initial={{ scale:0.9,opacity:0,y:30 }} animate={{ scale:1,opacity:1,y:0 }} exit={{ scale:0.92,opacity:0 }}
        transition={{ duration:0.35,ease:[0.22,1,0.36,1] }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ height:52,background:"var(--bg-2)",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 20px",borderBottom:"1px solid var(--bg-3)",flexShrink:0 }}>
          <div style={{ display:"flex",gap:10 }}>
            <button onClick={onClose} style={{ width:16,height:16,borderRadius:"50%",border:"none",background:"#ec6a5e",cursor:"pointer" }} title="Close" />
          </div>
          <span style={{ fontFamily:"'Silkscreen',monospace",fontSize:"1.05rem",color:"var(--ink-2)",letterSpacing:1 }}>{title}</span>
          <div style={{ width:56 }} />
        </div>
        <div style={{ flex:1,overflow:"hidden",padding: noPadding ? 0 : 36, ...(noPadding ? { display:"flex",flexDirection:"column" as const } : { overflowY:"auto" as const }) }}>{children}</div>
      </motion.div>
    </motion.div>
  );
}
