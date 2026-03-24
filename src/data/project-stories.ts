/**
 * Rich project story data for the scrollable case-study detail pages.
 * Each project gets a full narrative with sections, data, quotes, and process steps.
 */

export interface StorySection {
  type:
    | "hero"
    | "overview"
    | "problem"
    | "process"
    | "methodology"
    | "findings"
    | "iterations"
    | "impact"
    | "callout"
    | "gallery"
    | "metrics"
    | "quotes"
    | "links";
  data: Record<string, unknown>;
}

export interface ProjectStory {
  id: number; // matches Project.id
  subtitle: string;
  role: string;
  duration: string;
  team: string;
  tools: string[];
  sections: StorySection[];
  liveUrl?: string;
}

/* ════════════════════════════════════════
   WRAPPED - Full Case Study
   ════════════════════════════════════════ */
export const PROJECT_STORIES: Record<number, ProjectStory> = {
  2: {
    id: 2,
    subtitle: "How do we design a productivity app that respects autonomy while encouraging focus?",
    role: "UX Researcher & Designer",
    duration: "Jan - Apr 2025",
    team: "4 researchers (CPSC 444, UBC)",
    tools: ["Figma", "Qualtrics", "SPSS", "Canva", "Next.js", "Vercel"],
    liveUrl: "https://wrapped-productivity.vercel.app/",
    sections: [
      /* ── OVERVIEW ── */
      {
        type: "overview",
        data: {
          text: "Wrapped is a consolidated productivity mobile app designed for university students who struggle with digital distraction. Through a multi-phase research process - from field observation to structured usability experiments - we explored how configurable widgets and dual study modes (individual & group) can support focus without reducing autonomy.",
          highlight: "The project evolved from a lo-fi paper prototype to a fully functional web application, validated through rigorous user research at every stage.",
        },
      },
      /* ── PROBLEM ── */
      {
        type: "problem",
        data: {
          statement: "University students spend an average of 6h40m daily on screens. The same devices used for learning introduce constant distractions - yet strict interventions like app blockers are widely rejected.",
          stats: [
            { label: "Daily screen time average", value: "6h 40m", source: "Howarth, 2022" },
            { label: "Students citing digital distraction", value: "8/8", source: "Pre-study survey" },
            { label: "Oppose strict app blocking", value: "Majority", source: "Turel et al., 2021" },
          ],
          question: "How might we design a productivity tool that facilitates focus and task management without reducing student autonomy?",
        },
      },
      /* ── PROCESS TIMELINE ── */
      {
        type: "process",
        data: {
          phases: [
            {
              id: "field",
              label: "Field Study",
              title: "Understanding Student Habits",
              desc: "Conducted contextual inquiry and field observations to understand how students actually study. Discovered that students are motivated by both extrinsic (grades) and intrinsic (satisfaction) factors.",
              methods: ["Contextual Inquiry", "Field Observation", "Interviews"],
              icon: "🔍",
            },
            {
              id: "ideation",
              label: "Ideation & Design",
              title: "From Insights to Prototype",
              desc: "Translated field study findings into a widget-based productivity app concept. Created lo-fi wireframes and iterated based on team critique and HCI principles.",
              methods: ["Affinity Diagramming", "Lo-fi Wireframing", "Design Critique"],
              icon: "✏️",
            },
            {
              id: "prototype",
              label: "Prototyping",
              title: "Building the Experience",
              desc: "Developed medium-fidelity interactive prototype in Figma with two study modes: individual (self-paced, widget-customizable) and group (social accountability, shared progress).",
              methods: ["Figma Prototyping", "Interactive Flows", "Component Design"],
              icon: "🎨",
            },
            {
              id: "pilot",
              label: "Pilot Testing",
              title: "Refining the Experiment",
              desc: "Ran pilot with 2 participants to test experimental procedure. Identified misunderstandings in group mode, refined instructions, and shifted to modular scenario-based task design.",
              methods: ["Pilot Study", "Protocol Refinement", "Observation Coding"],
              icon: "🧪",
            },
            {
              id: "experiment",
              label: "Usability Experiment",
              title: "Structured Evaluation",
              desc: "Within-subjects experiment with 8 participants comparing individual vs. group study modes. Mixed methods: Likert surveys, think-aloud protocols, behavioral coding, and semi-structured interviews.",
              methods: ["Within-Subjects Design", "Think-Aloud", "Likert Surveys", "Interviews"],
              icon: "📊",
            },
            {
              id: "analysis",
              label: "Analysis & Iteration",
              title: "Data to Design Decisions",
              desc: "Analyzed quantitative data with Repeated Measures ANOVA and qualitative data through thematic coding. Findings directly informed the final webapp redesign.",
              methods: ["ANOVA", "Thematic Analysis", "Design Recommendations"],
              icon: "📈",
            },
            {
              id: "webapp",
              label: "Final Product",
              title: "Wrapped Web App",
              desc: "Rebuilt Wrapped as a full Next.js web application incorporating all research findings - improved visual hierarchy, responsive widgets, and streamlined navigation.",
              methods: ["Next.js", "React", "Vercel Deployment"],
              icon: "🚀",
            },
          ],
        },
      },
      /* ── METHODOLOGY ── */
      {
        type: "methodology",
        data: {
          design: "Within-subjects experiment with counterbalanced order to prevent learning effects.",
          participants: {
            count: 8,
            profile: "Undergraduate students, diverse academic fields, varying productivity app experience",
            recruitment: "UBC campus recruitment",
          },
          procedure: [
            "Pre-study survey (demographics, study habits, app experience)",
            "Individual study mode interaction with think-aloud",
            "Group study mode interaction with think-aloud",
            "Independent navigation & task management session",
            "Post-task Likert surveys (10-point scale)",
            "Semi-structured interviews",
          ],
          measures: [
            { name: "Intuitiveness", type: "Quantitative", format: "10-point Likert" },
            { name: "Engagement", type: "Quantitative", format: "10-point Likert" },
            { name: "Distraction", type: "Quantitative", format: "10-point Likert" },
            { name: "Future Use Likelihood", type: "Quantitative", format: "10-point Likert" },
            { name: "Behavioral Observation", type: "Mixed", format: "Coding Sheet" },
            { name: "User Insights", type: "Qualitative", format: "Semi-structured Interview" },
          ],
        },
      },
      /* ── FINDINGS: METRICS ── */
      {
        type: "metrics",
        data: {
          title: "Study Mode Comparison",
          subtitle: "Mean ratings on 10-point Likert scale (N = 8)",
          bars: [
            { label: "Engagement", individual: 7.1, group: 8.2, color: "#687b3d" },
            { label: "Intuitiveness", individual: 8.2, group: 7.6, color: "#d64479" },
            { label: "Distraction", individual: 1.8, group: 2.5, color: "#7596c8", inverted: true },
            { label: "Future Use", individual: 7.9, group: 7.5, color: "#fdba2f" },
          ],
          anova: {
            studyMode: { f: "F(1,7) = 0.34", p: ".579", significant: false },
            measureType: { f: "F(3,21) = 66.72", p: "< .001", significant: true, eta: ".732" },
            interaction: { f: "F(3,21) = 2.15", p: ".124", significant: false },
          },
          insight: "No significant difference between modes overall - but each serves different psychological needs. Individual mode offers clarity and autonomy; group mode provides motivational support.",
        },
      },
      /* ── FINDINGS: NAVIGATION METRICS ── */
      {
        type: "metrics",
        data: {
          title: "Navigation & Task Management",
          subtitle: "Mean usability ratings (N = 8)",
          bars: [
            { label: "Starting Tasks", individual: 8.0, color: "#687b3d" },
            { label: "Adding Tasks", individual: 7.75, color: "#687b3d" },
            { label: "Ease of Nav", individual: 7.0, color: "#7596c8" },
            { label: "Visual Cues", individual: 7.0, color: "#7596c8" },
            { label: "Nav Intuitiveness", individual: 5.5, color: "#d64479" },
            { label: "Viewing Tasks", individual: 4.0, color: "#d64479" },
          ],
          insight: "Core task actions scored high, but status reflection features (viewing completed tasks, understanding navigation logic) revealed usability gaps - directly informing the webapp redesign.",
        },
      },
      /* ── QUALITATIVE FINDINGS: QUOTES ── */
      {
        type: "quotes",
        data: {
          title: "What Participants Said",
          themes: [
            {
              theme: "Study Mode Preference",
              quotes: [
                { text: "I use individual study every day… it fits naturally.", source: "P2", tag: "Individual" },
                { text: "Having a study partner really motivates me.", source: "P1", tag: "Group" },
              ],
            },
            {
              theme: "Widget Customization",
              quotes: [
                { text: "Customization is very important… people have different needs.", source: "P2", tag: "Insight" },
                { text: "I'd pick the break timer and music… it matches how I already study.", source: "P5", tag: "Alignment" },
              ],
            },
            {
              theme: "Design Feedback",
              quotes: [
                { text: "Make it more colorful and less static-looking.", source: "P2", tag: "Visual" },
                { text: "The little icon click boxes were tiny.", source: "P4", tag: "Usability" },
                { text: "There was no written description. It only had icons, so that was slightly confusing.", source: "P6", tag: "Clarity" },
              ],
            },
            {
              theme: "Barriers & Concerns",
              quotes: [
                { text: "What would discourage me would be like bad UI and not knowing the person.", source: "P3", tag: "Group" },
                { text: "I wouldn't use it unless I really know the other person.", source: "P7", tag: "Trust" },
              ],
            },
          ],
        },
      },
      /* ── KEY THEMES CALLOUT ── */
      {
        type: "callout",
        data: {
          title: "5 Dominant Themes from Qualitative Analysis",
          items: [
            { label: "Study Mode Preference", desc: "Individual for flexibility & low cognitive load; group for accountability" },
            { label: "Intuitiveness", desc: "Clear progress indicators and widget responsiveness drove perceived ease" },
            { label: "Motivators & Barriers", desc: "Social motivation vs. peer pressure and UI complexity in group mode" },
            { label: "Widget Customization", desc: "One-size-fits-all is inadequate - users need personalized study configurations" },
            { label: "Design Recommendations", desc: "Better spacing, button affordances, confirmation cues, and social awareness features" },
          ],
        },
      },
      /* ── ITERATIONS ── */
      {
        type: "iterations",
        data: {
          title: "Design Evolution",
          stages: [
            {
              stage: "Field Observation",
              desc: "Paper-based contextual inquiry revealed students toggle between 3-5 apps during study sessions. Key insight: students want guidance, not restriction.",
              label: "Discovery",
            },
            {
              stage: "Lo-Fi Prototype",
              desc: "Hand-drawn wireframes exploring widget-based layouts. Tested core concepts: configurable widgets, progress visualization, and dual study modes.",
              label: "Concept",
            },
            {
              stage: "Medium-Fi Prototype (Figma)",
              desc: "Interactive Figma prototype with full task flows for individual/group modes. Added music widget, break timer, ChatGPT integration, goal setting, and Do Not Disturb.",
              label: "Prototype",
            },
            {
              stage: "Post-Experiment Redesign",
              desc: "Addressed usability findings: enlarged touch targets, added text labels to icons, improved task completion visibility, and streamlined group mode onboarding.",
              label: "Refinement",
            },
            {
              stage: "Wrapped Web App",
              desc: "Final product built in Next.js - responsive design, real widget functionality, improved visual hierarchy, and deployed on Vercel for public access.",
              label: "Launch",
            },
          ],
        },
      },
      /* ── GALLERY: FINAL APP SCREENSHOTS ── */
      {
        type: "gallery",
        data: {
          title: "The Final Product",
          columns: 2,
          images: [
            {
              src: "/thumbnails/proj-wrapped.png",
              caption: "Dashboard - Adaptive widget-based workspace with Session Timer, Task Manager, Progress tracker, and Quick Stats. Greeting and archetype personalization shown.",
              alt: "Wrapped dashboard with dark theme showing widgets",
            },
            {
              src: "/thumbnails/wrapped-widgets.png",
              caption: "Widget Customization - Users select from 11 configurable widgets including Focus Score, Energy Tracker, Breathing exercises, and Body Doubling for social accountability.",
              alt: "Widget customization panel",
            },
            {
              src: "/thumbnails/wrapped-music.png",
              caption: "Music & Ambience - Integrated soundscapes (Lo-fi, Rain, Café, Forest, Binaural Beats) designed to support focus without leaving the study workspace.",
              alt: "Music and ambience widget with sound categories",
            },
            {
              src: "/thumbnails/wrapped-onboarding.png",
              caption: "Onboarding & Archetypes - Personalized quiz identifies study archetype (e.g., Autonomous Deep Worker, Social Study Partner) to pre-configure optimal widget layouts.",
              alt: "Onboarding archetype selection screen",
            },
          ],
        },
      },
      /* ── IMPACT ── */
      {
        type: "impact",
        data: {
          title: "What I Learned",
          takeaways: [
            {
              insight: "Combining usability testing with thematic analysis",
              detail: "Learned to capture both measurable outcomes and lived experiences, revealing insights that neither method alone could surface.",
            },
            {
              insight: "Emotional trajectories in user interaction",
              detail: "Discovered how to identify and interpret emotional arcs during user sessions, linking them directly to design improvements.",
            },
            {
              insight: "Translating feedback into actionable changes",
              detail: "Strengthened my ability to convert raw user feedback into specific, prioritized design decisions - balancing group dynamics with individual contributions.",
            },
            {
              insight: "Research communication across formats",
              detail: "Improved skills from academic reports to engaging visual storytelling - blog posts, video segments, and interactive presentations.",
            },
          ],
          skills: [
            "Research Design & Project Management",
            "Quantitative & Qualitative Analysis",
            "Experiment Facilitation",
            "UI/UX Design & Research",
            "Communication & Knowledge Translation",
          ],
        },
      },
      /* ── LINKS ── */
      {
        type: "links",
        data: {
          items: [
            { label: "Live App", url: "https://wrapped-productivity.vercel.app/", icon: "🚀" },
            { label: "Full Report", url: "#", icon: "📄" },
            { label: "Figma Prototype", url: "#", icon: "🎨" },
            { label: "Process Blog", url: "https://aerial-hubcap-3cd.notion.site/Wrapped-1d3e5848545b8079b89ac180b0c57bce", icon: "📝" },
          ],
        },
      },
    ],
  },

  /* ════════════════════════════════════════
     BINAURAL BEATS & MEMORY -- Full Case Study
     ════════════════════════════════════════ */
  1: {
    id: 1,
    subtitle: "Optimizing working memory capacity with binaural beats: an experimental study on high school students",
    role: "Co-Researcher & Experiment Designer",
    duration: "2021 - 2022",
    team: "Athifah Qonita Millati & Noor Naila Imtinan Himam",
    tools: ["SPSS", "Aospan Task", "WhatsApp", "Ms. Excel", "Video Conference"],
    sections: [
      /* -- OVERVIEW -- */
      {
        type: "overview",
        data: {
          text: "This experimental study investigated whether binaural beats can enhance working memory capacity in high school students. We recruited 64 participants across four groups (3 experimental + 1 control) and measured their working memory using the Automated Operation Span (Aospan) Task before and after exposure to alpha, beta, and gamma binaural beats. The study was conducted during the COVID-19 pandemic when online learning amplified the need for cognitive optimization tools.",
          highlight: "Beta binaural beats (20 Hz) produced the most significant improvement in working memory capacity (p = 0.001), with an average Aospan score increase of 11.063 points. The study earned both a Special Award and a Grand Award at ISEF (International Science and Engineering Fair).",
        },
      },
      /* -- PROBLEM -- */
      {
        type: "problem",
        data: {
          statement: "The COVID-19 pandemic forced most schools into online learning, significantly impacting student performance. Students reported reduced focus, information overload, and digital distractions. Working memory, the cognitive system responsible for holding and processing information during learning, is essential for reading comprehension, problem-solving, and task completion. We wanted to explore a non-invasive, accessible method to enhance this capacity.",
          stats: [
            { label: "Daily screen time average for students", value: "6h 40m", source: "Howarth, 2022" },
            { label: "Participants across 4 experimental groups", value: "64", source: "Study sample" },
            { label: "Effectiveness of binaural beats on Aospan score", value: "25%", source: "Partial eta squared" },
          ],
          question: "Do alpha, beta, and gamma binaural beats have a significant effect on high school students' working memory capacity?",
        },
      },
      /* -- PROCESS -- */
      {
        type: "process",
        data: {
          phases: [
            {
              id: "lit-review",
              label: "Literature",
              title: "Literature Review & Gap Analysis",
              desc: "Reviewed existing research on binaural beats and working memory. Found that while prior studies (Kraus & Purabanova, 2015) showed effects on university students, the impact on younger populations remained unexplored. We also examined alpha, beta, and gamma frequency research to design a comprehensive multi-frequency study.",
              methods: ["Literature Review", "Gap Analysis", "Research Design"],
              icon: "📚",
            },
            {
              id: "design",
              label: "Study Design",
              title: "True Experimental Design",
              desc: "Designed a pretest-posttest control group experiment with four groups (alpha, beta, gamma, control). Used stratified random sampling with a 1:1 gender ratio across all groups. Each group had 16 participants (8 male, 8 female).",
              methods: ["Experimental Design", "Stratified Random Sampling", "Power Analysis"],
              icon: "🧪",
            },
            {
              id: "instruments",
              label: "Instruments",
              title: "Automated Operation Span (Aospan) Task",
              desc: "Selected the Aospan Task as our measuring instrument, a validated working memory indicator with high internal consistency and test-retest reliability (Klein & Fiss, 1999). Prepared binaural beat audio stimuli at three frequencies: alpha (11 Hz), beta (20 Hz), and gamma (40 Hz).",
              methods: ["Aospan Task", "Audio Stimulus Design", "Instrument Validation"],
              icon: "📊",
            },
            {
              id: "ethics",
              label: "Ethics",
              title: "IRB Approval & Consent",
              desc: "Obtained experimental protocol approval from the Institutional Review Board (IRB) of the Society for Science. Collected electronic informed consent and parental consent for all underage participants before data collection began.",
              methods: ["IRB Application", "Informed Consent", "Parental Consent"],
              icon: "✅",
            },
            {
              id: "data-collection",
              label: "Collection",
              title: "Online Data Collection",
              desc: "Conducted all data collection online via video conference due to pandemic restrictions. Participants completed the Aospan pretest, received 15 minutes of binaural beats exposure (or muted audio for control), then completed the Aospan posttest. Data collection spanned five days based on participant availability.",
              methods: ["Video Conference", "Remote Testing", "Standardized Procedure"],
              icon: "🎧",
            },
            {
              id: "analysis",
              label: "Analysis",
              title: "Mixed-Design ANOVA",
              desc: "Processed data using SPSS with descriptive statistics, normality tests (Shapiro-Wilk), homogeneity tests (Levene), and two-way mixed-design ANOVA. Compared between-groups (binaural beat types) and within-groups (pretest vs. posttest) variances.",
              methods: ["SPSS", "Mixed-Design ANOVA", "Post Hoc Tests", "Normality Testing"],
              icon: "📈",
            },
            {
              id: "presentation",
              label: "ISEF",
              title: "International Presentation & Awards",
              desc: "Presented findings at ISEF (International Science and Engineering Fair), earning both a Special Award and Grand Award. The study demonstrated the practical applicability of binaural beats for student learning optimization.",
              methods: ["Academic Presentation", "Poster Design", "Science Communication"],
              icon: "🏆",
            },
          ],
        },
      },
      /* -- METHODOLOGY -- */
      {
        type: "methodology",
        data: {
          design: "True Experimental Design with Pretest-Posttest Control Group pattern. Two independent variables: group (alpha/beta/gamma/control) and time (pretest/posttest). Dependent variable: working memory capacity measured by Aospan score.",
          participants: "64 high school students (32 male, 32 female; Mean age = 16.32, SD = 0.94) from a population of 750 students. Exclusion criteria: heart disease or epilepsy history. All participants required laptop/computer and working earphones/headphones.",
          procedure: [
            "Recruited 64 participants via stratified random sampling (1:1 gender ratio)",
            "Assigned 48 to experimental groups (16 each) and 16 to control group",
            "Administered Aospan pretest to all groups via video conference",
            "Exposed experimental groups to 15 min of binaural beats (alpha 11 Hz, beta 20 Hz, or gamma 40 Hz)",
            "Control group received identical video with muted audio",
            "Administered Aospan posttest immediately after exposure",
          ],
          measures: [
            { name: "Aospan Score", type: "Primary DV", desc: "Automated Operation Span Task score measuring working memory capacity" },
            { name: "Group Assignment", type: "Between-subjects IV", desc: "Alpha (11 Hz), Beta (20 Hz), Gamma (40 Hz), or Control (muted)" },
            { name: "Time", type: "Within-subjects IV", desc: "Pretest vs. posttest Aospan scores" },
            { name: "Normality", type: "Assumption Check", desc: "Shapiro-Wilk test (all groups p > 0.05)" },
            { name: "Homogeneity", type: "Assumption Check", desc: "Levene test for equal variances" },
          ],
        },
      },
      /* -- METRICS / FINDINGS -- */
      {
        type: "metrics",
        data: {
          title: "Key Findings",
          subtitle: "Mean Aospan Score Change (Posttest - Pretest)",
          bars: [
            { label: "Beta (20 Hz)", individual: 8.5, color: "#d64479" },
            { label: "Gamma (40 Hz)", individual: 6.5, color: "#687b3d" },
            { label: "Alpha (11 Hz)", individual: 5.0, color: "#fdba2f" },
            { label: "Control (Muted)", individual: 1.5, color: "#888" },
          ],
          anova: {
            interaction: { p: "0.001", significant: true },
            timeEffect: { p: "0.005", significant: true },
            betaPosthoc: { p: "0.001", significant: true },
          },
          insight: "Beta binaural beats (20 Hz) had the most significant effect with an average score increase of 11.063 points (p = 0.001). All three experimental groups showed significant improvements compared to the control group, which actually decreased by 7.25 points. The overall effectiveness of binaural beats was 25% (partial eta squared = 0.251).",
        },
      },
      /* -- ADDITIONAL METRICS -- */
      {
        type: "metrics",
        data: {
          title: "Descriptive Statistics by Group",
          subtitle: "Mean Aospan Scores: Pretest vs. Posttest",
          bars: [
            { label: "Beta Group", individual: 6.0, group: 4.9, color: "#d64479" },
            { label: "Alpha Group", individual: 5.8, group: 5.2, color: "#fdba2f" },
            { label: "Gamma Group", individual: 5.9, group: 5.1, color: "#687b3d" },
            { label: "Control", individual: 5.5, group: 4.8, color: "#888" },
          ],
          insight: "The control group showed a decrease in Aospan scores from pretest (M = 55.1) to posttest (M = 47.8), possibly due to test fatigue without cognitive stimulation. In contrast, beta binaural beats increased scores from 49.2 to 60.3, the largest improvement across all groups.",
        },
      },
      /* -- CALLOUT: KEY CONTRIBUTIONS -- */
      {
        type: "callout",
        data: {
          title: "Key Contributions",
          items: [
            { label: "Novel Population", desc: "First study to test binaural beats on high school students (ages 15-17), extending prior research that focused only on university students." },
            { label: "Multi-Frequency Comparison", desc: "Simultaneously compared alpha, beta, and gamma binaural beats in a single controlled experiment, providing direct frequency comparison data." },
            { label: "Beta Frequency Superiority", desc: "Established beta binaural beats (20 Hz) as the most effective frequency for enhancing working memory, with the largest score increase (11.063 points)." },
            { label: "Pandemic-Era Application", desc: "Demonstrated a practical, non-invasive tool for enhancing cognitive performance during online learning, directly applicable to the COVID-19 educational context." },
            { label: "Robust Methodology", desc: "Used IRB-approved true experimental design with stratified random sampling and validated instruments (Aospan Task), ensuring high internal validity." },
          ],
        },
      },
      /* -- ITERATIONS / EVOLUTION -- */
      {
        type: "iterations",
        data: {
          title: "Research Journey",
          stages: [
            {
              stage: "Literature Gap Identification",
              desc: "Identified that existing binaural beats research focused on university students and single frequencies. Saw an opportunity to test multiple frequencies on younger participants.",
              label: "Discovery",
            },
            {
              stage: "Study Design & IRB Approval",
              desc: "Designed a true experimental study with four groups. Secured IRB approval from the Society for Science and collected informed consent from all participants and parents.",
              label: "Planning",
            },
            {
              stage: "Pilot & Calibration",
              desc: "Tested the Aospan Task delivery via video conference. Calibrated binaural beat audio stimuli at alpha (11 Hz), beta (20 Hz), and gamma (40 Hz) frequencies.",
              label: "Preparation",
            },
            {
              stage: "Data Collection (Online)",
              desc: "Conducted the full experiment online across five days. Managed 64 participants remotely via WhatsApp coordination and video conference sessions.",
              label: "Execution",
            },
            {
              stage: "ISEF Presentation & Awards",
              desc: "Presented findings at the International Science and Engineering Fair. The study earned both a Special Award and Grand Award, validating the significance and rigor of our research.",
              label: "Recognition",
            },
          ],
        },
      },
      /* -- GALLERY: ISEF POSTER -- */
      {
        type: "gallery",
        data: {
          title: "ISEF Research Poster",
          columns: 1,
          images: [
            {
              src: "/thumbnails/binaural-poster.png",
              caption: "Research poster presented at Regeneron ISEF 2021 (Booth BEHA008T). Covers research questions, methodology with 64 participants across 4 groups, comparison chart of AOSPAN scores, and key conclusions about beta binaural beats' effectiveness (p = 0.001).",
              alt: "ISEF 2021 research poster on Working Memory Capacity and Binaural Beats",
            },
          ],
        },
      },
      /* -- IMPACT -- */
      {
        type: "impact",
        data: {
          title: "What We Learned",
          takeaways: [
            {
              insight: "Non-invasive cognitive enhancement is viable",
              detail: "Binaural beats offer a simple, accessible method for students to optimize their working memory before study sessions, without medication or complex interventions.",
            },
            {
              insight: "Frequency matters significantly",
              detail: "Not all binaural beats are equally effective. Beta frequency (20 Hz) was clearly superior for working memory enhancement, highlighting the importance of frequency-specific research.",
            },
            {
              insight: "Remote experimental research is feasible",
              detail: "Successfully conducting a controlled experiment entirely online during the pandemic demonstrated that rigorous research can adapt to constraints without sacrificing validity.",
            },
            {
              insight: "Practical implications for education",
              detail: "Schools could encourage students to listen to binaural beats before learning activities to stimulate optimal brain function, especially during online learning periods.",
            },
          ],
          skills: [
            "Experimental Design",
            "Statistical Analysis (SPSS)",
            "Scientific Writing",
            "Research Ethics & IRB",
            "Remote Data Collection",
            "Academic Presentation",
          ],
        },
      },
      /* -- LINKS -- */
      {
        type: "links",
        data: {
          items: [
            { label: "ISEF Project Page", url: "https://isef.net/project/beha008t---working-memory-capacity-and-binaural-beats-xjwen", icon: "🏆" },
            { label: "Abstract", url: "https://abstracts.societyforscience.org/Home/FullAbstract?Category=Any%20Category&FinalistLastName=himam&IsGetAllAbstracts=True&FairCountry=Any%20Country&FairState=Any%20State&SelectedIsefYears%5B0%5D=0&SelectedIsefYears%5B1%5D=2021&SelectedIsefYears%5B2%5D=2020&projectId=20478", icon: "📄" },
          ],
        },
      },
    ],
  },

  /* ════════════════════════════════════════
     AFFECTIVE HAPTIC ROBOTS (CHORA) - Full Case Study
     ════════════════════════════════════════ */
  3: {
    id: 3,
    subtitle: "How do users envision interacting with an affective haptic robot in daily routines?",
    role: "Lead Researcher (USRA Fellow)",
    duration: "May - Dec 2025",
    team: "Noor Naila Imtinan Himam, Preeti Vyas, Dr. Karon E. MacLean",
    tools: ["Miro", "Thematic Analysis", "Participatory Design", "Journey Mapping", "Context Canvas", "Canva"],
    sections: [
      /* -- OVERVIEW -- */
      {
        type: "overview",
        data: {
          text: "This research explores how users themselves envision interacting with CHORA, an affective haptic robot designed to provide comfort through touch. Unlike previous studies where affective robot interactions are pre-set by researchers or designers, this project uses participatory workshops to capture how people want to interact with haptic robots in their daily routines. Through structured canvases and scenario synthesis, participants co-designed interaction patterns that were then analyzed for themes and mapped into design implications, current solutions, and future requirements.",
          highlight: "This project is part of a USRA (Undergraduate Student Research Award) fellowship at UBC's SPIN Lab, supervised by Dr. Karon E. MacLean, one of the world's leading researchers in haptic interaction design.",
        },
      },
      /* -- PROBLEM -- */
      {
        type: "problem",
        data: {
          statement: "Most affective haptic robot interaction designs are pre-defined by researchers or designers. Robots like SnuggleBot, Paro, and Purrble have interactions that users simply adapt to. While some user-centered design work explores form factor and expression, very little research captures the context and breadth of haptic interaction from the user's perspective. This gap means designs risk misalignment with users' personal goals and everyday routines, undermining long-term adoption.",
          stats: [
            { label: "Workshop participants", value: "7", source: "Participatory workshops" },
            { label: "Canvases per participant", value: "4", source: "Context + Interaction canvases" },
            { label: "Key identity groups", value: "5", source: "POC, Neurodivergent, LGBTQIA+, Student, Foreign-Born" },
          ],
          question: "How can user-envisioned interaction scenarios be evaluated in terms of real-world feasibility for near-term integration?",
        },
      },
      /* -- PROCESS -- */
      {
        type: "process",
        data: {
          phases: [
            {
              id: "lit",
              label: "Literature Review",
              title: "Mapping the Affective Robot Landscape",
              desc: "Reviewed existing affective haptic robots (SnuggleBot, Paro, Purrble) and identified the gap: most interaction designs are researcher-defined, not user-envisioned. User-centered work exists for form factor but not for context and breadth of haptic interaction.",
              methods: ["Literature Review", "Gap Analysis", "HRI Research"],
              icon: "📚",
            },
            {
              id: "design",
              label: "Workshop Design",
              title: "Participatory Canvas Framework",
              desc: "Designed a multi-canvas workshop framework adapted from Casanova et al. (2022). Created four canvas types: Context Canvas (why, who, when, where), Interaction Type Canvas (how), Interaction Flow Canvas (sequence), and Scenario Synthesis sheets.",
              methods: ["Participatory Design", "Canvas Design", "Protocol Development"],
              icon: "📐",
            },
            {
              id: "recruit",
              label: "Recruitment",
              title: "Diverse Participant Selection",
              desc: "Recruited 7 participants (18-24 years old, 5 female, 1 male, 1 prefer not to disclose) representing key identity groups: POC, neurodivergent, LGBTQIA+, student, and foreign-born. Most had no prior robot interaction experience but owned pets.",
              methods: ["Purposive Sampling", "Ethics Approval", "Screening"],
              icon: "👥",
            },
            {
              id: "workshop",
              label: "Workshops",
              title: "Guided Canvas Sessions & Group Discussion",
              desc: "Participants individually filled canvases with guided prompts exploring interaction context (why, who, when, where) and how touch-based interactions should work and flow. This was followed by group round-robin sharing with optional revision, then individual scenario synthesis.",
              methods: ["Workshop Facilitation", "Canvas Activities", "Group Discussion"],
              icon: "🎨",
            },
            {
              id: "analysis",
              label: "Analysis",
              title: "Thematic Analysis & Design Mapping",
              desc: "Analyzed scenarios and canvases using thematic analysis to uncover interaction themes. Mapped findings into design implications, current solutions that already satisfy needs, and future requirements including missing technology and feasibility horizons.",
              methods: ["Thematic Analysis", "Affinity Diagramming", "Design Mapping"],
              icon: "📊",
            },
            {
              id: "present",
              label: "Dissemination",
              title: "USRA Poster & Ongoing Research",
              desc: "Presented findings through a USRA research poster at UBC. Findings contribute to the next phase of CHORA development at the SPIN Lab, informing interaction design decisions grounded in real user needs.",
              methods: ["Academic Poster", "Research Communication", "Lab Presentation"],
              icon: "🎓",
            },
          ],
        },
      },
      /* -- METHODOLOGY -- */
      {
        type: "methodology",
        data: {
          design: "Participatory workshop study using a structured canvas framework (adapted from Casanova et al., 2022). Participants explored interaction contexts through guided prompts, then synthesized their ideas into narrative scenarios. The approach captures both the breadth of desired interactions and the contextual reasoning behind them.",
          participants: "7 participants aged 18-24. Demographics: 5 female, 1 male, 1 prefer not to disclose. Key identity groups represented: POC (2), Student (3), Neurodivergent (5), Foreign-Born (2), LGBTQIA+ (6). Most had no prior robot interaction (6/7) but had pet ownership experience (6/7). All pursuing Bachelor's degrees.",
          procedure: [
            "Introduced CHORA through an introductory session with hands-on robot interaction",
            "Participants filled Problem Canvas to explore emotional and physical needs (why)",
            "Participants filled Environment Canvas to explore context (who, when, where)",
            "Participants filled Interaction Type and Flow Canvases to explore touch-based interaction patterns (how)",
            "Group round-robin sharing with optional revision of canvas entries",
            "Individual scenario synthesis combining all canvas insights into narrative scenarios",
          ],
          measures: [
            { name: "Context Canvas", type: "Qualitative", desc: "Captures environment context: who is present, when and where interaction occurs" },
            { name: "Interaction Canvases", type: "Qualitative", desc: "Two canvases exploring interaction type (what kind of touch) and flow (sequence of interaction)" },
            { name: "Scenario Sheets", type: "Qualitative", desc: "Written narrative scenarios synthesizing context, need, interaction, and rationale" },
            { name: "Thematic Analysis", type: "Analysis", desc: "Coding and theme development from canvas data and scenarios" },
          ],
        },
      },
      /* -- CALLOUT: CURRENT FINDINGS -- */
      {
        type: "callout",
        data: {
          title: "Current Findings",
          items: [
            {
              label: "Relief from Negative Emotions",
              desc: "Participants envisioned CHORA helping with stress, sadness, anxiety, and overstimulation. The robot serves as a non-judgmental presence during emotional distress.",
            },
            {
              label: "Stronger Comfort and Desire for Private Use",
              desc: "Users wanted interactions to be more intentional and immersive in private settings, suggesting deeper emotional engagement when alone.",
            },
            {
              label: "Physical and Tactile Comfort",
              desc: "Touch, pressure, and haptic feedback emerged as central to desired interactions. Users wanted the robot to provide physical sensations similar to petting or being held.",
            },
            {
              label: "Facilitating Relaxation and Sleep",
              desc: "A major use case was bedtime/wind-down routines. Participants wanted CHORA to help with relaxation and sleep through gentle rhythmic movements and warmth.",
            },
            {
              label: "Others as Facilitator Only",
              desc: "When others are present, CHORA remains personal. Participants wanted the robot to be a bridge for comfort without making others the primary source.",
            },
            {
              label: "Low Emotional Commitment and Judgement",
              desc: "Unlike human interaction, CHORA was valued for being non-judgmental, safe, and private. Users appreciated the low emotional overhead of interacting with a robot.",
            },
          ],
        },
      },
      /* -- ITERATIONS / DESIGN EVOLUTION -- */
      {
        type: "iterations",
        data: {
          title: "Research Journey",
          stages: [
            {
              stage: "Literature & Gap Identification",
              desc: "Mapped the landscape of affective haptic robots (SnuggleBot, Paro, Purrble) and identified that user-centered interaction design for haptic robots remains underexplored beyond form factor.",
              label: "Discovery",
            },
            {
              stage: "Canvas Framework Design",
              desc: "Adapted the Context Canvas framework from Casanova et al. (2022) into a multi-canvas workshop protocol covering problem, environment, interaction type, and interaction flow.",
              label: "Design",
            },
            {
              stage: "Pilot Workshop",
              desc: "Ran initial sessions to refine canvas prompts, timing, and group discussion flow. Adjusted guided prompts to better elicit rich interaction scenarios.",
              label: "Pilot",
            },
            {
              stage: "Full Participatory Workshops",
              desc: "Conducted workshops with 7 participants representing diverse identity groups. Collected rich qualitative data through canvases, group discussions, and scenario synthesis.",
              label: "Data Collection",
            },
            {
              stage: "Thematic Analysis & Design Mapping",
              desc: "Analyzed data using thematic analysis. Mapped themes into design implications, identified existing solutions, and projected future requirements for CHORA's interaction design.",
              label: "Analysis",
            },
          ],
        },
      },
      /* -- IMPACT -- */
      {
        type: "impact",
        data: {
          title: "What I Learned",
          takeaways: [
            {
              insight: "Bottom-up design reveals unexpected needs",
              detail: "Letting users envision their own interactions rather than evaluating pre-defined ones surfaced needs that researchers might never anticipate, like the importance of low emotional commitment and the distinction between private and social use.",
            },
            {
              insight: "Participatory methods for sensitive topics",
              detail: "Designing workshops around emotional and physical comfort requires careful facilitation. The canvas framework provided enough structure to guide participants while leaving space for personal, sometimes vulnerable, reflections.",
            },
            {
              insight: "Bridging HRI research and real-world integration",
              detail: "Learned to evaluate interaction scenarios not just for desirability but for technical feasibility, mapping findings against current robotic capabilities and identifying what future technology must support.",
            },
            {
              insight: "Working within a world-class research lab",
              detail: "Collaborating with Dr. Karon E. MacLean and the SPIN Lab team deepened my understanding of haptic interaction research, experimental rigor, and how to position my work within a broader research program.",
            },
          ],
          skills: [
            "Participatory Design",
            "Workshop Facilitation",
            "Thematic Analysis",
            "Journey Mapping",
            "Human-Robot Interaction",
            "Academic Research & Presentation",
          ],
        },
      },
      /* -- LINKS -- */
      {
        type: "links",
        data: {
          items: [
            { label: "USRA Research Poster", url: "#", icon: "📊" },
            { label: "UBC SPIN Lab", url: "https://www.cs.ubc.ca/labs/spin/", icon: "🔬" },
          ],
        },
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════
     4 - ShopiVi: Voice-Assisted Shopping for the Visually Impaired
     ═══════════════════════════════════════════════════════════ */
  4: {
    id: 4,
    subtitle: "Accessibility-first Chrome extension for online shopping",
    role: "UX Designer & Front-End Developer",
    duration: "24-hour Hackathon (Girlcode x Aritzia)",
    team: "Naila Himam, Hannah Meaney, Kelly Zhu, Nara Iamsakun",
    tools: ["JavaScript", "HTML/CSS", "Web Speech API", "Chrome Extension API"],
    sections: [
      {
        type: "overview",
        data: {
          text: "ShopiVi is a Google Chrome extension that makes online shopping accessible for visually impaired users. At the click of a button, it scrapes product details - name, price, features, and fit - and reads them aloud using the Web Speech API. Built in 24 hours at the Girlcode x Aritzia Hackathon, it won 3rd Place.",
        },
      },
      {
        type: "problem",
        data: {
          title: "The Problem",
          text: "Online shopping interfaces rely almost entirely on visual cues - product images, text layouts, color swatches, and interactive elements. For visually impaired users, navigating these experiences is frustrating and often impossible. Screen readers struggle with inconsistent product page structures, and most e-commerce sites lack meaningful alt text or audio descriptions.",
          stats: [
            { value: "2.2B", label: "People with vision impairment worldwide" },
            { value: "98%", label: "E-commerce sites with accessibility gaps" },
            { value: "0", label: "Built-in audio product descriptions on major retailers" },
          ],
        },
      },
      {
        type: "process",
        data: {
          title: "Our Process",
          phases: [
            { id: "inspiration", label: "Inspiration", icon: "💡", title: "Inspiration", desc: "A teammate's friend's brother is mute, blind, and deaf - he has never been able to easily shop online. This personal connection drove our motivation.", methods: [] },
            { id: "ideation", label: "Ideation", icon: "🧠", title: "Ideation", desc: "Brainstormed accessibility solutions for e-commerce. Settled on a Chrome extension that could overlay on any shopping site without requiring retailer cooperation.", methods: [] },
            { id: "architecture", label: "Architecture", icon: "🏗️", title: "Architecture", desc: "Designed the extension to scrape product page DOM elements (title, price, description, features) and pipe them through the Web Speech API.", methods: [] },
            { id: "development", label: "Development", icon: "💻", title: "Development", desc: "Built the Chrome extension manifest, content scripts for web scraping, and the speech synthesis pipeline in JavaScript.", methods: [] },
            { id: "testing", label: "Testing", icon: "🧪", title: "Testing", desc: "Tested on Aritzia's website and other major retailers. Iterated on scraping selectors to handle different page structures.", methods: [] },
            { id: "pitch", label: "Pitch", icon: "🎤", title: "Pitch", desc: "Presented the working prototype and accessibility vision to hackathon judges. Won 3rd Place.", methods: [] },
          ],
        },
      },
      {
        type: "methodology",
        data: {
          title: "Technical Approach",
          text: "ShopiVi works as a content script injected into shopping pages. It identifies product information through DOM traversal, extracts structured data into a JSON format, and uses the browser's built-in Web Speech API to convert text to natural-sounding audio. The extension activates with a single button click, requiring zero configuration from the user.",
        },
      },
      {
        type: "callout",
        data: {
          title: "Key Design Decisions",
          items: [
            "One-click activation - minimal interaction needed for accessibility",
            "Browser-native speech synthesis - no external API dependencies or costs",
            "DOM scraping approach - works on any retailer without their cooperation",
            "Structured audio output - reads product name, then price, then features in logical order",
          ],
        },
      },
      {
        type: "iterations",
        data: {
          title: "Challenges & Iterations",
          stages: [
            { stage: "Web Scraping", label: "Web Scraping", desc: "Different retailers structure their product pages differently. We built flexible selectors that could adapt to various DOM structures." },
            { stage: "JSON Parsing", label: "JSON Parsing", desc: "Converting scraped HTML into clean, readable JSON was the biggest technical challenge - handling inconsistent formatting and missing fields." },
            { stage: "Speech Quality", label: "Speech Quality", desc: "Tuned speech rate, pitch, and pauses between sections so the audio output felt natural and easy to follow." },
            { stage: "Extension UX", label: "Extension UX", desc: "Designed the extension popup to be minimal and keyboard-accessible, consistent with our accessibility-first philosophy." },
          ],
        },
      },
      {
        type: "impact",
        data: {
          title: "Impact & Takeaways",
          takeaways: [
            { insight: "Accessibility as innovation", detail: "Designing for the most constrained users often produces solutions that benefit everyone - the audio descriptions were useful for multitasking shoppers too." },
            { insight: "24-hour product development", detail: "The hackathon format forced rapid prioritization. We shipped a working product by focusing on one flow done well rather than multiple incomplete features." },
            { insight: "Browser APIs are powerful", detail: "The Web Speech API eliminated the need for server infrastructure, making the extension lightweight and privacy-respecting - no data leaves the browser." },
            { insight: "Personal motivation drives impact", detail: "Starting from a real person's experience rather than abstract problem statements kept the team focused and energized throughout the build." },
          ],
          skills: [
            "Chrome Extension Development",
            "Web Speech API",
            "Accessible UX Design",
            "Rapid Prototyping",
            "Hackathon Pitching",
          ],
        },
      },
      {
        type: "links",
        data: {
          items: [
            { label: "Devpost", url: "https://devpost.com/software/shopivi", icon: "🏆" },
            { label: "GitHub Repository", url: "https://github.com/hmeaney/GirlCode-Hackathon", icon: "💻" },
          ],
        },
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════
     5 - Optimizing Comedy Robots: A Systematic Review
     ═══════════════════════════════════════════════════════════ */
  5: {
    id: 5,
    subtitle: "Systematic review on making robots funny through AI and performative techniques",
    role: "Lead Researcher & Author",
    duration: "Academic Term (2021)",
    team: "Noor Naila Imtinan Himam",
    tools: ["UBC Library Summon", "IEEE Xplore", "Systematic Review Protocol"],
    sections: [
      {
        type: "overview",
        data: {
          text: "Can robots be funny? This systematic review synthesized six empirical studies on comedy robots performing for human audiences. The review found that the most effective comedy robots combine natural language processing (NLP) for joke generation, reinforcement learning (RL) for audience adaptation, and human performative techniques like gaze coordination and gestural timing.",
        },
      },
      {
        type: "problem",
        data: {
          title: "Research Question",
          text: "As social robots increasingly enter public-facing roles, humor becomes a critical social skill. But what makes a robot actually funny to a human audience? Existing comedy robots range from pre-scripted joke-tellers to AI-driven performers, with inconsistent results. This review aimed to identify what combination of technical and performative strategies produces the most positive audience response.",
          stats: [
            { value: "6", label: "Studies meeting inclusion criteria" },
            { value: "197+", label: "Total participants across studies" },
            { value: "p<0.05", label: "Significant effects in all 6 studies" },
          ],
        },
      },
      {
        type: "process",
        data: {
          title: "Review Process",
          phases: [
            { id: "search-strategy", label: "Search Strategy", icon: "🔍", title: "Search Strategy", desc: "Systematic search using UBC Library Summon across peer-reviewed HCI conferences and journals (IEEE, ACM). Boolean keywords: comedy OR humour OR joke AND audience AND robot.", methods: [] },
            { id: "screening", label: "Screening", icon: "📋", title: "Screening", desc: "Inclusion criteria: English papers from 2015-2021, empirical quantitative and qualitative studies with human participants evaluating comedy robot performance.", methods: [] },
            { id: "data-extraction", label: "Data Extraction", icon: "📊", title: "Data Extraction", desc: "Extracted methodology, robot platform, audience size, comedy type, AI techniques used, and statistical significance of findings from each study.", methods: [] },
            { id: "synthesis", label: "Synthesis", icon: "🔗", title: "Synthesis", desc: "Compared approaches across studies - categorizing by joke generation method, adaptation strategy, and performative technique.", methods: [] },
            { id: "critical-analysis", label: "Critical Analysis", icon: "🔬", title: "Critical Analysis", desc: "Identified gaps in existing research including sample size limitations, venue constraints, and unexplored modalities like voice tone.", methods: [] },
          ],
        },
      },
      {
        type: "callout",
        data: {
          title: "Key Findings Across Studies",
          items: [
            "Performative gaze and pointing gestures significantly affect audience response (p<0.01) - robots that look at and gesture toward audiences get better laughs",
            "Manzai-style robots using NLP can generate original jokes from web news articles, producing routines rated as interesting and understandable",
            "Reinforcement learning with social adaptation (gaze, prosody, smile detection) outperforms static or table-based approaches",
            "Time adaptivity is critical - robots that adjust timing based on audience reactions are significantly funnier (p=0.001)",
            "Street-style public performances attract more natural audience reactions than lab settings, but audiences often respond out of politeness",
            "Monotonous robot voice remains the biggest gap - no study has successfully addressed vocal expressiveness in comedy delivery",
          ],
        },
      },
      {
        type: "metrics",
        data: {
          title: "Study Comparison",
          items: [
            { label: "Katevas et al. (2015)", value: "50 participants - performative gaze + gestures" },
            { label: "Umetani et al. (2016)", value: "11 participants - NLP joke generation (Manzai)" },
            { label: "Ritschel (2020)", value: "30 participants - RL with social adaptation" },
            { label: "Weber et al. (2018)", value: "24 participants - real-time RL + social signals" },
            { label: "Vilk & Fitter (2020)", value: "10-20 participants - timing adaptivity" },
            { label: "Swaminathan et al. (2021)", value: "72 participants - street-style comedy" },
          ],
        },
      },
      {
        type: "impact",
        data: {
          title: "Conclusions & Implications",
          takeaways: [
            { insight: "The ideal comedy robot", detail: "Combines NLP-based joke generation, reinforcement learning for real-time audience adaptation, performative gaze and gestures, and time-adaptive delivery. No single study achieved all four." },
            { insight: "Lab vs. real world", detail: "Lab settings provide controlled conditions but may inflate positive responses. Street-style studies reveal that audiences often respond out of social politeness rather than genuine amusement." },
            { insight: "The voice gap", detail: "Across all six studies, monotonous robot voice was identified as a major limitation. Future research should prioritize vocal expressiveness and prosody variation." },
            { insight: "Small sample sizes", detail: "Most studies used fewer than 30 participants, limiting generalizability. Larger, more diverse audience samples are needed to validate these findings." },
          ],
          skills: [
            "Systematic Review Methodology",
            "Boolean Search Strategy",
            "Critical Analysis",
            "HRI Literature",
            "Academic Writing",
          ],
        },
      },
      {
        type: "links",
        data: {
          items: [
            { label: "Full Literature Review", url: "#", icon: "📄" },
          ],
        },
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════
     6 - Course Shop: Reimagining UBC Registration
     ═══════════════════════════════════════════════════════════ */
  6: {
    id: 6,
    subtitle: "Redesigning UBC course registration using a shopping metaphor",
    role: "UX Researcher & Designer",
    duration: "Academic Term (2024)",
    team: "Team Aurora: Naila Himam, Sophia Liu, Patrick Gousseau, Yiming Liu, Justin Wong, Chino Alde",
    tools: ["Figma", "Canva", "Think-Aloud Protocol", "Thematic Analysis"],
    sections: [
      {
        type: "overview",
        data: {
          text: "Course Shop reimagines UBC's course registration system as an online shopping experience. Instead of navigating the clunky Student Service Centre, students browse, filter, compare, and add courses to a cart - just like shopping online. Through iterative prototyping from lo-fi sketches to a medium-fidelity Figma prototype, we conducted usability studies with 6 UBC students and achieved a mean satisfaction score of 7.92/10.",
        },
      },
      {
        type: "problem",
        data: {
          title: "The Problem",
          text: "UBC's Student Service Centre (SSC) is the primary tool for course registration, but students consistently report frustration with its unintuitive interface. Finding courses that meet degree requirements, comparing sections, and managing worklists involves multiple tabs, unclear navigation, and no way to preview critical information like past grade distributions or instructor reviews.",
          stats: [
            { value: "6", label: "UBC students in usability study" },
            { value: "7.92", label: "Mean satisfaction score (out of 10)" },
            { value: "8.92", label: "Compare worklist usefulness rating" },
          ],
        },
      },
      {
        type: "process",
        data: {
          title: "Design Process",
          phases: [
            { id: "needfinding", label: "Needfinding", icon: "🔍", title: "Needfinding", desc: "Interviewed UBC students about their course registration pain points. Identified key frustrations: scattered information, no comparison tools, and unclear prerequisite status.", methods: [] },
            { id: "conceptual-model", label: "Conceptual Model", icon: "🧠", title: "Conceptual Model", desc: "Mapped the registration workflow to online shopping: browse catalog, filter by requirements, compare options, add to cart, checkout. This familiar mental model reduced cognitive load.", methods: [] },
            { id: "lo-fi-prototype", label: "Lo-fi Prototype", icon: "✏️", title: "Lo-fi Prototype", desc: "Created paper and Canva wireframes of the browse-filter-compare-cart workflow. Tested with peers for initial feedback on layout and flow.", methods: [] },
            { id: "medium-fi-prototype", label: "Medium-fi Prototype", icon: "🎨", title: "Medium-fi Prototype", desc: "Built an interactive Figma prototype with detailed course cards, side-by-side comparison tables, prerequisite filters, and a shopping cart for course selection.", methods: [] },
            { id: "usability-study", label: "Usability Study", icon: "🧪", title: "Usability Study", desc: "Conducted think-aloud sessions with 6 graduating UBC students. Each session lasted 25-35 minutes with 7 structured tasks. Collected error counts, satisfaction ratings, and qualitative feedback.", methods: [] },
            { id: "analysis-and-iteration", label: "Analysis & Iteration", icon: "📊", title: "Analysis & Iteration", desc: "Ran thematic analysis on qualitative data. Identified strengths (intuitive flow, useful comparisons) and areas for improvement (cart vs worklist confusion, missing course descriptions).", methods: [] },
          ],
        },
      },
      {
        type: "methodology",
        data: {
          title: "Evaluation Method",
          text: "We used a think-aloud observation protocol combined with structured interviews. Participants completed 7 tasks spanning the full registration workflow: browsing courses, filtering by requirements, comparing sections, adding to worklist, and registering. We measured both quantitative metrics (error counts per task, satisfaction ratings on a 1-10 scale) and qualitative data through thematic analysis of participant comments.",
        },
      },
      {
        type: "metrics",
        data: {
          title: "Quantitative Results",
          items: [
            { label: "Overall satisfaction", value: "7.92 / 10" },
            { label: "Ease of finding courses", value: "7.92 / 10 (difficulty: 2.08)" },
            { label: "Feedback understandability", value: "7.08 / 10" },
            { label: "Compare worklist usefulness", value: "8.92 / 10" },
            { label: "Avg errors (browse/filter)", value: "1.5 per participant" },
            { label: "Avg errors (registration)", value: "0.17 per participant" },
          ],
        },
      },
      {
        type: "callout",
        data: {
          title: "Key Usability Findings",
          items: [
            "The shopping metaphor was immediately intuitive - all participants understood the browse-compare-cart workflow without instruction",
            "Prerequisites filter and worklist comparison were the most praised features, consistently rated as 'game-changing' by participants",
            "Users confused 'cart' vs 'worklist' terminology - the dual concept needs clearer labeling and visual distinction",
            "Missing course descriptions frustrated users who wanted to understand course content before adding to worklist",
            "Participants requested: degree navigator integration, timetable calendar syncing, grade distribution graphs, and color customization",
          ],
        },
      },
      {
        type: "impact",
        data: {
          title: "Impact & Takeaways",
          takeaways: [
            { insight: "Familiar metaphors reduce friction", detail: "Mapping a complex academic workflow to the familiar online shopping experience dramatically reduced the learning curve. Users navigated the interface with minimal errors on their first attempt." },
            { insight: "Comparison tools are essential", detail: "The side-by-side course comparison (rated 8.92/10) was the standout feature. Students currently compare courses by opening multiple browser tabs - a dedicated tool transforms this painful process." },
            { insight: "Terminology matters", detail: "The 'cart' vs 'worklist' confusion revealed how a single word choice can break an otherwise intuitive mental model. Academic contexts need careful vocabulary mapping." },
            { insight: "Iterative prototyping validates early", detail: "Moving from lo-fi to medium-fi caught major issues before high-fi development. The lo-fi round revealed navigation problems that were fixed before the Figma prototype." },
          ],
          skills: [
            "Think-Aloud Usability Testing",
            "Figma Prototyping",
            "Thematic Analysis",
            "Conceptual Model Design",
            "Iterative Design",
          ],
        },
      },
      {
        type: "links",
        data: {
          items: [
            { label: "Figma Prototype", url: "#", icon: "🎨" },
            { label: "Usability Report", url: "#", icon: "📄" },
          ],
        },
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════
     9 - Serene Skies: Aviation CO2 Emissions & the Pandemic
     ═══════════════════════════════════════════════════════════ */
  9: {
    id: 9,
    subtitle: "Forecasting aviation emissions using GAM modeling and pandemic data",
    role: "Lead Researcher & Data Analyst",
    duration: "Academic Term",
    team: "Noor Naila Imtinan Himam",
    tools: ["R", "GAM (mgcv)", "IEA Data", "IPCC Emission Factors"],
    sections: [
      {
        type: "overview",
        data: {
          text: "Serene Skies investigates whether the COVID-19 pandemic's disruption to global aviation created a lasting shift in CO2 emission trajectories. Using Generalized Additive Models (GAM) on IEA historical data from 2000-2022, the study forecasts 2030 aviation emissions at 927 MtCO2 - below the IEA's Net Zero Emissions target of 954 MtCO2. A pre-pandemic model using only 2000-2019 data predicted 1,347 MtCO2, well above the target.",
        },
      },
      {
        type: "problem",
        data: {
          title: "Research Context",
          text: "Aviation accounts for roughly 2.5% of global CO2 emissions and is one of the hardest sectors to decarbonize. When COVID-19 grounded flights worldwide, global air traffic dropped 43.7%, leading to a 14.3% decline in aviation CO2 emissions. This unprecedented disruption raised a critical question: did the pandemic permanently alter the emission trajectory, or will emissions rebound to pre-pandemic projections?",
          stats: [
            { value: "43.7%", label: "Drop in global air traffic during COVID-19" },
            { value: "927", label: "MtCO2 forecasted for 2030 (post-pandemic model)" },
            { value: "4.05%", label: "Model error rate (MAPE)" },
          ],
        },
      },
      {
        type: "process",
        data: {
          title: "Research Process",
          phases: [
            { id: "data-collection", label: "Data Collection", icon: "📊", title: "Data Collection", desc: "Compiled IEA historical aviation CO2 data (2000-2022) in MtCO2 per year. Validated using IEA's Tier 1 approach with IPCC emission factors.", methods: [] },
            { id: "model-selection", label: "Model Selection", icon: "🧠", title: "Model Selection", desc: "Chose Generalized Additive Models (GAM) for their ability to capture non-linear relationships in time-series data without imposing rigid parametric assumptions.", methods: [] },
            { id: "dual-modeling", label: "Dual Modeling", icon: "📈", title: "Dual Modeling", desc: "Built two GAM models: post-pandemic (2000-2022 data including the disruption) and pre-pandemic (2000-2019 data only) to compare trajectories.", methods: [] },
            { id: "forecasting", label: "Forecasting", icon: "🔮", title: "Forecasting", desc: "Extended both models to forecast 2030 emissions. Compared predictions against the IEA's Net Zero Emissions (NZE) scenario target of 954.22 MtCO2.", methods: [] },
            { id: "validation", label: "Validation", icon: "✅", title: "Validation", desc: "Assessed model accuracy using Mean Absolute Error (MAE) and Mean Absolute Percentage Error (MAPE). Both models achieved MAPE below the 10% threshold.", methods: [] },
          ],
        },
      },
      {
        type: "metrics",
        data: {
          title: "Model Comparison",
          items: [
            { label: "Post-pandemic forecast (2030)", value: "927 MtCO2" },
            { label: "Pre-pandemic forecast (2030)", value: "1,347 MtCO2" },
            { label: "IEA NZE target (2030)", value: "954 MtCO2" },
            { label: "Post-pandemic MAPE", value: "4.05%" },
            { label: "Pre-pandemic MAPE", value: "0.88%" },
            { label: "Difference between models", value: "420 MtCO2" },
          ],
        },
      },
      {
        type: "callout",
        data: {
          title: "Key Findings",
          items: [
            "The post-pandemic model forecasts 2030 emissions below the IEA Net Zero target - suggesting the pandemic created a lasting downward shift",
            "Without the pandemic disruption, the pre-pandemic model predicts emissions 41% above the NZE target by 2030",
            "The 420 MtCO2 gap between models represents the pandemic's structural impact on aviation emission trajectories",
            "Model limitation: using only 'year' as the independent variable overlooks GDP, regulation changes, and travel demand patterns",
          ],
        },
      },
      {
        type: "impact",
        data: {
          title: "Conclusions & Implications",
          takeaways: [
            { insight: "Pandemic as inflection point", detail: "COVID-19 didn't just temporarily reduce emissions - it may have permanently altered the growth trajectory of aviation CO2. Behavioral shifts (remote work, virtual conferences) and airline fleet modernization appear to have lasting effects." },
            { insight: "Paris Agreement within reach", detail: "The post-pandemic trajectory suggests aviation's contribution to climate targets is achievable, but only if current trends in efficiency and behavioral change are sustained through policy support." },
            { insight: "GAM for policy analysis", detail: "Generalized Additive Models proved effective for capturing the non-linear impact of major disruptions on emission trends, offering a flexible forecasting tool for climate policy analysis." },
            { insight: "Beyond the model", detail: "Future work should incorporate GDP, fuel prices, regulatory changes, and sustainable aviation fuel adoption as additional predictors to improve forecast accuracy." },
          ],
          skills: [
            "GAM Modeling (R/mgcv)",
            "Time-Series Analysis",
            "Climate Data Science",
            "IEA/IPCC Frameworks",
            "Policy Analysis",
            "Academic Writing",
          ],
        },
      },
      {
        type: "links",
        data: {
          items: [
            { label: "Full Research Paper", url: "#", icon: "📄" },
          ],
        },
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════
     10 - Urban Biodiversity & Emotion Regulation in Jakarta
     ═══════════════════════════════════════════════════════════ */
  10: {
    id: 10,
    subtitle: "Research proposal on biodiversity exposure and mental health in a Global South megacity",
    role: "Lead Researcher & Proposal Author",
    duration: "Academic Term",
    team: "Noor Naila Imtinan Himam",
    tools: ["GIS/Satellite Imagery", "ERQ", "FFMQ", "ANOVA", "Multiple Regression"],
    sections: [
      {
        type: "overview",
        data: {
          text: "This research proposal examines the relationship between urban biodiversity exposure and emotion regulation strategies - specifically cognitive reappraisal and mindfulness - in Jakarta, Indonesia. The study compares high- and low-biodiversity neighborhoods, investigating both perceived and actual biodiversity while controlling for urban stressors like pollution, noise, and crowding. It aims to inform urban planning and nature-based mental health interventions in Global South cities.",
        },
      },
      {
        type: "problem",
        data: {
          title: "Research Gap",
          text: "Most research on nature and mental health comes from Western, high-income countries. Jakarta - a megacity of 10+ million with pressing mental health concerns and rapidly shrinking green spaces - represents a critically understudied context. Existing studies also tend to measure objective biodiversity (species counts) rather than perceived biodiversity (what people actually notice and experience), potentially missing the psychological mechanism through which nature affects well-being.",
          stats: [
            { value: "200", label: "Planned participants (stratified sampling)" },
            { value: "3", label: "Hypotheses tested" },
            { value: "10M+", label: "Jakarta population" },
          ],
        },
      },
      {
        type: "process",
        data: {
          title: "Proposed Methodology",
          phases: [
            { id: "site-selection", label: "Site Selection", icon: "📍", title: "Site Selection", desc: "Identify high- and low-biodiversity districts in Jakarta using satellite imagery and existing ecological surveys. Control for socioeconomic status across sites.", methods: [] },
            { id: "observed-biodiversity", label: "Observed Biodiversity", icon: "🌿", title: "Observed Biodiversity", desc: "Measure actual biodiversity through field counts, satellite imagery analysis, and GIS mapping of green spaces within participant neighborhoods.", methods: [] },
            { id: "perceived-biodiversity", label: "Perceived Biodiversity", icon: "🧠", title: "Perceived Biodiversity", desc: "Administer questionnaires measuring participants' subjective experience of nature variety and abundance in their daily environments.", methods: [] },
            { id: "emotion-regulation", label: "Emotion Regulation", icon: "🧘", title: "Emotion Regulation", desc: "Assess cognitive reappraisal using the Emotion Regulation Questionnaire (ERQ) and mindfulness using the Five Facet Mindfulness Questionnaire (FFMQ).", methods: [] },
            { id: "urban-stressors", label: "Urban Stressors", icon: "🏙️", title: "Urban Stressors", desc: "Measure noise (decibel meters), air pollution (PM2.5 sensors), and population density as potential mediating variables.", methods: [] },
            { id: "analysis", label: "Analysis", icon: "📊", title: "Analysis", desc: "Use ANOVA for group comparisons, multiple regression for predictive relationships, and mediation analysis to test whether urban stressors dampen biodiversity-emotion regulation links.", methods: [] },
          ],
        },
      },
      {
        type: "callout",
        data: {
          title: "Research Hypotheses",
          items: [
            "H1: Higher perceived biodiversity is linked to greater use of cognitive reappraisal and mindfulness strategies",
            "H2: Perceived biodiversity will show a stronger connection to emotion regulation than objectively observed biodiversity",
            "H3: Urban stressors (noise, pollution, crowding) will weaken the association between biodiversity and emotion regulation",
          ],
        },
      },
      {
        type: "methodology",
        data: {
          title: "Why Jakarta?",
          text: "Jakarta offers a unique research context: extreme urban density, significant socioeconomic stratification, pressing mental health challenges, and dramatic variation in green space access across neighborhoods. Unlike Western cities where most nature-mental health research is conducted, Jakarta represents the lived reality for billions of people in rapidly urbanizing Global South megacities. Findings here could directly inform green infrastructure investment and community mental health programs.",
        },
      },
      {
        type: "impact",
        data: {
          title: "Expected Contributions",
          takeaways: [
            { insight: "Perceived vs. observed biodiversity", detail: "If H2 is supported, it would shift the focus of urban greening initiatives from maximizing species counts to designing spaces that feel biodiverse to residents - a potentially more cost-effective approach." },
            { insight: "Global South evidence base", detail: "Contributing empirical data from a non-Western megacity addresses a critical gap in environmental psychology literature that currently over-represents European and North American contexts." },
            { insight: "Actionable urban planning insights", detail: "Results would directly inform Jakarta's green infrastructure investment decisions, helping prioritize which neighborhoods and what types of greening interventions would most benefit mental health." },
            { insight: "Nature-based mental health interventions", detail: "Understanding the biodiversity-emotion regulation link could support therapeutic programs that use structured nature exposure as a complement to traditional mental health treatment." },
          ],
          skills: [
            "Research Proposal Writing",
            "Environmental Psychology",
            "Quantitative Methods (ANOVA, Regression)",
            "GIS & Satellite Imagery",
            "Literature Review",
            "Cross-Cultural Research Design",
          ],
        },
      },
      {
        type: "links",
        data: {
          items: [
            { label: "Research Proposal", url: "#", icon: "📄" },
          ],
        },
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════
     11 - Water Quality in BC Salmon Creeks & Hatchery Rivers
     ═══════════════════════════════════════════════════════════ */
  11: {
    id: 11,
    subtitle: "Field ecology study comparing water quality across natural and hatchery salmon habitats",
    role: "Field Researcher & Data Analyst",
    duration: "Academic Term (BIOL 342)",
    team: "Christy Zhou, Kevin Phung, Noor Naila Imtinan Himam",
    tools: ["SPSS (MANOVA)", "Field Sampling Equipment", "CO2 Titration Kit", "Dissolved Oxygen Meter", "pH Meter"],
    sections: [
      {
        type: "overview",
        data: {
          text: "This field ecology study investigated water quality across natural salmon creeks and hatchery-managed rivers in Metro Vancouver. We measured six water quality parameters - pH, CO2, temperature, dissolved oxygen, salinity, and ammonia - at six locations including a control site (False Creek), a natural creek (Salish Creek), and four hatchery rivers. MANOVA analysis revealed significant differences across stream types, with hatchery creeks showing notably elevated ammonia levels.",
        },
      },
      {
        type: "problem",
        data: {
          title: "Research Context",
          text: "Pacific salmon are a keystone species in British Columbia, but their populations face mounting pressure from habitat degradation, climate change, and water quality decline. Hatcheries play a critical role in supplementing wild populations, yet the water quality of hatchery-managed streams is often assumed rather than measured. This study systematically compared water quality between natural and hatchery environments to identify management gaps.",
          stats: [
            { value: "6", label: "Sampling locations across Metro Vancouver" },
            { value: "6", label: "Water quality parameters measured" },
            { value: "p<0.001", label: "Significant MANOVA effect of location" },
          ],
        },
      },
      {
        type: "process",
        data: {
          title: "Field Research Process",
          phases: [
            { id: "site-selection", label: "Site Selection", icon: "📍", title: "Site Selection", desc: "Selected six sites representing three stream types: False Creek (marine control), Salish Creek (natural freshwater), and four hatchery rivers (Hoy Creek, Hyde Creek, Little Campbell, Tynehead).", methods: [] },
            { id: "field-sampling", label: "Field Sampling", icon: "🧪", title: "Field Sampling", desc: "Collected water samples at each site with 3 replicates at both upstream and downstream points. Measured in-situ using portable instruments.", methods: [] },
            { id: "measurements", label: "Measurements", icon: "📏", title: "Measurements", desc: "Recorded pH (Cergrey WQM-241), dissolved oxygen (EXTECH DO600), CO2 (titration kit), temperature, salinity (refractometer), and ammonia (Umleco test kit).", methods: [] },
            { id: "statistical-analysis", label: "Statistical Analysis", icon: "📊", title: "Statistical Analysis", desc: "Ran MANOVA in IBM SPSS v30.0 to test multivariate effects of location and stream type. Used Tamhane's T2 Post-Hoc Test due to unequal variances.", methods: [] },
            { id: "interpretation", label: "Interpretation", icon: "🔬", title: "Interpretation", desc: "Connected statistical findings to ecological processes - why hatcheries accumulate ammonia, why natural creeks have low oxygen, and implications for salmon health.", methods: [] },
          ],
        },
      },
      {
        type: "metrics",
        data: {
          title: "Key Measurements",
          items: [
            { label: "Hatchery ammonia (Hoy Creek)", value: "6.67 mg/L (highest)" },
            { label: "Natural creek CO2 (Salish)", value: "12.00 ppm (highest)" },
            { label: "Natural creek DO (Salish)", value: "6.20 mg/L (lowest)" },
            { label: "Control salinity (False Creek)", value: "24.33 ppt" },
            { label: "Hatchery CO2 range", value: "3.00-5.67 ppm (lowest)" },
            { label: "Upstream vs downstream", value: "No significant difference (all p>0.05)" },
          ],
        },
      },
      {
        type: "callout",
        data: {
          title: "Significant Statistical Findings",
          items: [
            "MANOVA: significant effect of location (p<0.001) and stream type (p<0.001) on overall water quality",
            "Hatchery ammonia significantly higher than natural streams (mean difference = 2.521, p<0.001) - likely from decaying salmon carcasses and waste accumulation",
            "Significant pairwise differences in pH, dissolved oxygen, and ammonia across stream types",
            "No significant upstream vs downstream differences at any site (all p>0.05), suggesting pollution sources are localized rather than flowing downstream",
            "Salish Creek's low dissolved oxygen (6.20 mg/L) and high CO2 (12.00 ppm) indicate organic matter remineralization and restricted water flow",
          ],
        },
      },
      {
        type: "impact",
        data: {
          title: "Conclusions & Implications",
          takeaways: [
            { insight: "Hatcheries need waste management", detail: "Elevated ammonia levels in hatchery streams indicate that decaying salmon carcasses and waste accumulate faster than natural processes can handle. Improved cleanup protocols would directly benefit salmon health and survival rates." },
            { insight: "Natural streams need restoration", detail: "Salish Creek's critically low dissolved oxygen and high CO2 suggest nutrient pollution and restricted water flow. Restoration efforts should focus on improving circulation and reducing organic matter inputs." },
            { insight: "Both approaches are critical", detail: "Neither hatchery management nor stream restoration alone is sufficient. Wild and hatchery salmon populations face different but equally urgent water quality challenges that require complementary strategies." },
            { insight: "Field methods matter", detail: "Using portable instruments with 3 replicates at upstream and downstream points provided robust data while maintaining feasibility. The methodology could be replicated across BC's extensive hatchery network for systematic monitoring." },
          ],
          skills: [
            "Field Water Sampling",
            "MANOVA (IBM SPSS)",
            "Tamhane's Post-Hoc Test",
            "Ecological Data Interpretation",
            "Scientific Writing",
            "Team-Based Field Research",
          ],
        },
      },
      {
        type: "links",
        data: {
          items: [
            { label: "Full Research Paper", url: "#", icon: "📄" },
          ],
        },
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════
     7 - UBC iGEM Wiki: Designing for Synthetic Biology Communication
     ═══════════════════════════════════════════════════════════ */
  7: {
    id: 7,
    subtitle: "Designing a competition wiki that makes complex biosynthesis research approachable",
    role: "UI/UX Designer",
    duration: "May - Nov 2023",
    team: "UBC iGEM 2023 Team",
    tools: ["Figma", "HTML/CSS", "Wiki Framework", "Science Communication"],
    sections: [
      {
        type: "overview",
        data: {
          text: "I designed the 2023 UBC iGEM competition wiki website for PILOT (Platformed Inteins: A Linked Orthogonal Toolkit) - a modular biosynthesis system for improving in vitro protein production. The challenge was translating dense synthetic biology research into an engaging, navigable web experience that could communicate the science to both judges and the general public.",
        },
      },
      {
        type: "problem",
        data: {
          title: "The Design Challenge",
          text: "iGEM wikis must present months of complex research - from molecular biology protocols to mathematical modeling - in a way that's both scientifically rigorous and visually engaging. PILOT involved cell-free protein synthesis, intein engineering, and bioreactor design. The wiki needed to serve multiple audiences: expert judges evaluating scientific depth, other iGEM teams looking for collaboration, and the public wanting to understand the project's real-world impact.",
          stats: [
            { value: "3", label: "Efficiency pillars to communicate" },
            { value: "10+", label: "Wiki pages designed" },
            { value: "2", label: "Audiences: judges & public" },
          ],
        },
      },
      {
        type: "process",
        data: {
          phases: [
            { id: "research", label: "Content Audit", icon: "🔍", title: "Understanding the Science", desc: "Worked closely with the wet lab, dry lab, and human practices teams to understand PILOT's three efficiency pillars: protein production, energy usage, and protein purification through intein engineering.", methods: ["Team Interviews", "Content Mapping"] },
            { id: "architecture", label: "Info Architecture", icon: "🗂️", title: "Structuring Complex Content", desc: "Organized the wiki into logical sections that follow the research narrative - from problem statement through methodology to results. Created clear navigation between interconnected topics.", methods: ["Information Architecture", "Card Sorting"] },
            { id: "design", label: "Visual Design", icon: "🎨", title: "Making Science Visual", desc: "Developed a visual language that balanced scientific accuracy with approachability. Used illustrations, diagrams, and consistent color coding to make molecular concepts tangible.", methods: ["Figma", "Visual Design", "Illustration"] },
            { id: "prototype", label: "Implementation", icon: "💻", title: "Building the Wiki", desc: "Translated designs into the iGEM wiki framework, ensuring responsive layouts, accessible typography, and smooth navigation across all pages.", methods: ["HTML/CSS", "Wiki Framework", "Responsive Design"] },
            { id: "review", label: "Review & Polish", icon: "✨", title: "Team Review & Iteration", desc: "Conducted review sessions with the full team to verify scientific accuracy of visual representations and ensure all content was properly integrated.", methods: ["Design Review", "Cross-Team Collaboration"] },
          ],
        },
      },
      {
        type: "callout",
        data: {
          title: "Key Design Decisions",
          items: [
            "Visual metaphors for molecular concepts - making intein self-cleavage and cell-free synthesis understandable through diagrams rather than text alone",
            "Progressive disclosure - allowing readers to explore high-level summaries before diving into technical protocols",
            "Consistent color-coded sections matching PILOT's three efficiency pillars for easy navigation",
            "Mobile-responsive layouts ensuring the wiki is accessible on any device during the competition jamboree",
          ],
        },
      },
      {
        type: "impact",
        data: {
          title: "What I Learned",
          takeaways: [
            { insight: "Science communication through design", detail: "Translating cell-free protein synthesis and intein engineering into visual narratives taught me how design can bridge the gap between expert knowledge and public understanding." },
            { insight: "Designing for dual audiences", detail: "Balancing scientific rigor for judges with approachability for the public required a layered information architecture - summary first, then detail on demand." },
            { insight: "Cross-disciplinary collaboration", detail: "Working with biologists, engineers, and modelers across the iGEM team taught me how to extract visual stories from highly technical research." },
            { insight: "Design under competition constraints", detail: "iGEM wikis have strict technical constraints (wiki framework, URL structure). Designing creatively within those limitations pushed my problem-solving skills." },
          ],
          skills: [
            "Science Communication Design",
            "Figma Prototyping",
            "Information Architecture",
            "Visual Storytelling",
            "Cross-Disciplinary Collaboration",
            "HTML/CSS",
          ],
        },
      },
      {
        type: "links",
        data: {
          items: [
            { label: "Live Wiki", url: "https://2023.igem.wiki/ubc-vancouver/", icon: "🌐" },
            { label: "Figma Design File", url: "https://www.figma.com/design/7pBzfGFklVCgWYkUc54Pue/iGEM-2023-Wiki-Design", icon: "🎨" },
          ],
        },
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════
     8 - Predicting Airbnb Popularity in NYC with Explainable ML
     ═══════════════════════════════════════════════════════════ */
  8: {
    id: 8,
    subtitle: "Using Random Forest and SHAP analysis to predict and explain Airbnb listing popularity",
    role: "Data Scientist & Author",
    duration: "Academic Project",
    team: "Noor Naila Imtinan Himam",
    tools: ["Python", "scikit-learn", "SHAP", "BayesSearchCV", "matplotlib", "seaborn"],
    sections: [
      {
        type: "overview",
        data: {
          text: "This machine learning project predicts how many reviews an Airbnb listing might receive per month using the 2019 NYC Airbnb dataset (48,895 listings, 16 features). Through iterative model development - from baseline DummyRegressor to an optimized Random Forest - and SHAP-based explainability analysis, the project transforms predictions into actionable strategies for hosts. The final model achieved R2 = 0.59, explaining 59% of the variance in listing popularity.",
        },
      },
      {
        type: "problem",
        data: {
          title: "The Problem",
          text: "With nearly 49,000 Airbnb listings in New York City, hosts face intense competition. Understanding what drives listing popularity - and being able to predict it - could help hosts optimize their profiles and help Airbnb improve its recommendation engine. But popularity depends on a complex mix of location, pricing, availability, and guest feedback, making simple heuristics insufficient.",
          stats: [
            { value: "48,895", label: "Airbnb listings in the dataset" },
            { value: "16", label: "Features analyzed" },
            { value: "R2=0.59", label: "Final model accuracy" },
          ],
        },
      },
      {
        type: "process",
        data: {
          phases: [
            { id: "eda", label: "EDA", icon: "📊", title: "Exploratory Data Analysis", desc: "Analyzed price distributions across boroughs (Manhattan median ~$150, Bronx ~$65), availability patterns, room type preferences, and correlations between features and review counts.", methods: ["Violin Plots", "Correlation Analysis", "Distribution Analysis"] },
            { id: "baseline", label: "Baseline", icon: "📏", title: "Establishing a Baseline", desc: "Started with a DummyRegressor (mean strategy) as baseline: MAE 1.15, R2 -3.33 (worse than guessing). This set the floor for meaningful model improvement.", methods: ["DummyRegressor", "Baseline Metrics"] },
            { id: "linear", label: "Linear Models", icon: "📈", title: "Ridge Regression", desc: "Applied Ridge Regression with GridSearchCV over alpha values. Achieved MAE 0.81, R2 0.38 - a significant improvement but with room to grow.", methods: ["Ridge Regression", "GridSearchCV", "Cross-Validation"] },
            { id: "comparison", label: "Model Comparison", icon: "🔄", title: "Comparing Advanced Models", desc: "Tested KNN Regressor (CV MSE: 1.49), SVR (CV MSE: 1.44), and Random Forest (CV MSE: 1.20). Random Forest clearly outperformed the alternatives.", methods: ["KNN", "SVR", "Random Forest", "CV Comparison"] },
            { id: "optimization", label: "Optimization", icon: "⚡", title: "Bayesian Hyperparameter Tuning", desc: "Used BayesSearchCV on Random Forest (n_estimators: 115, max_depth: 14, max_features: sqrt). Best CV MSE: 1.13.", methods: ["BayesSearchCV", "Hyperparameter Tuning"] },
            { id: "explain", label: "Explainability", icon: "🔍", title: "SHAP Feature Importance", desc: "Applied SHAP TreeExplainer to understand which features drive predictions. Number of reviews, minimum nights, and availability were the top drivers - not price or location.", methods: ["SHAP", "TreeExplainer", "Feature Importance"] },
          ],
        },
      },
      {
        type: "metrics",
        data: {
          title: "Final Model Performance",
          items: [
            { label: "Mean Absolute Error (MAE)", value: "0.578" },
            { label: "Mean Squared Error (MSE)", value: "0.986" },
            { label: "Root MSE (RMSE)", value: "0.993" },
            { label: "R-squared (R2)", value: "0.593" },
            { label: "Best model", value: "Random Forest (optimized)" },
            { label: "Optimization method", value: "BayesSearchCV" },
          ],
        },
      },
      {
        type: "callout",
        data: {
          title: "SHAP-Driven Insights for Hosts",
          items: [
            "Number of existing reviews is the most impactful feature - encouraging guest reviews creates a compounding popularity effect",
            "Shorter minimum night requirements drive more bookings - flexibility attracts more guests",
            "Year-round availability strongly correlates with more reviews - maximizing your calendar pays off",
            "Location and price had surprisingly lower impact than expected - it's more about listing behavior than geography",
            "Explainable AI (SHAP) transforms a black-box model into actionable business recommendations",
          ],
        },
      },
      {
        type: "impact",
        data: {
          title: "What I Learned",
          takeaways: [
            { insight: "Iterative model development", detail: "Progressing from baseline to Ridge to Random Forest with Bayesian optimization showed how each step provides meaningful improvement - and when to stop iterating." },
            { insight: "Explainability > accuracy alone", detail: "A model that explains 59% of variance but reveals actionable insights (via SHAP) is more valuable than a marginally better black-box model." },
            { insight: "Feature engineering matters", detail: "The dataset lacked temporal and seasonal features, limiting accuracy. Understanding what data you don't have is as important as modeling what you do." },
            { insight: "Writing for a technical audience", detail: "Publishing the analysis on Medium taught me to balance technical depth with readability - making data science accessible without oversimplifying." },
          ],
          skills: [
            "scikit-learn (RF, Ridge, KNN, SVR)",
            "SHAP Explainability",
            "BayesSearchCV",
            "Exploratory Data Analysis",
            "Technical Writing (Medium)",
            "Python Data Science Stack",
          ],
        },
      },
      {
        type: "links",
        data: {
          items: [
            { label: "Medium Article", url: "https://medium.com/@noornaila04/predicting-the-popularity-of-airbnb-listing-in-nyc-af4a5155e637", icon: "📝" },
          ],
        },
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════
     13 - Satellite Imagery for Household Water Quality Estimation
     ═══════════════════════════════════════════════════════════ */
  13: {
    id: 13,
    subtitle: "Using Random Forest on satellite data to predict regional water quality for SDG #6",
    role: "Data Scientist",
    duration: "BizInnovate Datathon 2023 (Pacific Conference on AI, UBC)",
    team: "Permika Gurlies: Naila Himam, Clarissa Dahjan, Moira Renata, Tiffany Prayitno",
    tools: ["R", "Python", "Jupyter Notebook", "Google Colab", "Random Forest", "PCA"],
    sections: [
      {
        type: "overview",
        data: {
          text: "At the BizInnovate 2023 Datathon hosted by the Pacific Conference on Artificial Intelligence at UBC, our team tackled a sustainability challenge: estimating the water quality index of a given region using satellite imagery and household-level water quality data. Using Random Forest on satellite-derived features, we achieved 74.3% accuracy and proposed additional KPIs (sanitation, hygiene, population indices) for comprehensive water quality monitoring aligned with SDG #6.",
        },
      },
      {
        type: "problem",
        data: {
          title: "The Challenge",
          text: "Clean water access remains one of the most pressing global challenges. Traditional water quality monitoring requires expensive on-site testing that doesn't scale to remote or underserved regions. The datathon posed three challenges: (1) predict regional water quality from satellite imagery and household data, (2) propose additional KPIs beyond water quality index, and (3) pitch the solution to venture capitalists for sustainability investment.",
          stats: [
            { value: "74.3%", label: "Best model accuracy (Kaggle submission)" },
            { value: "70%", label: "Data from rural areas" },
            { value: "SDG #6", label: "Clean Water and Sanitation" },
          ],
        },
      },
      {
        type: "process",
        data: {
          phases: [
            { id: "eda", label: "Exploration", icon: "📊", title: "Exploratory Analysis", desc: "Analyzed the satellite imagery features and household water quality data. Identified key patterns and correlations between satellite-derived variables and water quality indices.", methods: ["Correlation Analysis", "Distribution Plots"] },
            { id: "pca", label: "PCA", icon: "🔬", title: "Principal Component Analysis", desc: "Applied PCA to reduce dimensionality of satellite features while retaining maximum variance. Identified which spectral bands and geographic features contributed most to water quality prediction.", methods: ["PCA", "Feature Selection"] },
            { id: "feature", label: "Feature Eng.", icon: "⚡", title: "Feature Importance via Random Forest", desc: "Used Random Forest feature importance and Geographically Weighted Regression to select the most predictive variables for the final model.", methods: ["RF Feature Importance", "GWR"] },
            { id: "model", label: "Modeling", icon: "🤖", title: "Random Forest Model", desc: "Chose Random Forest for its ability to handle mixed feature types and high dimensionality. Achieved 74.1% on first attempt, improved to 74.3% through feature engineering.", methods: ["Random Forest", "Cross-Validation"] },
            { id: "kpi", label: "KPIs", icon: "📋", title: "Additional KPI Proposal", desc: "Proposed Sanitation/Hygiene Index (based on WASH framework) and Population Index as complementary KPIs, recognizing that water quality depends on sanitation infrastructure and population pressure.", methods: ["WASH Framework", "Literature Review"] },
            { id: "pitch", label: "VC Pitch", icon: "🎤", title: "Investor Pitch", desc: "Developed a business case for VCs: the algorithm narrows down low-quality regions for targeted R&D investment, with long-run sustainability impact aligned with SDG #6.", methods: ["Business Case", "Impact Analysis"] },
          ],
        },
      },
      {
        type: "callout",
        data: {
          title: "Key Insights",
          items: [
            "Random Forest achieved 74.3% accuracy on Kaggle - strong given the noisy satellite data and rural-dominant (70%) dataset",
            "Score plateaued at 0.74-0.76 regardless of tuning, suggesting the ceiling was driven by data quality rather than model limitations",
            "Satellite imagery alone can serve as a scalable proxy for water quality monitoring in regions without ground-level testing infrastructure",
            "Additional KPIs (sanitation, hygiene, population) provide a more comprehensive sustainability picture than water quality index alone",
            "High investment risk in short-run, but long-run implications yield overall increase in water quality and world sustainability",
          ],
        },
      },
      {
        type: "impact",
        data: {
          title: "What I Learned",
          takeaways: [
            { insight: "Satellite data as sustainability tool", detail: "Remote sensing can democratize environmental monitoring, giving organizations the ability to assess water quality across vast regions without expensive on-site testing." },
            { insight: "Data quality drives model ceiling", detail: "Our score plateau at 0.74-0.76 taught me that no amount of model tuning can compensate for fundamental data quality limitations. Knowing when to stop optimizing and start looking at the data is critical." },
            { insight: "Cross-disciplinary problem solving", detail: "Combining machine learning with sustainability science and business pitching showed how technical skills become impactful only when connected to real-world problems and stakeholder communication." },
            { insight: "Competition under pressure", detail: "The datathon format forced rapid iteration and decision-making. Learning to prioritize and ship under time pressure is a skill that transfers to any research or product context." },
          ],
          skills: [
            "Random Forest (R & Python)",
            "Principal Component Analysis",
            "Satellite Image Feature Extraction",
            "Sustainability Analytics (SDG #6)",
            "Data Pitch & Communication",
          ],
        },
      },
      {
        type: "links",
        data: {
          items: [
            { label: "Datathon Slides", url: "#", icon: "📊" },
          ],
        },
      },
    ],
  },

  /* ═══════════════════════════════════════════════════════════
     14 - Fiber Optics: How UBC Research Makes Your Internet Faster
     ═══════════════════════════════════════════════════════════ */
  14: {
    id: 14,
    subtitle: "Science journalism article and podcast translating optical fiber research for public audiences",
    role: "Science Journalist & Podcast Producer",
    duration: "Academic Term (SCIE 300)",
    team: "Noor Naila Imtinan Himam",
    tools: ["Notion", "Podcast Production", "Interview Techniques", "Science Communication"],
    sections: [
      {
        type: "overview",
        data: {
          text: "This science journalism project tells the story of a UBC researcher working to make internet connections faster and cheaper through optical fiber optimization. Through an in-depth interview-based article and a companion podcast episode, the project translates complex photonics research into an accessible narrative for public audiences. The challenge was to bridge the gap between highly technical lab research and the everyday experience of using the internet.",
        },
      },
      {
        type: "problem",
        data: {
          title: "The Communication Gap",
          text: "Optical fiber research is foundational to the internet infrastructure billions of people depend on daily, yet the scientists doing this work are largely invisible to the public. Technical papers on photonics, signal processing, and fiber amplification are impenetrable to non-specialists. This project aimed to make one researcher's work tangible and relatable by connecting lab discoveries to the everyday experience of streaming, video calling, and browsing.",
          stats: [
            { value: "1", label: "UBC researcher profiled" },
            { value: "2", label: "Media formats (article + podcast)" },
            { value: "99%", label: "Internet traffic carried by fiber optics" },
          ],
        },
      },
      {
        type: "process",
        data: {
          phases: [
            { id: "research", label: "Background", icon: "📚", title: "Understanding the Science", desc: "Studied the fundamentals of optical fiber technology, signal amplification, and the specific optimization techniques the researcher was exploring. Built enough technical foundation to ask meaningful interview questions.", methods: ["Literature Review", "Technical Background"] },
            { id: "interview", label: "Interview", icon: "🎙️", title: "Researcher Interview", desc: "Conducted an in-depth interview with the UBC researcher, asking about their motivation, methodology, key discoveries, and the real-world implications of their work for internet speed and cost.", methods: ["Semi-Structured Interview", "Active Listening"] },
            { id: "writing", label: "Article", icon: "✍️", title: "Writing for Public Audiences", desc: "Crafted the article using metaphors and analogies to make photonics concepts tangible. Structured the narrative around the researcher's journey rather than the technical details.", methods: ["Narrative Writing", "Metaphor Development"] },
            { id: "podcast", label: "Podcast", icon: "🎧", title: "Podcast Production", desc: "Produced a companion podcast episode featuring interview clips, narration, and sound design. Adapted the written narrative for audio storytelling with pacing and tone adjustments.", methods: ["Audio Editing", "Sound Design", "Narration"] },
            { id: "review", label: "Review", icon: "✅", title: "Accuracy Review", desc: "Sent drafts back to the researcher for scientific accuracy review, ensuring metaphors and simplifications didn't misrepresent the research.", methods: ["Fact-Checking", "Expert Review"] },
          ],
        },
      },
      {
        type: "callout",
        data: {
          title: "Science Communication Approach",
          items: [
            "Led with 'why it matters' - connecting fiber optics research to everyday internet experiences before introducing technical concepts",
            "Used the 'internet superhighway' metaphor to make fiber optics tangible - light pulses as cars, amplifiers as rest stops",
            "Structured the article around the researcher's personal story and motivation, not just their findings",
            "Dual-format delivery (article + podcast) reached different audience segments with different content consumption preferences",
            "Accuracy review with the researcher ensured simplifications didn't distort the science",
          ],
        },
      },
      {
        type: "impact",
        data: {
          title: "What I Learned",
          takeaways: [
            { insight: "Metaphors are bridges, not shortcuts", detail: "The best science communication metaphors don't just simplify - they create conceptual bridges that allow readers to build genuine understanding. The 'internet superhighway' metaphor worked because it mapped accurately to how fiber networks actually function." },
            { insight: "Interview as research method", detail: "Conducting a researcher interview taught me that the most compelling science stories emerge not from what scientists discover, but from why they care. Personal motivation makes complex research human and relatable." },
            { insight: "Multi-format storytelling", detail: "Adapting the same story for written and audio formats required rethinking structure, pacing, and emphasis. What works on the page doesn't always work in the ear - and vice versa." },
            { insight: "The responsibility of translation", detail: "Simplifying without distorting is a genuine skill. Every metaphor and analogy carries risk of misrepresentation, making accuracy review with the source researcher essential." },
          ],
          skills: [
            "Science Journalism",
            "Interview Techniques",
            "Podcast Production",
            "Narrative Science Writing",
            "Metaphor & Analogy Development",
            "Fact-Checking & Expert Review",
          ],
        },
      },
      {
        type: "links",
        data: {
          items: [
            { label: "Article (Notion)", url: "https://www.notion.so/172e5848545b80a5826bc058cdf288bc", icon: "📝" },
            { label: "Podcast Episode", url: "#", icon: "🎧" },
          ],
        },
      },
    ],
  },
};

