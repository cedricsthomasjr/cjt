export interface TimelineStop {
  id: string;
  period: string;
  companyOrContext: string;
  roleTitle: string;
  location: {
    cityState: string;
    coordinates: [number, number]; // [Longitude, Latitude]
  };
  narrativeSummary: string; // Narrative backstory for About Page
  quantifiableData: string[]; // Hard metrics ($ saved, hours automated, efficiency gains)
  frameworkSkills: string[]; // Tech stack, languages, tools, frameworks
  tricksOfTheTrade: string[]; // Methodologies & strategic workflows
  softSkills: string[]; // Leadership, communication, stakeholder management
  affiliationsGained: string[]; // Timestamped orgs, honors, academic/industry affiliations
}

/**
 * Single source of truth for the site's route/timeline.
 *
 * Sourced from the resume (public/RESUMESUMMER26.pdf, mirrored in
 * src/data/resume.js) and LinkedIn (linkedin.com/in/cedric-thomas-jr).
 * Where the two disagree, the resume wins — see the note in resume.js.
 *
 * The resume treats Corbin Advisors as one continuous role ("Summer 2024 —
 * Summer 2025"), but its own bullet text and the LinkedIn history describe
 * three distinct stints: a first summer, a winter remote stretch, and a
 * full summer back. This file splits those three stints into ct-corbin-1/2/3
 * as requested, and assigns each stint the one resume-verified initiative
 * that best fits its season, rather than inventing new achievements.
 */
