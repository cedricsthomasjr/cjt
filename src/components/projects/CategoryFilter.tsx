export const CATEGORIES = [
  "All",
  "Flagship Consumer Build",
  "Infrastructure & Systems",
  "Leisure Build",
  "Automation & Workflows",
  "Full-Stack",
] as const;

export type Category = (typeof CATEGORIES)[number];

/**
 * Filter pills. Same is-active pattern as the HeroProject tabs and the USA
 * map's state chips — one control idiom, reused a third time rather than
 * invented again.
 */
export default function CategoryFilter({
  active,
  onChange,
}: {
  active: Category;
  onChange: (category: Category) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
      {CATEGORIES.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onChange(category)}
          aria-pressed={active === category}
          className={`usa-chip ${active === category ? "is-active" : ""}`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
