"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Terminal from "@/components/Terminal";
import ProjectJournal from "@/components/ProjectJournal";
import PokemonPack from "@/components/PokemonPack";
import AboutPanel from "@/components/AboutPanel";
import ContactPanel from "@/components/ContactPanel";
import GalleryPanel from "@/components/GalleryPanel";
import CatCompanion from "@/components/CatCompanion";
import SkillLab from "@/components/SkillLab";
import MatchatPanel from "@/components/MatchatPanel";
import Modal from "@/components/Modal";
import ScrollExperience from "@/components/ScrollExperience";

export default function DeskPage() {
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [nightMode, setNightMode] = useState(false);
  const [flowers, setFlowers] = useState<{ id: number; x: number; y: number; emoji: string }[]>([]);
  const open = useCallback((id: string) => setActivePanel(id), []);
  const close = () => setActivePanel(null);

  const handleNailaClick = () => {
    const petals = ["🌸", "🌺", "🌷", "🌼", "💐", "🌸", "🌺", "🌷", "🌼", "💮"];
    const newFlowers = Array.from({ length: 10 }, (_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 260,
      y: -Math.random() * 180 - 40,
      emoji: petals[i % petals.length],
    }));
    setFlowers(prev => [...prev, ...newFlowers]);
    setTimeout(() => {
      setFlowers(prev => prev.filter(f => !newFlowers.find(n => n.id === f.id)));
    }, 1500);
  };

  const navigatePanel = (id: string) => {
    setActivePanel(null);
    setTimeout(() => setActivePanel(id), 300);
  };

  const panels: Record<string, { title: string; content: React.ReactNode }> = {
    terminal: { title: "🖥 Terminal", content: <Terminal onNavigate={navigatePanel} /> },
    about: { title: "📷 About Me", content: <AboutPanel onNavigate={navigatePanel} /> },
    projects: { title: "📂 Projects", content: <ProjectJournal onNavigate={navigatePanel} /> },
    cards: { title: "🎴 ???.exe", content: <PokemonPack onNavigate={navigatePanel} /> },
    skilllab: { title: "🧪 Skill Lab", content: <SkillLab onNavigate={navigatePanel} /> },
    contact: { title: "📱 Contact", content: <ContactPanel /> },
    gallery: { title: "📸 Gallery.jpg", content: <GalleryPanel /> },
    "gallery-talks": { title: "🎤 Featured Talks", content: <GalleryPanel initialTab="talks" /> },
    "gallery-design": { title: "🎨 Graphic Design", content: <GalleryPanel initialTab="design" /> },
    "gallery-events": { title: "📸 Events", content: <GalleryPanel initialTab="events" /> },
    matchat: { title: "💌 Matchat", content: <MatchatPanel /> },
  };

  const TB = 56;

  return (
    <>
      <style jsx global>{`
        .scene {
          position: fixed;
          inset: 0;
          overflow: hidden;
          background: var(--bg);
        }

        .hill-bg {
          position: absolute;
          bottom: ${TB}px;
          left: 0; right: 0;
          height: 45%;
          background: url('/icons/hillbackground.png') center bottom / cover no-repeat;
          z-index: 1;
        }

        /* ═══ HERO - centered, at the hill crest, BIG ═══
           NAILA should overlap onto the green hill.
           Position from bottom so it tracks the hill edge. */
        .hero-center {
          position: absolute;
          bottom: calc(45% + ${TB}px - 2vh);
          left: 50%;
          z-index: 5;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
        }
        .hero-hi-text {
          font-family: 'Silkscreen', monospace;
          font-size: clamp(16px, 3vw, 32px);
          color: #1B1B1B;
          letter-spacing: 4px;
          margin-bottom: -18px;
          pointer-events: none;
          align-self: flex-start;
          margin-left: 2%;
        }
        .hero-naila-wrapper {
          position: relative;
          cursor: pointer;
        }
        .hero-naila-img {
          height: clamp(90px, 28vw, 280px);
          width: auto;
          object-fit: contain;
          filter: drop-shadow(0 4px 20px rgba(104,123,61,0.25));
          transition: filter 0.4s ease;
        }
        .hero-naila-wrapper:hover .hero-naila-img {
          filter: drop-shadow(0 8px 30px rgba(200,100,255,0.5)) brightness(1.08) hue-rotate(15deg);
        }
        .hero-sparkle {
          position: absolute;
          top: -12px;
          right: -20px;
          font-size: clamp(16px, 2.5vw, 26px);
          pointer-events: none;
        }
        .naila-flower {
          position: absolute;
          pointer-events: none;
          font-size: 22px;
          z-index: 10;
        }

        /* ═══ ABOUT ME FRAME ═══ */
        .about-frame-area {
          position: absolute;
          top: 3%;
          right: 2%;
          z-index: 5;
          width: clamp(140px, 25vw, 340px);
          cursor: pointer;
        }
        .about-frame-area .frame-container {
          position: relative;
          width: 100%;
        }
        .about-frame-area .frame-img {
          width: 100%;
          height: auto;
          display: block;
          filter: drop-shadow(0 6px 20px rgba(150,100,200,0.2));
          transition: filter 0.3s ease;
        }
        .about-frame-area:hover .frame-img {
          filter: drop-shadow(0 8px 30px rgba(200,100,255,0.35));
        }
        .about-frame-area .photo-overlay {
          position: absolute;
          top: 11.3%;
          left: 2.7%;
          width: 91%;
          height: 74.5%;
          object-fit: cover;
          border-radius: 0;
        }

        /* ═══ DESK ICONS - stay big, use fixed-ish sizes ═══ */
        .desk-item {
          position: absolute;
          cursor: pointer;
          z-index: 4;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          background: none;
          border: none;
          padding: 0;
        }
        .desk-item-graphic {
          position: relative;
        }
        .desk-item-graphic img {
          display: block;
          object-fit: contain;
          filter: drop-shadow(0 4px 12px rgba(0,0,0,0.1));
          transition: filter 0.2s;
        }
        .desk-item:hover .desk-item-graphic img {
          filter: drop-shadow(0 8px 24px rgba(104,123,61,0.3)) brightness(1.03);
        }
        .desk-item-label {
          font-family: 'Silkscreen', monospace;
          font-size: clamp(9px, 1.2vw, 14px);
          color: white;
          letter-spacing: 0.5px;
          background: rgba(104,123,61,0.85);
          padding: 4px 14px;
          border-radius: 20px;
          white-space: nowrap;
        }
        .desk-item-label.label-light {
          background: rgba(255, 252, 215, 0.9);
          color: var(--ink);
          border: 2px solid #91c633;
        }

        /* ═══ TASKBAR ═══ */
        .rainbow-bar {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: ${TB}px;
          background: linear-gradient(90deg, #A3C825 0%, #CCCF63 33%, #CB7D34 67%, #DB92D3 100%);
          z-index: 19;
        }
        .blue-bar {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: ${TB - 8}px;
          background: #7596c8;
          z-index: 20;
        }
        .taskbar {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: ${TB - 14}px;
          background: transparent;
          display: flex;
          align-items: center;
          padding: 0 8px;
          gap: 4px;
          z-index: 22;
        }
        .mode-toggle {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          flex-shrink: 0;
        }
        .mode-toggle-track {
          position: relative;
          width: 60px;
          height: 30px;
          border-radius: 20px;
          background: linear-gradient(135deg, #e8e8f0 0%, #d4d4e0 100%);
          border: 2px solid #1B1B1B;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 5px;
          transition: all 0.4s ease;
          box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);
        }
        .mode-toggle:hover .mode-toggle-track {
          transform: scale(1.08);
          box-shadow: inset 0 1px 3px rgba(0,0,0,0.1), 0 0 12px rgba(249,215,28,0.4);
        }
        .mode-icon {
          width: 16px;
          height: 16px;
          z-index: 1;
          flex-shrink: 0;
        }
        .mode-toggle-thumb {
          position: absolute;
          left: 3px;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: white;
          box-shadow: 0 1px 4px rgba(0,0,0,0.25);
          transition: left 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .mode-toggle span {
          font-family: 'Silkscreen', monospace;
          font-size: 9px;
          color: white;
          font-weight: 700;
          letter-spacing: 1px;
        }
        .tb-items {
          display: flex;
          align-items: center;
          gap: 4px;
          flex: 1;
        }
        .tb-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 0 8px;
          background: rgba(255,255,255,0.15);
          border: 2px solid #1B1B1B;
          cursor: pointer;
          font-family: 'Silkscreen', monospace;
          font-size: clamp(10px, 1.5vw, 16px);
          color: #1B1B1B;
          letter-spacing: 0.5px;
          transition: all 0.15s;
          border-radius: 6px;
          flex: 1;
          height: 30px;
          min-width: 0;
        }
        .tb-btn:hover { background: rgba(255,255,255,0.35); }
        .tb-btn img { width: 18px; height: 18px; object-fit: contain; flex-shrink: 0; }
        .tb-btn span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

        /* ═══ RESPONSIVE ═══ */

        /* Narrow screens - prevent NAILA overlapping icons */
        @media (max-width: 550px) {
          .hero-center { left: 55%; bottom: calc(40% + ${TB}px - 2vh); }
          .hero-naila-img { height: clamp(70px, 30vw, 150px); }
          .hero-hi-text { font-size: clamp(14px, 4vw, 22px); }
          .about-frame-area { width: clamp(120px, 38vw, 200px); }
          .tb-btn { font-size: 8px; gap: 2px; padding: 0 3px; }
          .tb-btn img { width: 14px; height: 14px; }
          .mode-toggle-track { width: 50px; height: 26px; }
          .mode-toggle-thumb { width: 18px; height: 18px; }
          .mode-icon { width: 13px; height: 13px; }
        }

        /* Wide screens - NAILA huge, above the grass */
        @media (min-width: 1200px) {
          .hero-center { bottom: calc(45% + ${TB}px - 3vh); }
          .hero-naila-img { height: clamp(180px, 22vw, 300px); }
          .hero-hi-text { font-size: 30px; }
        }
      `}</style>

      <div className="scene">
        <div className="hill-bg" />

        {/* ═══ "HI! I'M NAILA" - centered at hill crest ═══ */}
        <motion.div className="hero-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          transition={{ delay: 0.3, duration: 1, type: "spring", stiffness: 50 }}>
          <motion.span className="hero-hi-text"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}>
            HI! I&apos;M
          </motion.span>
          <motion.div className="hero-naila-wrapper"
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 1, type: "spring", stiffness: 50 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNailaClick}>
            <motion.img src="/icons/Naila.svg" alt="Naila" className="hero-naila-img"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.span className="hero-sparkle"
              animate={{ rotate: [0, 360], scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
              ✦
            </motion.span>
            <AnimatePresence>
              {flowers.map(f => (
                <motion.span key={f.id} className="naila-flower"
                  style={{ top: "50%", left: "50%" }}
                  initial={{ opacity: 1, x: 0, y: 0, scale: 0.5 }}
                  animate={{ opacity: 0, x: f.x, y: f.y, scale: 1.2, rotate: Math.random() * 360 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.3, ease: "easeOut" }}>
                  {f.emoji}
                </motion.span>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* ═══ TERMINAL - top left, stays big (100px icon) ═══ */}
        <motion.button className="desk-item"
          style={{ top: "3%", left: "2%", width: "clamp(80px, 13vw, 150px)" }}
          whileHover={{ y: -6, scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => open("terminal")}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}>
          <div className="desk-item-graphic" style={{ marginLeft: "10%" }}>
            <img src="/icons/terminal.svg" alt="Terminal" style={{ width: "100%", height: "auto" }} />
          </div>
          <span className="desk-item-label">Terminal.js</span>
        </motion.button>

        {/* ═══ PROJECTS - left, below terminal ═══ */}
        <motion.button className="desk-item"
          style={{ top: "28%", left: "2%", width: "clamp(80px, 13vw, 150px)" }}
          whileHover={{ y: -6, scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => open("projects")}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}>
          <div className="desk-item-graphic">
            <img src="/icons/projects.svg" alt="Projects" style={{ width: "100%", height: "auto" }} />
          </div>
          <span className="desk-item-label">Projects.zip</span>
        </motion.button>

        {/* ═══ ???.exe - bottom left ═══ */}
        <motion.button className="desk-item"
          style={{ bottom: `calc(${TB}px + 14%)`, left: "2%", width: "clamp(80px, 13vw, 150px)" }}
          whileHover={{ y: -8, scale: 1.06, rotate: 2 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => open("cards")}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}>
          <div className="desk-item-graphic">
            <img src="/icons/skills.svg" alt="Skills Pack" style={{ width: "100%", height: "auto" }} />
          </div>
          <span className="desk-item-label label-light">???.exe</span>
        </motion.button>

        {/* ═══ GALLERY - bottom right area ═══ */}
        <motion.button className="desk-item"
          style={{ bottom: `calc(${TB}px + 12%)`, right: "28%", width: "clamp(65px, 10vw, 120px)" }}
          whileHover={{ y: -6, scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => open("gallery")}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}>
          <div className="desk-item-graphic">
            <img src="/icons/gallery.svg" alt="Gallery" style={{ width: "100%", height: "auto" }} />
          </div>
          <span className="desk-item-label label-light">Gallery.jpg</span>
        </motion.button>

        {/* ═══ MATCHAT - right side ═══ */}
        <motion.button className="desk-item"
          style={{ bottom: `calc(${TB}px + 12%)`, right: "8%", width: "clamp(65px, 10vw, 120px)" }}
          whileHover={{ y: -6, scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => open("matchat")}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}>
          <div className="desk-item-graphic">
            <img src="/icons/matchat.svg" alt="Matchat" style={{ width: "100%", height: "auto" }} />
          </div>
          <span className="desk-item-label label-light">Matchat</span>
        </motion.button>

        {/* ═══ ABOUT ME FRAME ═══ */}
        <motion.div className="about-frame-area"
          onClick={() => open("about")}
          whileHover={{ scale: 1.02 }}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}>
          <div className="frame-container">
            <img src="/icons/aboutmeframe2.svg" alt="About Me Frame" className="frame-img" />
            <img src="/icons/nailaphoto.svg" alt="Naila" className="photo-overlay" />
          </div>
        </motion.div>

        {/* ═══ TASKBAR ═══ */}
        <div className="rainbow-bar" />
        <div className="blue-bar" />
        <div className="taskbar">
          <button
            className="mode-toggle"
            onClick={() => setNightMode(n => !n)}
            title="Switch to night mode"
            aria-label="Switch to night mode"
          >
            <div className="mode-toggle-track">
              <svg className="mode-icon sun-icon" viewBox="0 0 24 24" fill="none">
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
              <svg className="mode-icon moon-icon" viewBox="0 0 24 24" fill="none">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="#E8E8E8" />
                <circle cx="17" cy="8" r="1" fill="rgba(255,255,255,0.8)" />
                <circle cx="19" cy="12" r="0.6" fill="rgba(255,255,255,0.6)" />
                <circle cx="15" cy="5" r="0.6" fill="rgba(255,255,255,0.6)" />
              </svg>
              <div className="mode-toggle-thumb" />
            </div>
          </button>
          <div className="tb-items">
            <button className="tb-btn" onClick={() => open("about")}>
              <img src="/icons/resumelogo.svg" alt="Resume" />
              <span>Resume</span>
            </button>
            <button className="tb-btn" onClick={() => window.open("https://www.linkedin.com/in/noornaila/", "_blank")}>
              <img src="/icons/linkedinlogo.png" alt="LinkedIn" />
              <span>LinkedIn</span>
            </button>
            <button className="tb-btn" onClick={() => window.open("mailto:noornaila04@gmail.com", "_blank")}>
              <img src="/icons/maillogo.svg" alt="Email" />
              <span>Email</span>
            </button>
            <button className="tb-btn" onClick={() => window.open("https://github.com/nailserverzone", "_blank")}>
              <img src="/icons/githublogo.svg" alt="GitHub" />
              <span>GitHub</span>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {nightMode && (
          <ScrollExperience
            onExit={() => setNightMode(false)}
            onOpenPanel={(id) => open(id)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activePanel && panels[activePanel] && (
          <Modal onClose={close} title={panels[activePanel].title} noPadding={activePanel === "terminal" || activePanel === "matchat"}>
            {panels[activePanel].content}
          </Modal>
        )}
      </AnimatePresence>

    </>
  );
}
