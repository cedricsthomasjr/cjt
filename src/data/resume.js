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

export const currentRole = {
  org: "NIKE, Inc.",
  title: "Artificial Intelligence, Data & Machine Learning Engineering Intern",
  team: "SCPT — Allocations",
  place: "Beaverton, OR",
  time: "Jun 2026 — Aug 2026",
  summary:
    "Building agentic tooling that lets supply chain operators ask Nike's inventory and network data questions in plain language.",
};

/* The bullets for this role live only in resumeSections below. They were
   duplicated here once and immediately drifted apart, so there is now one copy
   and the About page renders the headline from currentRole and the detail from
   resumeSections. */

/**
 * The five places, in the order he first arrived at them. Coordinates are real
 * latitude and longitude — the map projects them rather than placing dots by
 * eye, so the shape of the route is true even though no coastline is drawn.
 *
 * Sourced from LinkedIn, which carries the LSU years and the Pace Academy
 * coursework that the one-page resume leaves out. Where the two disagree the
 * resume wins: the Business and Finance Group start date is Oct 2025 here, not
 * LinkedIn's Sep 2025, and Corbin stays "Summer 2024 — Summer 2025" rather than
 * being split into its three separate stints.
 *
 * `figures` keys into the `record` export above so the Corbin numbers have one
 * source of truth.
 */
export const journey = [
  {
    id: "atlanta",
    city: "Atlanta",
    region: "GA",
    org: "Pace Academy",
    lat: 33.749,
    lon: -84.388,
    label: { anchor: "middle", dx: 0, dy: -26 },
    time: "Through 2023",
    kicker: "Where it started",
    text: "First computer science coursework, including AP Computer Science Principles. Atlanta is still home.",
  },
  {
    id: "baton-rouge",
    city: "Baton Rouge",
    region: "LA",
    org: "Louisiana State University",
    lat: 30.451,
    lon: -91.187,
    label: { anchor: "middle", dx: 0, dy: 42 },
    time: "Aug 2023 — May 2025",
    kicker: "Two years in",
    text: "B.S. Computer Science with a software engineering concentration. Dean's List, the National Society of Collegiate Scholars, and the President's Honor Roll in my final semester. Gave campus tours for two of those years.",
  },
  {
    id: "farmington",
    city: "Farmington",
    region: "CT",
    org: "Corbin Advisors",
    lat: 41.72,
    lon: -72.832,
    label: { anchor: "end", dx: -16, dy: -22 },
    time: "Summer 2024 — Summer 2025",
    kicker: "Three stints",
    text: "An investor relations firm, across a first summer, a winter remote, and a full summer back. Transcription automation, BI dashboards, and Snowflake pipelines.",
    figures: true,
  },
  {
    id: "new-york",
    city: "New York",
    region: "NY",
    org: "New York University",
    lat: 40.729,
    lon: -73.996,
    label: { anchor: "end", dx: -16, dy: 44 },
    time: "Aug 2025 — May 2027",
    kicker: "The transfer",
    text: "Transferred after two years at LSU. B.S. Computer Science, expected May 2027, GPA 3.55, President's List and Dean's List twice. Secretary of the Business and Finance Group.",
  },
  {
    id: "beaverton",
    city: "Beaverton",
    region: "OR",
    org: "NIKE, Inc.",
    lat: 45.487,
    lon: -122.804,
    label: { anchor: "start", dx: 18, dy: -22 },
    time: "Jun 2026 — Aug 2026",
    kicker: "This summer",
    text: "Artificial Intelligence, Data & Machine Learning Engineering on SCPT — Allocations. Agentic tooling that lets supply chain operators query inventory and network data in plain language.",
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

/**
 * The leadership entries, flattened for the About page. The resume keeps the
 * full bulleted version; this is the short form.
 */
export const community = [
  {
    title: "Secretary",
    org: "Business and Finance Group, NYU",
    time: "Oct 2025 — Present",
    text: "Executive communications and internal operations for a 1000+ member finance organization, across the Tandon and CAS chapters.",
  },
  {
    title: "Co-Founder",
    org: "The Vanguard Initiative",
    time: "May 2024 — Present",
    text: "A mentorship initiative for underrepresented students, built around the points where students actually fall off.",
  },
  {
    title: "EDGE Participant",
    org: "SEO Career",
    time: "Oct 2025 — Present",
    text: "Technical and professional coaching toward internship recruiting, with industry-specific training and assessments.",
  },
];

export const resumeSections = [
  {
    title: "Experience",
    items: [
      {
        title: "Artificial Intelligence, Data & Machine Learning Engineering Intern",
        org: "NIKE, Inc.",
        place: "SCPT — Allocations · Beaverton, OR",
        time: "Jun 2026 — Aug 2026",
        bullets: [
          "Built an agentic supply chain visibility system using AWS Strands SDK, Bedrock AgentCore, and Databricks — enabling natural language querying of inventory, DC, and network data across Nike's supply chain.",
          "Designed a query routing architecture combining regex pattern matching and LLM orchestration to route high-confidence queries deterministically and ambiguous queries through agent reasoning, reducing LLM variance and latency.",
          "Delivered production-ready tool with governed I/O (Cerberus), structured output contracts (Pydantic), and on-demand dashboard views for supply chain operators.",
        ],
      },
      {
        title: "Data Science & Analytics Intern",
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
    title: "Education",
    items: [
      {
        title: "B.S. Computer Science",
        org: "New York University",
        place: "New York, NY",
        time: "Expected May 2027",
        bullets: [
          "GPA 3.55. President's List, Dean's List (2x).",
          "Coursework: Data Structures, Algorithms, Probability and Statistics, Data Science, Databases, Finance.",
        ],
      },
    ],
  },
  {
    title: "Leadership",
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
    title: "Skills",
    items: [
      {
        title: "Languages",
        bullets: ["Java, Python, SQL, C, JavaScript, TypeScript"],
      },
      {
        title: "Concepts",
        bullets: [
          "Data Science, Business Intelligence, Market Research, Full-Stack Development, Agile",
        ],
      },
      {
        title: "Tools",
        bullets: [
          "Git, Snowflake, Microsoft Suite (Word, Excel, PowerPoint), APIs",
        ],
      },
      {
        title: "Frameworks & Libraries",
        bullets: [
          "FastAPI, React, Next.js, Pandas, NumPy, Scikit-learn, PyMC, SQLAlchemy",
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
