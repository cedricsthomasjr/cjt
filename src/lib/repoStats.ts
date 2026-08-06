/**
 * Shared GitHub-stats aggregation core. Two callers use this:
 *
 *  - scripts/fetch-github-stats.ts — a build-time (`prebuild`) run that
 *    writes the result to data/repo-cache.json as a committed fallback.
 *  - src/lib/projectStats.ts — a request-time call from the /projects page
 *    (Server Component), cached via Next's fetch revalidation so the page
 *    itself refreshes on a schedule without a redeploy.
 *
 * Keeping the query, the repo→project mapping, and the aggregation math in
 * one place means those two call sites can't quietly drift out of sync with
 * each other.
 */

const GITHUB_OWNER = "cedricsthomasjr";
const GRAPHQL_ENDPOINT = "https://api.github.com/graphql";

/** Project key → the one or more GitHub repos that make it up. Most
 *  projects are a single repo; `bullbrief` shipped as three (an early
 *  monorepo plus the split frontend/backend that replaced it), so its
 *  entry sums all three into one project-level figure. */
export const REPO_CONFIG: Record<string, string[]> = {
  cjt: ["cjt"],
  bullbrief: ["bullbrief", "bullbrief-frontend", "bullbrief-backend"],
  apeirion: ["apeirion"],
  "air-ticket-system": ["air-ticket-system"],
  CrossyAnt: ["CrossyAnt"],
};

/** One project's aggregated stats — the shape written to repo-cache.json
 *  and returned by fetchAllProjectStats. */
export interface ProjectStats {
  commits: number;
  stars: number;
  languages: string[];
}

export type RepoCache = Record<string, ProjectStats>;

/** One repo's stats, before aggregation across a project's REPO_CONFIG entry. */
interface RepoStats {
  commits: number;
  stars: number;
  language: string | null;
}

/** Minimal typed slice of the GraphQL response — only the fields the query
 *  below actually asks for. */
interface RepoQueryResponse {
  data?: {
    repository: {
      stargazerCount: number;
      primaryLanguage: { name: string } | null;
      defaultBranchRef: {
        target: {
          history: { totalCount: number };
        };
      } | null;
    } | null;
  };
  errors?: { message: string }[];
}

const REPO_QUERY = `
  query ($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      stargazerCount
      primaryLanguage {
        name
      }
      defaultBranchRef {
        target {
          ... on Commit {
            history {
              totalCount
            }
          }
        }
      }
    }
  }
`;

/** Fetches one repo's stats. Isolated in its own try/catch so a repo that's
 *  been deleted, renamed, or made private can't take the rest of a run down
 *  with it — it just contributes nothing to its project's aggregate.
 *
 *  `revalidateSeconds`, when passed, is attached as `next: { revalidate }`
 *  so Next.js Server Components/Route Handlers get ISR-style background
 *  refresh on this fetch for free. Plain Node (the build script) ignores an
 *  unrecognized `next` fetch option harmlessly. */
export async function fetchRepoStats(
  token: string,
  repoName: string,
  revalidateSeconds?: number
): Promise<RepoStats | null> {
  try {
    const res = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: REPO_QUERY,
        variables: { owner: GITHUB_OWNER, name: repoName },
      }),
      ...(revalidateSeconds !== undefined
        ? { next: { revalidate: revalidateSeconds } }
        : {}),
    });

    if (!res.ok) {
      console.warn(`[repoStats] ${repoName}: GitHub responded ${res.status}`);
      return null;
    }

    const body = (await res.json()) as RepoQueryResponse;

    if (body.errors?.length) {
      console.warn(
        `[repoStats] ${repoName}: ${body.errors[0]?.message ?? "GraphQL error"}`
      );
      return null;
    }

    const repo = body.data?.repository;
    if (!repo) {
      console.warn(`[repoStats] ${repoName}: no repository returned`);
      return null;
    }

    return {
      commits: repo.defaultBranchRef?.target.history.totalCount ?? 0,
      stars: repo.stargazerCount,
      language: repo.primaryLanguage?.name ?? null,
    };
  } catch (error) {
    console.warn(
      `[repoStats] ${repoName}: ${error instanceof Error ? error.message : "fetch failed"}`
    );
    return null;
  }
}

/** Sums commits/stars and dedupes languages across a project's constituent
 *  repos, preserving first-seen order (so `bullbrief`'s TypeScript frontend
 *  reliably lists before its Python backend rather than shuffling by run). */
export function aggregateRepoStats(repoStats: (RepoStats | null)[]): ProjectStats {
  const languages: string[] = [];
  let commits = 0;
  let stars = 0;

  for (const stats of repoStats) {
    if (!stats) continue;
    commits += stats.commits;
    stars += stats.stars;
    if (stats.language && !languages.includes(stats.language)) {
      languages.push(stats.language);
    }
  }

  return { commits, stars, languages };
}

/** Fetches and aggregates every project in REPO_CONFIG. Individual repo
 *  failures degrade that one project to zeroed-out stats (see
 *  aggregateRepoStats) rather than rejecting the whole call. */
export async function fetchAllProjectStats(
  token: string,
  revalidateSeconds?: number
): Promise<RepoCache> {
  const entries = await Promise.all(
    Object.entries(REPO_CONFIG).map(async ([projectKey, repoNames]) => {
      const repoStats = await Promise.all(
        repoNames.map((repoName) =>
          fetchRepoStats(token, repoName, revalidateSeconds)
        )
      );
      return [projectKey, aggregateRepoStats(repoStats)] as const;
    })
  );

  return Object.fromEntries(entries);
}
