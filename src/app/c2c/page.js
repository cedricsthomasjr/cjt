import Link from "next/link";
import Connector from "@/components/Connector";
import Reveal from "@/components/Reveal";
import Stagger from "@/components/Stagger";
import C2CIntakeForm from "@/components/c2c/C2CIntakeForm";
import { contactLinks } from "@/data/resume";

/**
 * The offer went live ahead of the original September 1 target — cj2client.com
 * is up and taking clients, so the gate stays in the code (in case a future
 * offer needs the same pattern) but is pinned open.
 */
const LAUNCH_DATE = new Date("2026-08-01T00:00:00Z");
const isLive = () => Date.now() >= LAUNCH_DATE.getTime();

// How many build slots are open this month. A real number, not a decorative
// one — update it as the intake list actually fills. Recomputed on every
// revalidation, same as isLive(), so the month name never goes stale.
const CLIENT_CAPACITY = { taken: 2, total: 3 };
const currentMonthLabel = () =>
  new Date().toLocaleString("en-US", { month: "long" });

// Static by default, but re-checked on this cadence so the gate lifts itself
// at launch without needing a redeploy. Matches the pattern on /projects.
export const revalidate = 3600;

export async function generateMetadata() {
  if (!isLive()) {
    return {
      title: "C2C",
      description: "Something for local businesses. Coming September 1.",
      // Nothing to index yet — the reveal is the point.
      robots: { index: false, follow: false },
    };
  }

  return {
    title: "C2C",
    description:
      "CJ to Client (C2C): custom web development for local businesses — high-performance sites, $0 upfront options, and total hands-off maintenance.",
  };
}

/**
 * The offer's lifecycle, in the order a client actually moves through it:
 * a new site gets built, an existing one gets refreshed, and either way it
 * gets maintained afterward so it never becomes their problem again.
 */
const PILLARS = [
  {
    title: "Build",
    text: "A custom site built for how your business actually runs — not a page pulled from a template library and hoped into place.",
  },
  {
    title: "Refresh",
    text: "Redesigns and rebuilds for sites that already exist but are actively costing you customers — same domain, same brand, a foundation that finally holds.",
  },
  {
    title: "Maintain",
    text: "Ongoing updates, monitoring, and fixes handled on my end. The site stays current without ever landing back on your desk.",
  },
];

/**
 * The features clients actually feel, not the stack underneath them. Each
 * one maps to a concrete business outcome rather than a technical spec.
 */
const FEATURES = [
  {
    title: "Sub-second load times",
    text: "Built lean and served fast — most pages resolve in under a second, not the five-to-eight a bloated template stack drags behind.",
  },
  {
    title: "Click-to-call buttons",
    text: "One tap connects a mobile visitor straight to your phone. No hunting for a number, no lost call.",
  },
  {
    title: "Embedded quote forms",
    text: "Requests land directly in your inbox the moment they're submitted — no separate portal, no lead sitting unread.",
  },
  {
    title: "Live Google review feeds",
    text: "Your real reviews, pulled in and kept current automatically, so the page never shows stale praise.",
  },
];

/**
 * The two ways to pay, framed around the same $0-upfront promise the hero
 * makes. Both cards link to the same #audit form rather than competing
 * "buy now" buttons — the form is where the actual decision gets made.
 */
const PRICING = [
  {
    tag: "$0 upfront",
    title: "Growth Subscription",
    price: "$199",
    period: "/mo",
    text: "Zero upfront cost. Fully managed hosting, ongoing speed optimization, and unlimited content updates included.",
    features: [
      "Custom build included, no separate project fee",
      "Hosting, monitoring, and uptime handled",
      "Ongoing updates and content changes",
      "Cancel anytime — no long-term contract",
    ],
  },
  {
    tag: "One payment",
    title: "One-Time Build",
    price: "$1,500",
    period: "flat",
    text: "One-time custom build. Full code transfer; you handle hosting, updates, and ongoing site maintenance.",
    features: [
      "Custom-built site, owned outright at launch",
      "Flat price, nothing recurring",
      "Two rounds of revisions included",
      "Maintenance available separately, month to month",
    ],
  },
];

/**
 * The one objection the pricing grid can't resolve on its own: why pay
 * monthly at all when the flat build is cheaper by month eight. Answered
 * once, directly, instead of leaving it for the visitor to do the math.
 */
const PRICING_FAQ = {
  question: "Why $199/mo vs $1,500 one-time?",
  answer:
    "The subscription isn't just the build spread out — it includes hosting, monitoring, and my time every month to keep the site fast and current. The one-time build hands you the finished code outright at launch; hosting, updates, and maintenance become yours to handle or contract separately from there.",
};

/**
 * C2C is a service offer, not a portfolio piece — the register shifts from
 * "here is what I built" to "here is what I'll build for you." Same two
 * voices as everywhere else (bold sans states the offer, Palatino italic
 * explains it), just aimed at a client instead of a recruiter.
 *
 * No portrait, no reveal choreography: those are the home hero's signature,
 * and reusing them here would blur the one page on the site that's allowed
 * to move like that. This page earns attention with the offer, not motion.
 */
