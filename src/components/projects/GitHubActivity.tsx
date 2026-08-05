"use client";

import { useEffect, useState } from "react";
import { githubFallback } from "@/data/engineering";

const GITHUB_USERNAME = "cedricsthomasjr";
const WEEK_COUNT = 12;
const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000;

type GithubStats = typeof githubFallback.stats;

type GithubEvent = {
  type: string;
  created_at: string;
  payload?: { commits?: unknown[] };
};

/** Deterministic — same on server and client, so it's safe as the initial
 *  render before the relative-time effect below takes over. */
function formatAbsolute(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** Only ever called client-side, post-mount — never during SSR — so it can't
 *  produce a hydration mismatch even though its output changes by the minute. */
function formatRelative(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.round(diffMs / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days} day${days === 1 ? "" : "s"} ago`;
  const months = Math.round(days / 30);
  return `${months} month${months === 1 ? "" : "s"} ago`;
}

/** Buckets PushEvents from the public events feed into the last 12 weeks,
 *  oldest first, current week last — same shape as githubFallback.weeks. */
function bucketPushEvents(events: GithubEvent[]) {
  const weeks = Array<number>(WEEK_COUNT).fill(0);
  const now = Date.now();

  for (const event of events) {
    if (event.type !== "PushEvent") continue;
    const created = new Date(event.created_at).getTime();
    const age = now - created;
    if (age < 0 || age >= WEEK_COUNT * MS_PER_WEEK) continue;

    const weeksAgo = Math.floor(age / MS_PER_WEEK);
    const index = WEEK_COUNT - 1 - weeksAgo;
    if (index < 0 || index >= WEEK_COUNT) continue;

    weeks[index] += event.payload?.commits?.length ?? 1;
  }

  return weeks;
}

function latestPushAt(events: GithubEvent[]) {
  const pushes = events.filter((e) => e.type === "PushEvent");
  if (pushes.length === 0) return null;
  return pushes.reduce((latest, e) =>
    new Date(e.created_at) > new Date(latest.created_at) ? e : latest
  ).created_at;
}

/** Gold intensity tier for a heatmap cell, 0 (no activity) through 4
 *  (busiest week in the visible range). Mirrors the dot-lattice idiom used
 *  by body::before / .pointer-light / UsaMap rather than a GitHub-green
 *  calendar. */
function tierFor(count: number, max: number) {
  if (count <= 0 || max <= 0) return 0;
  return Math.min(4, Math.ceil((count / max) * 4));
}

const TIER_OPACITY = [0, 0.28, 0.5, 0.72, 1];

export default function GitHubActivity() {
  const [weeks, setWeeks] = useState<number[]>(githubFallback.weeks);
  const [stats, setStats] = useState<GithubStats>(githubFallback.stats);
  const [latestLabel, setLatestLabel] = useState(() =>
    formatAbsolute(githubFallback.stats.latestCommitAt)
  );

  // Live fetch. Falls through silently on any failure — the fallback data
  // rendered above is already a complete, honest-looking page.
  useEffect(() => {
    let cancelled = false;

    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events`, {
      cache: "no-store",
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((events: GithubEvent[]) => {
        if (cancelled || !Array.isArray(events)) return;

        setWeeks(bucketPushEvents(events));

        const latest = latestPushAt(events);
        if (latest) {
          setStats((prev) => ({ ...prev, latestCommitAt: latest }));
        }
      })
      .catch(() => {
        /* offline, rate-limited, or blocked — keep the fallback in place */
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Relative time only ever runs on the client, after mount, so the server-
  // rendered markup and the first client render always agree.
  useEffect(() => {
    setLatestLabel(formatRelative(stats.latestCommitAt));
    const id = setInterval(() => {
      setLatestLabel(formatRelative(stats.latestCommitAt));
    }, 60_000);
    return () => clearInterval(id);
  }, [stats.latestCommitAt]);

  const max = Math.max(...weeks, 1);

  return (
    <div className="mt-10">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="t-label">Shipping cadence</p>
        <p className="t-label">Last 12 weeks</p>
      </div>

      <div
        className="mt-4 flex items-end gap-2 sm:gap-3"
        role="img"
        aria-label={`Commit activity over the last 12 weeks, most recent week busiest at ${max} commits`}
      >
        {weeks.map((count, i) => {
          const tier = tierFor(count, max);
          return (
            <span
              key={i}
              title={`${count} commit${count === 1 ? "" : "s"}`}
              className="h-3.5 w-3.5 rounded-[3px] sm:h-4 sm:w-4"
              style={
                tier === 0
                  ? {
                      border: "1px solid var(--color-rule)",
                      background: "transparent",
                    }
                  : {
                      border: "1px solid transparent",
                      background: `rgb(200 160 70 / ${TIER_OPACITY[tier]})`,
                    }
              }
            />
          );
        })}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
        <div className="border-t border-rule pt-3">
          <p className="t-label">Repositories Shipped</p>
          <p className="t-figure mt-1.5 text-[1.5rem] text-gold">
            {stats.reposShipped}
          </p>
        </div>
        <div className="border-t border-rule pt-3">
          <p className="t-label">Primary Stack</p>
          <p className="t-figure mt-1.5 text-[1.25rem] text-gold">
            {stats.primaryStack}
          </p>
        </div>
        <div className="border-t border-rule pt-3">
          <p className="t-label">Engineering Focus</p>
          <p className="t-figure mt-1.5 text-[1.25rem] text-gold">
            {stats.engineeringFocus}
          </p>
        </div>
        <div className="border-t border-rule pt-3">
          <p className="t-label">Latest Commit</p>
          <p className="t-figure mt-1.5 text-[1.5rem] text-gold">
            {latestLabel}
          </p>
        </div>
      </div>
    </div>
  );
}
