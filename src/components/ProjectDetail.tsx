"use client";
import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import type { Project } from "@/data/projects";
import { TAG_COLORS } from "@/data/projects";
import { PROJECT_STORIES, type ProjectStory, type StorySection } from "@/data/project-stories";

/* ═══════════════════════════════════════════
   Reusable scroll-reveal wrapper
   ═══════════════════════════════════════════ */
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   Section components
   ═══════════════════════════════════════════ */

const FONT_HEAD = "'Plus Jakarta Sans', sans-serif";
const FONT_BODY = "'DM Sans', serif";
const FONT_MONO = "'Silkscreen', monospace";

/* - Section label - */
function SectionLabel({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
      <span style={{
        fontFamily: FONT_MONO, fontSize: "0.75rem", letterSpacing: 3,
        color: "var(--pink)", textTransform: "uppercase",
      }}>
        {text}
      </span>
      <div style={{ flex: 1, height: 1, background: "var(--bg-3)" }} />
    </div>
  );
}

/* - Overview Section - */
function OverviewSection({ data }: { data: Record<string, unknown> }) {
  return (
    <Reveal>
      <SectionLabel text="Overview" />
      <p style={{
        fontFamily: FONT_BODY, fontSize: "1.25rem", lineHeight: 1.8,
        color: "var(--ink-2)", margin: "0 0 16px",
      }}>
        {data.text as string}
      </p>
      {typeof data.highlight === "string" && (
        <div style={{
          background: "linear-gradient(135deg, rgba(104,123,61,0.08), rgba(104,123,61,0.03))",
          borderLeft: "4px solid var(--green)",
          padding: "16px 20px", borderRadius: "0 12px 12px 0",
        }}>
          <p style={{
            fontFamily: FONT_BODY, fontSize: "1.1rem", lineHeight: 1.7,
            color: "var(--ink)", margin: 0, fontStyle: "italic",
          }}>
            {data.highlight}
          </p>
        </div>
      )}
    </Reveal>
  );
}

/* - Problem Section - */
function ProblemSection({ data }: { data: Record<string, unknown> }) {
  const stats = data.stats as { label: string; value: string; source?: string }[] | undefined;
  const text = (data.statement || data.text) as string | undefined;
  const question = data.question as string | undefined;
  const title = (data.title as string) || "The Problem";
  return (
    <Reveal>
      <SectionLabel text={title} />
      {text && (
      <p style={{
        fontFamily: FONT_BODY, fontSize: "1.2rem", lineHeight: 1.8,
        color: "var(--ink-2)", margin: "0 0 20px",
      }}>
        {text}
      </p>
      )}

      {stats && stats.length > 0 && (
      <div style={{
        display: "grid", gridTemplateColumns: `repeat(${Math.min(stats.length, 3)}, 1fr)`, gap: 14,
        marginBottom: 24,
      }}>
        {stats.map((s, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div style={{
              background: "var(--bg-2)", borderRadius: 16, padding: "20px 18px",
              border: "1.5px solid var(--bg-3)", textAlign: "center",
            }}>
              <div style={{
                fontFamily: FONT_HEAD, fontWeight: 800, fontSize: "1.8rem",
                color: "var(--pink)", marginBottom: 6,
              }}>
                {s.value}
              </div>
              <div style={{
                fontFamily: FONT_BODY, fontSize: "0.9rem", color: "var(--ink-2)",
                lineHeight: 1.4,
              }}>
                {s.label}
              </div>
              {s.source && (
              <div style={{
                fontFamily: FONT_MONO, fontSize: "0.6rem", color: "var(--ink-2)",
                opacity: 0.5, marginTop: 6,
              }}>
                {s.source}
              </div>
              )}
            </div>
          </Reveal>
        ))}
      </div>
      )}

      {question && (
      <div style={{
        background: "linear-gradient(135deg, rgba(214,68,121,0.06), rgba(214,68,121,0.02))",
        borderRadius: 16, padding: "20px 24px",
        border: "1.5px dashed rgba(214,68,121,0.3)",
      }}>
        <span style={{
          fontFamily: FONT_MONO, fontSize: "0.65rem", color: "var(--pink)",
          letterSpacing: 2, display: "block", marginBottom: 8,
        }}>
          RESEARCH QUESTION
        </span>
        <p style={{
          fontFamily: FONT_HEAD, fontWeight: 700, fontSize: "1.15rem",
          color: "var(--ink)", margin: 0, lineHeight: 1.5, fontStyle: "italic",
        }}>
          {question}
        </p>
      </div>
      )}
    </Reveal>
  );
}

