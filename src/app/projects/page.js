import ProjectRow from "@/components/ProjectRow";
import Stagger from "@/components/Stagger";
import projects from "@/data/projects.json";

export const metadata = {
  title: "Work",
  description:
    "Projects by CJ Thomas — AI-powered equity research, NBA analytics over a cached pipeline, and a photography portfolio.",
};

export default function ProjectsPage() {
  return (
    <main className="shell section">
      <h1 className="t-display">Work</h1>
      <p className="t-sub-lg mt-4 max-w-xl">
        Everything here started as a data problem. The interface came second,
        which is usually the right order and occasionally the wrong one.
      </p>

      <Stagger className="mt-14 grid gap-6" step={90}>
        {projects.map((project, i) => (
          <ProjectRow key={project.slug} project={project} priority={i === 0} />
        ))}
      </Stagger>
    </main>
  );
}
