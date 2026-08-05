import { currentFocus } from "@/data/engineering";

/**
 * Top-of-page "what I'm building right now" banner. Static, server-rendered —
 * nothing here changes at runtime, so it costs nothing in the client bundle.
 * The status pill reuses the same gold-outline treatment ProjectRow already
 * uses for "Live", just with a dot standing in for the emoji the original
 * brief asked for.
 */
export default function BuildingStatus() {
  return (
    <div className="mt-10">
      <span className="pill pill-gold t-label-gold">
        <svg
          width="7"
          height="7"
          viewBox="0 0 7 7"
          aria-hidden="true"
          className="mr-1.5"
        >
          <circle cx="3.5" cy="3.5" r="3.5" fill="var(--color-gold)" />
        </svg>
        Active Sprint
      </span>

      <h2 className="t-h3 mt-4 max-w-2xl">{currentFocus.focus}</h2>

      <ul className="mt-4 flex flex-wrap gap-2">
        {currentFocus.tags.map((tag) => (
          <li key={tag}>
            <span className="pill">{tag}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
