"use client";
import { useState, useEffect, useRef } from "react";
import { PROJECTS, SKILL_CARDS, FUN_FACTS } from "@/data/projects";

export default function Terminal({ onNavigate }: { onNavigate: (id: string) => void }) {
  const [history, setHistory] = useState<{ t: string; v: string }[]>([{
    t: "s",
    v: "\ud83d\udda5 nailaOS v1.0  - Welcome to Naila's Desk!\n\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\n\nHow would you like to explore?\n\n  1 \u2192 \ud83d\ude80 GO     Open sections visually\n  2 \u2192 \ud83d\udcd6 READ   Get text-only content here\n\nType 1 or 2 to pick a mode."
  }]);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"pick" | "go" | "read">("pick");
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => { if (history.length > 1) endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [history]);

  const push = (cmd: string, out: string) =>
    setHistory(h => [...h, { t: "c", v: cmd }, { t: "o", v: out }]);

  const exec = () => {
    const raw = input.trim();
    const c = raw.toLowerCase();
    if (!c) return;
    setInput("");

    if (mode === "pick") {
      if (c === "1" || c === "go") {
        setMode("go");
        push(raw,
          "\ud83d\ude80 GO MODE  - Type a section name to open it.\n\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\n\n  about     \u2192 My photo frame\n  projects  \u2192 Research journal\n  cards     \u2192 Skill card packs\n  contact   \u2192 Get in touch\n  gallery   \u2192 Photo gallery\n\nType 'switch' to change mode \u00b7 'clear' to reset"
        );
      } else if (c === "2" || c === "read") {
        setMode("read");
        push(raw,
          "\ud83d\udcd6 READ MODE  - Everything as text, right here.\n\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\n\n  about       \u2192 Who I am\n  projects    \u2192 All 14 research projects\n  project [#] \u2192 View one project (1-14)\n  skills      \u2192 My technical skills\n  contact     \u2192 Contact info\n  music       \u2192 What I listen to\n  funfact     \u2192 Random fun fact\n\nType 'switch' to change mode \u00b7 'clear' to reset"
        );
      } else {
        push(raw, "\u2753 Type 1 for GO (visual) or 2 for READ (text-only).");
      }
      return;
    }

    if (c === "clear") {
      setMode("pick");
      setHistory([{ t: "s", v: "\ud83e\uddf9 Cleared!\n\nType 1 for GO or 2 for READ." }]);
      return;
    }
    if (c === "switch" || c === "mode") {
      setMode("pick");
      push(raw, "\ud83d\udd04 Switching mode...\n\nType 1 for GO or 2 for READ.");
      return;
    }
    if (c === "help") {
      if (mode === "go") {
        push(raw, "\ud83d\ude80 GO MODE COMMANDS\n\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\n  about \u00b7 projects \u00b7 cards\n  contact \u00b7 gallery\n\n  switch \u2192 Change mode\n  clear  \u2192 Reset terminal");
      } else {
        push(raw, "\ud83d\udcd6 READ MODE COMMANDS\n\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\n  about \u00b7 projects \u00b7 project [#]\n  skills \u00b7 contact \u00b7 music\n  funfact\n\n  switch \u2192 Change mode\n  clear  \u2192 Reset terminal");
      }
      return;
    }

    if (mode === "go") {
      const navMap: Record<string, { label: string; id: string }> = {
        about:    { label: "photo frame", id: "about" },
        projects: { label: "research journal", id: "projects" },
        research: { label: "research journal", id: "projects" },
        cards:    { label: "card packs", id: "cards" },
        contact:  { label: "contact panel", id: "contact" },
        gallery:  { label: "gallery", id: "gallery" },
      };
      if (navMap[c]) {
        const n = navMap[c];
        push(raw, `Opening ${n.label}...`);
        setTimeout(() => onNavigate(n.id), 400);
      } else {
        push(raw, "\u2753 Unknown section.\nAvailable: about \u00b7 projects \u00b7 cards \u00b7 contact \u00b7 gallery\nOr type 'switch' to try READ mode.");
      }
      return;
    }

    if (c === "about") {
      push(raw, "ABOUT ME\n\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\n\nNoor Naila Imtinan Himam\nResearcher\n\nI design with empathy and evidence.\n5+ years in research, 3+ years in UX.\n\n5+ Yrs Research \u00b7 3+ Yrs UX\n14 Projects \u00b7 50+ Designs\n\nnoornaila04@gmail.com\n\n\"If you want to understand,\n you stand under.\"");
    }
    else if (c === "projects") {
      const list = PROJECTS.map(p =>
        `  #${String(p.id).padStart(2, "0")}  ${p.title}\n       ${p.field}`
      ).join("\n\n");
      push(raw, "ALL PROJECTS (1-14)\n\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\n\n" + list + "\n\nType 'project [#]' to read more.");
    }
    else if (c.startsWith("project ")) {
      const p = PROJECTS.find(x => x.id === parseInt(c.split(" ")[1]));
      if (p) {
        push(raw, `#${String(p.id).padStart(2, "0")} ${p.title}\n\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\n\n${p.field}\n${p.tags.join(" \u00b7 ")}\n\n${p.desc}\n\nSkills: ${p.skills.join(" \u00b7 ")}\n\n"${p.finding}"`);
      } else {
        push(raw, "Not found. Try 'project 1' through 'project 14'.");
      }
    }
    else if (c === "skills") {
      const list = SKILL_CARDS.map(s => `${s.icon} ${s.name} (${s.type})\n   ${s.moves.join(" \u00b7 ")}`).join("\n\n");
      push(raw, "SKILLS\n\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\n\n" + list);
    }
    else if (c === "contact") {
      push(raw, "CONTACT\n\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\n\nEmail     noornaila04@gmail.com\nLinkedIn  /in/noornaila\nGitHub    nailserverzone\nNotion    noornaila.notion.site");
    }
    else if (c === "music") {
      push(raw, "NOW PLAYING\n\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\nBTS  - Dynamite\nMOTS:7 \u00b7 Proof \u00b7 Dark & Wild\nLo-fi beats for studying\nARMY since 2016\nBias: Yoongi \u2764\ufe0f");
    }
    else if (c === "funfact") {
      push(raw, FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)]);
    }
    else {
      push(raw, "\u2753 Unknown command: '" + c + "'\nType 'help' to see available commands\nor 'switch' to change mode.");
    }
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      background: "#0a0a1a",
      overflow: "hidden",
      height: "100%",
    }}>
      <div style={{
        flex: 1,
        padding: "24px 28px",
        overflowY: "auto",
        fontFamily: "'Silkscreen', monospace",
        fontSize: "1.15rem",
        lineHeight: 1.9,
        color: "#c8d8ff",
      }}>
        {history.map((l, i) => (
          <div key={i} style={{
            marginBottom: 12,
            color: l.t === "s" ? "#ffd93d" : l.t === "c" ? "#6bcb77" : "#c8d8ff",
          }}>
            {l.t === "c" && (
              <span style={{ color: "#ff9f43", marginRight: 10, fontWeight: 700, fontSize: "1.2rem" }}>
                &#10095;
              </span>
            )}
            <span style={{ whiteSpace: "pre-wrap" }}>{l.v}</span>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "16px 28px",
        borderTop: "2px solid #2a2a4a",
        background: "#0d0d22",
        flexShrink: 0,
      }}>
        {mode !== "pick" && (
          <span style={{
            fontFamily: "'Silkscreen', monospace",
            fontSize: "0.8rem",
            color: mode === "go" ? "#ff6b6b" : "#7ec8e3",
            background: mode === "go" ? "rgba(255,107,107,0.15)" : "rgba(126,200,227,0.15)",
            padding: "4px 12px",
            borderRadius: 8,
            flexShrink: 0,
          }}>
            {mode === "go" ? "GO" : "READ"}
          </span>
        )}
        <span style={{
          color: "#ff9f43",
          fontWeight: 700,
          fontFamily: "'Silkscreen', monospace",
          fontSize: "1.2rem",
        }}>
          &#10095;
        </span>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") exec(); }}
          placeholder={mode === "pick" ? "type 1 or 2..." : "type a command..."}
          autoFocus
          style={{
            flex: 1,
            background: "none",
            border: "none",
            outline: "none",
            fontFamily: "'Silkscreen', monospace",
            fontSize: "1.15rem",
            color: "#6bcb77",
            caretColor: "#6bcb77",
          }}
        />
      </div>
    </div>
  );
}
