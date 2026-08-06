import { NextResponse } from "next/server";

/**
 * Serves the same numbers GitHub's own contribution graph shows.
 *
 * Why GraphQL and not the public /users/:u/events feed the client used to
 * hit directly: that feed is structurally incapable of matching the graph.
 * It buckets by *push* time rather than commit-author time (a batch authored
 * Monday and pushed Wednesday lands on the wrong day), it counts every
 * branch while the graph counts only the default branch, it omits private
 * contributions entirely, and its PushEvent payloads carry no `commits`
 * array at all — so "commit counts" derived from it were really push counts.
 *
 * contributionsCollection is the exact backing data for the graph, so the
 * strip and the profile page agree by construction.
 *
 * The token is read here, server-side, and never crosses to the client —
 * only the derived per-day counts do.
 */

const GITHUB_USERNAME = "cedricsthomasjr";
const DAY_COUNT = 30;
const REVALIDATE_SECONDS = 1800;

/** GitHub's own quartile buckets, which is what colours the real graph.
 *  Reusing them means our tiers can't drift from the profile page. */
const LEVEL_BY_ENUM: Record<string, number> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

const CALENDAR_QUERY = `
  query ($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

type ContributionDay = {
  date: string;
  contributionCount: number;
  contributionLevel: string;
};

/** Most recent PushEvent timestamp. The events feed is wrong for *counting*
 *  commits, but it is accurate for "when did the last push land" — that's a
 *  push time, and we label it as one. */
async function fetchLatestPush(token: string) {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=100`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
        },
        next: { revalidate: REVALIDATE_SECONDS },
      }
    );
    if (!res.ok) return null;
    const events: { type: string; created_at: string }[] = await res.json();
    if (!Array.isArray(events)) return null;

    const pushes = events.filter((e) => e.type === "PushEvent");
    if (pushes.length === 0) return null;
    return pushes.reduce((latest, e) =>
      new Date(e.created_at) > new Date(latest.created_at) ? e : latest
    ).created_at;
  } catch {
    return null;
  }
}

// Next.js requires route segment config exports (like `revalidate`) to be
// statically-analyzable literals, not a reference to a variable — even a
// local const. REVALIDATE_SECONDS above still drives the actual fetch calls
// in this file; this literal just has to independently match it.
export const revalidate = 1800;

export async function GET() {
  const token = process.env.GITHUB_TOKEN;

  // No token configured — say so plainly rather than silently serving
  // numbers from a source that doesn't match the graph. The client keeps
  // its static fallback and labels it honestly.
  if (!token) {
    return NextResponse.json(
      { error: "GITHUB_TOKEN is not configured" },
      { status: 501 }
    );
  }

  const to = new Date();
  const from = new Date(to.getTime() - (DAY_COUNT - 1) * 24 * 60 * 60 * 1000);
  from.setHours(0, 0, 0, 0);

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: CALENDAR_QUERY,
        variables: {
          login: GITHUB_USERNAME,
          from: from.toISOString(),
          to: to.toISOString(),
        },
      }),
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `GitHub GraphQL responded ${res.status}` },
        { status: 502 }
      );
    }

    const body = await res.json();

    if (body.errors?.length) {
      return NextResponse.json(
        { error: body.errors[0]?.message ?? "GraphQL error" },
        { status: 502 }
      );
    }

    const calendar =
      body.data?.user?.contributionsCollection?.contributionCalendar;
    if (!calendar) {
      return NextResponse.json(
        { error: "No contribution calendar returned" },
        { status: 502 }
      );
    }

    // The calendar always comes back as whole weeks, so it can overhang the
    // window on both ends. Trim to the trailing DAY_COUNT days.
    const allDays: ContributionDay[] = calendar.weeks.flatMap(
      (week: { contributionDays: ContributionDay[] }) => week.contributionDays
    );

    const todayKey = new Date().toISOString().slice(0, 10);
    const days = allDays
      .filter((day) => day.date <= todayKey)
      .slice(-DAY_COUNT)
      .map((day) => ({
        date: day.date,
        count: day.contributionCount,
        level: LEVEL_BY_ENUM[day.contributionLevel] ?? 0,
      }));

    const latestPushAt = await fetchLatestPush(token);

    return NextResponse.json({
      days,
      totalContributions: calendar.totalContributions,
      latestPushAt,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 502 }
    );
  }
}
