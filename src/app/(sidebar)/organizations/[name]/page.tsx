import {
  getLeaderById,
  getOrganizationByName,
  getProjectsByOrganizationId,
} from '@/lib/actions/organizationActions';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function OrganizationPage({
  params: { name },
}: {
  params: { name: string };
}) {
  const organization = await getOrganizationByName(name);

  if (!organization) {
    notFound();
  }

  const leader = await getLeaderById(organization.leader_id);
  const projects = await getProjectsByOrganizationId(organization.id);

  return (
    <div className='p-4'>
      <h1>{organization.name}</h1>
      <hr className='bg-slate-400 h-[2px] w-[10rem]' />
      <div className='mt-4'>
        <h2>Leader</h2>
        <div className='w-fit bg-blue-500 rounded-full p-2 mt-2'>
          <Link href={`/users/${organization.leader_id}`}>
            {leader?.username}
          </Link>
        </div>
      </div>
      <div className='w-full mt-4'>
        <h2>Projects in this organizations</h2>
        {projects.length === 0 ? (
          <div>No projects in this organization</div>
        ) : (
          <div className='grid-cols-2 w-full'>
            {projects.map((project) => (
              <div
                key={project.id}
                className='w-fit bg-blue-500 rounded-full p-2 mt-2'
              >
                <Link href={`/projects/${project.id}`}>{project.name}</Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
