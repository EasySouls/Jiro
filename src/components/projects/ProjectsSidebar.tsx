import { Project } from "@/lib/definitions/projects";
import Link from "next/link";

type Params = {
  projects: Project[];
};

const ProjectsSidebar = ({ projects }: Params) => {
  return (
    <div className='min-h-full'>
      <h1>Projects</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <Link href={`/projects/${project.id}`}>{project.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectsSidebar;
