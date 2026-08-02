import { contactLinks } from "@/data/resume";

const external = [
  { href: contactLinks.github, label: "GitHub" },
  { href: contactLinks.linkedin, label: "LinkedIn" },
  { href: contactLinks.photography, label: "Photography" },
];

export default function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="shell flex flex-col gap-8 py-12 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="t-h3">cj thomas</p>
          <p className="t-sub-sm mt-2 max-w-sm">
            Pipelines, models, and the interfaces that make them useful.
          </p>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-3">
          <a href={`mailto:${contactLinks.email}`} className="link-rule text-[0.8125rem]">
            Email
          </a>
          {external.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="link-rule text-[0.8125rem]"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <div className="shell border-t border-rule py-5">
        <p className="t-label">© {new Date().getFullYear()} CJ Thomas</p>
      </div>
    </footer>
  );
}
