const projects = [
  {
    title: "Athlytics",
    slug: "athlytics",
    image: "/projects/athlytic.png",
    description: "AI-powered sports stat breakdowns.",
    tags: ["React", "Flask", "NBA API", "AI"],
    content: `
Athlytic is a full-stack NBA analytics dashboard designed for data lovers, fantasy players, and hoop heads.

🏀 Key Features:
- Player search with real-time stat cards
- Flask backend scraping NBA_API and Basketball Reference
- React frontend with Tailwind UI and Framer Motion
- Advanced metrics: USG%, EFG%, NET_RATING, and more
- AI blurbs generated from raw stats and award history

🧠 What I Learned:
- Flask REST APIs + React integration
- Building persistent caches to reduce fetch time
- Using Selenium for award scraping
    `,
    github: "https://github.com/cedricsthomasjr/athlytics",
    live: "",
    status: "paused",
  },
  {
    title: "What CJ Sees",
    slug: "whatcjsees",
    image: "/projects/whatcjsees.png",
    description: "Minimalist photography portfolio.",
    tags: ["Next.js", "Framer Motion", "Tailwind"],
    content: `
A highly-visual, minimalist portfolio that tells a story through design, light, and perspective.

📸 Core Features:
- Hero animation section with Framer Motion
- Tailwind-powered gallery with JSON-driven layouts
- Hover interactions for color hex codes and metadata
- "More Like This" filtering (excluding Image IDs 1-3)
- Next.js dynamic routes for gallery images

🧠 What I Learned:
- Modern image optimization with Next/Image
- Building custom filters and tooltips
- Prioritizing design principles: whitespace, contrast, and motion
    `,
    github: "https://github.com/cedricsthomasjr/whatcjsees",
    live: "https://whatcjsees.vercel.app",
    status: "live",
  },
  {
    title: "DegreeMind",
    slug: "degreemind",
    image: "/projects/placeholder.png",
    description: "Smarter college planning with AI.",
    tags: ["Next.js", "AI", "Education"],
    content: `
DegreeMind helps students map out their degrees, majors, minors, and postgrad career goals with AI-guided scheduling.

🎓 Features Coming Soon:
- AI-powered major/minor selector
- Smart semester builder using catalog data
- Path optimization toward internships and MBA tracks
- Integration with school databases (e.g., GT, OSU, LSU)

🧠 What I'm Building:
- Open-source backend for academic program data
- JSON schema to store career-aligned tracks
- Drag-and-drop frontend to customize timelines
    `,
    github: "",
    live: "",
    status: "scaffolding",
  },
];

export default projects;
