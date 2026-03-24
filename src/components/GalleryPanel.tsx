"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FONT_HEAD = "'Plus Jakarta Sans',sans-serif";
const FONT_MONO = "'Silkscreen',monospace";
const FONT_BODY = "'DM Sans',sans-serif";

/* ════════════════════════════════════════
   DATA
   ════════════════════════════════════════ */

interface FeaturedTalk {
  youtubeId: string;
  color: string;
}

const FEATURED_TALKS: FeaturedTalk[] = [
  { youtubeId: "Mo4-fUKFLI4", color: "#f8b1aa" },
  { youtubeId: "K99E4IqkEDM", color: "#7596c8" },
  { youtubeId: "Q-HFsQtg5cc", color: "#fdba2f" },
  { youtubeId: "pJs2opo-04s", color: "#91c633" },
  { youtubeId: "BozEqcGRdvQ", color: "#d64479" },
];

interface GalleryImage {
  src: string;
  rotation: number;
  color: string;
  pinColor: string;
}

const EVENT_ITEMS: GalleryImage[] = [
  { src: "/gallery/events/Clip path group.jpg", rotation: -3, color: "#c8e6c9", pinColor: "#43a047" },
  { src: "/gallery/events/image 77.jpg", rotation: 2, color: "#bbdefb", pinColor: "#1e88e5" },
  { src: "/gallery/events/image 78.jpg", rotation: -1.5, color: "#fff9c4", pinColor: "#f9a825" },
  { src: "/gallery/events/image 79.jpg", rotation: 3, color: "#f8bbd0", pinColor: "#d81b60" },
  { src: "/gallery/events/image 80.jpg", rotation: -2, color: "#e1bee7", pinColor: "#8e24aa" },
  { src: "/gallery/events/image 81.jpg", rotation: 1.5, color: "#ffe0b2", pinColor: "#f57c00" },
  { src: "/gallery/events/image 82.jpg", rotation: -2.5, color: "#b2dfdb", pinColor: "#00897b" },
  { src: "/gallery/events/image 83.jpg", rotation: 2.5, color: "#d1c4e9", pinColor: "#5e35b1" },
  { src: "/gallery/events/image 84.jpg", rotation: -1, color: "#c8e6c9", pinColor: "#2e7d32" },
  { src: "/gallery/events/image 85.jpg", rotation: 3.5, color: "#fff9c4", pinColor: "#e53935" },
  { src: "/gallery/events/image 86.jpg", rotation: -3, color: "#bbdefb", pinColor: "#1565c0" },
  { src: "/gallery/events/image 87.jpg", rotation: 1, color: "#f8bbd0", pinColor: "#ad1457" },
];

const GRAPHIC_ITEMS: GalleryImage[] = [
  { src: "/gallery/graphics/Clip path group.jpg", rotation: -2, color: "#fff9c4", pinColor: "#e53935" },
  { src: "/gallery/graphics/Clip path group-1.jpg", rotation: 2.5, color: "#c8e6c9", pinColor: "#43a047" },
  { src: "/gallery/graphics/Clip path group-2.jpg", rotation: -1, color: "#e1bee7", pinColor: "#8e24aa" },
  { src: "/gallery/graphics/Group 111.jpg", rotation: 3, color: "#ffe0b2", pinColor: "#f57c00" },
  { src: "/gallery/graphics/Group 112.jpg", rotation: -2.5, color: "#f8bbd0", pinColor: "#d81b60" },
  { src: "/gallery/graphics/Group 113.jpg", rotation: 1.5, color: "#bbdefb", pinColor: "#1e88e5" },
  { src: "/gallery/graphics/Group 114.jpg", rotation: -3.5, color: "#d1c4e9", pinColor: "#5e35b1" },
  { src: "/gallery/graphics/Group 115.jpg", rotation: 2, color: "#b2dfdb", pinColor: "#00897b" },
  { src: "/gallery/graphics/Group 116.jpg", rotation: -1.5, color: "#fff9c4", pinColor: "#f9a825" },
  { src: "/gallery/graphics/Group 117.jpg", rotation: 3.5, color: "#c8e6c9", pinColor: "#2e7d32" },
  { src: "/gallery/graphics/Group-1.jpg", rotation: -2, color: "#ffe0b2", pinColor: "#ef6c00" },
  { src: "/gallery/graphics/Group.jpg", rotation: 1, color: "#f8bbd0", pinColor: "#ad1457" },
];

