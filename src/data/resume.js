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
          "Quantifiable impact: Classified / Lucrative Enterprise Automation Impact (NDA).",
        ],
      },
      {
        title: "Research & Analytics Intern",
        org: "Corbin Advisors",
        place: "Farmington, CT",
        time: "Summer 2024 — Summer 2025",
        bullets: [
          "Led an AI automation initiative for perception study transcription, saving 450+ hours and roughly $100K annually.",
          "Built BI dashboards over 10K+ financial records, improving reporting accuracy by 25%.",
          "Wrote Snowflake SQL pipelines to automate investor reporting, improving data delivery efficiency by 40%.",
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
          "GPA 3.55. Dean's List.",
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
    // show provenance on hover — sourced from the same stops as
    // src/data/timelineData.ts's frameworkSkills, not re-derived, so the two
    // never drift apart.
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
          skill("JavaScript", "NYU (New York, NY)", "Aug 2025 — Dec 2027"),
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
          skill("Data Science", "Corbin Advisors (Farmington, CT)", "Summer 2024"),
          skill("Market Research", "Corbin Advisors (Farmington, CT)", "Summer 2024"),
          skill(
            "Business Intelligence",
            "Corbin Advisors (Farmington, CT)",
            "Winter 2024 — 2025"
          ),
          skill("Full-Stack Development", "NYU (New York, NY)", "Aug 2025 — Dec 2027"),
          skill("Agile", "NIKE, Inc. (Beaverton, OR)", "Jun 2026 — Aug 2026"),
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
          skill("REST APIs", "Corbin Advisors (Farmington, CT)", "Summer 2024"),
          skill(
            "Microsoft Suite (Word, Excel, PowerPoint)",
            "Corbin Advisors (Farmington, CT)",
            "Winter 2024 — 2025"
          ),
          skill("Snowflake", "Corbin Advisors (Farmington, CT)", "Summer 2025"),
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
