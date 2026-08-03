import Image from "next/image";

/**
 * Photography slots. These point at generated placeholders in
 * /public/placeholders — swap the `src` values for real frames and everything
 * else holds. Photographs are never desaturated the way project screenshots
 * are; colour is the point of them.
 */
const frames = [
  { src: "/placeholders/photo-01.webp", place: "Verona, Italy" },
  { src: "/placeholders/photo-02.webp", place: "Venice, Italy" },
  { src: "/placeholders/photo-03.webp", place: "New York, NY" },
  { src: "/placeholders/photo-04.webp", place: "Atlanta, GA" },
];

export default function PhotoGrid({ items = frames }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {items.map((frame, i) => (
        <figure key={frame.src} className="tile aspect-[4/5]">
          <Image
            src={frame.src}
            alt={frame.place}
            fill
            sizes="(max-width: 640px) 50vw, 25vw"
            className="object-cover"
          />
          <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink to-transparent p-3 pt-8">
            <span className="t-label">
              {String(i + 1).padStart(2, "0")} · {frame.place}
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
