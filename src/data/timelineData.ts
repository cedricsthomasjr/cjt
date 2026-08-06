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
 * Corbin Advisors was three distinct stints, not one continuous role:
 * ct-corbin-1 (Data Science Intern, Jul—Aug 2024), ct-corbin-2 (Analytics &
 * Automation Intern, Dec 2024—Jan 2025, remote), and ct-corbin-3 (Research &
 * Analytics Intern, Jun—Aug 2025). Each carries the title, dates, and
 * initiatives specific to that stint rather than one title repeated three
 * times.
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
      "Two years at LSU pursuing a B.S. in Computer Science with a software engineering concentration, before transferring to NYU. Spent two of those years as a Student Ambassador — leading campus tours for prospective students, families, and VIP guests, and presenting live and unscripted, tour after tour.",
    quantifiableData: [],
    frameworkSkills: toSkills(
      ["SQL", "C", "Git", "Data structures & algorithms"],
      "LSU (Baton Rouge, LA)",
      "Aug 2023 — May 2025"
    ),
    tricksOfTheTrade: [
      "Represented LSU as a Student Ambassador, leading campus tours for prospective students, families, and VIP guests",
      "Provided strategic insight into academic programs, student life, campus culture, and university resources",
      "Adjusted a standard tour into a tailored presentation for each visiting group",
    ],
    softSkills: [
      "Public Speaking",
      "Executive Pitching & Presentation",
      "Communication",
      "Interpersonal Skills",
      "Customer Service",
      "Time Management",
      "Teamwork",
      "Leadership",
    ],
    affiliationsGained: ["President's List", "Dean's List (2x)"],
  },
  {
    id: "ct-corbin-1",
    period: "Jul 2024 — Aug 2024",
    companyOrContext: "Corbin Advisors",
    roleTitle: "Data Science Intern",
    location: {
      cityState: "Farmington, CT",
      coordinates: [-72.832, 41.72],
    },
    narrativeSummary:
      "First stint at Corbin Advisors, an investor relations firm. Built SQL- and JavaScript-based workflows for financial research, including a real-time stock data scraper against the Yahoo Finance API — the project that anchors the rest of the Corbin work.",
    quantifiableData: [
      "Real-time stock data scraper covering 200+ tickers",
      "10,000+ rows of financial and market data transformed",
    ],
    frameworkSkills: toSkills(
      ["SQL", "JavaScript", "Web Scraping", "Data Science", "Data Management"],
      "Corbin Advisors (Farmington, CT)",
      "Jul 2024 — Aug 2024"
    ),
    tricksOfTheTrade: [
      "Built SQL- and JavaScript-based workflows for financial research data collection and analysis",
      "Developed a real-time stock data scraper using JavaScript and the Yahoo Finance API",
    ],
    softSkills: ["Communication", "Presentation Skills", "Teamwork"],
    affiliationsGained: ["Corbin Advisors"],
  },
  {
    id: "ct-corbin-2",
    period: "Dec 2024 — Jan 2025",
    companyOrContext: "Corbin Advisors",
    roleTitle: "Analytics & Automation Intern",
    location: {
      cityState: "Farmington, CT (Remote)",
      coordinates: [-72.832, 41.72],
    },
    narrativeSummary:
      "Remote winter stint continuing with Corbin. Modeled financial data into executive-ready visuals, wireframed internal tooling, and automated recurring reporting with VBA macros.",
    quantifiableData: [
      "Automated recurring reporting workflows via custom VBA macros",
    ],
    frameworkSkills: toSkills(
      ["VBA (Visual Basic for Applications)", "Wireframing", "Excel Macros", "Data Visualization", "Process Automation"],
      "Corbin Advisors (Farmington, CT · Remote)",
      "Dec 2024 — Jan 2025"
    ),
    tricksOfTheTrade: [
      "Modeled complex datasets into clear, compelling visual representations for executive decision-making",
      "Designed intuitive UI wireframes to streamline internal workflows",
      "Automated repetitive processes with custom VBA macros",
    ],
    softSkills: ["Remote communication", "Working async with a distributed team"],
    affiliationsGained: ["Corbin Advisors"],
  },
  {
    id: "ct-corbin-3",
    period: "Jun 2025 — Aug 2025",
    companyOrContext: "Corbin Advisors",
    roleTitle: "Research & Analytics Intern",
    location: {
      cityState: "Farmington, CT",
      coordinates: [-72.832, 41.72],
    },
    narrativeSummary:
      "Full summer back at Corbin. Benchmarked AI transcription platforms, automated Snowflake SQL workflows for perception study reporting, and supported investor relations with competitive intelligence and market research.",
    quantifiableData: [
      "AI transcription benchmarking across Dovetail, Otter.ai, and Vook AI",
      "Automated Snowflake SQL workflows for perception study reporting",
    ],
    frameworkSkills: toSkills(
      [
        "Snowflake",
        "SQL",
        "AI Evaluation & Integration",
        "Competitive Intelligence",
        "Market Research",
        "Investor Relations Strategy",
      ],
      "Corbin Advisors (Farmington, CT)",
      "Jun 2025 — Aug 2025"
    ),
    tricksOfTheTrade: [
      "Spearheaded an AI transcription benchmarking initiative to improve accuracy, reduce costs, and accelerate turnaround",
      "Developed automated SQL workflows in Snowflake for perception study data formatting and reporting",
      "Conducted competitive intelligence and market research to strengthen investor relations strategies",
    ],
    softSkills: [
      "Cross-functional collaboration with senior analysts across finance, consulting, and technology",
    ],
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
      "Dean's List (1x)",
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
    quantifiableData: ["Classified / Enterprise Automation Impact (Metrics Pending Release under NDA)"],
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
