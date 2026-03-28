"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS, TAG_COLORS } from "@/data/projects";

const ALL_SKILLS = Array.from(new Set(PROJECTS.flatMap(p => p.skills))).sort();

const skillColor = (s: string): string => {
  const map: Record<string, string> = {
    "Workshop Facilitation":"#687b3d", "Qualitative Analysis":"#687b3d", "Journey Mapping":"#687b3d",
    "Research Design":"#687b3d", "Thematic Analysis":"#687b3d", "Figma Prototyping":"#d64479",
    "Experimental Design":"#7596c8", "SPSS":"#7596c8", "Scientific Writing":"#687b3d",
    "Rapid Prototyping":"#d64479", "Accessible UX":"#d64479", "Pitch Design":"#d64479",
    "Systematic Review":"#687b3d", "Critical Analysis":"#687b3d",
    "Iterative Prototyping":"#d64479", "Usability Testing":"#d64479",
    "Figma":"#d64479", "SciComm":"#fdba2f", "Collaboration":"#fdba2f",
    "scikit-learn":"#7596c8", "SHAP":"#7596c8", "Medium Writing":"#fdba2f",
    "GAM Modeling":"#7596c8", "Policy Analysis":"#687b3d",
    "Proposal Writing":"#687b3d", "Literature Review":"#687b3d",
    "Field Sampling":"#687b3d", "MANOVA":"#7596c8",
    "Event Design":"#fdba2f", "Public Speaking":"#fdba2f",
    "ML in R & Python":"#7596c8", "Podcast Production":"#fdba2f",
    "Survey Design":"#687b3d", "Quantitative Analysis":"#7596c8",
    "Data Analysis":"#7596c8", "Python":"#7596c8", "R":"#7596c8",
    "Graphic Design":"#fdba2f", "Canva":"#fdba2f", "CorelDraw":"#fdba2f", "Photoshop":"#fdba2f",
  };
  return map[s] || "#888";
};

const thumbs = ["\ud83e\udd16","\ud83d\udcf1","\ud83e\udde0","\u267f","\ud83c\udfad","\ud83d\uded2","\ud83e\uddec","\ud83c\udfe0","\ud83c\udf0d","\ud83c\udf3f","\ud83d\udc1f","\ud83c\udf99","\ud83d\udef0","\ud83d\udca1"];

