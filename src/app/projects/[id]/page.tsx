import { fetchProjectById } from "@/lib/actions/projectActions";

const ProjectPage = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const project = await fetchProjectById(id);

  return (
    <main className='h-full w-full'>
      <h1>Project Page</h1>
      <p>{project?.name}</p>
      <p>{project?.description}</p>
    </main>
  );
};

export default ProjectPage;
