/**
 * A dotted vertical timeline. Order carries meaning here — these are dated
 * positions in sequence — which is the only reason the site uses a timeline
 * device at all.
 */
export default function Timeline({ items }) {
  return (
    <div className="tl">
      {items.map((item) => (
        <article key={`${item.org}-${item.title}`} className="tl-item pb-9 last:pb-0">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="t-h3">{item.title}</h3>
            <p className="t-label">{item.time}</p>
          </div>
          <p className="t-sub-sm mt-1.5">
            {item.org}
            {item.place ? ` · ${item.place}` : ""}
          </p>
          <ul className="mt-3">
            {item.bullets.map((bullet) => (
              <li key={bullet} className="t-sub mb-1.5 last:mb-0">
                {bullet}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
