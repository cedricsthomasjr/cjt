import Link from "next/link";
import Connector from "@/components/Connector";
import Reveal from "@/components/Reveal";
import Stagger from "@/components/Stagger";
import C2CIntakeForm from "@/components/c2c/C2CIntakeForm";
import { contactLinks } from "@/data/resume";

/**
 * The offer is finished but the infra behind it (intake routing, payment
 * collection, the actual onboarding workflow) isn't, so the page stays
 * behind a gate until it is. September 1, 2026, UTC.
 */
const LAUNCH_DATE = new Date("2026-09-01T00:00:00Z");
const isLive = () => Date.now() >= LAUNCH_DATE.getTime();

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
    text: "The site is built, hosted, and maintained for one recurring number — nothing due before launch.",
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
    text: "One project, one invoice — the site is yours outright the day it launches.",
    features: [
      "Custom-built site, owned outright at launch",
      "Flat price, nothing recurring",
      "Two rounds of revisions included",
      "Maintenance available separately, month to month",
    ],
  },
];

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
          <p className="t-label-gold">CJ to Client</p>

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
              Request a Free 2-Minute Audit
            </Link>
          </div>
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
                Talk through this option
              </Link>
            </article>
          ))}
        </Stagger>
      </section>

      <Connector />

      <section id="audit" className="border-t border-rule">
        <div className="shell section">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div>
              <h2 className="t-display" style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}>
                Book your free 2-minute audit.
              </h2>
              <p className="t-sub-lg mt-4 max-w-md">
                Tell me a bit about the business and I&apos;ll follow up with
                a short read on where the current site is costing you and
                what fixing it looks like.
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
