import ProjectPanel from '@/components/projects/ProjectPanel';
import { Button } from '@/components/ui/button';
import { Project } from '@/definitions';
import { getProjectsByUserId } from '@/lib/actions/projectActions';
import { getSession } from '@/lib/supabase';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const ProjectsPage = async () => {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  const projects = (await getProjectsByUserId(session.user.id)).map((data) => {
    return data.projects as Project;
  });

  return (
    <main className='min-h-full flex flex-col p-4'>
      <h1 className='mb-4'>Projects</h1>
      {projects.length === 0 ? (
        <h3>You don&apos;t seem to have any projects.</h3>
      ) : (
        <h3>You have {projects.length} projects.</h3>
      )}
      <Button
        className='w-fit mt-2 bg-blue-500 hover:bg-blue-700 text-white rounded'
        asChild
      >
        <Link href='/projects/create'>Create Project</Link>
      </Button>
      <div className='grid grid-cols-3 mt-4'>
        {projects.map((project, id) => (
          <ProjectPanel project={project} key={id} />
        ))}
      </div>
    </main>
  );
};

export default ProjectsPage;
