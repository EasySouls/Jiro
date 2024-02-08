import { Organization } from '@/definitions';
import Link from 'next/link';

export default function OrganizationPreview({
  organization,
}: {
  organization: Organization;
}) {
  const createdAt = new Date(organization.created_at);

  return (
    <Link
      href={`organizations/${organization.name}`}
      className='bg-slate-300 dark:bg-slate-500 rounded-md p-4 w-full text-left cursor-pointer hover:bg-slate-400 dark:hover:bg-slate-600 transition-colors'
    >
      <h3>{organization.name}</h3>
      <p>Created at: {createdAt.toISOString()}</p>
    </Link>
  );
}
