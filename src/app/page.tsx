import DeskPage from "@/components/DeskPage";

/* ══════════════════════════════════════
   Server Component wrapper for SEO

   This ensures Google's crawler sees semantic HTML
   with the full name, title, and key content in the
   initial server-rendered response — even though
   the interactive desktop is a client component.
   ══════════════════════════════════════ */

export default function Page() {
  return (
    <main>
      {/* ── SEO content: server-rendered, visible to crawlers ── */}
      <div
        aria-hidden="false"
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          borderWidth: 0,
        }}
      >
        <h1>Noor Naila Imtinan Himam — UX Researcher &amp; Designer</h1>
        <p>
          Noor Naila Imtinan Himam is a UX Researcher and Designer specializing in
          user experience research, interaction design, and storytelling through
          digital products. Explore her interactive portfolio featuring research
          projects, design case studies, graphic design work, and featured talks.
        </p>
        <nav aria-label="Portfolio sections">
          <ul>
            <li>About Noor Naila Imtinan Himam</li>
            <li>UX Research Projects &amp; Case Studies</li>
            <li>Graphic Design Portfolio</li>
            <li>Featured Talks &amp; Presentations</li>
            <li>Events &amp; Activities</li>
            <li>Skills &amp; Expertise</li>
            <li>Contact Noor Naila Imtinan Himam</li>
          </ul>
        </nav>
        <footer>
          <p>
            &copy; {new Date().getFullYear()} Noor Naila Imtinan Himam. All rights reserved.
            Contact: noornaila04@gmail.com |{" "}
            <a href="https://www.linkedin.com/in/noornaila/">LinkedIn</a> |{" "}
            <a href="https://github.com/nailserverzone">GitHub</a>
          </p>
        </footer>
      </div>

      {/* ── Interactive desktop (client component) ── */}
      <DeskPage />
    </main>
  );
}
