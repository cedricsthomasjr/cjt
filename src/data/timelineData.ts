export interface Skill {
  name: string;
  learnedWhere: string; // Where this skill/tool was picked up
  learnedWhen: string; // Period during which it was picked up
}

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
  frameworkSkills: Skill[]; // Tech stack, languages, tools, frameworks — with provenance
  tricksOfTheTrade: string[]; // Methodologies & strategic workflows
  softSkills: string[]; // Leadership, communication, stakeholder management
  affiliationsGained: string[]; // Timestamped orgs, honors, academic/industry affiliations
}

/**
 * Attaches provenance (where/when it was picked up) to a flat list of skill
 * names, so every entry in frameworkSkills carries learnedWhere/learnedWhen
 * without repeating those two strings on every object literal below.
 */
function toSkills(names: string[], learnedWhere: string, learnedWhen: string): Skill[] {
  return names.map((name) => ({ name, learnedWhere, learnedWhen }));
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
      "Where it started. First computer science coursework, including AP Computer Science Principles, at Pace Academy in Atlanta, run alongside two varsity sports and a full course load. The habits from that period — prioritizing across competing commitments, managing time rigorously, executing under pressure — carried forward into everything after. Atlanta is still home base.",
    quantifiableData: [
      "State Champion — Track & Field",
      "Varsity Basketball",
      "Varsity Track & Field",
      "GPA 90/100",
    ],
    // Foundations only. Each stop lists what it actually added, so the route
    // reads as a progression — language fundamentals here, CS core at LSU,
    // applied data work at Corbin, web/ML libraries at NYU, enterprise agent
    // infrastructure at Nike — rather than every stop restating the full
    // cumulative stack.
    frameworkSkills: toSkills(
      ["Python", "Java", "Introductory programming fundamentals"],
      "Pace Academy (Atlanta, GA)",
      "Through 2023"
    ),
    tricksOfTheTrade: [
      "Dual-commitment prioritization across academics and varsity athletics",
      "Rigorous time management",
      "Performance under pressure",
      "Team coordination",
      "Operational discipline",
    ],
    softSkills: [
      "Relationship building",
      "Stakeholder engagement",
      "Early network development",
    ],
    affiliationsGained: ["AP Computer Science Principles"],
  },
  {
    id: "btr-stop",
    period: "Aug 2023 — May 2025",
    companyOrContext: "Louisiana State University",
    roleTitle: "B.S. Computer Science (Software Engineering concentration)",
    location: { cityState: "Baton Rouge, LA", coordinates: [-91.187, 30.451] },
    narrativeSummary:
      "Two years at LSU pursuing a B.S. in Computer Science with a software engineering concentration, before transferring to NYU. Spent two of those years as a campus tour guide — pitching the university to prospective students and presenting to their families, live and unscripted, tour after tour.",
    quantifiableData: [],
    frameworkSkills: toSkills(
      ["SQL", "C", "Git", "Data structures & algorithms"],
      "LSU (Baton Rouge, LA)",
      "Aug 2023 — May 2025"
    ),
    tricksOfTheTrade: [
      "Campus tour guide — pitching the university to prospective students and their families",
      "Adjusting a standard tour into a presentation tailored to each visiting group",
    ],
    softSkills: [
      "Pitching",
      "Public speaking",
      "Stakeholder communication",
      "Executive presentation",
    ],
    affiliationsGained: ["President's List", "Dean's List (2x)"],
  },
  {
    id: "ct-corbin-1",
    period: "Summer 2024",
    companyOrContext: "Corbin Advisors",
    roleTitle: "Data Systems & Insights Intern",
    location: {
      cityState: "Farmington, CT",
      coordinates: [-72.832, 41.72],
    },
    narrativeSummary:
      "First summer at Corbin Advisors, an investor relations firm. Built an AI automation pipeline for perception study transcription — the project that anchors the rest of the Corbin work.",
    quantifiableData: [
      "450+ hours saved annually via AI transcription automation",
      "~$100K in annual cost avoided from the same pipeline",
    ],
    frameworkSkills: toSkills(
      ["Python", "OpenAI API / LLM transcription tooling", "REST APIs"],
      "Corbin Advisors (Farmington, CT)",
      "Summer 2024"
    ),
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
    roleTitle: "Analytics Automation Intern",
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
    frameworkSkills: toSkills(
      ["SQL", "BI dashboarding tools", "Excel / Microsoft Suite"],
      "Corbin Advisors (Farmington, CT)",
      "Winter 2024 — 2025"
    ),
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
    roleTitle: "Research & Analytics Intern",
    location: {
      cityState: "Farmington, CT",
      coordinates: [-72.832, 41.72],
    },
    narrativeSummary:
      "Full summer back at Corbin. Wrote Snowflake SQL pipelines to automate investor reporting, closing out the Corbin arc on the data-engineering side of the work.",
    quantifiableData: ["+40% improvement in data delivery efficiency via Snowflake pipelines"],
    frameworkSkills: toSkills(
      ["Snowflake", "SQL", "Data pipeline design"],
      "Corbin Advisors (Farmington, CT)",
      "Summer 2025"
    ),
    tricksOfTheTrade: [
      "Automating recurring investor reporting via SQL pipelines",
      "Migrating manual reporting workflows onto a warehouse-native process",
    ],
    softSkills: ["Ownership of a recurring investor-facing deliverable"],
    affiliationsGained: ["Corbin Advisors"],
  },
  {
    id: "nyc-stop",
    period: "Aug 2025 — Dec 2027",
    companyOrContext: "New York University",
    roleTitle: "B.S. Computer Science",
    location: { cityState: "New York, NY", coordinates: [-73.996, 40.729] },
    narrativeSummary:
      "Transferred to NYU after two years at LSU. Currently pursuing a B.S. in Computer Science, expected December 2027, while serving as Secretary of the Business and Finance Group and co-running The Vanguard Initiative.",
    quantifiableData: ["GPA 3.55", "1000+ member finance organization supported as Secretary"],
    frameworkSkills: toSkills(
      [
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "FastAPI",
        "SQLAlchemy",
        "Pandas",
        "NumPy",
        "Scikit-learn",
        "PyMC",
      ],
      "NYU (New York, NY)",
      "Aug 2025 — Dec 2027"
    ),
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
      "Dean's List",
      "Secretary, Business and Finance Group (Oct 2025 — Present)",
      "Co-Founder, The Vanguard Initiative (May 2024 — Present) — In Progress",
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
    quantifiableData: ["Classified / Lucrative Enterprise Automation Impact (NDA)"],
    frameworkSkills: toSkills(
      [
        "AWS Strands SDK",
        "AWS Bedrock AgentCore",
        "Databricks",
        "Pydantic",
        "Cerberus",
        "Cursor",
      ],
      "Nike (Beaverton)",
      "2025/2026"
    ),
    tricksOfTheTrade: [
      "Query routing: regex pattern matching for high-confidence queries, LLM agent reasoning for ambiguous ones",
      "Governed I/O and structured output contracts for production LLM tooling",
      "Enterprise AI agent orchestration workflows",
    ],
    softSkills: ["Working across an interdisciplinary supply-chain engineering team"],
    affiliationsGained: ["NIKE, Inc."],
  },
];