export const TIMELINE_DATA: TimelineStop[] = [
  {
    id: "atl-stop",
    period: "Through 2023",
    companyOrContext: "Pace Academy",
    roleTitle: "Student",
    location: { cityState: "Atlanta, GA", coordinates: [-84.388, 33.749] },
    narrativeSummary:
      "Where it started. First computer science coursework, including AP Computer Science Principles, at Pace Academy in Atlanta. Atlanta is still home base.",
    quantifiableData: [],
    frameworkSkills: ["Java", "Introductory programming fundamentals"],
    tricksOfTheTrade: [],
    softSkills: [],
    affiliationsGained: ["AP Computer Science Principles"],
  },
  {
    id: "btr-stop",
    period: "Aug 2023 — May 2025",
    companyOrContext: "Louisiana State University",
    roleTitle: "B.S. Computer Science (Software Engineering concentration)",
    location: { cityState: "Baton Rouge, LA", coordinates: [-91.187, 30.451] },
    narrativeSummary:
      "Two years at LSU pursuing a B.S. in Computer Science with a software engineering concentration, before transferring to NYU. Gave campus tours for two of those years alongside coursework.",
    quantifiableData: [],
    frameworkSkills: ["Java", "Python", "SQL", "C"],
    tricksOfTheTrade: ["Campus tour guide — prospective-student communication"],
    softSkills: ["Public speaking", "Prospective-student relations"],
    affiliationsGained: [
      "Dean's List",
      "National Society of Collegiate Scholars",
      "President's Honor Roll (final semester)",
    ],
  },
  {
    id: "ct-corbin-1",
    period: "Summer 2024",
    companyOrContext: "Corbin Advisors",
    roleTitle: "Data Science & Analytics Intern",
    location: {
      cityState: "Farmington, CT",
      coordinates: [-72.832, 41.72],
    },
    narrativeSummary:
      "First summer at Corbin Advisors, an investor relations firm. Spearheaded an AI automation initiative for perception study transcription — the project that anchors the rest of the Corbin work.",
    quantifiableData: [
      "450+ hours saved annually via AI transcription automation",
      "~$100K in annual cost avoided from the same pipeline",
    ],
    frameworkSkills: ["Python", "OpenAI API / LLM transcription tooling", "SQL"],
    tricksOfTheTrade: [
      "Automating manual perception-study transcription workflows",
      "Process audit to find the highest-leverage automation target",
    ],
    softSkills: ["Stakeholder buy-in for a new automation workflow"],
    affiliationsGained: ["Corbin Advisors"],
  },
  {
    id: "ct-corbin-2",
    period: "Winter 2024 — 2025 (Remote)",
    companyOrContext: "Corbin Advisors",
    roleTitle: "Data Science & Analytics Intern",
    location: {
      cityState: "Farmington, CT",
      coordinates: [-72.832, 41.72],
    },
    narrativeSummary:
      "Remote winter stint continuing with Corbin. Engineered BI dashboards over the firm's financial records to speed up how investor insights got assembled and presented.",
    quantifiableData: [
      "Dashboards built over 10K+ financial records",
      "+25% improvement in reporting accuracy",
    ],
    frameworkSkills: ["SQL", "BI dashboarding tools", "Excel / Microsoft Suite"],
    tricksOfTheTrade: [
      "Turning inconsistent raw records into board-presentable dashboards",
      "Remote collaboration and async reporting cadence",
    ],
    softSkills: ["Remote communication", "Working async with a distributed team"],
    affiliationsGained: ["Corbin Advisors"],
  },
  {
    id: "ct-corbin-3",
    period: "Summer 2025",
    companyOrContext: "Corbin Advisors",
    roleTitle: "Data Science & Analytics Intern",
    location: {
      cityState: "Farmington, CT",
      coordinates: [-72.832, 41.72],
    },
    narrativeSummary:
      "Full summer back at Corbin. Wrote Snowflake SQL pipelines to automate investor reporting, closing out the Corbin arc on the data-engineering side of the work.",
    quantifiableData: ["+40% improvement in data delivery efficiency via Snowflake pipelines"],
    frameworkSkills: ["Snowflake", "SQL", "Data pipeline design"],
    tricksOfTheTrade: [
      "Automating recurring investor reporting via SQL pipelines",
      "Migrating manual reporting workflows onto a warehouse-native process",
    ],
    softSkills: ["Ownership of a recurring investor-facing deliverable"],
    affiliationsGained: ["Corbin Advisors"],
  },
  {
    id: "nyc-stop",
    period: "Aug 2025 — May 2027",
    companyOrContext: "New York University",
    roleTitle: "B.S. Computer Science",
    location: { cityState: "New York, NY", coordinates: [-73.996, 40.729] },
    narrativeSummary:
      "Transferred to NYU after two years at LSU. Currently pursuing a B.S. in Computer Science, expected May 2027, while serving as Secretary of the Business and Finance Group and co-running The Vanguard Initiative.",
    quantifiableData: ["GPA 3.55", "1000+ member finance organization supported as Secretary"],
    frameworkSkills: [
      "Java",
      "Python",
      "SQL",
      "C",
      "JavaScript",
      "TypeScript",
      "FastAPI",
      "React",
      "Next.js",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "PyMC",
      "SQLAlchemy",
    ],
    tricksOfTheTrade: [
      "Executive communications and meeting logistics at organization scale",
      "Mentorship program design around known student drop-off points",
    ],
    softSkills: [
      "Executive communication",
      "Cross-functional coordination across the Tandon and CAS chapters",
      "Mentorship and program leadership",
    ],
    affiliationsGained: [
      "President's List",
      "Dean's List (2x)",
      "Secretary, Business and Finance Group (Oct 2025 — Present)",
      "Co-Founder, The Vanguard Initiative (May 2024 — Present)",
      "EDGE Participant, SEO Career (Oct 2025 — Present)",
      "National Society of Black Engineers (NSBE)",
      "Black in STEM",
      "NYU Tandon Global",
    ],
  },
  {
    id: "beaverton-stop",
    period: "Jun 2026 — Aug 2026",
    companyOrContext: "NIKE, Inc.",
    roleTitle: "Artificial Intelligence, Data & Machine Learning Engineering Intern",
    location: { cityState: "Beaverton, OR", coordinates: [-122.804, 45.487] },
    narrativeSummary:
      "Current role, on the SCPT — Allocations team. Building agentic tooling that lets supply chain operators query Nike's inventory and network data in plain language.",
    quantifiableData: [],
    frameworkSkills: [
      "AWS Strands SDK",
      "Bedrock AgentCore",
      "Databricks",
      "Pydantic",
      "Cerberus",
    ],
    tricksOfTheTrade: [
      "Query routing: regex pattern matching for high-confidence queries, LLM agent reasoning for ambiguous ones",
      "Governed I/O and structured output contracts for production LLM tooling",
    ],
    softSkills: ["Working across an interdisciplinary supply-chain engineering team"],
    affiliationsGained: ["NIKE, Inc."],
  },
];
