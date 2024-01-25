import ProjectPanel from "@/components/projects/ProjectPanel";
import { fetchProjectsByUserId } from "@/lib/actions/projectActions";
import { redirect } from "next/navigation";

const ProjectsPage = async () => {
  // TODO get this from auth
  const userId = "uid";
  const projects = await fetchProjectsByUserId(userId);

  async function createProject() {
    redirect("/projects/create");
  }

  if (projects.length < 1) {
    return (
      <main className='min-h-full flex items-center justify-center'>
        <h1>Projects</h1>
        <h3>You don&apost seem to have any projects.</h3>
        <p>Create a new one</p>
        <button
          onClick={() => createProject()}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Create
        </button>
      </main>
    );
  }

  return (
    <main className='min-h-full flex items-center justify-center'>
      <h1>Projects</h1>
      <h3>You have {projects.length} projects.</h3>
      <div className='grid grid-cols-3'>
        {projects.map((project, id) => (
          <ProjectPanel project={project} key={id} />
        ))}
      </div>
    </main>
  );
};

export default ProjectsPage;
