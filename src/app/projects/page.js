import ProjectCard from "@/components/ProjectCard";
import projects from "@/data/projects.json";

export const metadata = {
  title: "Work",
  description:
    "Projects by CJ Thomas — AI-powered equity research, degree planning over a prerequisite graph, and an NBA analytics pipeline.",
};

export default function ProjectsPage() {
  return (
    <main className="shell section">
      <h1 className="t-display">work</h1>
      <p className="t-sub-lg mt-4 max-w-xl">
        Everything here started as a data problem. The interface came second,
        which is usually the right order and occasionally the wrong one.
      </p>

      <div className="mt-14 grid gap-5 sm:grid-cols-2">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.slug}
            project={project}
            priority={i < 2}
          />
        ))}
      </div>
    </main>
  );
}
