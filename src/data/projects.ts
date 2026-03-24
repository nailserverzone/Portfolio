export interface Project {
  id: number;
  title: string;
  field: string;
  tags: string[];
  desc: string;
  finding: string;
  skills: string[];
  links: Record<string, string>;
}

export const PROJECTS: Project[] = [
  /* ── RESEARCH + UI/UX + DESIGN ── */
  { id:1, title:"Working Memory & Binaural Beats: An Experimental Study", field:"Cognitive Psychology", tags:["RESEARCH","PROJECT MANAGEMENT"], desc:"Investigated how binaural beats affect working memory in 64 participants across 4 groups. Beta waves (12-30 Hz) significantly improved capacity (p=0.01).", finding:"Binaural beats meaningfully enhance cognitive performance.", skills:["Experimental Design","SPSS","Scientific Writing","Survey Design"], links:{abstract:"https://abstracts.societyforscience.org/Home/FullAbstract?Category=Any%20Category&FinalistLastName=himam&IsGetAllAbstracts=True&FairCountry=Any%20Country&FairState=Any%20State&SelectedIsefYears%5B0%5D=0&SelectedIsefYears%5B1%5D=2021&SelectedIsefYears%5B2%5D=2020&projectId=20478",poster:"#"} },
  { id:2, title:"Wrapped: Productivity App UX Study & Emotional Trajectories", field:"Usability & Emotional UX", tags:["RESEARCH","UI/UX","DESIGN","PROJECT MANAGEMENT"], desc:"Multi-phase study on a consolidated productivity mobile app. Lo-fi to hi-fi prototyping with structured usability experiments measuring emotional trajectories.", finding:"Emotional trajectories directly inform design improvements.", skills:["Research Design","Thematic Analysis","Figma Prototyping","Usability Testing"], links:{prototype:"#",process:"#"} },
  { id:3, title:"Co-Designing Touch Interactions for CHORA, an Affective Haptic Robot", field:"Participatory Design", tags:["RESEARCH","UI/UX","DESIGN"], desc:"Workshop study on designing interactions for affective haptic companion robots. Co-designed zoomorphic interaction scenarios revealing needs around emotion regulation.", finding:"Bottom-up approaches reveal needs users can't articulate until prompted.", skills:["Workshop Facilitation","Qualitative Analysis","Journey Mapping"], links:{poster:"#",report:"#"} },
  { id:4, title:"ShopiVi: Voice-Assisted Shopping for the Visually Impaired", field:"Accessible Design", tags:["UI/UX","DESIGN","PROJECT MANAGEMENT"], desc:"Voice assistant Chrome extension for accessible shopping - audio product descriptions for visually impaired shoppers. 3rd Place at Girlcode x Aritzia Hackathon.", finding:"Accessibility-first design creates better experiences for everyone.", skills:["Rapid Prototyping","Accessible UX","Pitch Design"], links:{project:"#"} },
  { id:5, title:"Optimizing Comedy Robots: A Systematic Review of AI & Performance", field:"Human-Robot Interaction", tags:["RESEARCH"], desc:"Systematic review on effectiveness and applicability of comedy robots. Found effective robot comedy requires NLP + RL + gaze coordination.", finding:"Best comedy robots combine AI with human performative techniques.", skills:["Systematic Review","Critical Analysis"], links:{report:"#"} },
  { id:6, title:"Course Shop: Reimagining UBC Registration as Online Shopping", field:"UX Redesign", tags:["UI/UX","DESIGN","PROJECT MANAGEMENT"], desc:"Optimizing UBC course registration by reimagining it as a shopping experience. Iterative lo-fi to hi-fi prototyping with usability testing.", finding:"Shopping metaphors make complex academic workflows intuitive.", skills:["Iterative Prototyping","Usability Testing"], links:{prototype:"#",report:"#"} },
  { id:7, title:"UBC iGEM Wiki: Designing for Synthetic Biology Communication", field:"Science Communication", tags:["UI/UX","DESIGN"], desc:"Designed 2023 UBC iGEM competition wiki website for PILOT - a platformed inteins biosynthesis toolkit.", finding:"Design for science: making complexity approachable.", skills:["Figma","SciComm","Collaboration"], links:{website:"#"} },
  { id:8, title:"Predicting Airbnb Popularity in NYC with Explainable ML", field:"Machine Learning", tags:["AI/ML","RESEARCH"], desc:"Predicting popularity of Airbnb listings in NYC using Random Forest (R2=0.59). SHAP analysis revealed key popularity drivers.", finding:"Explainable AI transforms predictions into strategies.", skills:["scikit-learn","SHAP","Medium Writing"], links:{article:"#"} },
  { id:9, title:"Serene Skies: Aviation CO2 Emissions & the Pandemic Effect", field:"Climate Data Science", tags:["AI/ML","RESEARCH"], desc:"Evaluating the role of aviation travel bans on CO2 emissions during the pandemic. GAM forecast: 927 MtCO2 by 2030.", finding:"Global disruptions reshape emission trajectories.", skills:["GAM Modeling","Policy Analysis"], links:{report:"#"} },
  { id:10, title:"Urban Biodiversity & Emotion Regulation in Jakarta", field:"Environmental Psychology", tags:["RESEARCH"], desc:"Examining how urban biodiversity exposure influences emotion regulation in Jakarta, a megacity context.", finding:"Perceived biodiversity matters more than objective measures.", skills:["Proposal Writing","Literature Review"], links:{proposal:"#"} },
  { id:11, title:"Water Quality in BC Salmon Creeks & Hatchery Rivers", field:"Field Ecology", tags:["RESEARCH"], desc:"Water quality observations in natural salmon creeks and hatchery rivers across Metro Vancouver. MANOVA statistical analysis.", finding:"Both hatchery management and stream restoration are critical.", skills:["Field Sampling","MANOVA"], links:{report:"#"} },
  { id:12, title:"Bincang Riset: Research Knowledge Webinar Series for Indonesia", field:"Research Outreach", tags:["RESEARCH","PROJECT MANAGEMENT"], desc:"Nationwide webinar series to spread research knowledge - 3-part series reaching 300+ participants across Indonesia.", finding:"Knowledge grows fastest when shared across levels.", skills:["Event Design","Public Speaking"], links:{video:"#"} },
  { id:13, title:"Satellite Imagery for Household Water Quality Estimation", field:"Satellite ML", tags:["AI/ML","RESEARCH","PROJECT MANAGEMENT"], desc:"Estimating water quality index of households in a region using Random Forest on satellite imagery. 74.3% accuracy.", finding:"Satellite imagery: scalable sustainability monitoring.", skills:["ML in R & Python"], links:{report:"#"} },
  { id:14, title:"Fiber Optics: How UBC Research Makes Your Internet Faster", field:"Science Journalism", tags:["RESEARCH"], desc:"How a UBC researcher makes your connection faster and cheaper - article + podcast on optical fiber optimization.", finding:"Metaphors bridge lab research and public understanding.", skills:["SciComm","Podcast Production"], links:{article:"#",podcast:"#"} },
  { id:15, title:"Featured Talks & Webinars on Research and Innovation", field:"Public Speaking", tags:["RESEARCH","PROJECT MANAGEMENT"], desc:"Collection of featured talks and webinars across academic and public audiences on research topics and innovation.", finding:"Communicating research builds bridges between academia and public.", skills:["Public Speaking","Event Design"], links:{video:"#"} },
  { id:16, title:"Graphic Design: Visual Identity & Communication Design", field:"Graphic Design", tags:["DESIGN"], desc:"Collection of graphic design work spanning event posters, social media, brand identity, data visualizations, and web design across academic and professional projects.", finding:"Design is thinking made visual.", skills:["Figma","Canva","CorelDraw","Photoshop","Graphic Design"], links:{} },
];

