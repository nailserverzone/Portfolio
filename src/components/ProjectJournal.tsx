"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS, TAG_COLORS, LINK_LABELS } from "@/data/projects";
import ProjectDetail from "./ProjectDetail";
import ScrollReveal, { TextReveal } from "./ScrollReveal";

/* Project thumbnail images */
const THUMB_IMAGES: string[] = [
  "/thumbnails/proj-binaural-beats.png",
  "/thumbnails/proj-wrapped.png",
  "/thumbnails/proj-affective-haptic.png",
  "/thumbnails/proj-shopivi.png",
  "/thumbnails/proj-comedy-robot.png",
  "/thumbnails/proj-course-shop.png",
  "/thumbnails/proj-igem-wiki.png",
  "/thumbnails/proj-airbnb-nyc.png",
  "/thumbnails/proj-serene-skies.png",
  "/thumbnails/proj-jakarta-biodiversity.png",
  "/thumbnails/proj-salmon-creek.png",
  "/thumbnails/proj-bincang-riset.png",
  "/thumbnails/proj-bizinnovate.png",
  "/thumbnails/proj-fiber-optics.png",
  "/thumbnails/proj-featured-talks.png",
  "/thumbnails/proj-graphic-design.png",
];

/* Projects that open the gallery instead of a case study */
const GALLERY_PROJECTS: Record<number, string> = {
  15: "gallery-talks",   // Featured Talks → Gallery talks tab
  16: "gallery-design",  // Graphic Design → Gallery design tab
};

const shortDesc: string[] = [
  "64 participants, 4 groups -beta binaural beats significantly improved working memory (p=0.01).",
  "Multi-phase UX study on a productivity app -lo-fi to hi-fi prototyping with structured usability experiments.",
  "Workshop study co-designing interactions for affective haptic companion robots with participatory methods.",
  "Voice assistant for accessible shopping -3rd Place at Girlcode × Aritzia Hackathon.",
  "Systematic review on how comedy robots combine NLP, reinforcement learning, and gaze tracking.",
  "Reimagined UBC course registration as an online shopping experience with iterative usability testing.",
  "Designed the 2023 UBC iGEM competition wiki for PILOT biosynthesis toolkit.",
  "Predicted Airbnb listing popularity with Random Forest (R\u00b2=0.59) and SHAP explainability.",
  "Evaluating aviation travel bans' impact on CO\u2082 emissions during the pandemic using GAM models.",
  "How urban biodiversity exposure influences emotion regulation in Jakarta, a megacity context.",
  "Water quality observations in natural salmon creeks and rivers across Metro Vancouver.",
  "Nationwide 3-part webinar series reaching 300+ participants on research knowledge sharing.",
  "Estimating water quality index from satellite imagery using Random Forest -74.3% accuracy.",
  "Article + podcast on how a UBC researcher makes fiber optic connections faster and cheaper.",
  "Collection of featured talks and webinars across academic and public audiences.",
  "Visual identity, event posters, social media, data visualizations, and web design work.",
];

const skillTagColor = (s: string): string => {
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
    "Survey Design":"#687b3d",
  };
  return map[s] || "#888";
};

/* ── Physics constants ── */
const GRAVITY = 0.09;
const FRICTION = 0.97;
const BOUNCE = 0.35;
const CURSOR_RADIUS = 90;
const CURSOR_FORCE = 1.2;
const MAX_VEL = 18;
const TAG_W = 80;
const TAG_H = 22;

interface TagPhysics {
  x: number; y: number;
  vx: number; vy: number;
  rot: number;   // rotation angle in degrees
  vrot: number;  // rotational velocity
}

/* Starting X positions spread across the container (as % of width) */
const START_X = [0.05, 0.35, 0.60, 0.15, 0.45];

