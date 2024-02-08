import OrganizationPreview from '@/components/organizations/OrganizationPreview';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

export default async function OrganizationsPage() {
  const supabase = createClient(cookies());
  const { data: organizations } = await supabase
    .from('organizations')
    .select()
    .limit(10);

  if (!organizations) {
    return <div>No organizations found</div>;
  }

  return (
    <div>
      {organizations.map((organization) => (
        <OrganizationPreview
          key={organization.id}
          organization={organization}
        />
      ))}
    </div>
  );
}