export const SKILL_CARDS = [
  { name:"Research Design", hp:90, type:"RESEARCH", icon:"🔬", moves:["User Interview","Ethnography","Usability Testing","RCTs","Observation Study","Survey Study","Workshop Study"] },
  { name:"UX Prototyping", hp:80, type:"DESIGN", icon:"🎨", moves:["Figma","Canva","CorelDraw","Photoshop","3D Design","SketchUp","UX Prototyping","Graphic Design"] },
  { name:"Technical Skill", hp:50, type:"AI/ML", icon:"🤖", moves:["Robotics","Arduino IDE","Python","Java","JavaScript","HTML/CSS","R"] },
  { name:"Public Speaking", hp:70, type:"COMM", icon:"📢", moves:["Academic Presentation","Poster Presentation","Motivational Public Speaking"] },
  { name:"Project Mgmt", hp:85, type:"LEAD", icon:"📋", moves:["Research Management","Product Management","Excel","Trello","Notion","AI"] },
  { name:"Stats Analysis", hp:80, type:"STATS", icon:"📊", moves:["SPSS","R","Python","Descriptive Statistics","Correlation","Predictive Analysis","Thematic Analysis","Affinity Diagram","Miro","Excel"] },
];

export const TAG_COLORS: Record<string, string> = {
  RESEARCH: "#687b3d",
  "UI/UX": "#d64479",
  "AI/ML": "#7596c8",
  DESIGN: "#fdba2f",
  "PROJECT MANAGEMENT": "#f8b1aa",
  COMM: "#7ddbf4",
  LEAD: "#f8b1aa",
  STATS: "#6819ce",
};

export const LINK_LABELS: Record<string, string> = {
  report:"Report", abstract:"Abstract", prototype:"Prototype", process:"Process",
  proposal:"Proposal", website:"Website", video:"Video",
  poster:"Poster", article:"Article", podcast:"Podcast", project:"Project",
};

export const CAT_MESSAGES = [
  "Click the monitor!",
  "Open the card pack! 🎴",
  "*purrs*",
  "Check the photo!",
  "Type 'secret' in terminal~",
  "Browse the books!",
];

export const FUN_FACTS = [
  "I presented to the ISEF board!",
  "20+ vinyl records in my collection",
  "ARMY since 2019 💜",
  "300+ webinar attendees",
  "I collect holographic Pokémon cards",
  "I've done fieldwork in salmon creeks!",
];
