import ContactForm from "@/components/ContactForm";
import { contactLinks } from "@/data/resume";

export const metadata = {
  title: "Contact",
  description:
    "Get in touch with CJ Thomas about AI/ML engineering, data platforms, and analytics work.",
};

const channels = [
  { label: "Email", value: contactLinks.email, href: `mailto:${contactLinks.email}` },
  { label: "Phone", value: contactLinks.phone, href: contactLinks.phoneHref },
  { label: "LinkedIn", value: "cedric-thomas-jr", href: contactLinks.linkedin },
  { label: "GitHub", value: "cedricsthomasjr", href: contactLinks.github },
  { label: "Based in", value: contactLinks.location, href: null },
];

export default function ContactPage() {
  return (
    <main className="shell section">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <h1 className="t-display">Contact</h1>
          <p className="t-sub-lg mt-4 max-w-md">
            Open to conversations about machine learning, data platforms,
            analytics, and anything where the hard part is the data.
          </p>

          <div className="card mt-10 p-6 sm:p-8">
            <hr className="hairline-gold" />
            {channels.map((channel) => {
              const row = (
                <>
                  <span className="t-label">{channel.label}</span>
                  <span className="t-sub-sm text-bone">{channel.value}</span>
                </>
              );

              return channel.href ? (
                <a
                  key={channel.label}
                  href={channel.href}
                  target={channel.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="flex items-baseline justify-between gap-4 border-b border-rule py-3.5 transition-colors hover:text-gold-lift"
                >
                  {row}
                </a>
              ) : (
                <div
                  key={channel.label}
                  className="flex items-baseline justify-between gap-4 border-b border-rule py-3.5"
                >
                  {row}
                </div>
              );
            })}
          </div>
        </div>

        <ContactForm />
      </div>
    </main>
  );
}