function PhysicsThumb({
  project,
  thumbSrc,
  isHov,
  onHover,
  onLeave,
}: {
  project: typeof PROJECTS[0];
  thumbSrc: string;
  isHov: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tagRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const physicsRef = useRef<TagPhysics[]>([]);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const prevMouseRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number>(0);
  const initRef = useRef(false);
  const skills = project.skills.slice(0, 5);

  /* Always-on physics -tags fall from top and cursor can throw them */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const W = el.offsetWidth;
    const H = el.offsetHeight;

    // Initialize once: tags start spread across the top, slightly above
    if (!initRef.current || physicsRef.current.length !== skills.length) {
      physicsRef.current = skills.map((_, i) => ({
        x: (START_X[i] || 0.3) * W,
        y: -10 - i * 18,
        vx: (Math.random() - 0.5) * 0.5,
        vy: 0,
        rot: (Math.random() - 0.5) * 8,
        vrot: 0,
      }));
      initRef.current = true;
    }

    let running = true;

    const tick = () => {
      if (!running) return;
      const mouse = mouseRef.current;
      const prevMouse = prevMouseRef.current;

      physicsRef.current.forEach((t, i) => {
        // Gentle gravity
        t.vy += GRAVITY;

        // Cursor interaction -hand-like push & throw
        if (mouse) {
          const cx = t.x + TAG_W / 2;
          const cy = t.y + TAG_H / 2;
          const dx = cx - mouse.x;
          const dy = cy - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CURSOR_RADIUS && dist > 0) {
            const proximity = (CURSOR_RADIUS - dist) / CURSOR_RADIUS;
            // Gentle nudge away from cursor
            const angle = Math.atan2(dy, dx);
            t.vx += Math.cos(angle) * proximity * CURSOR_FORCE;
            t.vy += Math.sin(angle) * proximity * CURSOR_FORCE;
            // Main throw: cursor velocity transfers directly to tag
            if (prevMouse) {
              const mvx = mouse.x - prevMouse.x;
              const mvy = mouse.y - prevMouse.y;
              const cursorSpeed = Math.sqrt(mvx * mvx + mvy * mvy);
              // Scale factor increases with cursor speed -fast swipe = big throw
              const throwPower = Math.min(cursorSpeed * 0.08, 1.5) * proximity;
              t.vx += mvx * throwPower;
              t.vy += mvy * throwPower;
              // Extra upward boost for quick upward swipes
              if (mvy < -4) t.vy += mvy * proximity * 0.5;
              // Tilt from impact direction
              t.vrot += mvx * proximity * 0.8;
              // Side hit = spin
              t.vrot += (dx > 0 ? -1 : 1) * cursorSpeed * proximity * 0.3;
            } else {
              // First contact -just tilt
              t.vrot += (dx > 0 ? -1 : 1) * proximity * 2;
            }
          }
        }

        t.vx *= FRICTION;
        t.vy *= FRICTION;
        t.vrot *= 0.9; // rotational friction
        t.rot += t.vrot;

        // Settle rotation when resting on floor
        if (t.y >= H - TAG_H - 1 && Math.abs(t.vy) < 0.5) {
          t.rot *= 0.92; // slowly return to flat
          t.vrot *= 0.8;
        }

        // Cap velocity
        const speed = Math.sqrt(t.vx * t.vx + t.vy * t.vy);
        if (speed > MAX_VEL) { t.vx *= MAX_VEL / speed; t.vy *= MAX_VEL / speed; }
        t.x += t.vx;
        t.y += t.vy;

        // Wall bounce + spin on impact
        if (t.x < 0) { t.x = 0; t.vx = -t.vx * BOUNCE; t.vrot += t.vy * 0.3; }
        if (t.x > W - TAG_W) { t.x = W - TAG_W; t.vx = -t.vx * BOUNCE; t.vrot -= t.vy * 0.3; }
        if (t.y < 0) { t.y = 0; t.vy = -t.vy * BOUNCE; }
        if (t.y > H - TAG_H) { t.y = H - TAG_H; t.vy = -t.vy * BOUNCE; t.vrot += t.vx * 0.2; }

        // Tag-to-tag collision
        for (let j = i + 1; j < physicsRef.current.length; j++) {
          const o = physicsRef.current[j];
          const ddx = (t.x + TAG_W / 2) - (o.x + TAG_W / 2);
          const ddy = (t.y + TAG_H / 2) - (o.y + TAG_H / 2);
          const dd = Math.sqrt(ddx * ddx + ddy * ddy);
          const minDist = TAG_W * 0.7;
          if (dd < minDist && dd > 0) {
            const push = (minDist - dd) * 0.2;
            const ax = (ddx / dd) * push;
            const ay = (ddy / dd) * push;
            t.vx += ax; t.vy += ay;
            o.vx -= ax; o.vy -= ay;
            // Spin from collision
            t.vrot += ax * 0.5;
            o.vrot -= ax * 0.5;
          }
        }

        // Clamp rotation
        if (t.rot > 45) t.rot = 45;
        if (t.rot < -45) t.rot = -45;

        const ref = tagRefs.current[i];
        if (ref) ref.style.transform = `translate(${t.x}px, ${t.y}px) rotate(${t.rot.toFixed(1)}deg)`;
      });

      // Track previous mouse for velocity
      prevMouseRef.current = mouse ? { ...mouse } : null;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { running = false; cancelAnimationFrame(rafRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const handleMouseLeave = () => {
    mouseRef.current = null;
    prevMouseRef.current = null;
    onLeave();
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={onHover}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        width: "100%", height: 190, position: "relative",
        background: "var(--bg-3)",
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Project thumbnail image */}
      <img
        src={thumbSrc}
        alt={project.title}
        draggable={false}
        style={{
          width: "100%", height: "100%",
          objectFit: "cover",
          transition: "transform 0.4s ease, filter 0.3s",
          transform: isHov ? "scale(1.08)" : "scale(1)",
          filter: isHov ? "brightness(0.7)" : "brightness(1)",
          position: "absolute", inset: 0,
          zIndex: 0,
        }}
      />

      {/* Physics skill tags -always positioned via ref transforms */}
      {skills.map((skill, si) => {
        const col = skillTagColor(skill);
        return (
          <span
            key={skill}
            ref={el => { tagRefs.current[si] = el; }}
            style={{
              position: "absolute",
              left: 0, top: 0,
              fontFamily: "'Plus Jakarta Sans',sans-serif",
              fontWeight: 700, fontSize: "0.65rem",
              padding: "4px 10px", borderRadius: 8,
              background: col, color: "white",
              zIndex: 3,
              boxShadow: `0 3px 10px ${col}50`,
              whiteSpace: "nowrap",
              pointerEvents: "none",
              maxWidth: "45%", overflow: "hidden", textOverflow: "ellipsis",
            }}
          >
            {skill}
          </span>
        );
      })}

      {/* Project number watermark */}
      <span style={{
        position: "absolute", bottom: 10, right: 12,
        fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 900, fontSize: "1.6rem",
        color: "rgba(0,0,0,0.06)", zIndex: 1,
      }}>
        {String(project.id).padStart(2, "0")}
      </span>

      {/* Hover: small view button -centered */}
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        opacity: isHov ? 1 : 0,
        transition: "opacity 0.3s",
        zIndex: 5, pointerEvents: isHov ? "auto" : "none",
      }}>
        <span style={{
          fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: "0.85rem",
          color: "white", padding: "6px 18px", borderRadius: 16,
          background: "var(--pink)",
          boxShadow: "0 4px 12px rgba(214,68,121,0.4)",
        }}>
          View &rarr;
        </span>
      </div>
    </div>
  );
}

