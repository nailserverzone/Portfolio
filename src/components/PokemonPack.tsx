"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { SKILL_CARDS, TAG_COLORS, PROJECTS } from "@/data/projects";

/* Map each skill card to its SVG artwork */
const CARD_IMAGES: Record<string, string> = {
  "Research Design": "/icons/card-research.svg",
  "UX Prototyping": "/icons/card-design.svg",
  "Technical Skill": "/icons/card-technical.svg",
  "Public Speaking": "/icons/card-speaking.svg",
  "Project Mgmt": "/icons/card-management.svg",
  "Stats Analysis": "/icons/card-analysis.svg",
};

export default function PokemonPack({ onNavigate }: { onNavigate?: (id: string) => void }) {
  const [stage, setStage] = useState<"sealed"|"burst"|"cards">("sealed");
  const [prog, setProg] = useState(0);
  const [flipped, setFlipped] = useState<Set<string>>(new Set());
  const startX = useRef<number|null>(null);

  /* horizontal swipe to rip */
  const pd = (e: React.PointerEvent) => { startX.current = e.clientX; };
  const pm = (e: React.PointerEvent) => {
    if (startX.current === null) return;
    const d = Math.abs(e.clientX - startX.current);
    const p = Math.min(d / 180, 1);
    setProg(p);
    if (p >= 1) { startX.current = null; setStage("burst"); setTimeout(() => setStage("cards"), 700); }
  };
  const pu = () => { startX.current = null; if (prog < 1) setProg(0); };

  const toggleFlip = (name: string) => {
    setFlipped(prev => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name); else next.add(name);
      return next;
    });
  };

  const getProjects = (card: typeof SKILL_CARDS[0]) =>
    PROJECTS.filter(p => p.tags.includes(card.type) || p.skills.some(s => card.moves.includes(s)));

  /* ══════ SEALED BOOSTER PACK - SVG defines shape, no frame clipping ══════ */
  if (stage === "sealed") return (
    <div style={{
      display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
      minHeight:"100%",height:"100%",userSelect:"none",
      padding:"20px 24px",
    }}>
      <motion.div
        onPointerDown={pd} onPointerMove={pm} onPointerUp={pu} onPointerLeave={pu}
        style={{
          width:"100%",maxWidth:480,
          cursor:"grab",touchAction:"none",position:"relative",
        }}
        whileHover={{ scale:1.02 }}
      >
        <div style={{
          width:"100%",
          position:"relative",
          filter:"drop-shadow(0 20px 40px rgba(180,140,220,0.3)) drop-shadow(0 4px 12px rgba(0,0,0,0.1))",
        }}>
          <img
            src="/icons/pack-cover.svg"
            alt="Naila's Pack of Skills"
            style={{ width:"100%",height:"auto",display:"block" }}
            draggable={false}
          />

          {/* Holographic shimmer */}
          <div style={{
            position:"absolute",inset:0,
            background:"linear-gradient(135deg,transparent 15%,rgba(255,255,255,0.25) 42%,rgba(255,220,255,0.15) 58%,transparent 85%)",
            backgroundSize:"300% 300%",
            animation:"holoShimmer 4s ease infinite",
            pointerEvents:"none",
          }} />

          {/* Sparkles */}
          {[...Array(10)].map((_,i) => (
            <div key={i} style={{
              position:"absolute",
              width:4+Math.random()*5,height:4+Math.random()*5,
              background: i%2===0 ? "rgba(255,220,255,0.9)" : "rgba(255,255,255,0.8)",
              borderRadius: i%2===0 ? "50%" : "2px",
              top:`${8+((i*13)%78)}%`,left:`${6+((i*17)%84)}%`,
              animation:`packSparkle 2.5s ease infinite ${i*0.25}s`,
              zIndex:4,
            }} />
          ))}

          {/* Rip progress */}
          <motion.div style={{
            position:"absolute",left:0,top:"10%",
            height:5,
            background:"linear-gradient(90deg, #e8a0d0, #ffcb05, #a0d0ff)",
            borderRadius:3,zIndex:10,
            width:`${prog*100}%`,
            opacity: prog > 0 ? 1 : 0,
            boxShadow: prog > 0 ? "0 0 20px rgba(232,160,208,0.8)" : "none",
          }} />
          {prog > 0 && (
            <div style={{ position:"absolute",left:0,top:"10%",width:"100%",height:1,borderTop:"2px dashed rgba(255,255,255,0.6)",zIndex:5 }} />
          )}
        </div>
      </motion.div>

      <motion.p
        animate={{ opacity:[0.4,1,0.4] }}
        transition={{ duration:2,repeat:Infinity }}
        style={{ fontFamily:"'Silkscreen',monospace",fontSize:"1.2rem",color:"var(--ink-2)",marginTop:24,textAlign:"center" }}
      >
        &larr; swipe horizontally to rip open &rarr;
      </motion.p>

      <style>{`
        @keyframes holoShimmer{0%{background-position:0% 0%}50%{background-position:100% 100%}100%{background-position:0% 0%}}
        @keyframes packSparkle{0%,100%{opacity:0;transform:scale(0) rotate(0deg)}50%{opacity:1;transform:scale(1.4) rotate(180deg)}}
      `}</style>
    </div>
  );

  /* ══════ BURST ANIMATION ══════ */
  if (stage === "burst") return (
    <div style={{ display:"flex",alignItems:"center",justifyContent:"center",minHeight:520,position:"relative" }}>
      <motion.div initial={{ y:0,rotate:0 }} animate={{ y:-180,rotate:-12,opacity:0 }} transition={{ duration:0.5 }}
        style={{ position:"absolute",width:320,height:220,borderRadius:"16px 16px 0 0",overflow:"hidden" }}>
        <img src="/icons/pack-cover.svg" alt="" style={{ width:"100%",height:"auto" }} draggable={false} />
      </motion.div>
      <motion.div initial={{ y:0,rotate:0 }} animate={{ y:180,rotate:10,opacity:0 }} transition={{ duration:0.5 }}
        style={{ position:"absolute",width:320,height:220,borderRadius:"0 0 16px 16px",overflow:"hidden" }}>
        <img src="/icons/pack-cover.svg" alt="" style={{ width:"100%",height:"auto",marginTop:-220 }} draggable={false} />
      </motion.div>
      {[...Array(28)].map((_,i) => (
        <motion.div key={i}
          style={{ position:"absolute",borderRadius:i%3===0?"50%":"3px",background:["#e8a0d0","#ffcb05","#a0d0ff","#b8e986","#f8b1aa","#c4a0ff"][i%6],width:6+Math.random()*16,height:4+Math.random()*14 }}
          initial={{ x:0,y:0,opacity:1,rotate:0 }}
          animate={{ x:(Math.random()-0.5)*550,y:(Math.random()-0.5)*450,rotate:Math.random()*900,opacity:0 }}
          transition={{ duration:0.65,delay:i*0.01 }}
        />
      ))}
    </div>
  );

  /* ══════ FLIPPABLE CARDS - SVG defines shape, no frame clipping ══════ */
  return (
    <div style={{ position:"relative" }}>
      {/* Header with Skill Lab logo top-right */}
      <div style={{ display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:18 }}>
        <div style={{ flex:1 }}>
          <h3 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:"2rem",color:"var(--green)",marginBottom:4,textAlign:"center" }}>
            Skills Collected!
          </h3>
          <p style={{ fontFamily:"'DM Sans',serif",fontStyle:"italic",fontSize:"1.2rem",color:"var(--ink-2)",textAlign:"center",margin:0 }}>
            Click a card to flip &amp; discover related projects
          </p>
        </div>

        {/* Skill Lab floating logo with speech bubble below */}
        <motion.div
          style={{ flexShrink:0,cursor:"pointer",marginLeft:8,display:"flex",flexDirection:"column",alignItems:"center",gap:6 }}
          onClick={() => onNavigate?.("skilllab")}
          whileHover={{ scale:1.1 }}
          whileTap={{ scale:0.95 }}
        >
          <motion.img
            src="/icons/skilllab-logo.svg"
            alt="Skill Lab"
            draggable={false}
            animate={{
              y:[0,-5,0],
              rotate:[0,4,-4,0],
            }}
            transition={{ duration:3.5,repeat:Infinity,ease:"easeInOut" }}
            style={{
              width:64,height:64,
              objectFit:"contain",
              filter:"drop-shadow(0 4px 10px rgba(104,123,61,0.25))",
            }}
          />

          {/* Speech bubble below the logo */}
          <motion.div
            initial={{ opacity:0, y:-6, scale:0.9 }}
            animate={{ opacity:1, y:0, scale:1 }}
            transition={{ delay:0.8, duration:0.4, type:"spring" }}
            style={{
              position:"relative",
              background:"white",
              border:"2px solid var(--green)",
              borderRadius:12,
              padding:"6px 10px",
              width:150,
              boxShadow:"0 4px 14px rgba(104,123,61,0.15)",
            }}
          >
            {/* Triangle pointer pointing up */}
            <div style={{
              position:"absolute",top:-8,right:22,
              width:0,height:0,
              borderLeft:"8px solid transparent",
              borderRight:"8px solid transparent",
              borderBottom:"8px solid var(--green)",
            }} />
            <span style={{
              fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:600,fontSize:"0.6rem",
              color:"var(--green)",lineHeight:1.3,display:"block",textAlign:"center",
            }}>
              Click me to experiment with skill combos!
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* 2-column card grid - no forced aspect ratio, SVG defines shape */}
      <div style={{ display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:18,maxWidth:600,margin:"0 auto" }}>
        {SKILL_CARDS.map((card, i) => {
          const isFlipped = flipped.has(card.name);
          const projects = getProjects(card);
          const col = TAG_COLORS[card.type] || "var(--green)";
          const cardImg = CARD_IMAGES[card.name];

          return (
            <motion.div key={card.name}
              initial={{ opacity:0, y:60 }}
              animate={{ opacity:1, y:0 }}
              transition={{ delay:0.08+i*0.12, type:"spring", stiffness:120, damping:14 }}
              style={{ perspective:1000 }}
            >
              <motion.div
                onClick={() => toggleFlip(card.name)}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration:0.6, type:"spring", stiffness:180, damping:22 }}
                whileHover={{ y:-8 }}
                style={{
                  width:"100%",
                  aspectRatio:"77.25/99",
                  position:"relative",
                  cursor:"pointer",
                  transformStyle:"preserve-3d",
                }}
              >
                {/* ── FRONT - SVG artwork, no border clipping ── */}
                <div style={{
                  position:"absolute",inset:0,
                  backfaceVisibility:"hidden",
                  filter:"drop-shadow(0 8px 20px rgba(0,0,0,0.12)) drop-shadow(0 2px 6px rgba(180,140,220,0.2))",
                }}>
                  <img
                    src={cardImg}
                    alt={card.name}
                    style={{ width:"100%",height:"100%",objectFit:"contain",display:"block" }}
                    draggable={false}
                  />

                  {/* Holographic shine */}
                  <div style={{
                    position:"absolute",inset:0,
                    background:"linear-gradient(135deg,transparent 25%,rgba(255,255,255,0.18) 45%,rgba(255,220,255,0.08) 55%,transparent 75%)",
                    backgroundSize:"250% 250%",
                    animation:"holoShimmer 5s ease infinite",
                    pointerEvents:"none",
                  }} />

                  {/* Bottom hint */}
                  <div style={{
                    position:"absolute",bottom:6,left:0,right:0,
                    display:"flex",justifyContent:"center",
                  }}>
                    <motion.span
                      animate={{ opacity:[0.4,0.9,0.4] }}
                      transition={{ duration:2,repeat:Infinity }}
                      style={{ fontFamily:"'Silkscreen',monospace",fontSize:"0.6rem",color:"rgba(100,80,60,0.7)",letterSpacing:2 }}
                    >
                      TAP TO FLIP
                    </motion.span>
                  </div>
                </div>

                {/* ── BACK - Content ── */}
                <div style={{
                  position:"absolute",inset:0,
                  backfaceVisibility:"hidden",
                  transform:"rotateY(180deg)",
                  borderRadius:14,
                  border:`3px solid ${col}`,
                  background:`linear-gradient(160deg, var(--bg) 0%, ${col}15 100%)`,
                  overflow:"hidden",
                  display:"flex",flexDirection:"column",
                  padding:"14px 12px 12px",
                  boxShadow:`0 10px 30px ${col}30`,
                }}>
                  {/* Header */}
                  <div style={{ display:"flex",alignItems:"center",gap:6,marginBottom:8 }}>
                    <span style={{ fontSize:"1.3rem" }}>{card.icon}</span>
                    <div style={{ flex:1,minWidth:0 }}>
                      <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:"0.95rem",color:col,display:"block",lineHeight:1.1 }}>
                        {card.name}
                      </span>
                      <span style={{ fontFamily:"'Silkscreen',monospace",fontSize:"0.55rem",color:"var(--ink-2)" }}>
                        {card.type} &middot; {card.hp}HP
                      </span>
                    </div>
                  </div>

                  {/* Mastery gauge */}
                  <div style={{ marginBottom:8 }}>
                    <div style={{ display:"flex",justifyContent:"space-between",marginBottom:2 }}>
                      <span style={{ fontFamily:"'Silkscreen',monospace",fontSize:"0.5rem",color:"var(--ink-2)",letterSpacing:1 }}>MASTERY</span>
                      <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:"0.7rem",color:col }}>{card.hp}%</span>
                    </div>
                    <div style={{ width:"100%",height:6,borderRadius:3,background:"var(--bg-3)",overflow:"hidden" }}>
                      <motion.div
                        initial={{ width:0 }}
                        animate={{ width: isFlipped ? `${card.hp}%` : "0%" }}
                        transition={{ delay:0.3,duration:0.8,ease:"easeOut" }}
                        style={{ height:"100%",borderRadius:3,background:`linear-gradient(90deg, ${col}, ${col}cc)` }}
                      />
                    </div>
                  </div>

                  {/* Moves */}
                  <div style={{ marginBottom:8 }}>
                    <span style={{ fontFamily:"'Silkscreen',monospace",fontSize:"0.5rem",color:"var(--ink-2)",letterSpacing:1,display:"block",marginBottom:4 }}>
                      MOVES
                    </span>
                    <div style={{ display:"flex",flexWrap:"wrap",gap:3 }}>
                      {card.moves.map(m => (
                        <span key={m} style={{
                          fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:600,fontSize:"0.7rem",
                          padding:"2px 8px",borderRadius:12,
                          background:"var(--bg-2)",border:"1px solid var(--bg-3)",color:"var(--ink)",
                        }}>
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Related projects */}
                  <span style={{ fontFamily:"'Silkscreen',monospace",fontSize:"0.5rem",color:"var(--ink-2)",letterSpacing:1,display:"block",marginBottom:4 }}>
                    {projects.length} RELATED PROJECTS
                  </span>

                  <div style={{ flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:3,minHeight:0 }}>
                    {projects.slice(0,3).map(p => (
                      <motion.button
                        key={p.id}
                        onClick={(e) => { e.stopPropagation(); onNavigate?.("projects"); }}
                        whileHover={{ x:3, background:"var(--bg-2)" }}
                        style={{
                          display:"flex",alignItems:"center",gap:5,
                          padding:"4px 7px",borderRadius:7,
                          background:"var(--bg)",border:"1px solid var(--bg-3)",
                          cursor:"pointer",textAlign:"left",width:"100%",
                        }}
                      >
                        <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:"0.6rem",color:col,opacity:0.5,flexShrink:0 }}>
                          #{String(p.id).padStart(2,"0")}
                        </span>
                        <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:600,fontSize:"0.65rem",color:"var(--ink)",flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>
                          {p.title}
                        </span>
                      </motion.button>
                    ))}
                  </div>

                  {/* CTA */}
                  <motion.button
                    onClick={(e) => { e.stopPropagation(); onNavigate?.("projects"); }}
                    whileHover={{ scale:1.05 }}
                    whileTap={{ scale:0.95 }}
                    style={{
                      marginTop:5,padding:"6px 0",width:"100%",
                      background:col,border:"none",borderRadius:9,
                      fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,fontSize:"0.7rem",
                      color:"white",cursor:"pointer",
                      boxShadow:`0 3px 10px ${col}40`,
                    }}
                  >
                    View All Projects &rarr;
                  </motion.button>

                  {/* Flip back hint */}
                  <motion.span
                    animate={{ opacity:[0.3,0.7,0.3] }}
                    transition={{ duration:2,repeat:Infinity }}
                    style={{ fontFamily:"'Silkscreen',monospace",fontSize:"0.45rem",color:"var(--ink-2)",textAlign:"center",marginTop:3 }}
                  >
                    TAP TO FLIP BACK
                  </motion.span>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      <style>{`
        @keyframes holoShimmer{0%{background-position:0% 0%}50%{background-position:100% 100%}100%{background-position:0% 0%}}
      `}</style>
    </div>
  );
}
