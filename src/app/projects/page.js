import BuildingStatus from "@/components/projects/BuildingStatus";
import GitHubActivity from "@/components/projects/GitHubActivity";
import HeroProject from "@/components/projects/HeroProject";
import ProjectsExplorer from "@/components/projects/ProjectsExplorer";
import projects from "@/data/projects.json";
import { getRepoStats, withLiveMetrics } from "@/lib/projectStats";

export const metadata = {
  title: "Projects",
  description:
    "Projects by CJ Thomas — AI-powered equity research, NBA analytics over a cached pipeline, and a photography portfolio.",
};

// Matches src/lib/projectStats.REVALIDATE_SECONDS: the live GitHub-stats
// fetches this page kicks off are cached under this same window, so setting
// the page's own revalidate here keeps Vercel regenerating it on the same
// ~30-minute cadence rather than serving a page that's fresher or staler
// than the data inside it.
export const revalidate = 1800;

export default async function ProjectsPage() {
  const repoStats = await getRepoStats();
  const liveProjects = projects.map((project) =>
    withLiveMetrics(project, repoStats)
  );
  const heroProject = liveProjects.find((p) => p.slug === "bullbrief");

  return (
    <main className="shell section">
      <h1 className="t-display">Projects</h1>
      <p className="t-sub-lg mt-4 max-w-xl">
        Everything here started as a data problem. The interface came second,
        which is usually the right order and occasionally the wrong one.
      </p>

      <BuildingStatus />

      <div className="mt-14">
        <GitHubActivity />
      </div>

      {heroProject && (
        <div className="mt-16">
          <HeroProject project={heroProject} />
        </div>
      )}

      <div className="mt-16">
        <ProjectsExplorer projects={liveProjects} />
      </div>
    </main>
  );
}