export default function SkillLab({ onNavigate }: { onNavigate?: (id: string) => void }) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [bubbling, setBubbling] = useState(false);

  const toggle = (skill: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(skill)) next.delete(skill); else next.add(skill);
      return next;
    });
    setBubbling(true);
    setTimeout(() => setBubbling(false), 600);
  };

  const clear = () => setSelected(new Set());

  const matches = useMemo(() => {
    if (selected.size === 0) return [];
    return PROJECTS
      .map(p => ({
        project: p,
        matchCount: p.skills.filter(s => selected.has(s)).length,
        matchedSkills: p.skills.filter(s => selected.has(s)),
      }))
      .filter(m => m.matchCount > 0)
      .sort((a, b) => b.matchCount - a.matchCount);
  }, [selected]);

  const fillLevel = Math.min(selected.size / 6, 1);

  return (
    <div>
      <div style={{ position:"relative",textAlign:"center",marginBottom:24 }}>
        {/* Animated floating logo */}
        <motion.img
          src="/icons/skilllab-logo.svg"
          alt="Skill Lab Logo"
          draggable={false}
          animate={{
            y: [0, -8, 0],
            rotate: [0, 3, -3, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position:"absolute",
            top: -10,
            right: 0,
            width: 80,
            height: 80,
            objectFit: "contain",
            filter: "drop-shadow(0 4px 12px rgba(104,123,61,0.3))",
            pointerEvents: "none",
          }}
        />
        <h3 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:"2.2rem",color:"var(--green)",margin:"0 0 8px" }}>
          Skill Lab
        </h3>
        <p style={{ fontFamily:"'DM Sans',serif",fontStyle:"italic",fontSize:"1.4rem",color:"var(--ink-2)",margin:0 }}>
          Mix skills together to discover matching projects
        </p>
      </div>

      <div style={{ display:"flex",gap:24,alignItems:"flex-start" }}>
        {/* Beaker */}
        <div style={{ width:140,flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center" }}>
          <div style={{
            width:120,height:200,position:"relative",
            borderRadius:"0 0 24px 24px",
            border:"4px solid var(--bg-3)",borderTop:"none",
            overflow:"hidden",background:"var(--bg)",
          }}>
            <div style={{ position:"absolute",top:-6,left:-12,right:-12,height:10,background:"var(--bg-3)",borderRadius:5 }} />
            <motion.div
              animate={{ height:`${fillLevel * 85}%` }}
              transition={{ type:"spring",stiffness:100,damping:15 }}
              style={{
                position:"absolute",bottom:0,left:0,right:0,
                background: fillLevel > 0.6
                  ? "linear-gradient(180deg, rgba(214,68,121,0.3), rgba(214,68,121,0.5))"
                  : fillLevel > 0.3
                  ? "linear-gradient(180deg, rgba(253,186,47,0.3), rgba(253,186,47,0.5))"
                  : "linear-gradient(180deg, rgba(104,123,61,0.2), rgba(104,123,61,0.4))",
                borderRadius:"0 0 20px 20px",transition:"background 0.5s",
              }}
            >
              <AnimatePresence>
                {bubbling && [...Array(5)].map((_, i) => (
                  <motion.div key={i}
                    initial={{ y:20,x:10+Math.random()*80,opacity:0.8,scale:0.5 }}
                    animate={{ y:-100-Math.random()*60,opacity:0,scale:1 }}
                    exit={{ opacity:0 }}
                    transition={{ duration:0.5+Math.random()*0.3,delay:i*0.08 }}
                    style={{ position:"absolute",bottom:0,width:10+Math.random()*10,height:10+Math.random()*10,borderRadius:"50%",background:"rgba(255,255,255,0.5)" }}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
            {[0.25, 0.5, 0.75].map(l => (
              <div key={l} style={{ position:"absolute",bottom:`${l*85}%`,left:6,width:16,height:2,background:"var(--bg-3)",opacity:0.5 }} />
            ))}
          </div>
          <span style={{ fontFamily:"'Silkscreen',monospace",fontSize:"0.9rem",color:"var(--ink-2)",marginTop:12,textAlign:"center" }}>
            {selected.size} skill{selected.size !== 1 ? "s" : ""} added
          </span>
          {selected.size > 0 && (
            <motion.button onClick={clear} whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
              initial={{ opacity:0 }} animate={{ opacity:1 }}
              style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,fontSize:"1rem",color:"var(--pink)",background:"none",border:"2.5px solid var(--pink)",borderRadius:14,padding:"7px 20px",cursor:"pointer",marginTop:10 }}>
              Clear All
            </motion.button>
          )}
        </div>

        {/* Skill pills */}
        <div style={{ flex:1 }}>
          <span style={{ fontFamily:"'Silkscreen',monospace",fontSize:"0.9rem",color:"var(--ink-2)",letterSpacing:1.5,display:"block",marginBottom:12 }}>
            TAP SKILLS TO ADD TO THE MIX
          </span>
          <div style={{ display:"flex",flexWrap:"wrap",gap:8 }}>
            {ALL_SKILLS.map(skill => {
              const active = selected.has(skill);
              const col = skillColor(skill);
              return (
                <motion.button key={skill} onClick={() => toggle(skill)}
                  whileHover={{ scale:1.08 }} whileTap={{ scale:0.92 }}
                  animate={active ? { y:[0,-4,0] } : {}}
                  transition={{ duration:0.3 }}
                  style={{
                    fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:600,fontSize:"1.05rem",
                    padding:"8px 18px",borderRadius:18,cursor:"pointer",
                    background:active ? col : "var(--bg-2)",
                    color:active ? "white" : "var(--ink-2)",
                    border:active ? `2px solid ${col}` : "2px solid var(--bg-3)",
                    transition:"all 0.2s",
                    boxShadow:active ? `0 3px 10px ${col}40` : "none",
                  }}>
                  {active ? "\u2715 " : "+"} {skill}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Results */}
      <AnimatePresence mode="popLayout">
        {selected.size > 0 && (
          <motion.div initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0,y:10 }} style={{ marginTop:26 }}>
            <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:16,borderTop:"2px solid var(--bg-3)",paddingTop:16 }}>
              <span style={{ fontFamily:"'Silkscreen',monospace",fontSize:"0.9rem",color:"var(--ink-2)",letterSpacing:1.5 }}>
                RESULTS
              </span>
              <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:"1.1rem",color:"var(--green)",background:"var(--bg-2)",padding:"5px 14px",borderRadius:12 }}>
                {matches.length} project{matches.length !== 1 ? "s" : ""} found
              </span>
            </div>

            {matches.length === 0 ? (
              <p style={{ fontFamily:"'DM Sans',serif",fontStyle:"italic",fontSize:"1.3rem",color:"var(--ink-2)",textAlign:"center",padding:28 }}>
                No projects match this combination yet. Try different skills!
              </p>
            ) : (
              <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
                {matches.map((m, i) => (
                  <motion.button key={m.project.id} onClick={() => onNavigate?.("projects")}
                    initial={{ opacity:0,x:-20 }} animate={{ opacity:1,x:0 }}
                    transition={{ delay:i*0.05 }}
                    whileHover={{ x:5, background:"var(--bg-2)" }}
                    style={{ display:"flex",alignItems:"center",gap:14,padding:"16px 18px",borderRadius:14,background:"transparent",border:"none",cursor:"pointer",textAlign:"left",width:"100%" }}>
                    <div style={{
                      width:44,height:44,borderRadius:12,flexShrink:0,
                      background: m.matchCount >= 3 ? "var(--pink)" : m.matchCount >= 2 ? "var(--amber)" : "var(--bg-3)",
                      display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.6rem",
                    }}>
                      {thumbs[m.project.id - 1]}
                    </div>
                    <div style={{ flex:1,minWidth:0 }}>
                      <h4 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,fontSize:"1.2rem",color:"var(--ink)",margin:0,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis" }}>
                        {m.project.title}
                      </h4>
                      <div style={{ display:"flex",gap:6,marginTop:5,flexWrap:"wrap" }}>
                        {m.matchedSkills.map(s => (
                          <span key={s} style={{ fontFamily:"'Silkscreen',monospace",fontSize:"0.7rem",padding:"3px 10px",borderRadius:8,background:skillColor(s),color:"white" }}>
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div style={{ flexShrink:0,textAlign:"center" }}>
                      <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:"1.5rem",color:m.matchCount >= 3 ? "var(--pink)" : m.matchCount >= 2 ? "var(--amber)" : "var(--ink-2)" }}>
                        {m.matchCount}
                      </span>
                      <span style={{ fontFamily:"'Silkscreen',monospace",fontSize:"0.65rem",color:"var(--ink-2)",display:"block" }}>
                        match{m.matchCount !== 1 ? "es" : ""}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {selected.size === 0 && (
        <div style={{ textAlign:"center",padding:"36px 0 16px",borderTop:"2px dashed var(--bg-3)",marginTop:26 }}>
          <span style={{ fontSize:"3rem",display:"block",marginBottom:12 }}>{"\ud83e\uddea"}</span>
          <p style={{ fontFamily:"'DM Sans',serif",fontStyle:"italic",fontSize:"1.3rem",color:"var(--ink-2)",margin:0 }}>
            Start adding skills above to see which projects use them
          </p>
        </div>
      )}
    </div>
  );
}
