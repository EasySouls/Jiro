import { Project } from '@/definitions';
import { getOrganizationName } from '@/lib/actions/organizationActions';
import Link from 'next/link';

export default async function ProjectPanel({ project }: { project: Project }) {
  const createdAt = new Date(project.created_at).toUTCString();
  const orgName = await getOrganizationName(project.organization_id);

  return (
    <Link
      href={`/projects/${project.id}`}
      className='bg-slate-900 text-white dark:bg-slate-200 dark:text-black shadow-md rounded-md px-8 pt-6 pb-8'
    >
      <h4 className='font-semibold mb-2'>{project.name}</h4>
      <p>Organization: {orgName}</p>
      <p className='mb-1'>{project.description}</p>
      <hr className='bg-black dark:bg-slate-200 h-[2px]' />
      <p>Created: {createdAt}</p>
    </Link>
  );
}
