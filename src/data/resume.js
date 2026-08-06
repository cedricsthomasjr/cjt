/**
 * Attaches provenance to a skill name for the Resume page's Skills section
 * hover cards — mirrors the Skill shape in src/data/timelineData.ts.
 */
function skill(name, learnedWhere, learnedWhen) {
  return { name, learnedWhere, learnedWhen };
}

export const contactLinks = {
  email: "cst9351@nyu.edu",
  phone: "(216) 406-4458",
  phoneHref: "tel:+12164064458",
  // Back in New York, NY for the NYU semester as of Aug 2026 — the Nike
  // Beaverton, OR internship (Jun–Aug 2026) wrapped. Atlanta, GA stays listed
  // as home base alongside NYC. Update this note (and the About page intro)
  // once there's a new "currently" to describe.
  location: "New York, NY / Atlanta, GA",
  github: "https://github.com/cedricsthomasjr/",
  linkedin: "https://www.linkedin.com/in/cedric-thomas-jr/",
  resumePdf: "/RESUMESUMMER26.pdf",
};

/**
 * The hero readout. Every figure here is verifiable from the resume — these
 * are the strongest claims on the site, so they open it rather than sitting
 * four pages deep in bullet prose.
 */
export const record = [
  {
    key: "Automated",
    note: "analyst hours per year, via an AI transcription pipeline",
    prefix: "",
    num: 450,
    suffix: "+",
  },
  {
    key: "Avoided",
    note: "in annual cost, approximately, from that same pipeline",
    prefix: "$",
    num: 100,
    suffix: "K",
  },
  {
    key: "Modeled",
    note: "financial records behind the reporting dashboards",
    prefix: "",
    num: 10,
    suffix: "K+",
  },
  {
    key: "Delivery",
    note: "faster, after moving investor reporting onto Snowflake",
    prefix: "+",
    num: 40,
    suffix: "%",
  },
];

export const affiliations = [
  "NIKE, Inc.",
  "Corbin Advisors",
  "New York University",
  "SEO Career",
  "Business and Finance Group",
  "The Vanguard Initiative",
];