function toSlug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function findProjectBySlug(slug: string): typeof PROJECTS[0] | null {
  return PROJECTS.find(p => toSlug(p.title) === slug) ?? null;
}

export default function ProjectJournal({ onNavigate, initialProjectSlug }: { onNavigate?: (panel: string) => void; initialProjectSlug?: string }) {
  const [sel, setSel] = useState<typeof PROJECTS[0] | null>(() => {
    if (initialProjectSlug) return findProjectBySlug(initialProjectSlug);
    return null;
  });
  const [filter, setFilter] = useState("ALL");
  const [hovered, setHovered] = useState<number | null>(null);

  const selectProject = (p: typeof PROJECTS[0]) => {
    setSel(p);
    window.history.replaceState(null, "", `#project/${toSlug(p.title)}`);
  };

  const deselectProject = () => {
    setSel(null);
    window.history.replaceState(null, "", "#projects");
  };

  const cats = ["ALL", "RESEARCH", "UI/UX", "AI/ML", "PROJECT MANAGEMENT", "DESIGN"];
  const list = filter === "ALL" ? PROJECTS : PROJECTS.filter(p => p.tags.includes(filter));

  /* ══════ DETAIL VIEW ══════ */
  if (sel) {
    return (
      <ProjectDetail
        project={sel}
        thumbSrc={THUMB_IMAGES[sel.id - 1]}
        onBack={deselectProject}
      />
    );
  }

  /* ══════ GRID VIEW ══════ */
  return (
    <div>
      <div style={{ display:"flex",gap:10,marginBottom:26,flexWrap:"wrap" }}>
        {cats.map(c => {
          const active = filter === c;
          const col = c === "ALL" ? "var(--green)" : (TAG_COLORS[c] || "var(--green)");
          return (
            <motion.button key={c} onClick={() => setFilter(c)}
              whileHover={{ scale:1.06 }} whileTap={{ scale:0.96 }}
              style={{
                fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,fontSize:"1.2rem",
                padding:"12px 26px",borderRadius:24,cursor:"pointer",
                borderWidth:2,borderStyle:"solid",
                borderColor:active ? col : "var(--bg-3)",
                background:active ? col : "transparent",
                color:active ? "white" : "var(--ink-2)",
                transition:"background 0.2s, color 0.2s",
              }}>
              {c}
              {c !== "ALL" && <span style={{ marginLeft:8,opacity:0.6,fontSize:"1rem" }}>{PROJECTS.filter(p => p.tags.includes(c)).length}</span>}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence mode="popLayout">
        <motion.div layout style={{ display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:18 }}>
          {list.map((p, idx) => {
            const thumbSrc = THUMB_IMAGES[p.id - 1];
            const isHov = hovered === p.id;

            return (
              <motion.button
                key={p.id} layout
                onClick={() => {
                  if (GALLERY_PROJECTS[p.id] && onNavigate) {
                    onNavigate(GALLERY_PROJECTS[p.id]);
                  } else {
                    selectProject(p);
                  }
                }}
                initial={{ opacity:0, y:30 }}
                animate={{ opacity:1, y:0 }}
                exit={{ opacity:0, scale:0.9 }}
                transition={{ duration:0.3, delay:idx*0.04 }}
                style={{
                  background:"var(--bg-2)",
                  borderWidth:"2.5px",borderStyle:"solid",
                  borderColor: isHov ? "var(--pink)" : "var(--bg-3)",
                  borderRadius:20,padding:0,cursor:"pointer",textAlign:"left",
                  overflow:"hidden",position:"relative",
                  transition:"border-color 0.3s, box-shadow 0.3s",
                  boxShadow: isHov ? "0 14px 44px rgba(214,68,121,0.18)" : "none",
                }}
              >
                {/* Physics thumbnail */}
                <PhysicsThumb
                  project={p}
                  thumbSrc={thumbSrc}
                  isHov={isHov}
                  onHover={() => setHovered(p.id)}
                  onLeave={() => setHovered(null)}
                />

                {/* Content area */}
                <div style={{ padding:"16px 18px 18px" }}>
                  <span style={{
                    fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:"0.85rem",
                    padding:"4px 14px",borderRadius:10,
                    background:TAG_COLORS[p.tags[0]],color:"white",
                    display:"inline-block",marginBottom:10,
                  }}>
                    {p.tags[0]}
                  </span>

                  <h3 style={{
                    fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,fontSize:"1.3rem",
                    color:"var(--ink)",lineHeight:1.3,margin:"0 0 8px",
                    display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden",
                  }}>
                    {p.title}
                  </h3>

                  <p style={{
                    fontFamily:"'DM Sans',serif",fontSize:"1.1rem",
                    color:"var(--ink-2)",lineHeight:1.5,margin:"0 0 12px",
                    display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden",
                  }}>
                    {shortDesc[p.id - 1]}
                  </p>

                  <div style={{ display:"flex",alignItems:"center",gap:8,flexWrap:"wrap" }}>
                    {p.tags.slice(1).map(t => (
                      <span key={t} style={{ width:10,height:10,borderRadius:"50%",background:TAG_COLORS[t],flexShrink:0 }} />
                    ))}
                    <span style={{ fontFamily:"'DM Sans',serif",fontStyle:"italic",fontSize:"0.95rem",color:"var(--ink-2)" }}>
                      {p.skills.slice(0,2).join(" \u00b7 ")}
                    </span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
