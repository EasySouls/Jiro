import { fetchProjectById } from '@/lib/actions/projectActions';

const ProjectPage = async ({ params }: { params: { projectId: string } }) => {
  const id = params.projectId;
  const project = await fetchProjectById(id);

  return (
    <main className='h-full w-full'>
      <h1>Project Page</h1>
      <p>{project?.name}</p>
    </main>
  );
};

export default ProjectPage;