export const resumeSections = [
  {
    title: "Experience / Timeline",
    items: [
      {
        title: "Artificial Intelligence, Data & Machine Learning Engineering Intern",
        org: "NIKE, Inc.",
        place: "SCPT — Allocations · Beaverton, OR",
        time: "Jun 2026 — Aug 2026",
        bullets: [
          "Built an agentic supply chain visibility system using AWS Strands SDK, AWS Bedrock AgentCore, and Databricks — enabling natural language querying of inventory, DC, and network data across Nike's supply chain.",
          "Designed a query routing architecture combining regex pattern matching and LLM orchestration to route high-confidence queries deterministically and ambiguous queries through agent reasoning, reducing LLM variance and latency.",
          "Delivered production-ready tool with governed I/O (Cerberus), structured output contracts (Pydantic), and Cursor-driven development workflows for supply chain operators.",
          "Quantifiable impact: Classified / Enterprise Automation Impact (Metrics Pending Release under NDA).",
        ],
      },
      {
        title: "Research & Analytics Intern",
        org: "Corbin Advisors",
        place: "Farmington, CT",
        time: "Jun 2025 — Aug 2025",
        bullets: [
          "Spearheaded an AI transcription benchmarking initiative, evaluating and integrating platforms (Dovetail, Otter.ai, Vook AI) to improve accuracy, reduce costs, and accelerate turnaround times.",
          "Developed automated SQL workflows in Snowflake to streamline perception study data formatting and reporting, saving significant manual processing hours.",
          "Conducted competitive intelligence and market research to strengthen investor relations strategies and client deliverables.",
          "Collaborated cross-functionally with senior analysts and interns at the intersection of finance, consulting, and technology.",
        ],
      },
      {
        title: "Analytics & Automation Intern",
        org: "Corbin Advisors",
        place: "Farmington, CT (Remote)",
        time: "Dec 2024 — Jan 2025",
        bullets: [
          "Data Visualization: Modeled and transformed complex datasets into clear, compelling visual representations to support executive decision-making.",
          "UI Wireframing: Designed intuitive, functional user interface wireframes to enhance user experience and streamline internal workflows.",
          "Process Automation: Developed custom VBA macros to automate repetitive processes and optimize operational efficiency.",
        ],
      },
      {
        title: "Data Science Intern",
        org: "Corbin Advisors",
        place: "Farmington, CT",
        time: "Jul 2024 — Aug 2024",
        bullets: [
          "Built and maintained SQL- and JavaScript-based workflows to support data collection, management, and analysis for financial research initiatives.",
          "Developed a real-time stock data scraper using JavaScript and Yahoo Finance APIs, eliminating manual research overhead across 200+ tickers.",
          "Processed and transformed 10,000+ rows of financial and market data to improve reporting accuracy and usability for internal stakeholders.",
        ],
      },
    ],
  },
  {
    title: "Leadership and Reach",
    items: [
      {
        title: "Secretary",
        org: "Business and Finance Group, NYU",
        time: "Oct 2025 — Present",
        bullets: [
          "Coordinate executive communications and cross-functional initiatives for a 1000+ member finance organization.",
          "Run documentation and internal operations across the Tandon and CAS chapters.",
        ],
      },
      {
        title: "Co-Founder",
        org: "The Vanguard Initiative",
        place: "Atlanta, GA",
        time: "May 2024 — Present",
        status: "In Progress",
        bullets: [
          "Co-founded a mentorship initiative for underrepresented students, built around the points where students actually fall off.",
          "Lead planning for a campus-wide kickoff featuring alumni, faculty, and student panels.",
        ],
      },
      {
        title: "EDGE Participant",
        org: "SEO Career",
        time: "Oct 2025 — Present",
        bullets: [
          "Technical and professional coaching toward internship recruiting, with industry-specific training and assessments.",
        ],
      },
      {
        title: "Digital Ambassador",
        org: "International Business Seminars",
        place: "Europe",
        time: "May 2024 — Jun 2024",
        bullets: [
          "Engaged global executives on finance and strategy across site visits and panels.",
          "Studied how markets, policy, and culture shape business decisions across borders.",
        ],
      },
      {
        title: "Student Ambassador & Presenter",
        org: "Louisiana State University",
        place: "Baton Rouge, LA",
        time: "Aug 2023 — May 2025",
        bullets: [
          "Represented LSU as a student ambassador by leading engaging, informative campus tours for prospective students, families, and VIP guests.",
          "Provided strategic insight into academic programs, student life, campus culture, and university resources.",
          "Delivered professional, tailored presentations to diverse stakeholder audiences under high visibility.",
        ],
      },
    ],
  },
  {
    title: "Education",
    items: [
      {
        title: "B.S. Computer Science",
        org: "New York University",
        place: "New York, NY",
        time: "Expected December 2027",
        bullets: [
          "GPA 3.55. Dean's List (1x).",
          "Coursework: Data Structures, Algorithms, Probability and Statistics, Data Science, Databases, Finance.",
        ],
      },
      {
        title: "B.S. Computer Science (Software Engineering concentration) — transferred",
        org: "Louisiana State University",
        place: "Baton Rouge, LA",
        time: "Aug 2023 — May 2025",
        bullets: ["President's List. Dean's List (2x)."],
      },
    ],
  },
  {
    title: "Skills",
    // Each skill carries learnedWhere/learnedWhen so the Skills section can
    // show provenance on hover. Most entries are sourced from the same stops
    // as src/data/timelineData.ts's frameworkSkills, not re-derived, so the
    // two stay in sync automatically. Exceptions: "Agile" and "Enterprise AI
    // Agent Orchestration" (both under Nike, Concepts row) are hand-added —
    // they're methodologies rather than frameworkSkills' "tech stack, tools,
    // frameworks" per its own type comment, so they were never in
    // timelineData.ts to begin with. Their learnedWhere/learnedWhen ("Nike
    // (Beaverton)" / "2025/2026") are still kept aligned by hand with every
    // other Nike-tagged skill below, covering the Jun 2026 — Aug 2026
    // internship.
    items: [
      // Ordered foundational → advanced within each row, so the hover cards
      // trace the same Pace → LSU → Corbin → NYU → Nike route the timeline does.
      {
        title: "Languages",
        skills: [
          skill("Python", "Pace Academy (Atlanta, GA)", "Through 2023"),
          skill("Java", "Pace Academy (Atlanta, GA)", "Through 2023"),
          skill("SQL", "LSU (Baton Rouge, LA)", "Aug 2023 — May 2025"),
          skill("C", "LSU (Baton Rouge, LA)", "Aug 2023 — May 2025"),
          skill("JavaScript", "Corbin Advisors (Farmington, CT)", "Jul 2024 — Aug 2024"),
          skill("TypeScript", "NYU (New York, NY)", "Aug 2025 — Dec 2027"),
        ],
      },
      {
        title: "Concepts",
        skills: [
          skill(
            "Data Structures & Algorithms",
            "LSU (Baton Rouge, LA)",
            "Aug 2023 — May 2025"
          ),
          skill("Web Scraping", "Corbin Advisors (Farmington, CT)", "Jul 2024 — Aug 2024"),
          skill("Data Management", "Corbin Advisors (Farmington, CT)", "Jul 2024 — Aug 2024"),
          skill("Data Science", "Corbin Advisors (Farmington, CT)", "Jul 2024 — Aug 2024"),
          skill("Data Visualization", "Corbin Advisors (Farmington, CT · Remote)", "Dec 2024 — Jan 2025"),
          skill("Process Automation", "Corbin Advisors (Farmington, CT · Remote)", "Dec 2024 — Jan 2025"),
          skill(
            "Business Intelligence",
            "Corbin Advisors (Farmington, CT)",
            "Winter 2024 — 2025"
          ),
          skill("AI Evaluation & Integration", "Corbin Advisors (Farmington, CT)", "Jun 2025 — Aug 2025"),
          skill("Competitive Intelligence", "Corbin Advisors (Farmington, CT)", "Jun 2025 — Aug 2025"),
          skill("Market Research", "Corbin Advisors (Farmington, CT)", "Jun 2025 — Aug 2025"),
          skill("Investor Relations Strategy", "Corbin Advisors (Farmington, CT)", "Jun 2025 — Aug 2025"),
          skill("Full-Stack Development", "NYU (New York, NY)", "Aug 2025 — Dec 2027"),
          skill("Agile", "Nike (Beaverton)", "2025/2026"),
          skill(
            "Enterprise AI Agent Orchestration",
            "Nike (Beaverton)",
            "2025/2026"
          ),
        ],
      },
      {
        title: "Tools",
        skills: [
          skill("Git", "LSU (Baton Rouge, LA)", "Aug 2023 — May 2025"),
          skill("REST APIs", "Corbin Advisors (Farmington, CT)", "Jul 2024 — Aug 2024"),
          skill("VBA (Visual Basic for Applications)", "Corbin Advisors (Farmington, CT · Remote)", "Dec 2024 — Jan 2025"),
          skill("Wireframing", "Corbin Advisors (Farmington, CT · Remote)", "Dec 2024 — Jan 2025"),
          skill("Excel Macros", "Corbin Advisors (Farmington, CT · Remote)", "Dec 2024 — Jan 2025"),
          skill(
            "Microsoft Suite (Word, Excel, PowerPoint)",
            "Corbin Advisors (Farmington, CT)",
            "Winter 2024 — 2025"
          ),
          skill("Snowflake", "Corbin Advisors (Farmington, CT)", "Jun 2025 — Aug 2025"),
          skill("Cursor", "Nike (Beaverton)", "2025/2026"),
          skill("Databricks", "Nike (Beaverton)", "2025/2026"),
        ],
      },
      {
        title: "Frameworks & Libraries",
        skills: [
          skill("Pandas", "NYU (New York, NY)", "Aug 2025 — Dec 2027"),
          skill("NumPy", "NYU (New York, NY)", "Aug 2025 — Dec 2027"),
          skill("Scikit-learn", "NYU (New York, NY)", "Aug 2025 — Dec 2027"),
          skill("PyMC", "NYU (New York, NY)", "Aug 2025 — Dec 2027"),
          skill("SQLAlchemy", "NYU (New York, NY)", "Aug 2025 — Dec 2027"),
          skill("FastAPI", "NYU (New York, NY)", "Aug 2025 — Dec 2027"),
          skill("React", "NYU (New York, NY)", "Aug 2025 — Dec 2027"),
          skill("Next.js", "NYU (New York, NY)", "Aug 2025 — Dec 2027"),
          skill("AWS Strands SDK", "Nike (Beaverton)", "2025/2026"),
          skill("AWS Bedrock AgentCore", "Nike (Beaverton)", "2025/2026"),
          skill("Pydantic", "Nike (Beaverton)", "2025/2026"),
          skill("Cerberus", "Nike (Beaverton)", "2025/2026"),
        ],
      },
    ],
  },
  {
    title: "Affiliations",
    items: [
      {
        title: "Organizations",
        bullets: [
          "National Society of Black Engineers (NSBE), Black in STEM, NYU Tandon Global",
        ],
      },
    ],
  },
];
