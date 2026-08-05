import Reveal from "@/components/Reveal";
import SkillPill from "@/components/SkillPill";

interface SkillItem {
  title: string;
  skills: { name: string; learnedWhere: string; learnedWhen: string }[];
}

interface SkillsSection {
  title: string;
  items: SkillItem[];
}

/**
 * The Resume page's Skills section. Same row layout as the other resume
 * sections (label column + content column), but each pill is a SkillPill
 * instead of static text — hover or tap any one to see where and when it
 * was picked up.
 */
export default function Skills({ section }: { section: SkillsSection }) {
  return (
    <Reveal>
      <section className="mt-12 sm:mt-16 lg:mt-20">
        <h2 className="t-h2">{section.title}</h2>
        <hr className="hairline-gold mt-3" />

        <div>
          {section.items.map((item) => (
            <article
              key={item.title}
              className="grid gap-3 border-b border-rule py-6 last:border-b-0 sm:py-7 lg:grid-cols-[18rem_1fr] lg:gap-10 lg:py-8"
            >
              <div>
                <h3 className="t-h3">{item.title}</h3>
              </div>

              <ul className="flex max-w-2xl flex-wrap gap-2">
                {item.skills.map((skill) => (
                  <li key={skill.name}>
                    <SkillPill skill={skill} />
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </Reveal>
  );
}
