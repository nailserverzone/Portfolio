"use client";
import { useRef, useEffect, useState, CSSProperties, ReactNode } from "react";

type RevealDirection = "up" | "down" | "left" | "right" | "fade" | "scale";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: RevealDirection;
  delay?: number;        // ms
  duration?: number;     // ms
  distance?: number;     // px for translate
  threshold?: number;    // 0-1 intersection ratio
  once?: boolean;        // only animate once
  style?: CSSProperties;
  className?: string;
  stagger?: number;      // if set, children get staggered delays (ms per child)
}

/* ── Scroll-triggered reveal animation ──
   Uses IntersectionObserver so it works inside any scroll container (like Modal).
   Inspired by muizzwebstudio.com line reveals. */

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 700,
  distance = 40,
  threshold = 0.15,
  once = true,
  style,
  className,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  const getInitialTransform = (): string => {
    switch (direction) {
      case "up": return `translateY(${distance}px)`;
      case "down": return `translateY(-${distance}px)`;
      case "left": return `translateX(${distance}px)`;
      case "right": return `translateX(-${distance}px)`;
      case "scale": return "scale(0.92)";
      case "fade": return "none";
      default: return `translateY(${distance}px)`;
    }
  };

  const revealStyle: CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? "none" : getInitialTransform(),
    transition: `opacity ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
    willChange: "opacity, transform",
    ...style,
  };

  return (
    <div ref={ref} className={className} style={revealStyle}>
      {children}
    </div>
  );
}

/* ── Line-by-line text reveal (muizzwebstudio style) ── */
export function TextReveal({
  text,
  style,
  delay = 0,
  staggerMs = 120,
  className,
}: {
  text: string;
  style?: CSSProperties;
  delay?: number;
  staggerMs?: number;
  className?: string;
}) {
  const words = text.split(" ");
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(el); } },
      { threshold: 0.2, rootMargin: "0px 0px -30px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} className={className} style={{ display: "inline", ...style }}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(14px)",
            transition: `opacity 500ms cubic-bezier(0.22,1,0.36,1) ${delay + i * staggerMs}ms, transform 500ms cubic-bezier(0.22,1,0.36,1) ${delay + i * staggerMs}ms`,
            marginRight: "0.3em",
          }}
        >
          {word}
        </span>
      ))}
    </span>
  );
}
