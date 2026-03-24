"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS, TAG_COLORS } from "@/data/projects";
import { PROJECT_STORIES } from "@/data/project-stories";

/* ═══════════════════════════════════════════════
   IMMERSIVE SCROLL EXPERIENCE
   Triggered by Start button - transforms the entire
   desktop into a smooth, scroll-driven portfolio.
   ═══════════════════════════════════════════════ */

const FEATURED = PROJECTS.slice(0, 6);

/* ── Scratch-to-reveal name component ── */
function ScratchReveal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scratching, setScratching] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [percentScratched, setPercentScratched] = useState(0);
  const initDone = useRef(false);

  // Draw the scratch overlay
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || initDone.current) return;
    initDone.current = true;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    // Gradient cover
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, "#e8a0bf");
    grad.addColorStop(0.3, "#d64479");
    grad.addColorStop(0.6, "#f0a040");
    grad.addColorStop(1, "#fdba2f");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Scratch hint text
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.font = "bold 16px 'DM Sans', sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("✦ scratch to reveal ✦", w / 2, h / 2);

    // Sparkle dots
    for (let i = 0; i < 30; i++) {
      const sx = Math.random() * w;
      const sy = Math.random() * h;
      const sr = Math.random() * 2 + 0.5;
      ctx.beginPath();
      ctx.arc(sx, sy, sr, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.4 + 0.1})`;
      ctx.fill();
    }
  }, []);

  const getPos = useCallback((e: React.PointerEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) * (canvas.width / rect.width),
      y: (e.clientY - rect.top) * (canvas.height / rect.height),
    };
  }, []);

  const scratch = useCallback((e: React.PointerEvent) => {
    const canvas = canvasRef.current;
    if (!canvas || !scratching) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { x, y } = getPos(e);

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2);
    ctx.fill();

    // Also add some scattered erases for a more natural feel
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.arc(x + (Math.random() - 0.5) * 30, y + (Math.random() - 0.5) * 30, 10 + Math.random() * 8, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalCompositeOperation = "source-over";

    // Check how much has been scratched
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparent = 0;
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) transparent++;
    }
    const pct = transparent / (imageData.data.length / 4);
    setPercentScratched(pct);
    if (pct > 0.45) {
      setRevealed(true);
    }
  }, [scratching, getPos]);

  return (
    <div ref={containerRef} style={{ position: "relative", display: "inline-block" }}>
      {/* The actual text underneath */}
      <h1
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 900,
          fontSize: "clamp(60px, 14vw, 180px)", lineHeight: 0.9,
          margin: 0, color: "white",
          textShadow: "0 0 40px rgba(214,68,121,0.5), 0 0 80px rgba(253,186,47,0.3)",
        }}
      >
        NAILA
      </h1>

      {/* Scratch overlay canvas */}
      <AnimatePresence>
        {!revealed && (
          <motion.canvas
            ref={canvasRef}
            width={600}
            height={180}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            onPointerDown={(e) => { setScratching(true); (e.target as HTMLElement).setPointerCapture(e.pointerId); scratch(e); }}
            onPointerMove={scratch}
            onPointerUp={() => setScratching(false)}
            onPointerLeave={() => setScratching(false)}
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              cursor: `url("data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="12" fill="rgba(255,255,255,0.3)" stroke="white" stroke-width="1.5"/></svg>')}") 16 16, crosshair`,
              borderRadius: 8,
              touchAction: "none",
            }}
          />
        )}
      </AnimatePresence>

      {/* Progress shimmer bar */}
      {!revealed && percentScratched > 0 && (
        <div style={{
          position: "absolute", bottom: -16, left: "10%", right: "10%",
          height: 3, borderRadius: 2, background: "rgba(255,255,255,0.1)", overflow: "hidden",
        }}>
          <motion.div
            animate={{ width: `${percentScratched * 100}%` }}
            style={{
              height: "100%", borderRadius: 2,
              background: "linear-gradient(90deg, #d64479, #fdba2f)",
            }}
          />
        </div>
      )}
    </div>
  );
}

const experience = [
  { role: "Product Implementation Apprentice", org: "PT. Prudential Corporation", year: "2026 - Present" },
  { role: "Research Assistant", org: "UBC SPIN Lab", year: "2024 - 2025" },
  { role: "Project Assistant", org: "HIBAR Research Alliance", year: "2022 - 2025" },
];

const stats = [
  { n: "5+", label: "Years Research" },
  { n: "3+", label: "Years UX" },
  { n: "14", label: "Projects" },
  { n: "50+", label: "Designs" },
];

export default function ScrollExperience({ onExit, onOpenPanel }: {
  onExit: () => void;
  onOpenPanel: (id: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [sectionsVisible, setSectionsVisible] = useState<Set<string>>(new Set());
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  // Track scroll position
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => setScrollY(el.scrollTop);
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // Track mouse for cursor spotlight
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Intersection observer for section reveals
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-section");
          if (!id) return;
          if (entry.isIntersecting) {
            setSectionsVisible((prev) => new Set(prev).add(id));
          }
        });
      },
      { root: el, threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    el.querySelectorAll("[data-section]").forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const isVis = (id: string) => sectionsVisible.has(id);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
      transition={{ duration: 0.6 }}
      style={{ position: "fixed", inset: 0, zIndex: 200, background: "#0a0a0a" }}
    >
      {/* ── Cursor spotlight that follows mouse ── */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 201, pointerEvents: "none",
        background: `radial-gradient(600px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(214,68,121,0.04), transparent 60%)`,
        transition: "background 0.3s ease",
      }} />

      {/* Toggle back — pill-shaped day/night switch */}
      <motion.button
        onClick={onExit}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
        title="Switch to day mode"
        aria-label="Switch to day mode"
        style={{
          position: "fixed", bottom: 24, left: 24, zIndex: 300,
          background: "none", border: "none", padding: 0, cursor: "pointer",
        }}
      >
        <div style={{
          position: "relative",
          width: 72, height: 36, borderRadius: 24,
          background: "linear-gradient(135deg, #1a1a3e 0%, #2d2b55 100%)",
          border: "2px solid rgba(255,255,255,0.15)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 7px",
          boxShadow: "inset 0 2px 6px rgba(0,0,0,0.4), 0 0 20px rgba(100,100,255,0.15)",
          transition: "all 0.3s",
        }}>
          {/* Sun icon (left) */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ zIndex: 1, flexShrink: 0 }}>
            <circle cx="12" cy="12" r="5" fill="#F9D71C" />
            <g stroke="#F9D71C" strokeWidth="2" strokeLinecap="round">
              <line x1="12" y1="1" x2="12" y2="4" />
              <line x1="12" y1="20" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
              <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="4" y2="12" />
              <line x1="20" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
              <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
            </g>
          </svg>
          {/* Moon icon (right) */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ zIndex: 1, flexShrink: 0 }}>
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="#E8E8E8" />
            <circle cx="17" cy="8" r="1" fill="rgba(255,255,255,0.8)" />
            <circle cx="19" cy="12" r="0.6" fill="rgba(255,255,255,0.6)" />
            <circle cx="15" cy="5" r="0.6" fill="rgba(255,255,255,0.6)" />
          </svg>
          {/* Thumb — positioned right (night active) */}
          <div style={{
            position: "absolute",
            right: 4, top: "50%", transform: "translateY(-50%)",
            width: 26, height: 26, borderRadius: "50%",
            background: "linear-gradient(135deg, #3b3b7a 0%, #5252a3 100%)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.4), inset 0 1px 2px rgba(255,255,255,0.15)",
            transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          }} />
        </div>
      </motion.button>

      {/* Scroll progress bar */}
      <div style={{
        position: "fixed", top: 0, left: 0, zIndex: 300,
        height: 3, background: "linear-gradient(90deg, #d64479, #fdba2f, #687b3d)",
        width: `${Math.min((scrollY / ((containerRef.current?.scrollHeight || 1) - window.innerHeight)) * 100, 100)}%`,
        transition: "width 0.1s",
        boxShadow: "0 0 20px rgba(214,68,121,0.5)",
      }} />

      {/* Main scroll container */}
      <div
        ref={containerRef}
        style={{
          height: "100vh", overflowY: "auto", overflowX: "hidden",
          scrollBehavior: "smooth", position: "relative", zIndex: 202,
        }}
      >
        {/* ═══════ SECTION 1: HERO ═══════ */}
        <section
          data-section="hero"
          style={{
            height: "100vh", position: "relative", overflow: "hidden",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          {/* Animated gradient bg that responds to mouse */}
          <div style={{
            position: "absolute", inset: 0,
            background: `radial-gradient(ellipse at ${30 + mousePos.x * 20}% ${50 + mousePos.y * 10}%, rgba(104,123,61,0.3) 0%, transparent 60%),
                         radial-gradient(ellipse at ${70 - mousePos.x * 15}% ${30 + mousePos.y * 15}%, rgba(214,68,121,0.2) 0%, transparent 50%),
                         radial-gradient(ellipse at ${50 + mousePos.x * 10}% ${80 - mousePos.y * 20}%, rgba(253,186,47,0.15) 0%, transparent 50%),
                         #0a0a0a`,
            transform: `translateY(${scrollY * 0.3}px)`,
            transition: "background 0.5s ease",
          }} />

          {/* Floating particles with parallax depth */}
          {Array.from({ length: 25 }).map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: "absolute",
                width: 3 + (i % 4) * 3, height: 3 + (i % 4) * 3,
                borderRadius: "50%",
                background: ["rgba(214,68,121,0.5)", "rgba(253,186,47,0.5)", "rgba(104,123,61,0.5)", "rgba(117,150,200,0.5)", "rgba(168,85,247,0.4)"][i % 5],
                left: `${(i * 13 + 7) % 100}%`,
                top: `${(i * 19 + 5) % 100}%`,
                filter: i % 3 === 0 ? "blur(1px)" : "none",
              }}
              animate={{
                y: [0, -20 - i * 4, 0],
                x: [0, (i % 2 ? 20 : -20), 0],
                opacity: [0.15, 0.7, 0.15],
                scale: [1, 1.3, 1],
              }}
              transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
            />
          ))}

          {/* Decorative rings */}
          <motion.div
            style={{
              position: "absolute", width: 400, height: 400,
              border: "1px solid rgba(214,68,121,0.08)", borderRadius: "50%",
              left: "50%", top: "50%", transform: "translate(-50%, -50%)",
            }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3], rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            style={{
              position: "absolute", width: 600, height: 600,
              border: "1px solid rgba(253,186,47,0.05)", borderRadius: "50%",
              left: "50%", top: "50%", transform: "translate(-50%, -50%)",
            }}
            animate={{ scale: [1.1, 0.9, 1.1], opacity: [0.2, 0.4, 0.2], rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />

          {/* Hero text with mouse-reactive transform */}
          <div style={{
            position: "relative", zIndex: 2, textAlign: "center",
            transform: `translateY(${scrollY * -0.2}px) translateX(${(mousePos.x - 0.5) * -10}px)`,
            transition: "transform 0.3s ease",
          }}>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              style={{
                fontFamily: "'Silkscreen', monospace", fontSize: "clamp(14px, 2vw, 20px)",
                color: "rgba(255,255,255,0.5)", letterSpacing: 8, marginBottom: 16,
              }}
            >
              HI! I&apos;M
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            >
              <ScratchReveal />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              style={{
                fontFamily: "'DM Sans', serif", fontStyle: "italic",
                fontSize: "clamp(18px, 3vw, 32px)", color: "rgba(255,255,255,0.6)",
                marginTop: 20, maxWidth: 600, margin: "20px auto 0",
              }}
            >
              Researcher · Designer · Storyteller
            </motion.p>

            {/* Scroll hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              style={{ marginTop: 60 }}
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  width: 30, height: 50, border: "2px solid rgba(255,255,255,0.2)",
                  borderRadius: 15, margin: "0 auto", position: "relative",
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                <motion.div
                  animate={{ y: [4, 20, 4], opacity: [1, 0.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    width: 6, height: 6, borderRadius: "50%",
                    background: "rgba(255,255,255,0.6)",
                    position: "absolute", left: "50%", transform: "translateX(-50%)", top: 6,
                    boxShadow: "0 0 10px rgba(255,255,255,0.3)",
                  }}
                />
              </motion.div>
              <p style={{
                fontFamily: "'Silkscreen', monospace", fontSize: "0.7rem",
                color: "rgba(255,255,255,0.3)", letterSpacing: 4, marginTop: 12,
              }}>
                SCROLL
              </p>
            </motion.div>
          </div>
        </section>

        {/* ═══════ SECTION 2: ABOUT ═══════ */}
        <section
          data-section="about"
          style={{
            minHeight: "100vh", position: "relative", overflow: "hidden",
            display: "flex", alignItems: "center",
            padding: "80px clamp(24px, 8vw, 120px)",
          }}
        >
          <div style={{
            position: "absolute", inset: 0,
            background: `linear-gradient(180deg, #0a0a0a 0%, #0f1208 30%, #0a0a0a 100%)`,
          }} />
          {/* Decorative floating blobs */}
          <motion.div style={{
            position: "absolute", right: "-10%", top: "20%",
            width: 300, height: 300, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(104,123,61,0.1) 0%, transparent 70%)",
            filter: "blur(40px)",
          }} animate={{ y: [0, -30, 0], x: [0, 20, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div style={{
            position: "absolute", left: "-5%", bottom: "10%",
            width: 200, height: 200, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(214,68,121,0.08) 0%, transparent 70%)",
            filter: "blur(30px)",
          }} animate={{ y: [0, 20, 0], x: [0, -15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />

          <div style={{ position: "relative", zIndex: 2, maxWidth: 900, width: "100%" }}>
            {/* Big tagline with word reveal */}
            <div style={{ marginBottom: 60 }}>
              {["I design with", "empathy and", "evidence."].map((line, li) => (
                <div key={li} style={{ overflow: "hidden", marginBottom: 4 }}>
                  <div style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800,
                    fontSize: "clamp(36px, 7vw, 80px)", lineHeight: 1.1,
                    color: li === 2 ? "transparent" : "white",
                    background: li === 2 ? "linear-gradient(90deg, #d64479, #fdba2f)" : undefined,
                    WebkitBackgroundClip: li === 2 ? "text" : undefined,
                    backgroundClip: li === 2 ? "text" : undefined,
                    transform: isVis("about") ? "translateY(0)" : "translateY(100%)",
                    opacity: isVis("about") ? 1 : 0,
                    transition: `transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${li * 0.15}s, opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${li * 0.15}s`,
                  }}>
                    {line}
                  </div>
                </div>
              ))}
            </div>

            {/* Bio in glass card */}
            <div style={{
              background: "rgba(255,255,255,0.03)", backdropFilter: "blur(12px)",
              borderRadius: 20, padding: "28px 32px",
              border: "1px solid rgba(255,255,255,0.06)",
              transform: isVis("about") ? "translateY(0)" : "translateY(40px)",
              opacity: isVis("about") ? 1 : 0,
              transition: "all 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.5s",
            }}>
              <p style={{
                fontFamily: "'DM Sans', serif", fontSize: "clamp(18px, 2.5vw, 26px)",
                lineHeight: 1.8, color: "rgba(255,255,255,0.6)", margin: 0,
              }}>
                Interdisciplinary researcher at the intersection of HCI, affective computing, and behavioral science.
                Transforming complex problems into human-centered solutions.
              </p>
            </div>

            {/* Stats row with glass cards */}
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
              gap: 16, marginTop: 40,
            }}>
              {stats.map((s, i) => (
                <motion.div key={s.label}
                  style={{
                    background: "rgba(255,255,255,0.03)", backdropFilter: "blur(8px)",
                    borderRadius: 16, padding: "24px 16px",
                    border: "1px solid rgba(255,255,255,0.06)",
                    textAlign: "center", cursor: "default",
                    transform: isVis("about") ? "translateY(0) scale(1)" : "translateY(60px) scale(0.8)",
                    opacity: isVis("about") ? 1 : 0,
                    transition: `all 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${0.6 + i * 0.12}s`,
                  }}
                  whileHover={{ scale: 1.08, background: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.15)" }}
                >
                  <span style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 900,
                    fontSize: "clamp(32px, 4vw, 56px)",
                    background: "linear-gradient(135deg, #687b3d, #a3c825)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    backgroundClip: "text", display: "block",
                  }}>
                    {s.n}
                  </span>
                  <span style={{
                    fontFamily: "'Silkscreen', monospace", fontSize: "0.6rem",
                    color: "rgba(255,255,255,0.35)", letterSpacing: 1,
                  }}>
                    {s.label.toUpperCase()}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════ SECTION 3: EXPERIENCE ═══════ */}
        <section
          data-section="exp"
          style={{
            minHeight: "80vh", position: "relative",
            padding: "100px clamp(24px, 8vw, 120px)",
            background: "linear-gradient(180deg, #0a0a0a 0%, #0d0a12 50%, #0a0a0a 100%)",
          }}
        >
          <div style={{ position: "relative", zIndex: 2, maxWidth: 800 }}>
            <p style={{
              fontFamily: "'Silkscreen', monospace", fontSize: "0.8rem",
              color: "rgba(214,68,121,0.6)", letterSpacing: 6, marginBottom: 40,
              transform: isVis("exp") ? "translateX(0)" : "translateX(-30px)",
              opacity: isVis("exp") ? 1 : 0,
              transition: "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
            }}>
              EXPERIENCE
            </p>

            {/* Timeline with connecting line */}
            <div style={{ position: "relative", paddingLeft: 40 }}>
              {/* Vertical line */}
              <div style={{
                position: "absolute", left: 8, top: 12, bottom: 12, width: 2,
                background: "linear-gradient(180deg, rgba(214,68,121,0.3), rgba(104,123,61,0.3), rgba(253,186,47,0.2))",
                transform: isVis("exp") ? "scaleY(1)" : "scaleY(0)",
                transformOrigin: "top",
                transition: "transform 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.3s",
              }} />

              <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
                {experience.map((e, i) => (
                  <motion.div key={i} style={{
                    position: "relative",
                    transform: isVis("exp") ? "translateX(0)" : "translateX(-40px)",
                    opacity: isVis("exp") ? 1 : 0,
                    transition: `all 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${0.4 + i * 0.2}s`,
                  }}
                  whileHover={{ x: 8 }}
                  >
                    {/* Timeline dot */}
                    <motion.div style={{
                      position: "absolute", left: -36, top: 8,
                      width: 14, height: 14, borderRadius: "50%",
                      background: ["#d64479", "#687b3d", "#fdba2f"][i],
                      border: "3px solid #0a0a0a",
                      boxShadow: `0 0 12px ${["rgba(214,68,121,0.4)", "rgba(104,123,61,0.4)", "rgba(253,186,47,0.4)"][i]}`,
                    }}
                    whileHover={{ scale: 1.5 }}
                    />

                    {/* Glass card */}
                    <div style={{
                      background: "rgba(255,255,255,0.03)", backdropFilter: "blur(8px)",
                      borderRadius: 16, padding: "20px 24px",
                      border: "1px solid rgba(255,255,255,0.06)",
                      transition: "all 0.3s",
                    }}>
                      <span style={{
                        fontFamily: "'Silkscreen', monospace", fontSize: "0.65rem",
                        color: "rgba(255,255,255,0.3)", letterSpacing: 1,
                      }}>
                        {e.year}
                      </span>
                      <h3 style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700,
                        fontSize: "clamp(18px, 2.5vw, 28px)", color: "white",
                        margin: "6px 0 4px", lineHeight: 1.2,
                      }}>
                        {e.role}
                      </h3>
                      <span style={{
                        fontFamily: "'DM Sans', serif", fontStyle: "italic",
                        fontSize: "clamp(14px, 1.8vw, 20px)",
                        color: "rgba(104,123,61,0.8)",
                      }}>
                        {e.org}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════ SECTION 4: PROJECTS with 3D tilt cards ═══════ */}
        <section
          data-section="projects"
          style={{
            minHeight: "120vh", position: "relative",
            padding: "100px clamp(24px, 8vw, 120px) 60px",
            background: "linear-gradient(180deg, #0a0a0a 0%, #080b0d 50%, #0a0a0a 100%)",
          }}
        >
          <div style={{ position: "relative", zIndex: 2 }}>
            <p style={{
              fontFamily: "'Silkscreen', monospace", fontSize: "0.8rem",
              color: "rgba(253,186,47,0.6)", letterSpacing: 6, marginBottom: 16,
              transform: isVis("projects") ? "translateX(0)" : "translateX(-30px)",
              opacity: isVis("projects") ? 1 : 0,
              transition: "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
            }}>
              SELECTED WORK
            </p>

            <h2 style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800,
              fontSize: "clamp(32px, 6vw, 60px)", color: "white",
              margin: "0 0 50px", lineHeight: 1.1,
              transform: isVis("projects") ? "translateY(0)" : "translateY(40px)",
              opacity: isVis("projects") ? 1 : 0,
              transition: "all 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.1s",
            }}>
              Projects that matter.
            </h2>

            {/* Project cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))", gap: 24 }}>
              {(showAllProjects ? PROJECTS : FEATURED).map((p, i) => (
                <TiltProjectCard key={p.id} project={p} index={i} visible={isVis("projects")} onOpen={() => setSelectedProject(p)} />
              ))}
            </div>

            {/* View all CTA */}
            <div style={{
              textAlign: "center", marginTop: 50,
              transform: isVis("projects") ? "translateY(0)" : "translateY(30px)",
              opacity: isVis("projects") ? 1 : 0,
              transition: "all 0.8s cubic-bezier(0.22, 1, 0.36, 1) 1s",
            }}>
              <motion.button
                onClick={() => setShowAllProjects(v => !v)}
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700,
                  fontSize: "1.1rem", color: "white",
                  padding: "16px 40px", borderRadius: 30,
                  background: "linear-gradient(135deg, #d64479, #fdba2f)",
                  border: "none", cursor: "pointer",
                }}
                whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(214,68,121,0.4)" }}
                whileTap={{ scale: 0.97 }}
              >
                {showAllProjects ? "Show Less" : `View All ${PROJECTS.length} Projects →`}
              </motion.button>
            </div>
          </div>
        </section>

        {/* ═══════ SECTION 5: MARQUEE ═══════ */}
        <section
          data-section="marquee"
          style={{
            padding: "50px 0", overflow: "hidden", position: "relative",
            background: "#0a0a0a",
          }}
        >
          {/* Two rows going opposite directions */}
          <div style={{
            display: "flex", gap: 40, whiteSpace: "nowrap",
            animation: "marquee-scroll 25s linear infinite",
            marginBottom: 16,
          }}>
            {[...Array(3)].flatMap((_, r) =>
              ["UX Research", "✦", "Figma", "✦", "Python", "✦", "HCI", "✦", "Data Science", "✦", "Design Thinking", "✦", "SPSS", "✦", "Prototyping", "✦"].map((t, i) => (
                <span key={`a${r}-${i}`} style={{
                  fontFamily: t === "✦" ? "sans-serif" : "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 800,
                  fontSize: t === "✦" ? "1.5rem" : "clamp(24px, 4vw, 44px)",
                  color: t === "✦" ? "rgba(214,68,121,0.4)" : "rgba(255,255,255,0.06)",
                  WebkitTextStroke: t === "✦" ? "none" : "1px rgba(255,255,255,0.12)",
                  flexShrink: 0,
                }}>
                  {t}
                </span>
              ))
            )}
          </div>
          <div style={{
            display: "flex", gap: 40, whiteSpace: "nowrap",
            animation: "marquee-scroll-reverse 20s linear infinite",
          }}>
            {[...Array(3)].flatMap((_, r) =>
              ["Usability Testing", "◆", "R & SPSS", "◆", "Affective Computing", "◆", "Next.js", "◆", "Thematic Analysis", "◆", "Workshop Design", "◆"].map((t, i) => (
                <span key={`b${r}-${i}`} style={{
                  fontFamily: t === "◆" ? "sans-serif" : "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 800,
                  fontSize: t === "◆" ? "1.2rem" : "clamp(20px, 3vw, 36px)",
                  color: t === "◆" ? "rgba(104,123,61,0.4)" : "rgba(255,255,255,0.04)",
                  WebkitTextStroke: t === "◆" ? "none" : "1px rgba(255,255,255,0.08)",
                  flexShrink: 0,
                }}>
                  {t}
                </span>
              ))
            )}
          </div>
          <style jsx>{`
            @keyframes marquee-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-33.33%); } }
            @keyframes marquee-scroll-reverse { 0% { transform: translateX(-33.33%); } 100% { transform: translateX(0); } }
          `}</style>
        </section>

        {/* ═══════ SECTION 6: CONTACT ═══════ */}
        <section
          data-section="contact"
          style={{
            height: "100vh", position: "relative",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            padding: "80px clamp(24px, 8vw, 120px)",
            background: `radial-gradient(ellipse at ${50 + (mousePos.x - 0.5) * 20}% ${50 + (mousePos.y - 0.5) * 20}%, rgba(214,68,121,0.12) 0%, transparent 60%), #0a0a0a`,
          }}
        >
          <p style={{
            fontFamily: "'Silkscreen', monospace", fontSize: "0.8rem",
            color: "rgba(214,68,121,0.5)", letterSpacing: 6, marginBottom: 24,
            transform: isVis("contact") ? "translateY(0)" : "translateY(20px)",
            opacity: isVis("contact") ? 1 : 0,
            transition: "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
          }}>
            LET&apos;S CONNECT
          </p>

          <h2 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 900,
            fontSize: "clamp(36px, 8vw, 90px)", lineHeight: 1,
            textAlign: "center", margin: "0 0 30px",
            background: "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.4) 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            transform: isVis("contact") ? "translateY(0) scale(1)" : "translateY(50px) scale(0.9)",
            opacity: isVis("contact") ? 1 : 0,
            transition: "all 1s cubic-bezier(0.22, 1, 0.36, 1) 0.1s",
          }}>
            Got an idea?
          </h2>

          <p style={{
            fontFamily: "'DM Sans', serif", fontStyle: "italic",
            fontSize: "clamp(16px, 2.5vw, 24px)", color: "rgba(255,255,255,0.4)",
            textAlign: "center", maxWidth: 500, marginBottom: 40,
            transform: isVis("contact") ? "translateY(0)" : "translateY(30px)",
            opacity: isVis("contact") ? 1 : 0,
            transition: "all 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.3s",
          }}>
            I&apos;m always open to collaborations, research opportunities, and interesting conversations.
          </p>

          <div style={{
            display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center",
            transform: isVis("contact") ? "translateY(0)" : "translateY(30px)",
            opacity: isVis("contact") ? 1 : 0,
            transition: "all 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.5s",
          }}>
            <motion.a href="mailto:noornaila04@gmail.com"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "1.1rem",
                color: "white", padding: "16px 36px", borderRadius: 30,
                background: "linear-gradient(135deg, #d64479, #f8b1aa)",
                textDecoration: "none",
              }}
              whileHover={{ scale: 1.08, boxShadow: "0 10px 40px rgba(214,68,121,0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              Say Hello →
            </motion.a>
            <motion.a href="https://www.linkedin.com/in/noornaila/" target="_blank" rel="noopener noreferrer"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "1.1rem",
                color: "rgba(255,255,255,0.8)", padding: "16px 36px", borderRadius: 30,
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.15)",
                textDecoration: "none", backdropFilter: "blur(8px)",
              }}
              whileHover={{ scale: 1.08, borderColor: "rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.08)" }}
              whileTap={{ scale: 0.95 }}
            >
              LinkedIn
            </motion.a>
            <motion.a href="https://github.com/nailserverzone" target="_blank" rel="noopener noreferrer"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "1.1rem",
                color: "rgba(255,255,255,0.8)", padding: "16px 36px", borderRadius: 30,
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.15)",
                textDecoration: "none", backdropFilter: "blur(8px)",
              }}
              whileHover={{ scale: 1.08, borderColor: "rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.08)" }}
              whileTap={{ scale: 0.95 }}
            >
              GitHub
            </motion.a>
          </div>
        </section>
      </div>

      {/* ═══════ INLINE PROJECT DETAIL ═══════ */}
      <AnimatePresence>
        {selectedProject && (
          <NightProjectDetail
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Night mode inline project case study ── */
function NightProjectDetail({ project, onClose }: {
  project: typeof PROJECTS[0];
  onClose: () => void;
}) {
  const story = PROJECT_STORIES[project.id];
  const scrollRef = useRef<HTMLDivElement>(null);

  // Reset scroll when project changes
  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0);
  }, [project.id]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed", inset: 0, zIndex: 250,
        background: "rgba(0,0,0,0.85)", backdropFilter: "blur(20px)",
        display: "flex", justifyContent: "center",
      }}
      onClick={onClose}
    >
      <motion.div
        ref={scrollRef}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
        style={{
          width: "min(820px, 94vw)", height: "100vh",
          overflowY: "auto", overflowX: "hidden",
          padding: "60px clamp(20px, 5vw, 60px) 80px",
        }}
      >
        {/* Back button */}
        <motion.button
          onClick={onClose}
          style={{
            position: "sticky", top: 0, zIndex: 10,
            fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700,
            fontSize: "0.9rem", color: "rgba(255,255,255,0.6)",
            background: "rgba(255,255,255,0.06)", backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20,
            padding: "8px 20px", cursor: "pointer",
            display: "inline-flex", alignItems: "center", gap: 8,
            marginBottom: 40,
          }}
          whileHover={{ background: "rgba(255,255,255,0.12)", color: "#fff" }}
        >
          ← back to projects
        </motion.button>

        {/* Hero section */}
        <div style={{ marginBottom: 50 }}>
          {/* Tags */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
            {project.tags.map(t => (
              <span key={t} style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700,
                fontSize: "0.7rem", padding: "4px 14px", borderRadius: 12,
                background: TAG_COLORS[t], color: "white", letterSpacing: 0.5,
              }}>
                {t}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800,
            fontSize: "clamp(28px, 5vw, 48px)", lineHeight: 1.15,
            color: "white", margin: "0 0 12px",
          }}>
            {project.title}
          </h1>

          {/* Field */}
          <p style={{
            fontFamily: "'DM Sans', serif", fontStyle: "italic",
            fontSize: "clamp(16px, 2.5vw, 22px)", color: "rgba(255,255,255,0.4)",
            margin: "0 0 24px",
          }}>
            {project.field}
          </p>

          {/* Thumbnail */}
          <div style={{
            borderRadius: 16, overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.08)",
            marginBottom: 32,
          }}>
            <img
              src={`/thumbnails/${project.id <= 16 ? ['proj-binaural','proj-wrapped','proj-chora','proj-shopivi','proj-comedy-robot','proj-course-shop','proj-igem','proj-airbnb','proj-serene-skies','proj-jakarta','proj-salmon-creek','proj-bincang-riset','proj-satellite','proj-fiber-optics','proj-featured-talks','proj-graphic-design'][project.id - 1] : 'proj-binaural'}.png`}
              alt={project.title}
              style={{ width: "100%", height: "auto", display: "block" }}
              onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          </div>

          {/* Meta row */}
          {story && (
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: 16, marginBottom: 40,
            }}>
              {[
                { label: "Role", value: story.role },
                { label: "Duration", value: story.duration },
                { label: "Team", value: story.team },
              ].map(m => (
                <div key={m.label} style={{
                  background: "rgba(255,255,255,0.04)", borderRadius: 12,
                  padding: "14px 18px", border: "1px solid rgba(255,255,255,0.06)",
                }}>
                  <span style={{
                    fontFamily: "'Silkscreen', monospace", fontSize: "0.6rem",
                    color: "rgba(255,255,255,0.3)", letterSpacing: 2, display: "block",
                    marginBottom: 6,
                  }}>
                    {m.label.toUpperCase()}
                  </span>
                  <span style={{
                    fontFamily: "'DM Sans', serif", fontSize: "0.95rem",
                    color: "rgba(255,255,255,0.8)",
                  }}>
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Tools */}
          {story && (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40 }}>
              {story.tools.map(t => (
                <span key={t} style={{
                  fontFamily: "'DM Sans', serif", fontSize: "0.8rem",
                  padding: "4px 14px", borderRadius: 20,
                  background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}>
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Story sections */}
        {story ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
            {story.sections.map((section, i) => (
              <NightSection key={i} section={section} index={i} />
            ))}
          </div>
        ) : (
          /* Fallback for projects without case studies */
          <div>
            <div style={{
              background: "rgba(255,255,255,0.04)", borderRadius: 16,
              padding: "28px 24px", border: "1px solid rgba(255,255,255,0.06)",
              marginBottom: 32,
            }}>
              <h3 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700,
                fontSize: "1.1rem", color: "rgba(255,255,255,0.8)", margin: "0 0 12px",
              }}>
                About This Project
              </h3>
              <p style={{
                fontFamily: "'DM Sans', serif", fontSize: "1rem",
                color: "rgba(255,255,255,0.5)", lineHeight: 1.8, margin: 0,
              }}>
                {project.desc}
              </p>
            </div>

            <div style={{
              background: "linear-gradient(135deg, rgba(104,123,61,0.15), rgba(214,68,121,0.1))",
              borderRadius: 16, padding: "24px",
              border: "1px solid rgba(255,255,255,0.06)",
            }}>
              <p style={{
                fontFamily: "'DM Sans', serif", fontStyle: "italic",
                fontSize: "1.1rem", color: "rgba(255,255,255,0.7)",
                margin: 0, lineHeight: 1.7,
              }}>
                &ldquo;{project.finding}&rdquo;
              </p>
            </div>

            {/* Skills */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 32 }}>
              {project.skills.map(s => (
                <span key={s} style={{
                  fontFamily: "'DM Sans', serif", fontSize: "0.85rem",
                  padding: "6px 16px", borderRadius: 20,
                  background: "rgba(104,123,61,0.15)", color: "rgba(145,198,51,0.8)",
                  border: "1px solid rgba(104,123,61,0.2)",
                }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Bottom spacer */}
        <div style={{ height: 60 }} />
      </motion.div>
    </motion.div>
  );
}

/* ── Night Section renderer ── */
function NightSection({ section, index }: { section: { type: string; data: Record<string, unknown> }; index: number }) {
  const d = section.data;

  const SectionTitle = ({ text }: { text: string }) => (
    <div style={{ marginBottom: 20 }}>
      <span style={{
        fontFamily: "'Silkscreen', monospace", fontSize: "0.65rem",
        color: "rgba(214,68,121,0.5)", letterSpacing: 4,
      }}>
        {text.toUpperCase()}
      </span>
    </div>
  );

  const Card = ({ children }: { children: React.ReactNode }) => (
    <div style={{
      background: "rgba(255,255,255,0.04)", borderRadius: 16,
      padding: "24px", border: "1px solid rgba(255,255,255,0.06)",
    }}>
      {children}
    </div>
  );

  const BodyText = ({ text }: { text: string }) => (
    <p style={{
      fontFamily: "'DM Sans', serif", fontSize: "1rem",
      color: "rgba(255,255,255,0.55)", lineHeight: 1.8, margin: 0,
    }}>
      {text}
    </p>
  );

  switch (section.type) {
    case "overview":
      return (
        <div>
          <SectionTitle text="Overview" />
          <Card>
            <BodyText text={d.text as string} />
          </Card>
        </div>
      );

    case "problem":
      return (
        <div>
          <SectionTitle text="Problem" />
          <Card>
            <BodyText text={(d.text || d.statement) as string} />
          </Card>
        </div>
      );

    case "callout":
      return (
        <div style={{
          background: "linear-gradient(135deg, rgba(104,123,61,0.15), rgba(214,68,121,0.08))",
          borderRadius: 16, padding: "24px",
          borderLeft: "3px solid rgba(214,68,121,0.4)",
        }}>
          <p style={{
            fontFamily: "'DM Sans', serif", fontStyle: "italic",
            fontSize: "1.1rem", color: "rgba(255,255,255,0.7)",
            margin: 0, lineHeight: 1.7,
          }}>
            &ldquo;{d.text as string}&rdquo;
          </p>
        </div>
      );

    case "process":
      return (
        <div>
          <SectionTitle text={(d.title as string) || "Process"} />
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {((d.phases as Array<Record<string, unknown>>) || []).map((phase, pi) => (
              <div key={pi} style={{
                background: "rgba(255,255,255,0.04)", borderRadius: 14,
                padding: "20px 22px", border: "1px solid rgba(255,255,255,0.06)",
                display: "flex", gap: 16, alignItems: "flex-start",
              }}>
                <span style={{ fontSize: "1.4rem", flexShrink: 0, marginTop: 2 }}>
                  {(phase.icon as string) || "▸"}
                </span>
                <div>
                  <h4 style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700,
                    fontSize: "1rem", color: "rgba(255,255,255,0.8)", margin: "0 0 6px",
                  }}>
                    {(phase.title || phase.label) as string}
                  </h4>
                  <p style={{
                    fontFamily: "'DM Sans', serif", fontSize: "0.9rem",
                    color: "rgba(255,255,255,0.45)", lineHeight: 1.7, margin: 0,
                  }}>
                    {phase.desc as string}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case "methodology":
      return (
        <div>
          <SectionTitle text={(d.title as string) || "Methodology"} />
          <Card>
            <BodyText text={(d.text as string) || `${(d.participants as Record<string, unknown>)?.count || ""} participants. ${(d.design as string) || ""}`} />
          </Card>
        </div>
      );

    case "findings":
      return (
        <div>
          <SectionTitle text="Findings" />
          <Card>
            <BodyText text={(d.text || d.summary) as string} />
          </Card>
        </div>
      );

    case "metrics": {
      const bars = d.bars as Array<Record<string, unknown>> | undefined;
      const items = d.items as Array<Record<string, unknown>> | undefined;
      return (
        <div>
          <SectionTitle text={(d.title as string) || "Key Metrics"} />
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: 12,
          }}>
            {(bars || items || []).map((m, mi) => (
              <div key={mi} style={{
                background: "rgba(255,255,255,0.04)", borderRadius: 12,
                padding: "16px", border: "1px solid rgba(255,255,255,0.06)",
                textAlign: "center",
              }}>
                <span style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800,
                  fontSize: "1.4rem", display: "block",
                  background: "linear-gradient(135deg, #91c633, #fdba2f)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  {(m.value || m.pct || "") as string}{m.pct ? "%" : ""}
                </span>
                <span style={{
                  fontFamily: "'DM Sans', serif", fontSize: "0.8rem",
                  color: "rgba(255,255,255,0.4)", marginTop: 4, display: "block",
                }}>
                  {m.label as string}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    case "iterations":
      return (
        <div>
          <SectionTitle text="Iterations" />
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {((d.stages as Array<Record<string, unknown>>) || []).map((s, si) => (
              <div key={si} style={{
                background: "rgba(255,255,255,0.04)", borderRadius: 12,
                padding: "16px 20px", border: "1px solid rgba(255,255,255,0.06)",
                display: "flex", gap: 14, alignItems: "flex-start",
              }}>
                <span style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800,
                  fontSize: "0.85rem", color: "rgba(214,68,121,0.6)",
                  background: "rgba(214,68,121,0.1)", borderRadius: 8,
                  padding: "4px 10px", flexShrink: 0,
                }}>
                  {(s.stage || s.label || `${si + 1}`) as string}
                </span>
                <p style={{
                  fontFamily: "'DM Sans', serif", fontSize: "0.9rem",
                  color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: 0,
                }}>
                  {s.desc as string}
                </p>
              </div>
            ))}
          </div>
        </div>
      );

    case "quotes":
      return (
        <div>
          <SectionTitle text="Participant Voices" />
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {((d.items as Array<Record<string, unknown>>) || []).map((q, qi) => (
              <div key={qi} style={{
                background: "rgba(255,255,255,0.03)", borderRadius: 14,
                padding: "18px 22px",
                borderLeft: "2px solid rgba(253,186,47,0.3)",
              }}>
                <p style={{
                  fontFamily: "'DM Sans', serif", fontStyle: "italic",
                  fontSize: "0.95rem", color: "rgba(255,255,255,0.55)",
                  lineHeight: 1.7, margin: 0,
                }}>
                  &ldquo;{q.quote as string}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      );

    case "impact":
      return (
        <div>
          <SectionTitle text="Impact & Learnings" />
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {((d.takeaways as Array<Record<string, unknown>>) || []).map((t, ti) => (
              <div key={ti} style={{
                background: "rgba(255,255,255,0.04)", borderRadius: 12,
                padding: "16px 20px", border: "1px solid rgba(255,255,255,0.06)",
              }}>
                <h4 style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700,
                  fontSize: "0.95rem", color: "rgba(255,255,255,0.75)", margin: "0 0 6px",
                }}>
                  {t.insight as string}
                </h4>
                <p style={{
                  fontFamily: "'DM Sans', serif", fontSize: "0.9rem",
                  color: "rgba(255,255,255,0.4)", lineHeight: 1.7, margin: 0,
                }}>
                  {t.detail as string}
                </p>
              </div>
            ))}
          </div>
          {Array.isArray(d.skills) && (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 16 }}>
              {(d.skills as string[]).map(s => (
                <span key={s} style={{
                  fontFamily: "'DM Sans', serif", fontSize: "0.8rem",
                  padding: "4px 14px", borderRadius: 20,
                  background: "rgba(104,123,61,0.15)", color: "rgba(145,198,51,0.7)",
                  border: "1px solid rgba(104,123,61,0.2)",
                }}>
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>
      );

    case "gallery":
      return (
        <div>
          <SectionTitle text={(d.title as string) || "Gallery"} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {((d.images as string[]) || []).map((img, ii) => (
              <div key={ii} style={{
                borderRadius: 12, overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.06)",
              }}>
                <img src={img} alt="" style={{ width: "100%", height: "auto", display: "block" }} />
              </div>
            ))}
          </div>
        </div>
      );

    case "links":
      return (
        <div>
          <SectionTitle text="Links" />
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {Object.entries(d).map(([label, url]) => (
              <a key={label} href={url as string} target="_blank" rel="noopener noreferrer" style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700,
                fontSize: "0.9rem", color: "white",
                padding: "10px 24px", borderRadius: 20,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                textDecoration: "none", transition: "all 0.2s",
              }}>
                {label} →
              </a>
            ))}
          </div>
        </div>
      );

    default:
      return null;
  }
}

/* ── Project Card sub-component ── */
/* ── 3D Tilt Project Card ── */
function TiltProjectCard({ project, index, visible, onOpen }: {
  project: typeof PROJECTS[0]; index: number; visible: boolean; onOpen: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const gradients = [
    "linear-gradient(135deg, rgba(104,123,61,0.25), rgba(104,123,61,0.04))",
    "linear-gradient(135deg, rgba(214,68,121,0.25), rgba(214,68,121,0.04))",
    "linear-gradient(135deg, rgba(117,150,200,0.25), rgba(117,150,200,0.04))",
    "linear-gradient(135deg, rgba(253,186,47,0.25), rgba(253,186,47,0.04))",
    "linear-gradient(135deg, rgba(125,219,244,0.25), rgba(125,219,244,0.04))",
    "linear-gradient(135deg, rgba(248,177,170,0.25), rgba(248,177,170,0.04))",
  ];

  const accentColors = ["#687b3d", "#d64479", "#7596c8", "#fdba2f", "#7ddbf4", "#f8b1aa"];
  const accent = accentColors[index % accentColors.length];

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const tiltX = (y - 0.5) * -20;
    const tiltY = (x - 0.5) * 20;
    setTilt({ x: tiltX, y: tiltY });
    setGlare({ x: x * 100, y: y * 100, opacity: 0.15 });
  }, []);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <div style={{
      perspective: 800,
      transform: visible ? "translateY(0)" : "translateY(80px)",
      opacity: visible ? 1 : 0,
      transition: `all 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${0.2 + index * 0.1}s`,
    }}>
      <motion.div
        ref={cardRef}
        onClick={onOpen}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          scale: isHovered ? 1.04 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{
          background: gradients[index % gradients.length],
          border: `1px solid ${isHovered ? `${accent}55` : "rgba(255,255,255,0.06)"}`,
          borderRadius: 20, padding: "28px 26px", cursor: "pointer",
          position: "relative", overflow: "hidden",
          transformStyle: "preserve-3d",
          boxShadow: isHovered
            ? `0 25px 60px rgba(0,0,0,0.5), 0 0 30px ${accent}22, inset 0 1px 0 rgba(255,255,255,0.1)`
            : "0 4px 20px rgba(0,0,0,0.2)",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Glare / shine overlay */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: 20,
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}), transparent 60%)`,
          pointerEvents: "none",
          transition: "background 0.15s ease",
        }} />

        {/* Floating accent glow */}
        <div style={{
          position: "absolute", top: -40, right: -40,
          width: 120, height: 120, borderRadius: "50%",
          background: `radial-gradient(circle, ${accent}20, transparent 70%)`,
          filter: "blur(20px)",
          transform: isHovered ? "scale(1.5)" : "scale(0.8)",
          opacity: isHovered ? 1 : 0,
          transition: "all 0.5s ease",
          pointerEvents: "none",
        }} />

        {/* Content at z-depth for 3D effect */}
        <div style={{ position: "relative", transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
          {/* Tags */}
          <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
            {project.tags.map(t => (
              <span key={t} style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.7rem",
                padding: "4px 12px", borderRadius: 12,
                background: TAG_COLORS[t], color: "white", letterSpacing: 0.5,
              }}>
                {t}
              </span>
            ))}
          </div>

          <h3 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700,
            fontSize: "clamp(18px, 2.5vw, 24px)", color: "white",
            margin: "0 0 8px", lineHeight: 1.3,
          }}>
            {project.title}
          </h3>

          <span style={{
            fontFamily: "'DM Sans', serif", fontStyle: "italic",
            fontSize: "0.95rem", color: "rgba(255,255,255,0.5)",
            display: "block", marginBottom: 12,
          }}>
            {project.field}
          </span>

          <p style={{
            fontFamily: "'DM Sans', serif", fontSize: "1rem",
            color: "rgba(255,255,255,0.5)", lineHeight: 1.6, margin: 0,
            display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}>
            {project.desc}
          </p>
        </div>

        {/* Arrow with 3D pop */}
        <motion.div
          style={{
            position: "absolute", bottom: 20, right: 20,
            width: 36, height: 36, borderRadius: "50%",
            background: isHovered ? `${accent}33` : "rgba(255,255,255,0.08)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1rem", color: isHovered ? "white" : "rgba(255,255,255,0.5)",
            transform: "translateZ(40px)",
            border: isHovered ? `1px solid ${accent}55` : "1px solid transparent",
            transition: "all 0.3s ease",
          }}
          animate={{ rotate: isHovered ? 0 : 0, scale: isHovered ? 1.2 : 1 }}
        >
          →
        </motion.div>
      </motion.div>
    </div>
  );
}

function ProjectCard({ project, index, visible, onOpen }: {
  project: typeof PROJECTS[0]; index: number; visible: boolean; onOpen: () => void;
}) {
  const [hov, setHov] = useState(false);

  const gradients = [
    "linear-gradient(135deg, rgba(104,123,61,0.3), rgba(104,123,61,0.05))",
    "linear-gradient(135deg, rgba(214,68,121,0.3), rgba(214,68,121,0.05))",
    "linear-gradient(135deg, rgba(117,150,200,0.3), rgba(117,150,200,0.05))",
    "linear-gradient(135deg, rgba(253,186,47,0.3), rgba(253,186,47,0.05))",
    "linear-gradient(135deg, rgba(125,219,244,0.3), rgba(125,219,244,0.05))",
    "linear-gradient(135deg, rgba(248,177,170,0.3), rgba(248,177,170,0.05))",
  ];

  return (
    <div
      onClick={onOpen}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: gradients[index % gradients.length],
        border: `1px solid ${hov ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.06)"}`,
        borderRadius: 20, padding: "28px 26px", cursor: "pointer",
        transform: visible
          ? (hov ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)")
          : "translateY(80px) scale(0.9)",
        opacity: visible ? 1 : 0,
        transition: `all 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${0.2 + index * 0.1}s`,
        boxShadow: hov ? "0 20px 60px rgba(0,0,0,0.4)" : "none",
        position: "relative", overflow: "hidden",
      }}
    >
      {/* Shine effect */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: 20,
        background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.05) 45%, transparent 50%)",
        transform: hov ? "translateX(100%)" : "translateX(-100%)",
        transition: "transform 0.6s",
        pointerEvents: "none",
      }} />

      {/* Tags */}
      <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
        {project.tags.map(t => (
          <span key={t} style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "0.7rem",
            padding: "4px 12px", borderRadius: 12,
            background: TAG_COLORS[t], color: "white", letterSpacing: 0.5,
          }}>
            {t}
          </span>
        ))}
      </div>

      <h3 style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700,
        fontSize: "clamp(18px, 2.5vw, 24px)", color: "white",
        margin: "0 0 8px", lineHeight: 1.3,
      }}>
        {project.title}
      </h3>

      <span style={{
        fontFamily: "'DM Sans', serif", fontStyle: "italic",
        fontSize: "0.95rem", color: "rgba(255,255,255,0.5)",
        display: "block", marginBottom: 12,
      }}>
        {project.field}
      </span>

      <p style={{
        fontFamily: "'DM Sans', serif", fontSize: "1rem",
        color: "rgba(255,255,255,0.5)", lineHeight: 1.6, margin: 0,
        display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
        overflow: "hidden",
      }}>
        {project.desc}
      </p>

      {/* Arrow */}
      <div style={{
        position: "absolute", bottom: 20, right: 20,
        width: 32, height: 32, borderRadius: "50%",
        background: "rgba(255,255,255,0.08)",
        display: "flex", alignItems: "center", justifyContent: "center",
        transform: hov ? "scale(1.2)" : "scale(1)",
        transition: "transform 0.3s",
        fontSize: "0.9rem", color: "rgba(255,255,255,0.5)",
      }}>
        →
      </div>
    </div>
  );
}