export default function C2CPage() {
  if (!isLive()) {
    return <C2CComingSoon />;
  }

  return (
    <main>
      <section className="shell flex min-h-[calc(100svh-4rem)] items-center py-16 sm:py-24">
        <div className="max-w-3xl">
          <span className="pill pill-gold">
            <svg
              width="7"
              height="7"
              viewBox="0 0 7 7"
              aria-hidden="true"
              className="mr-1.5"
            >
              <circle cx="3.5" cy="3.5" r="3.5" fill="var(--color-gold)" />
            </svg>
            Currently accepting {CLIENT_CAPACITY.taken} of{" "}
            {CLIENT_CAPACITY.total} local clients for {currentMonthLabel()}
          </span>

          <p className="t-label-gold mt-5">CJ to Client</p>

          <h1 className="t-display mt-5">
            CJ to Client (C2C): Custom Web Development &amp; Zero-Headache
            Management.
          </h1>

          <hr className="hairline-gold mt-6 max-w-xs" />

          <p className="t-sub-lg mt-6 max-w-xl">
            High-performance custom sites, $0 upfront options, and total
            hands-off maintenance for local businesses.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="#audit" className="btn-solid">
              Get Your 2-Min Custom Video Audit
            </Link>
            <a
              href="https://cj2client.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              Visit the live C2C site
            </a>
          </div>

          <p className="t-sub-sm mt-3 max-w-md">
            We&apos;ll send a 2-minute Loom breakdown of the top 3 conversion
            leaks on your current site within 24 hours.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
            <a
              href="https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fcjst.dev"
              target="_blank"
              rel="noreferrer"
              className="link-rule text-[0.8125rem]"
            >
              Test our speed: run this site on Google PageSpeed Insights
            </a>
          </div>

          <p className="t-sub-sm mt-4 text-gold">
            Sub-second load times guaranteed or 100% money back.
          </p>
        </div>
      </section>

      <Connector />

      <section className="shell section pt-0">
        <h2 className="t-h2">Build, refresh, maintain</h2>
        <p className="t-sub-lg mt-3 max-w-xl">
          Three ways in, one standard the whole way through.
        </p>

        <Stagger className="mt-8 grid gap-4 sm:grid-cols-3" step={80}>
          {PILLARS.map((pillar) => (
            <article key={pillar.title} className="card h-full p-6">
              <h3 className="t-h3">{pillar.title}</h3>
              <p className="t-sub-sm mt-3">{pillar.text}</p>
            </article>
          ))}
        </Stagger>
      </section>

      <Connector />

      <Reveal>
        <section className="shell section pt-0">
          <h2 className="t-label-gold">What&apos;s built in</h2>
          <hr className="hairline-gold mt-3" />

          <Stagger
            className="mt-8 grid gap-4 sm:grid-cols-2"
            step={70}
          >
            {FEATURES.map((feature) => (
              <article key={feature.title} className="card h-full p-6">
                <h3 className="t-h3">{feature.title}</h3>
                <p className="t-sub-sm mt-3">{feature.text}</p>
              </article>
            ))}
          </Stagger>
        </section>
      </Reveal>

      <Connector />

      <section className="shell section pt-0">
        <h2 className="t-h2">Growth Subscription vs. One-Time Build</h2>
        <p className="t-sub-lg mt-3 max-w-xl">
          Same standard of work either way. The only real question is whether
          you&apos;d rather pay monthly or pay once.
        </p>

        <Stagger className="mt-8 grid gap-4 lg:grid-cols-2" step={80}>
          {PRICING.map((plan) => (
            <article key={plan.title} className="card flex h-full flex-col p-6 sm:p-8">
              <span className="pill pill-gold w-fit">{plan.tag}</span>

              <h3 className="t-h3 mt-4">{plan.title}</h3>

              <p className="mt-4 flex items-baseline gap-2">
                <span className="t-figure text-[2.5rem] text-gold">
                  {plan.price}
                </span>
                <span className="t-sub-sm">{plan.period}</span>
              </p>

              <p className="t-sub-sm mt-3">{plan.text}</p>

              <hr className="hairline mt-6" />

              <ul className="mt-6 grid gap-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-baseline gap-2.5">
                    <span className="text-gold" aria-hidden="true">
                      —
                    </span>
                    <span className="t-sub-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="#audit" className="btn mt-8 w-full">
                Get Your 2-Min Custom Video Audit
              </Link>
            </article>
          ))}
        </Stagger>

        <div className="mt-10 max-w-2xl border-t border-rule pt-8">
          <h3 className="t-h3">{PRICING_FAQ.question}</h3>
          <p className="t-sub-sm mt-3">{PRICING_FAQ.answer}</p>
        </div>
      </section>

      <Connector />

      <section id="audit" className="border-t border-rule">
        <div className="shell section">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div>
              <h2 className="t-display" style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}>
                Get your 2-min custom video audit.
              </h2>
              <p className="t-sub-lg mt-4 max-w-md">
                Tell me a bit about the business and I&apos;ll send back a
                2-minute Loom breakdown of the top 3 conversion leaks on the
                current site — within 24 hours.
              </p>

              <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3">
                <a
                  href={`mailto:${contactLinks.email}`}
                  className="link-rule text-[0.8125rem]"
                >
                  Email instead
                </a>
                <a
                  href={contactLinks.phoneHref}
                  className="link-rule text-[0.8125rem]"
                >
                  Call {contactLinks.phone}
                </a>
              </div>
            </div>

            <C2CIntakeForm />
          </div>
        </div>
      </section>
    </main>
  );
}

/**
 * What sits at /c2c until launch: a closed door, not an empty one. Enough to
 * confirm something is coming and name a date, nothing that says what it is —
 * the reveal is the point, and this page shouldn't spend it early.
 */
function C2CComingSoon() {
  return (
    <main>
      <section className="shell flex min-h-[calc(100svh-4rem)] items-center py-16 sm:py-24">
        <div className="max-w-xl">
          <p className="t-label-gold">C2C</p>

          <h1 className="t-display mt-5">
            Something&apos;s being built for local businesses.
          </h1>

          <hr className="hairline-gold mt-6 max-w-xs" />

          <p className="t-sub-lg mt-6 max-w-md">
            Not ready to show yet. This page stays quiet until September 1.
          </p>
        </div>
      </section>
    </main>
  );
}
