import {
  getLeaderById,
  getOrganizationByName,
} from '@/lib/actions/organizationActions';
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

  return (
    <div>
      <h1>{organization.name}</h1>
      <p>Leader email: {leader?.email}</p>
    </div>
  );
}