/* - Process Timeline - */
function ProcessSection({ data }: { data: Record<string, unknown> }) {
  const phases = data.phases as {
    id: string; label: string; title: string; desc: string;
    methods: string[]; icon: string;
  }[];
  const [active, setActive] = useState(0);

  return (
    <Reveal>
      <SectionLabel text="Research Process" />

      {/* Timeline dots */}
      <div style={{
        display: "flex", alignItems: "center", gap: 0,
        marginBottom: 28, position: "relative", padding: "0 8px",
      }}>
        {phases.map((ph, i) => (
          <div key={ph.id} style={{ flex: 1, display: "flex", alignItems: "center", flexDirection: "column" }}>
            <button
              onClick={() => setActive(i)}
              style={{
                width: 40, height: 40, borderRadius: "50%",
                border: i === active ? "3px solid var(--pink)" : "2px solid var(--bg-3)",
                background: i === active ? "var(--pink)" : i < active ? "var(--green)" : "var(--bg-2)",
                color: i <= active ? "white" : "var(--ink-2)",
                fontFamily: FONT_HEAD, fontWeight: 700, fontSize: "1rem",
                cursor: "pointer", position: "relative", zIndex: 2,
                transition: "all 0.3s",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              {ph.icon}
            </button>
            <span style={{
              fontFamily: FONT_MONO, fontSize: "0.55rem", color: i === active ? "var(--pink)" : "var(--ink-2)",
              marginTop: 6, textAlign: "center", letterSpacing: 1, opacity: i === active ? 1 : 0.6,
              transition: "all 0.3s",
            }}>
              {ph.label}
            </span>
            {/* Connector line */}
            {i < phases.length - 1 && (
              <div style={{
                position: "absolute", top: 19, left: `calc(${((i + 0.5) / phases.length) * 100}% + 20px)`,
                width: `calc(${(1 / phases.length) * 100}% - 40px)`,
                height: 2,
                background: i < active ? "var(--green)" : "var(--bg-3)",
                zIndex: 1,
              }} />
            )}
          </div>
        ))}
      </div>

      {/* Active phase detail */}
      <motion.div
        key={active}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: "var(--bg-2)", borderRadius: 18, padding: "24px 28px",
          border: "1.5px solid var(--bg-3)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <span style={{ fontSize: "1.6rem" }}>{phases[active].icon}</span>
          <div>
            <div style={{
              fontFamily: FONT_MONO, fontSize: "0.6rem", color: "var(--pink)",
              letterSpacing: 2, marginBottom: 2,
            }}>
              PHASE {active + 1} OF {phases.length}
            </div>
            <h3 style={{
              fontFamily: FONT_HEAD, fontWeight: 800, fontSize: "1.3rem",
              color: "var(--ink)", margin: 0,
            }}>
              {phases[active].title}
            </h3>
          </div>
        </div>
        <p style={{
          fontFamily: FONT_BODY, fontSize: "1.05rem", lineHeight: 1.7,
          color: "var(--ink-2)", margin: "0 0 16px",
        }}>
          {phases[active].desc}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {phases[active].methods.map(m => (
            <span key={m} style={{
              fontFamily: FONT_HEAD, fontWeight: 600, fontSize: "0.75rem",
              padding: "5px 14px", borderRadius: 20,
              background: "rgba(104,123,61,0.1)", color: "var(--green)",
            }}>
              {m}
            </span>
          ))}
        </div>
      </motion.div>
    </Reveal>
  );
}

/* - Methodology Section - */
function MethodologySection({ data }: { data: Record<string, unknown> }) {
  /* Simple text-only methodology */
  if (data.text && !data.participants) {
    return (
      <Reveal>
        <SectionLabel text={(data.title as string) || "Methodology"} />
        <div style={{
          background: "var(--bg-2)", borderRadius: 16, padding: "20px 22px",
          border: "1.5px solid var(--bg-3)",
        }}>
          <p style={{
            fontFamily: FONT_BODY, fontSize: "1rem", color: "var(--ink-2)",
            lineHeight: 1.7, margin: 0,
          }}>
            {data.text as string}
          </p>
        </div>
      </Reveal>
    );
  }

  const participants = data.participants as { count: number; profile: string };
  const procedure = data.procedure as string[];
  const measures = data.measures as { name: string; type: string; format: string }[];

  return (
    <Reveal>
      <SectionLabel text="Methodology" />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
        {/* Design card */}
        <div style={{
          background: "var(--bg-2)", borderRadius: 16, padding: "20px 22px",
          border: "1.5px solid var(--bg-3)",
        }}>
          <span style={{ fontFamily: FONT_MONO, fontSize: "0.6rem", color: "var(--green)", letterSpacing: 2 }}>
            DESIGN
          </span>
          <p style={{
            fontFamily: FONT_BODY, fontSize: "1rem", color: "var(--ink)",
            lineHeight: 1.6, margin: "8px 0 0",
          }}>
            {data.design as string}
          </p>
        </div>

        {/* Participants card */}
        <div style={{
          background: "var(--bg-2)", borderRadius: 16, padding: "20px 22px",
          border: "1.5px solid var(--bg-3)",
        }}>
          <span style={{ fontFamily: FONT_MONO, fontSize: "0.6rem", color: "var(--pink)", letterSpacing: 2 }}>
            PARTICIPANTS
          </span>
          <div style={{
            fontFamily: FONT_HEAD, fontWeight: 800, fontSize: "2.4rem",
            color: "var(--pink)", margin: "4px 0",
          }}>
            {participants.count}
          </div>
          <p style={{
            fontFamily: FONT_BODY, fontSize: "0.9rem", color: "var(--ink-2)",
            lineHeight: 1.5, margin: 0,
          }}>
            {participants.profile}
          </p>
        </div>
      </div>

      {/* Procedure steps */}
      <div style={{
        background: "var(--bg-2)", borderRadius: 16, padding: "20px 22px",
        border: "1.5px solid var(--bg-3)", marginBottom: 20,
      }}>
        <span style={{ fontFamily: FONT_MONO, fontSize: "0.6rem", color: "var(--amber)", letterSpacing: 2 }}>
          PROCEDURE
        </span>
        <div style={{ marginTop: 12 }}>
          {procedure.map((step, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div style={{
                display: "flex", gap: 12, alignItems: "flex-start",
                marginBottom: i < procedure.length - 1 ? 10 : 0,
              }}>
                <div style={{
                  width: 24, height: 24, borderRadius: "50%", flexShrink: 0,
                  background: "var(--amber)", color: "white",
                  fontFamily: FONT_HEAD, fontWeight: 700, fontSize: "0.7rem",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {i + 1}
                </div>
                <span style={{
                  fontFamily: FONT_BODY, fontSize: "0.95rem", color: "var(--ink-2)",
                  lineHeight: 1.5, paddingTop: 2,
                }}>
                  {step}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Measures table */}
      <div style={{
        background: "var(--bg-2)", borderRadius: 16, padding: "20px 22px",
        border: "1.5px solid var(--bg-3)", overflow: "hidden",
      }}>
        <span style={{ fontFamily: FONT_MONO, fontSize: "0.6rem", color: "var(--blue,#7596c8)", letterSpacing: 2 }}>
          MEASURES
        </span>
        <div style={{ marginTop: 12 }}>
          {measures.map((m, i) => (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "8px 0",
              borderBottom: i < measures.length - 1 ? "1px solid var(--bg-3)" : "none",
            }}>
              <span style={{ fontFamily: FONT_HEAD, fontWeight: 600, fontSize: "0.85rem", color: "var(--ink)" }}>
                {m.name}
              </span>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{
                  fontFamily: FONT_MONO, fontSize: "0.55rem", padding: "3px 10px",
                  borderRadius: 8, background: m.type === "Quantitative" ? "rgba(117,150,200,0.12)" : m.type === "Qualitative" ? "rgba(104,123,61,0.12)" : "rgba(253,186,47,0.12)",
                  color: m.type === "Quantitative" ? "#7596c8" : m.type === "Qualitative" ? "var(--green)" : "var(--amber)",
                }}>
                  {m.type}
                </span>
                <span style={{
                  fontFamily: FONT_BODY, fontSize: "0.8rem", color: "var(--ink-2)",
                }}>
                  {m.format}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

/* - Metrics / Bar Chart Section - */
function MetricsSection({ data }: { data: Record<string, unknown> }) {
  const bars = data.bars as { label: string; individual: number; group?: number; color: string; inverted?: boolean }[] | undefined;
  const items = data.items as { label: string; value: string }[] | undefined;
  const anova = data.anova as Record<string, { f: string; p: string; significant: boolean; eta?: string }> | undefined;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  /* Simple key-value metrics layout */
  if (!bars && items) {
    return (
      <Reveal>
        <SectionLabel text={(data.title as string) || "Findings"} />
        <div ref={ref} style={{
          background: "var(--bg-2)", borderRadius: 18, padding: "20px 24px",
          border: "1.5px solid var(--bg-3)",
        }}>
          {items.map((item, i) => (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "12px 0",
              borderBottom: i < items.length - 1 ? "1px solid var(--bg-3)" : "none",
            }}>
              <span style={{
                fontFamily: FONT_BODY, fontSize: "0.9rem", color: "var(--ink-2)",
                flex: 1, paddingRight: 16,
              }}>
                {item.label}
              </span>
              <span style={{
                fontFamily: FONT_HEAD, fontWeight: 700, fontSize: "0.95rem",
                color: "var(--green)", whiteSpace: "nowrap",
              }}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    );
  }

  if (!bars) return null;

  return (
    <Reveal>
      <SectionLabel text="Findings" />
      <h3 style={{
        fontFamily: FONT_HEAD, fontWeight: 800, fontSize: "1.4rem",
        color: "var(--ink)", margin: "0 0 4px",
      }}>
        {data.title as string}
      </h3>
      <p style={{
        fontFamily: FONT_BODY, fontSize: "0.9rem", color: "var(--ink-2)",
        margin: "0 0 20px",
      }}>
        {data.subtitle as string}
      </p>

      <div ref={ref} style={{
        background: "var(--bg-2)", borderRadius: 18, padding: "24px 28px",
        border: "1.5px solid var(--bg-3)", marginBottom: 16,
      }}>
        {bars.map((bar, i) => {
          const hasGroup = bar.group !== undefined;
          return (
            <div key={i} style={{ marginBottom: i < bars.length - 1 ? 18 : 0 }}>
              <div style={{
                fontFamily: FONT_HEAD, fontWeight: 600, fontSize: "0.8rem",
                color: "var(--ink-2)", marginBottom: 6,
              }}>
                {bar.label}
                {bar.inverted && (
                  <span style={{ fontSize: "0.65rem", opacity: 0.5, marginLeft: 6 }}>(lower is better)</span>
                )}
              </div>

              {/* Individual bar */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: hasGroup ? 4 : 0 }}>
                {hasGroup && (
                  <span style={{ fontFamily: FONT_MONO, fontSize: "0.5rem", width: 50, color: "var(--ink-2)" }}>
                    INDIV.
                  </span>
                )}
                <div style={{
                  flex: 1, height: 22, background: "var(--bg-3)", borderRadius: 11,
                  overflow: "hidden", position: "relative",
                }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${(bar.individual / 10) * 100}%` } : {}}
                    transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                    style={{
                      height: "100%", borderRadius: 11,
                      background: bar.color,
                    }}
                  />
                </div>
                <span style={{
                  fontFamily: FONT_HEAD, fontWeight: 700, fontSize: "0.85rem",
                  color: bar.color, minWidth: 28, textAlign: "right",
                }}>
                  {bar.individual}
                </span>
              </div>

              {/* Group bar */}
              {hasGroup && (
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontFamily: FONT_MONO, fontSize: "0.5rem", width: 50, color: "var(--ink-2)" }}>
                    GROUP
                  </span>
                  <div style={{
                    flex: 1, height: 22, background: "var(--bg-3)", borderRadius: 11,
                    overflow: "hidden",
                  }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${((bar.group ?? 0) / 10) * 100}%` } : {}}
                      transition={{ duration: 0.8, delay: i * 0.1 + 0.15, ease: "easeOut" }}
                      style={{
                        height: "100%", borderRadius: 11,
                        background: bar.color, opacity: 0.55,
                      }}
                    />
                  </div>
                  <span style={{
                    fontFamily: FONT_HEAD, fontWeight: 700, fontSize: "0.85rem",
                    color: bar.color, opacity: 0.7, minWidth: 28, textAlign: "right",
                  }}>
                    {bar.group}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ANOVA results */}
      {anova != null && (
        <Reveal delay={0.2}>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10,
            marginBottom: 16,
          }}>
            {Object.entries(anova).map(([key, val]) => (
              <div key={key} style={{
                background: val.significant ? "rgba(104,123,61,0.08)" : "var(--bg-2)",
                borderRadius: 12, padding: "12px 14px",
                border: `1.5px solid ${val.significant ? "rgba(104,123,61,0.2)" : "var(--bg-3)"}`,
                textAlign: "center",
              }}>
                <div style={{
                  fontFamily: FONT_MONO, fontSize: "0.5rem", color: "var(--ink-2)",
                  letterSpacing: 1, marginBottom: 4, textTransform: "uppercase",
                }}>
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </div>
                <div style={{
                  fontFamily: FONT_HEAD, fontWeight: 700, fontSize: "0.8rem",
                  color: val.significant ? "var(--green)" : "var(--ink-2)",
                }}>
                  p = {val.p}
                </div>
                <div style={{
                  fontFamily: FONT_BODY, fontSize: "0.7rem", color: "var(--ink-2)",
                  opacity: 0.7, marginTop: 2,
                }}>
                  {val.significant ? "Significant" : "Not significant"}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      )}

      {/* Insight */}
      {typeof data.insight === "string" && (
        <div style={{
          background: "linear-gradient(135deg, rgba(253,186,47,0.08), rgba(253,186,47,0.02))",
          borderLeft: "4px solid var(--amber)", padding: "14px 18px",
          borderRadius: "0 12px 12px 0",
        }}>
          <p style={{
            fontFamily: FONT_BODY, fontSize: "1rem", lineHeight: 1.6,
            color: "var(--ink)", margin: 0, fontStyle: "italic",
          }}>
            {data.insight as string}
          </p>
        </div>
      )}
    </Reveal>
  );
}

/* - Quotes Section - */
function QuotesSection({ data }: { data: Record<string, unknown> }) {
  const themes = data.themes as {
    theme: string;
    quotes: { text: string; source: string; tag: string }[];
  }[];

  return (
    <Reveal>
      <SectionLabel text={data.title as string || "Participant Voices"} />
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {themes.map((theme, ti) => (
          <Reveal key={ti} delay={ti * 0.1}>
            <div>
              <h4 style={{
                fontFamily: FONT_HEAD, fontWeight: 700, fontSize: "1rem",
                color: "var(--ink)", margin: "0 0 12px",
              }}>
                {theme.theme}
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {theme.quotes.map((q, qi) => (
                  <div key={qi} style={{
                    background: "var(--bg-2)", borderRadius: 14, padding: "16px 20px",
                    borderLeft: "4px solid var(--pink)", position: "relative",
                  }}>
                    <p style={{
                      fontFamily: FONT_BODY, fontSize: "1rem", lineHeight: 1.6,
                      color: "var(--ink)", margin: "0 0 8px", fontStyle: "italic",
                    }}>
                      &ldquo;{q.text}&rdquo;
                    </p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{
                        fontFamily: FONT_MONO, fontSize: "0.6rem", color: "var(--ink-2)",
                      }}>
                        - {q.source}
                      </span>
                      <span style={{
                        fontFamily: FONT_HEAD, fontWeight: 600, fontSize: "0.65rem",
                        padding: "3px 10px", borderRadius: 8,
                        background: "rgba(214,68,121,0.08)", color: "var(--pink)",
                      }}>
                        {q.tag}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Reveal>
  );
}

/* - Callout Section (Key Themes) - */
function CalloutSection({ data }: { data: Record<string, unknown> }) {
  const rawItems = data.items as ({ label: string; desc: string } | string)[];
  return (
    <Reveal>
      <SectionLabel text={data.title as string} />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {rawItems.map((item, i) => {
          const isString = typeof item === "string";
          const label = isString ? null : item.label;
          const desc = isString ? item : item.desc;
          return (
          <Reveal key={i} delay={i * 0.08}>
            <div style={{
              display: "flex", gap: 14, alignItems: "flex-start",
              background: "var(--bg-2)", borderRadius: 14, padding: "16px 20px",
              border: "1.5px solid var(--bg-3)",
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: 10, flexShrink: 0,
                background: "var(--green)", color: "white",
                fontFamily: FONT_HEAD, fontWeight: 700, fontSize: "0.8rem",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {i + 1}
              </div>
              <div>
                {label && (
                <div style={{
                  fontFamily: FONT_HEAD, fontWeight: 700, fontSize: "0.95rem",
                  color: "var(--ink)", marginBottom: 4,
                }}>
                  {label}
                </div>
                )}
                <div style={{
                  fontFamily: FONT_BODY, fontSize: "0.9rem", color: isString ? "var(--ink)" : "var(--ink-2)",
                  lineHeight: 1.5,
                }}>
                  {desc}
                </div>
              </div>
            </div>
          </Reveal>
          );
        })}
      </div>
    </Reveal>
  );
}

/* - Iterations Section - */
function IterationsSection({ data }: { data: Record<string, unknown> }) {
  const stages = data.stages as { stage: string; desc: string; label: string }[];

  return (
    <Reveal>
      <SectionLabel text={data.title as string || "Design Evolution"} />
      <div style={{ position: "relative", paddingLeft: 28 }}>
        {/* Vertical line */}
        <div style={{
          position: "absolute", left: 11, top: 8, bottom: 8,
          width: 2, background: "var(--bg-3)",
        }} />

        {stages.map((s, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div style={{ marginBottom: i < stages.length - 1 ? 24 : 0, position: "relative" }}>
              {/* Dot on timeline */}
              <div style={{
                position: "absolute", left: -22, top: 6,
                width: 14, height: 14, borderRadius: "50%",
                background: "var(--pink)", border: "3px solid var(--bg)",
                zIndex: 2,
              }} />

              <span style={{
                fontFamily: FONT_MONO, fontSize: "0.55rem", letterSpacing: 2,
                color: "var(--pink)", display: "block", marginBottom: 4,
              }}>
                {s.label.toUpperCase()}
              </span>
              <h4 style={{
                fontFamily: FONT_HEAD, fontWeight: 700, fontSize: "1.05rem",
                color: "var(--ink)", margin: "0 0 6px",
              }}>
                {s.stage}
              </h4>
              <p style={{
                fontFamily: FONT_BODY, fontSize: "0.95rem", color: "var(--ink-2)",
                lineHeight: 1.6, margin: 0,
              }}>
                {s.desc}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Reveal>
  );
}

/* - Impact Section - */
function ImpactSection({ data }: { data: Record<string, unknown> }) {
  const takeaways = data.takeaways as { insight: string; detail: string }[];
  const skills = data.skills as string[];

  return (
    <Reveal>
      <SectionLabel text="What I Learned" />
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 24 }}>
        {takeaways.map((t, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div style={{
              background: "var(--bg-2)", borderRadius: 14, padding: "18px 22px",
              border: "1.5px solid var(--bg-3)",
            }}>
              <h4 style={{
                fontFamily: FONT_HEAD, fontWeight: 700, fontSize: "1rem",
                color: "var(--green)", margin: "0 0 6px",
              }}>
                {t.insight}
              </h4>
              <p style={{
                fontFamily: FONT_BODY, fontSize: "0.9rem", color: "var(--ink-2)",
                lineHeight: 1.6, margin: 0,
              }}>
                {t.detail}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <div style={{
        background: "linear-gradient(135deg, rgba(104,123,61,0.06), rgba(104,123,61,0.02))",
        borderRadius: 16, padding: "18px 22px",
      }}>
        <span style={{
          fontFamily: FONT_MONO, fontSize: "0.6rem", color: "var(--green)",
          letterSpacing: 2, display: "block", marginBottom: 10,
        }}>
          SKILLS DEVELOPED
        </span>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {skills.map(s => (
            <span key={s} style={{
              fontFamily: FONT_HEAD, fontWeight: 600, fontSize: "0.8rem",
              padding: "6px 16px", borderRadius: 20,
              background: "var(--green)", color: "white",
            }}>
              {s}
            </span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

/* - Gallery Section - */
function GallerySection({ data }: { data: Record<string, unknown> }) {
  const images = data.images as { src: string; caption: string; alt?: string }[];
  const cols = (data.columns as number) || 2;

  return (
    <Reveal>
      {typeof data.title === "string" && <SectionLabel text={data.title} />}
      <div style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: 16,
      }}>
        {images.map((img, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div style={{
              background: "var(--bg-2)", borderRadius: 16,
              border: "1.5px solid var(--bg-3)", overflow: "hidden",
            }}>
              <div style={{
                width: "100%", aspectRatio: "16/10", overflow: "hidden",
                background: "#0c0a1a",
              }}>
                <img
                  src={img.src}
                  alt={img.alt || img.caption}
                  style={{
                    width: "100%", height: "100%", objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
              <div style={{
                padding: "12px 16px",
              }}>
                <p style={{
                  fontFamily: FONT_BODY, fontSize: "0.85rem", color: "var(--ink-2)",
                  lineHeight: 1.5, margin: 0,
                }}>
                  {img.caption}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Reveal>
  );
}

/* - Links Section - */
function LinksSection({ data }: { data: Record<string, unknown> }) {
  const items = data.items as { label: string; url: string; icon: string }[];
  return (
    <Reveal>
      <SectionLabel text="Explore" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
        {items.map((item, i) => (
          <motion.a
            key={i}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -3, boxShadow: "0 8px 24px rgba(214,68,121,0.15)" }}
            style={{
              display: "flex", alignItems: "center", gap: 12,
              background: "var(--bg-2)", borderRadius: 14, padding: "16px 20px",
              border: "1.5px solid var(--bg-3)", textDecoration: "none",
              transition: "border-color 0.3s",
            }}
          >
            <span style={{ fontSize: "1.4rem" }}>{item.icon}</span>
            <span style={{
              fontFamily: FONT_HEAD, fontWeight: 700, fontSize: "0.95rem",
              color: "var(--ink)",
            }}>
              {item.label}
            </span>
            <span style={{
              marginLeft: "auto", fontFamily: FONT_HEAD, color: "var(--pink)",
              fontWeight: 700,
            }}>
              &rarr;
            </span>
          </motion.a>
        ))}
      </div>
    </Reveal>
  );
}

/* ═══════════════════════════════════════════
   Section router
   ═══════════════════════════════════════════ */
function RenderSection({ section }: { section: StorySection }) {
  switch (section.type) {
    case "overview": return <OverviewSection data={section.data} />;
    case "problem": return <ProblemSection data={section.data} />;
    case "process": return <ProcessSection data={section.data} />;
    case "methodology": return <MethodologySection data={section.data} />;
    case "metrics": return <MetricsSection data={section.data} />;
    case "quotes": return <QuotesSection data={section.data} />;
    case "callout": return <CalloutSection data={section.data} />;
    case "gallery": return <GallerySection data={section.data} />;
    case "iterations": return <IterationsSection data={section.data} />;
    case "impact": return <ImpactSection data={section.data} />;
    case "links": return <LinksSection data={section.data} />;
    default: return null;
  }
}

/* ═══════════════════════════════════════════
   SECTION NAV (sticky sidebar labels)
   ═══════════════════════════════════════════ */
const NAV_LABELS: Record<string, string> = {
  overview: "Overview",
  problem: "Problem",
  process: "Process",
  methodology: "Methods",
  metrics: "Findings",
  quotes: "Voices",
  callout: "Themes",
  gallery: "App Preview",
  iterations: "Evolution",
  impact: "Learnings",
  links: "Explore",
};

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */
export default function ProjectDetail({
  project,
  thumbSrc,
  onBack,
}: {
  project: Project;
  thumbSrc: string;
  onBack: () => void;
}) {
  const story = PROJECT_STORIES[project.id];
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeNav, setActiveNav] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track which section is in view for nav highlighting
  useEffect(() => {
    if (!story) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sectionRefs.current.indexOf(entry.target as HTMLDivElement);
            if (idx >= 0) setActiveNav(idx);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [story]);

  /* ── Fallback: no story data → simple detail view ── */
  if (!story) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div style={{
          position: "sticky", top: 0, zIndex: 20,
          background: "linear-gradient(to bottom, var(--bg) 60%, transparent)",
          paddingTop: 4, paddingBottom: 12, marginBottom: 4,
        }}>
          <button onClick={onBack} style={{
            fontFamily: FONT_HEAD, fontWeight: 700, fontSize: "0.95rem",
            color: "var(--pink)", background: "rgba(255,255,255,0.85)",
            backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
            border: "1.5px solid var(--bg-3)", borderRadius: 20,
            cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
            padding: "6px 16px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}>
            &larr; back to projects
          </button>
        </div>
        <div style={{
          width: "100%", height: 220, borderRadius: 20,
          background: "var(--bg-3)", overflow: "hidden", marginBottom: 24,
        }}>
          <img src={thumbSrc} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
          {project.tags.map(t => (
            <span key={t} style={{
              fontFamily: FONT_HEAD, fontWeight: 700, fontSize: "1.1rem",
              padding: "8px 20px", borderRadius: 24,
              background: TAG_COLORS[t], color: "white",
            }}>{t}</span>
          ))}
        </div>
        <h2 style={{
          fontFamily: FONT_HEAD, fontWeight: 800, fontSize: "2.2rem",
          color: "var(--ink)", lineHeight: 1.2, marginBottom: 8,
        }}>{project.title}</h2>
        <p style={{
          fontFamily: FONT_BODY, fontSize: "1.2rem", lineHeight: 1.8,
          color: "var(--ink-2)", marginBottom: 16,
        }}>{project.desc}</p>
        <div style={{
          background: "linear-gradient(135deg, var(--peach), rgba(253,186,47,0.12))",
          padding: "18px 22px", borderRadius: 14, borderLeft: "5px solid var(--amber)",
        }}>
          <span style={{ fontFamily: FONT_MONO, fontSize: "0.8rem", color: "var(--amber)", letterSpacing: 2 }}>KEY FINDING</span>
          <p style={{
            fontFamily: FONT_BODY, fontStyle: "italic", fontSize: "1.15rem",
            color: "var(--ink)", lineHeight: 1.6, margin: "8px 0 0",
          }}>&ldquo;{project.finding}&rdquo;</p>
        </div>
      </motion.div>
    );
  }

  /* ── Rich story view ── */
  // Build nav items from sections (deduplicate by type)
  const navItems: { label: string; idx: number }[] = [];
  const seenTypes = new Set<string>();
  story.sections.forEach((s, i) => {
    const label = NAV_LABELS[s.type];
    if (label && !seenTypes.has(s.type)) {
      navItems.push({ label, idx: i });
      seenTypes.add(s.type);
    }
  });

  const scrollToSection = (idx: number) => {
    sectionRefs.current[idx]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Sticky back button */}
      <div style={{
        position: "sticky", top: 0, zIndex: 20,
        background: "linear-gradient(to bottom, var(--bg) 60%, transparent)",
        paddingTop: 4, paddingBottom: 12, marginBottom: 4,
      }}>
        <button onClick={onBack} style={{
          fontFamily: FONT_HEAD, fontWeight: 700, fontSize: "0.95rem",
          color: "var(--pink)", background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
          border: "1.5px solid var(--bg-3)", borderRadius: 20,
          cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
          padding: "6px 16px", transition: "transform 0.15s, box-shadow 0.15s",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.03)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)"; }}
        >
          &larr; back to projects
        </button>
      </div>

      {/* ── HERO ── */}
      <Reveal>
        <div style={{
          width: "100%", height: 200, borderRadius: 20,
          background: "var(--bg-3)", overflow: "hidden", marginBottom: 20,
          position: "relative",
        }}>
          <img
            src={thumbSrc} alt={project.title} draggable={false}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)",
          }} />
        </div>
      </Reveal>

      {/* Tags row */}
      <Reveal delay={0.05}>
        <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
          {project.tags.map(t => (
            <span key={t} style={{
              fontFamily: FONT_HEAD, fontWeight: 700, fontSize: "0.8rem",
              padding: "5px 16px", borderRadius: 20,
              background: TAG_COLORS[t], color: "white",
            }}>{t}</span>
          ))}
        </div>
      </Reveal>

      {/* Title + meta */}
      <Reveal delay={0.1}>
        <h1 style={{
          fontFamily: FONT_HEAD, fontWeight: 800, fontSize: "2rem",
          color: "var(--ink)", lineHeight: 1.15, margin: "0 0 6px",
        }}>
          {project.title}
        </h1>
        <p style={{
          fontFamily: FONT_BODY, fontStyle: "italic", fontSize: "1.1rem",
          color: "var(--pink)", margin: "0 0 14px", lineHeight: 1.4,
        }}>
          {story.subtitle}
        </p>

        {/* Meta chips */}
        <div style={{
          display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 6,
        }}>
          {[
            { label: "Role", value: story.role },
            { label: "Duration", value: story.duration },
            { label: "Team", value: story.team },
          ].map(m => (
            <div key={m.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{
                fontFamily: FONT_MONO, fontSize: "0.55rem", color: "var(--ink-2)",
                letterSpacing: 1,
              }}>
                {m.label}:
              </span>
              <span style={{
                fontFamily: FONT_HEAD, fontWeight: 600, fontSize: "0.8rem",
                color: "var(--ink)",
              }}>
                {m.value}
              </span>
            </div>
          ))}
        </div>

        {/* Tools */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 24 }}>
          {story.tools.map(t => (
            <span key={t} style={{
              fontFamily: FONT_HEAD, fontWeight: 600, fontSize: "0.7rem",
              padding: "4px 12px", borderRadius: 14,
              background: "var(--bg-3)", color: "var(--ink-2)",
            }}>
              {t}
            </span>
          ))}
        </div>
      </Reveal>

      {/* ── Section navigation pills ── */}
      <Reveal delay={0.15}>
        <div style={{
          display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 32,
          padding: "12px 16px", background: "var(--bg-2)", borderRadius: 14,
          border: "1.5px solid var(--bg-3)",
        }}>
          {navItems.map((item) => {
            const isActive = activeNav >= item.idx &&
              (navItems.find(n => n.idx > item.idx) === undefined || activeNav < (navItems.find(n => n.idx > item.idx)?.idx ?? Infinity));
            return (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.idx)}
                style={{
                  fontFamily: FONT_HEAD, fontWeight: 600, fontSize: "0.75rem",
                  padding: "5px 14px", borderRadius: 12, cursor: "pointer",
                  border: "none",
                  background: isActive ? "var(--pink)" : "transparent",
                  color: isActive ? "white" : "var(--ink-2)",
                  transition: "all 0.2s",
                }}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* ── SECTIONS ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
        {story.sections.map((section, i) => (
          <div
            key={i}
            ref={(el) => { sectionRefs.current[i] = el; }}
          >
            <RenderSection section={section} />
          </div>
        ))}
      </div>

      {/* ── LIVE APP CTA ── */}
      {story.liveUrl && (
        <Reveal>
          <div style={{
            marginTop: 40, textAlign: "center", padding: "32px 24px",
            background: "linear-gradient(135deg, rgba(214,68,121,0.06), rgba(104,123,61,0.06))",
            borderRadius: 20,
          }}>
            <p style={{
              fontFamily: FONT_BODY, fontSize: "1.1rem", color: "var(--ink-2)",
              margin: "0 0 16px",
            }}>
              See the final product in action
            </p>
            <motion.a
              href={story.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-block",
                fontFamily: FONT_HEAD, fontWeight: 700, fontSize: "1.1rem",
                color: "white", padding: "14px 36px", borderRadius: 24,
                background: "var(--pink)", textDecoration: "none",
                boxShadow: "0 6px 20px rgba(214,68,121,0.3)",
              }}
            >
              Launch Wrapped &rarr;
            </motion.a>
          </div>
        </Reveal>
      )}
    </motion.div>
  );
}
