import BuildingStatus from "@/components/projects/BuildingStatus";
import GitHubActivity from "@/components/projects/GitHubActivity";
import HeroProject from "@/components/projects/HeroProject";
import ProjectsExplorer from "@/components/projects/ProjectsExplorer";
import projects from "@/data/projects.json";

export const metadata = {
  title: "Work",
  description:
    "Projects by CJ Thomas — AI-powered equity research, NBA analytics over a cached pipeline, and a photography portfolio.",
};

export default function ProjectsPage() {
  const heroProject = projects.find((p) => p.slug === "bullbrief");

  return (
    <main className="shell section">
      <h1 className="t-display">Work</h1>
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
        <ProjectsExplorer projects={projects} />
      </div>
    </main>
  );
}
