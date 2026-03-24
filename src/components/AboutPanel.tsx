"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal, { TextReveal } from "./ScrollReveal";

const experience = [
  { year:"Jan 2026 - Present", role:"Product Implementation Apprentice", org:"PT. Prudential Corporation", loc:"Jakarta, Indonesia", current:true },
  { year:"May 2024 - Aug 2025", role:"Research Assistant", org:"UBC SPIN Lab", loc:"Vancouver, Canada", highlight:"3 journal manuscripts co-authored" },
  { year:"Oct 2022 - Apr 2025", role:"Project Assistant", org:"HIBAR Research Alliance", loc:"Vancouver, Canada" },
];

const publications = [
  { id:"C.1", badge:"Honourable Mention", venue:"ACM CHI 2026", title:"Tattered Teddies and Pentagram Charms", type:"refereed" },
];

const awards = [
  { title:"Work Learn International Student Research Award", org:"University of British Columbia" },
  { title:"3rd Winner - ARITZIA x girlCode Hackathon", org:"ARITZIA & UBC girlCode" },
  { title:"Full Scholarship - Beasiswa Prestasi Talenta", org:"Ministry of Education, Indonesia" },
  { title:"3rd Place - APA Special Award", org:"Regeneron ISEF" },
  { title:"4th Grand Award - Behavioral & Social Science", org:"Regeneron ISEF" },
];

const education = {
  school:"University of British Columbia",
  degree:"BSc in Computer, Biological, and Environmental Science",
  year:"Sep 2021 - May 2025",
  loc:"Vancouver, Canada",
  honors:"Dean's List 2024-2025 (GPA 3.7/4.0)",
  courses:["Advanced HCI Methods (93%)", "Intro to HCI (85%)", "Designing Cognitive Systems (86%)", "Computer & Society (87%)", "Communicating Science (86%)"],
};

const skillCategories = [
  { label:"Research", icon:"\ud83d\udd2c", items:["UX Research","Design Thinking","HCI","CX & Consumer Insights","Accessibility","Inclusive Design"] },
  { label:"Design", icon:"\ud83c\udfa8", items:["Figma","Adobe Creative Suite","Canva","Prototyping"] },
  { label:"Data", icon:"\ud83d\udcca", items:["Python","R","SPSS","Excel","NVivo","MATLAB"] },
  { label:"Tools", icon:"\ud83d\udee0", items:["Qualtrics","Google Analytics","Miro","SQL"] },
];