/* ════════════════════════════════════════
   1) FRIDGE MAGNETS (for Graphic Design)
   Cork board + draggable photos with magnets
   ════════════════════════════════════════ */

/* shared z-index counter – always increments so last-touched is on top */
let _zCounter = 100;
function nextZ() { return ++_zCounter; }

function DraggableMagnet({ item, index, onFocus, zIndex: zIdx }: { item: GalleryImage; index: number; onFocus: () => void; zIndex: number }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState(200);
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const posStart = useRef({ x: 0, y: 0 });
  const sizeStart = useRef(200);
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const col = index % 3;
    const row = Math.floor(index / 3);
    setPos({
      x: col * 230 + (Math.random() - 0.5) * 30 + 15,
      y: row * 210 + (Math.random() - 0.5) * 20 + 10,
    });
  }, [index]);

  // Scroll wheel to resize
  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault(); e.stopPropagation();
      onFocus();
      setSize(prev => Math.min(600, Math.max(80, prev - e.deltaY * 0.5)));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [onFocus]);

  // Drag handlers (for moving the whole card)
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault(); e.stopPropagation();
    setDragging(true); onFocus();
    dragStart.current = { x: e.clientX, y: e.clientY };
    posStart.current = { ...pos };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [pos, onFocus]);
  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging) return;
    setPos({ x: posStart.current.x + e.clientX - dragStart.current.x, y: posStart.current.y + e.clientY - dragStart.current.y });
  }, [dragging]);
  const onPointerUp = useCallback(() => setDragging(false), []);

  // Edge-drag resize handlers
  const onResizeDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault(); e.stopPropagation();
    setResizing(true); onFocus();
    dragStart.current = { x: e.clientX, y: e.clientY };
    sizeStart.current = size;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [size, onFocus]);
  const onResizeMove = useCallback((e: React.PointerEvent) => {
    if (!resizing) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    const delta = Math.max(dx, dy);
    setSize(Math.min(600, Math.max(80, sizeStart.current + delta)));
  }, [resizing]);
  const onResizeUp = useCallback(() => setResizing(false), []);

  const active = dragging || resizing;

  return (
    <motion.div
      ref={elRef}
      onMouseDown={onFocus}
      style={{
        position: "absolute", left: pos.x, top: pos.y, width: size, zIndex: zIdx,
        cursor: dragging ? "grabbing" : "grab", userSelect: "none", touchAction: "none",
      }}
      initial={{ opacity: 0, scale: 0.7, rotate: item.rotation * 2 }}
      animate={{ opacity: 1, scale: active ? 1.04 : 1, rotate: active ? 0 : item.rotation }}
      transition={{ delay: index * 0.06, type: "spring", stiffness: 300, damping: 25 }}
      onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp}
    >
      <div style={{
        position: "absolute", top: -6, left: "50%", transform: "translateX(-50%)",
        width: 18, height: 18, borderRadius: "50%",
        background: `radial-gradient(circle at 35% 35%, ${item.pinColor}dd, ${item.pinColor})`,
        boxShadow: `0 2px 6px ${item.pinColor}66`, zIndex: 2,
        border: "2px solid rgba(255,255,255,0.5)",
      }} />
      <div style={{
        background: "white", borderRadius: 3, padding: 6, position: "relative",
        boxShadow: active
          ? "0 12px 40px rgba(0,0,0,0.2), 0 4px 12px rgba(0,0,0,0.1)"
          : "0 3px 12px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.05)",
        transition: "box-shadow 0.2s",
      }}>
        <img src={item.src} alt="" style={{ width: "100%", height: "auto", display: "block", borderRadius: 2, pointerEvents: "none" }} draggable={false} />
        {/* Resize handle - bottom right corner */}
        <div
          onPointerDown={onResizeDown}
          onPointerMove={onResizeMove}
          onPointerUp={onResizeUp}
          style={{
            position: "absolute", bottom: -4, right: -4,
            width: 20, height: 20, cursor: "nwse-resize",
            background: "transparent", zIndex: 5,
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" style={{ position: "absolute", bottom: 2, right: 2, opacity: 0.3 }}>
            <line x1="11" y1="1" x2="1" y2="11" stroke="#888" strokeWidth="1.5" />
            <line x1="11" y1="5" x2="5" y2="11" stroke="#888" strokeWidth="1.5" />
            <line x1="11" y1="9" x2="9" y2="11" stroke="#888" strokeWidth="1.5" />
          </svg>
        </div>
        {/* Resize handle - bottom edge */}
        <div
          onPointerDown={onResizeDown}
          onPointerMove={onResizeMove}
          onPointerUp={onResizeUp}
          style={{
            position: "absolute", bottom: -6, left: "20%", right: "20%",
            height: 8, cursor: "ns-resize", zIndex: 4,
          }}
        />
        {/* Resize handle - right edge */}
        <div
          onPointerDown={onResizeDown}
          onPointerMove={onResizeMove}
          onPointerUp={onResizeUp}
          style={{
            position: "absolute", right: -6, top: "20%", bottom: "20%",
            width: 8, cursor: "ew-resize", zIndex: 4,
          }}
        />
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════
   2) POLAROID CAROUSEL (for Events)
   Stacked Polaroids you can flip through
   with a "toss" animation
   ════════════════════════════════════════ */

function PolaroidStack({ items }: { items: GalleryImage[] }) {
  const [current, setCurrent] = useState(0);
  const [tossed, setTossed] = useState<number[]>([]);
  const [tossDir, setTossDir] = useState<Record<number, { x: number; rot: number }>>({});

  const tossCard = () => {
    if (current >= items.length) return;
    const dir = Math.random() > 0.5 ? 1 : -1;
    const xOff = dir * (200 + Math.random() * 150);
    const rot = dir * (15 + Math.random() * 25);
    setTossDir(prev => ({ ...prev, [current]: { x: xOff, rot } }));
    setTossed(prev => [...prev, current]);
    setCurrent(prev => prev + 1);
  };

  const resetStack = () => {
    setTossed([]);
    setTossDir({});
    setCurrent(0);
  };

  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", gap: 20,
      padding: "20px 0",
    }}>
      {/* Stack area */}
      <div style={{
        position: "relative", width: 320, height: 360,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {items.map((item, i) => {
          const isTossed = tossed.includes(i);
          const isTop = i === current;
          const stackOffset = Math.max(0, i - current);
          const td = tossDir[i] || { x: 0, rot: 0 };

          if (i < current && !isTossed) return null;

          return (
            <motion.div
              key={i}
              style={{
                position: "absolute",
                width: 260,
                cursor: isTop ? "pointer" : "default",
                zIndex: isTossed ? 50 + i : items.length - i,
                transformOrigin: "center bottom",
              }}
              initial={false}
              animate={isTossed ? {
                x: td.x, y: -40, rotate: td.rot,
                opacity: 0, scale: 0.8,
                transition: { duration: 0.5, ease: "easeOut" },
              } : {
                x: stackOffset * 3,
                y: stackOffset * -2,
                rotate: isTop ? 0 : (stackOffset % 2 === 0 ? 1.5 : -1.5),
                scale: 1 - stackOffset * 0.02,
                opacity: stackOffset > 4 ? 0 : 1,
              }}
              onClick={isTop ? tossCard : undefined}
              whileHover={isTop ? { scale: 1.03, y: -6 } : undefined}
            >
              {/* Polaroid frame */}
              <div style={{
                background: "white",
                borderRadius: 4,
                padding: "10px 10px 36px",
                boxShadow: isTop
                  ? "0 8px 30px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)"
                  : "0 2px 8px rgba(0,0,0,0.06)",
              }}>
                <img src={item.src} alt="" style={{
                  width: "100%", height: "auto", display: "block", borderRadius: 2,
                }} />
              </div>
            </motion.div>
          );
        })}

        {/* Empty state */}
        {current >= items.length && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ textAlign: "center" }}
          >
            <div style={{ fontSize: 40, marginBottom: 12 }}>📸</div>
            <div style={{
              fontFamily: FONT_BODY, fontSize: "0.85rem", color: "var(--ink-2)",
              marginBottom: 16,
            }}>
              That&apos;s all the moments!
            </div>
            <motion.button
              onClick={resetStack}
              style={{
                fontFamily: FONT_MONO, fontSize: "0.5rem",
                padding: "8px 20px", borderRadius: 20,
                background: "var(--green)", color: "white",
                border: "none", cursor: "pointer", letterSpacing: 1,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              SHUFFLE AGAIN
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Counter & hint */}
      <div style={{
        display: "flex", alignItems: "center", gap: 16,
      }}>
        <span style={{
          fontFamily: FONT_MONO, fontSize: "0.45rem",
          color: "var(--ink-3)", letterSpacing: 1,
        }}>
          {current < items.length ? `${current + 1} / ${items.length}` : `${items.length} / ${items.length}`}
        </span>
        {current < items.length && (
          <motion.span
            style={{
              fontFamily: FONT_MONO, fontSize: "0.4rem",
              color: "var(--ink-3)", letterSpacing: 1,
            }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            CLICK TO TOSS ✦
          </motion.span>
        )}
        {current > 0 && current < items.length && (
          <motion.button
            onClick={resetStack}
            style={{
              fontFamily: FONT_MONO, fontSize: "0.4rem",
              padding: "4px 12px", borderRadius: 10,
              background: "transparent", color: "var(--ink-3)",
              border: "1px solid var(--bg-3)", cursor: "pointer", letterSpacing: 1,
            }}
            whileHover={{ scale: 1.05 }}
          >
            RESET
          </motion.button>
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   3) FILM PROJECTOR (for Featured Talks)
   Retro film-strip style with sprocket holes
   ════════════════════════════════════════ */

function FilmStrip({ talks }: { talks: FeaturedTalk[] }) {
  const [playing, setPlaying] = useState<number | null>(null);

  return (
    <div style={{ padding: "10px 0" }}>
      {/* Film strip container */}
      <div style={{
        background: "#1a1a1a",
        borderRadius: 12,
        padding: "0",
        overflow: "hidden",
      }}>
        {talks.map((talk, i) => (
          <div key={i} style={{ display: "flex", borderBottom: i < talks.length - 1 ? "3px solid #333" : "none" }}>
            {/* Left sprocket holes */}
            <div style={{
              width: 28, flexShrink: 0,
              background: "#111",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: 8,
              padding: "8px 0",
            }}>
              {[0, 1, 2].map(j => (
                <div key={j} style={{
                  width: 12, height: 12, borderRadius: 2,
                  background: "#333", border: "1px solid #444",
                }} />
              ))}
            </div>

            {/* Video frame */}
            <div style={{
              flex: 1, aspectRatio: "16/9",
              position: "relative", overflow: "hidden",
              cursor: "pointer",
            }}>
              {playing === i ? (
                <iframe
                  src={`https://www.youtube.com/embed/${talk.youtubeId}?autoplay=1`}
                  style={{ width: "100%", height: "100%", border: "none" }}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              ) : (
                <div onClick={() => setPlaying(i)} style={{ width: "100%", height: "100%", position: "relative" }}>
                  <img
                    src={`https://img.youtube.com/vi/${talk.youtubeId}/hqdefault.jpg`}
                    alt=""
                    style={{ width: "100%", height: "100%", objectFit: "contain", background: "#111" }}
                  />
                  {/* Film grain overlay */}
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
                    pointerEvents: "none",
                  }} />
                  {/* Play button */}
                  <div style={{
                    position: "absolute", inset: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <motion.div
                      style={{
                        width: 48, height: 48, borderRadius: "50%",
                        background: "rgba(255,255,255,0.9)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                      }}
                      whileHover={{ scale: 1.15 }}
                    >
                      <div style={{
                        width: 0, height: 0,
                        borderLeft: "16px solid #1a1a1a",
                        borderTop: "10px solid transparent",
                        borderBottom: "10px solid transparent",
                        marginLeft: 3,
                      }} />
                    </motion.div>
                  </div>
                </div>
              )}
            </div>

            {/* Right sprocket holes */}
            <div style={{
              width: 28, flexShrink: 0,
              background: "#111",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: 8,
              padding: "8px 0",
            }}>
              {[0, 1, 2].map(j => (
                <div key={j} style={{
                  width: 12, height: 12, borderRadius: 2,
                  background: "#333", border: "1px solid #444",
                }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
   MAIN GALLERY PANEL
   ════════════════════════════════════════ */

type GalleryTab = "design" | "events" | "talks";

export default function GalleryPanel({ initialTab }: { initialTab?: GalleryTab } = {}) {
  const [tab, setTab] = useState<GalleryTab>(initialTab || "design");
  const [magnetZ, setMagnetZ] = useState<number[]>(() => GRAPHIC_ITEMS.map((_, i) => i));
  const bringMagnetToFront = useCallback((idx: number) => {
    setMagnetZ(prev => {
      const z = nextZ();
      const next = [...prev];
      next[idx] = z;
      return next;
    });
  }, []);

  const tabs: { id: GalleryTab; label: string; icon: string }[] = [
    { id: "design", label: "Graphic Design", icon: "🎨" },
    { id: "events", label: "Events", icon: "📸" },
    { id: "talks", label: "Featured Talks", icon: "🎤" },
  ];

  return (
    <div>
      {/* Tab bar */}
      <div style={{
        display: "flex", gap: 6, marginBottom: 16, flexShrink: 0, alignItems: "center",
      }}>
        {tabs.map(t => (
          <motion.button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              fontFamily: FONT_MONO, fontSize: "0.55rem",
              padding: "6px 16px", borderRadius: 14,
              color: tab === t.id ? "white" : "var(--ink-2)",
              background: tab === t.id ? "var(--green)" : "transparent",
              border: `1.5px solid ${tab === t.id ? "var(--green)" : "var(--bg-3)"}`,
              cursor: "pointer",
              display: "flex", alignItems: "center", gap: 6, letterSpacing: 1,
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <span>{t.icon}</span>
            <span>{t.label}</span>
          </motion.button>
        ))}
        {/* Hint */}
        <motion.span
          style={{
            fontFamily: FONT_MONO, fontSize: "0.4rem",
            color: "var(--ink-3)", marginLeft: "auto", letterSpacing: 1,
          }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          key={tab}
        >
          {tab === "design" && "DRAG TO MOVE · DRAG EDGES TO RESIZE ✦"}
          {tab === "events" && "CLICK TO TOSS ✦"}
          {tab === "talks" && "CLICK TO PLAY ✦"}
        </motion.span>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {tab === "design" && (
          <motion.div
            key="design"
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
          >
            {/* Cork board with fridge magnets */}
            <div style={{
              borderRadius: 16, overflow: "hidden",
              background: `
                radial-gradient(circle at 20% 30%, rgba(180,140,80,0.08) 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, rgba(180,140,80,0.06) 0%, transparent 50%),
                linear-gradient(135deg, #f5f0e8 0%, #ede7db 50%, #f0ead8 100%)
              `,
              border: "2px solid rgba(139,109,63,0.15)",
              position: "relative",
            }}>
              <div style={{
                position: "relative",
                minHeight: Math.ceil(GRAPHIC_ITEMS.length / 3) * 220 + 30,
                padding: 20,
              }}>
                {GRAPHIC_ITEMS.map((item, i) => (
                  <DraggableMagnet key={`gfx-${i}`} item={item} index={i} zIndex={magnetZ[i]} onFocus={() => bringMagnetToFront(i)} />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {tab === "events" && (
          <motion.div
            key="events"
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
          >
            {/* Polaroid stack with toss interaction */}
            <div style={{
              borderRadius: 16, overflow: "hidden",
              background: `linear-gradient(180deg, #f0ead8 0%, #e8dcc6 100%)`,
              border: "2px solid rgba(139,109,63,0.12)",
              padding: "20px",
            }}>
              <PolaroidStack items={EVENT_ITEMS} />
            </div>
          </motion.div>
        )}

        {tab === "talks" && (
          <motion.div
            key="talks"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
          >
            {/* Film projector style */}
            <FilmStrip talks={FEATURED_TALKS} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