export default function AboutPanel({ onNavigate }: { onNavigate?: (id: string) => void }) {
  const [tab, setTab] = useState<"about"|"experience"|"publications"|"awards">("about");

  const stats = [
    { n:"5+", l:"Yrs Research", target:"projects" },
    { n:"3+", l:"Yrs UX", target:"projects" },
    { n:"14", l:"Projects", target:"projects" },
    { n:"50+", l:"Designs", target:"gallery" },
  ];

  const tabs = [
    { key:"about" as const, label:"About", icon:"\ud83d\udcf7" },
    { key:"experience" as const, label:"Experience", icon:"\ud83d\udcbc" },
    { key:"publications" as const, label:"Papers", icon:"\ud83d\udcc4" },
    { key:"awards" as const, label:"Awards", icon:"\ud83c\udfc6" },
  ];

  return (
    <div>
      {/* Header */}
      <ScrollReveal direction="up" duration={600}>
        <div style={{ display:"flex",alignItems:"center",gap:22,marginBottom:24 }}>
          <div style={{
            width:90,height:90,borderRadius:"50%",flexShrink:0,
            background:"linear-gradient(135deg,var(--peach),var(--pink))",
            overflow:"hidden",
          }}>
            <img src="/icons/nailaphoto.svg" alt="Naila" style={{ width:"100%",height:"100%",objectFit:"cover" }} />
          </div>
          <div>
            <h2 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,fontSize:"2.2rem",margin:0,lineHeight:1.1 }}>
              Noor Naila Imtinan Himam
            </h2>
            <p style={{ fontSize:"1.3rem",color:"var(--ink-2)",margin:"4px 0 0",fontFamily:"'Silkscreen',monospace" }}>
              Researcher &middot; Vancouver, BC
            </p>
          </div>
        </div>
      </ScrollReveal>

      {/* Tab navigation */}
      <div style={{ display:"flex",gap:0,borderBottom:"3px solid var(--bg-3)",marginBottom:24 }}>
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            style={{
              flex:1,padding:"14px 0",border:"none",cursor:"pointer",
              fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,fontSize:"1.2rem",
              background: tab === t.key ? "var(--bg)" : "transparent",
              color: tab === t.key ? "var(--pink)" : "var(--ink-2)",
              borderBottom: tab === t.key ? "4px solid var(--pink)" : "4px solid transparent",
              marginBottom: tab === t.key ? "-3px" : 0,
              transition:"all 0.2s",letterSpacing:0.5,
            }}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* ABOUT TAB */}
        {tab === "about" && (
          <motion.div key="about" initial={{ opacity:0,y:8 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0,y:-8 }} transition={{ duration:0.2 }}>
            <ScrollReveal direction="up" delay={100}>
              <div style={{ fontFamily:"'DM Sans',serif",fontSize:"2.2rem",fontStyle:"italic",marginBottom:16,textAlign:"center",lineHeight:1.3 }}>
                <TextReveal
                  text="I design with empathy and evidence."
                  staggerMs={80}
                  style={{ fontFamily:"'DM Sans',serif",fontSize:"2.2rem",fontStyle:"italic",lineHeight:1.3 }}
                />
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={200}>
              <p style={{ fontFamily:"'DM Sans',serif",fontSize:"1.5rem",lineHeight:1.7,color:"var(--ink-2)",textAlign:"center",maxWidth:580,margin:"0 auto 24px" }}>
                Interdisciplinary researcher at the intersection of HCI, affective computing, and behavioral science.
              </p>
            </ScrollReveal>

            {/* Stats */}
            <ScrollReveal direction="up" delay={300}>
              <div style={{ display:"flex",gap:12,justifyContent:"center",marginBottom:24,flexWrap:"wrap" }}>
                {stats.map((s, i) => (
                  <ScrollReveal key={s.l} direction="scale" delay={400 + i * 100} duration={500}>
                    <motion.button onClick={() => onNavigate?.(s.target)}
                      whileHover={{ y:-4,scale:1.05,borderColor:"var(--pink)" }} whileTap={{ scale:0.97 }}
                      style={{ padding:"18px 22px",background:"var(--bg-2)",borderRadius:16,minWidth:110,borderWidth:2,borderStyle:"solid",borderColor:"transparent",cursor:"pointer" }}>
                      <span style={{ display:"block",fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:"2.2rem",color:"var(--green)" }}>{s.n}</span>
                      <span style={{ fontFamily:"'Silkscreen',monospace",fontSize:"0.9rem",color:"var(--ink-2)" }}>{s.l}</span>
                    </motion.button>
                  </ScrollReveal>
                ))}
              </div>
            </ScrollReveal>

            {/* Skills */}
            <div style={{ marginBottom:24 }}>
              {skillCategories.map((cat, ci) => (
                <ScrollReveal key={cat.label} direction="left" delay={ci * 120} distance={30}>
                  <div style={{ marginBottom:14 }}>
                    <span style={{ fontFamily:"'Silkscreen',monospace",fontSize:"1rem",color:"var(--ink-2)",letterSpacing:1.5 }}>
                      {cat.icon} {cat.label}
                    </span>
                    <div style={{ display:"flex",flexWrap:"wrap",gap:8,marginTop:8 }}>
                      {cat.items.map(s => (
                        <span key={s} style={{
                          fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:600,fontSize:"1.1rem",
                          padding:"8px 20px",borderRadius:22,
                          background:"var(--bg-2)",color:"var(--ink)",border:"1.5px solid var(--bg-3)",
                        }}>{s}</span>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* CTAs */}
            <ScrollReveal direction="up" delay={200}>
              <div style={{ display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap",marginBottom:20 }}>
                <a href="mailto:noornaila04@gmail.com?subject=Resume%20Request"
                  style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,fontSize:"1.2rem",color:"white",padding:"14px 32px",borderRadius:24,background:"var(--pink)",textDecoration:"none",boxShadow:"0 4px 14px rgba(214,68,121,0.25)" }}>
                  Request Resume &rarr;
                </a>
                <button onClick={() => onNavigate?.("contact")}
                  style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,fontSize:"1.2rem",color:"var(--pink)",padding:"14px 32px",borderRadius:24,background:"transparent",border:"2.5px solid var(--pink)",cursor:"pointer" }}>
                  Contact Me
                </button>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="fade" delay={400} duration={1000}>
              <blockquote style={{ fontFamily:"'DM Sans',serif",fontStyle:"italic",fontSize:"1.4rem",color:"var(--ink-2)",borderLeft:"4px solid var(--pink)",paddingLeft:20,textAlign:"left",maxWidth:420,margin:"0 auto" }}>
                &ldquo;If you want to understand, you stand under&rdquo;
              </blockquote>
            </ScrollReveal>
          </motion.div>
        )}

        {/* EXPERIENCE TAB */}
        {tab === "experience" && (
          <motion.div key="experience" initial={{ opacity:0,y:8 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0,y:-8 }} transition={{ duration:0.2 }}>
            <ScrollReveal direction="up">
              <span style={{ fontFamily:"'Silkscreen',monospace",fontSize:"1rem",color:"var(--ink-2)",letterSpacing:2,display:"block",marginBottom:16 }}>
                WORK EXPERIENCE
              </span>
            </ScrollReveal>
            <div style={{ position:"relative",paddingLeft:28,marginBottom:28 }}>
              <div style={{ position:"absolute",left:8,top:10,bottom:10,width:4,background:"linear-gradient(180deg, var(--pink), var(--peach), var(--bg-3))",borderRadius:2 }} />
              {experience.map((e, i) => (
                <ScrollReveal key={i} direction="left" delay={i * 150} distance={25}>
                  <div style={{ marginBottom:24,position:"relative" }}>
                    <div style={{ position:"absolute",left:-24,top:8,width:14,height:14,borderRadius:"50%",background:e.current ? "var(--pink)" : "var(--bg-3)",border:e.current ? "3px solid var(--peach)" : "3px solid var(--bg-2)" }} />
                    <span style={{ fontFamily:"'Silkscreen',monospace",fontSize:"0.95rem",color:e.current ? "var(--pink)" : "var(--ink-2)",letterSpacing:0.5 }}>
                      {e.year}
                    </span>
                    <h4 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,fontSize:"1.6rem",color:"var(--ink)",margin:"6px 0 2px",lineHeight:1.2 }}>
                      {e.role}
                    </h4>
                    <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:600,fontSize:"1.2rem",color:"var(--green)" }}>
                      {e.org}
                    </span>
                    <span style={{ fontFamily:"'DM Sans',serif",fontStyle:"italic",fontSize:"1.1rem",color:"var(--ink-2)",marginLeft:10 }}>
                      {e.loc}
                    </span>
                    {e.highlight && (
                      <span style={{ display:"block",fontFamily:"'DM Sans',serif",fontStyle:"italic",fontSize:"1.1rem",color:"var(--pink)",marginTop:4 }}>
                        {e.highlight}
                      </span>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Education */}
            <ScrollReveal direction="up" delay={100}>
              <span style={{ fontFamily:"'Silkscreen',monospace",fontSize:"1rem",color:"var(--ink-2)",letterSpacing:2,display:"block",marginBottom:14 }}>
                EDUCATION
              </span>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={200}>
              <div style={{ padding:"22px 24px",borderRadius:16,background:"var(--bg-2)",border:"2px solid var(--bg-3)" }}>
                <span style={{ fontFamily:"'Silkscreen',monospace",fontSize:"0.95rem",color:"var(--pink)",letterSpacing:0.5 }}>{education.year}</span>
                <h4 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,fontSize:"1.5rem",color:"var(--ink)",margin:"6px 0 2px",lineHeight:1.2 }}>{education.degree}</h4>
                <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:600,fontSize:"1.2rem",color:"var(--green)" }}>{education.school}</span>
                <span style={{ display:"block",fontFamily:"'DM Sans',serif",fontStyle:"italic",fontSize:"1.1rem",color:"var(--amber)",marginTop:6 }}>{education.honors}</span>
                <div style={{ display:"flex",flexWrap:"wrap",gap:8,marginTop:12 }}>
                  {education.courses.map(c => (
                    <span key={c} style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:600,fontSize:"1rem",padding:"6px 16px",borderRadius:18,background:"var(--bg)",color:"var(--ink)",border:"1.5px solid var(--bg-3)" }}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </motion.div>
        )}

        {/* PUBLICATIONS TAB */}
        {tab === "publications" && (
          <motion.div key="publications" initial={{ opacity:0,y:8 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0,y:-8 }} transition={{ duration:0.2 }}>
            <ScrollReveal direction="up">
              <span style={{ fontFamily:"'Silkscreen',monospace",fontSize:"1rem",color:"var(--ink-2)",letterSpacing:2,display:"block",marginBottom:16 }}>
                PUBLICATIONS
              </span>
            </ScrollReveal>
            <div style={{ display:"flex",flexDirection:"column",gap:16 }}>
              {publications.map((p,i) => (
                <ScrollReveal key={p.id} direction="scale" delay={i * 150}>
                  <div style={{
                    padding:"24px 26px",borderRadius:16,
                    background: p.badge ? "linear-gradient(135deg, rgba(214,68,121,0.06), rgba(253,186,47,0.06))" : "var(--bg-2)",
                    border: p.badge ? "3px solid var(--pink)" : "2px solid var(--bg-3)",
                    position:"relative",
                  }}>
                    {p.badge && (
                      <span style={{
                        position:"absolute",top:-10,right:18,
                        fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:"1rem",
                        padding:"6px 18px",borderRadius:12,
                        background:"var(--pink)",color:"white",
                      }}>
                        {p.badge}
                      </span>
                    )}
                    <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:10 }}>
                      <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:"1.2rem",color:"var(--pink)",opacity:0.6 }}>[{p.id}]</span>
                      <span style={{
                        fontFamily:"'Silkscreen',monospace",fontSize:"0.85rem",
                        padding:"5px 14px",borderRadius:8,
                        background:"var(--green)",color:"white",
                      }}>
                        PUBLISHED
                      </span>
                    </div>
                    <h4 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,fontSize:"1.6rem",color:"var(--ink)",margin:0,lineHeight:1.3 }}>
                      {p.title}
                    </h4>
                    <span style={{ fontFamily:"'DM Sans',serif",fontStyle:"italic",fontSize:"1.3rem",color:"var(--ink-2)" }}>
                      {p.venue}
                    </span>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal direction="fade" delay={300} duration={1000}>
              <div style={{ textAlign:"center",padding:"36px 0 16px",marginTop:24,borderTop:"2px dashed var(--bg-3)" }}>
                <p style={{ fontFamily:"'DM Sans',serif",fontStyle:"italic",fontSize:"1.4rem",color:"var(--ink-2)",margin:0 }}>
                  More publications coming soon...
                </p>
                <p style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:600,fontSize:"1.1rem",color:"var(--green)",marginTop:10 }}>
                  Currently working on 3 manuscripts in HCI &amp; affective computing
                </p>
              </div>
            </ScrollReveal>
          </motion.div>
        )}

        {/* AWARDS TAB */}
        {tab === "awards" && (
          <motion.div key="awards" initial={{ opacity:0,y:8 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0,y:-8 }} transition={{ duration:0.2 }}>
            <ScrollReveal direction="up">
              <span style={{ fontFamily:"'Silkscreen',monospace",fontSize:"1rem",color:"var(--ink-2)",letterSpacing:2,display:"block",marginBottom:16 }}>
                HONORS & AWARDS
              </span>
            </ScrollReveal>
            <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
              {awards.map((a,i) => (
                <ScrollReveal key={i} direction="right" delay={i * 100} distance={30}>
                  <div style={{
                    padding:"20px 24px",borderRadius:16,
                    background:"var(--bg-2)",border:"2px solid var(--bg-3)",
                    display:"flex",alignItems:"center",gap:18,
                  }}>
                    <span style={{ fontSize:"2.2rem",flexShrink:0 }}>
                      {["\ud83e\udd47","\ud83e\udd49","\ud83c\udf93","\ud83e\uddea","\ud83c\udfc5"][i]}
                    </span>
                    <div>
                      <h4 style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,fontSize:"1.4rem",color:"var(--ink)",margin:0,lineHeight:1.3 }}>
                        {a.title}
                      </h4>
                      <span style={{ fontFamily:"'DM Sans',serif",fontStyle:"italic",fontSize:"1.15rem",color:"var(--ink-2)" }}>
                        {a.org}
                      </span>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Certifications */}
            <ScrollReveal direction="up" delay={200}>
              <span style={{ fontFamily:"'Silkscreen',monospace",fontSize:"1rem",color:"var(--ink-2)",letterSpacing:2,display:"block",marginTop:28,marginBottom:12 }}>
                CERTIFICATIONS
              </span>
              <div style={{ display:"flex",flexWrap:"wrap",gap:10 }}>
                {["TCPS 2: CORE Research Ethics","W3CX Web Accessibility","MATLAB (Vanderbilt)","Intro to Programming (Edinburgh)"].map(c => (
                  <span key={c} style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:600,fontSize:"1.1rem",padding:"8px 20px",borderRadius:22,background:"var(--bg-2)",color:"var(--ink)",border:"1.5px solid var(--bg-3)" }}>
                    {c}
                  </span>
                ))}
              </div>
            </ScrollReveal>

            {/* Languages */}
            <ScrollReveal direction="up" delay={300}>
              <span style={{ fontFamily:"'Silkscreen',monospace",fontSize:"1rem",color:"var(--ink-2)",letterSpacing:2,display:"block",marginTop:24,marginBottom:12 }}>
                LANGUAGES
              </span>
              <div style={{ display:"flex",gap:14 }}>
                {[{lang:"English",level:"Fluent"},{lang:"Indonesian",level:"Fluent"}].map(l => (
                  <div key={l.lang} style={{ padding:"14px 28px",borderRadius:14,background:"var(--bg-2)",textAlign:"center" }}>
                    <span style={{ fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:700,fontSize:"1.3rem",color:"var(--ink)",display:"block" }}>{l.lang}</span>
                    <span style={{ fontFamily:"'Silkscreen',monospace",fontSize:"0.85rem",color:"var(--green)" }}>{l.level}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
