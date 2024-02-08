import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

export default async function OrganizationPage({ name }: { name: string }) {
  const supabase = createClient(cookies());
  const { data: organization, error } = await supabase
    .from('organizations')
    .select('*')
    .eq('name', name)
    .single();

  if (error || !organization) {
    notFound();
  }

  const { data: leader } = await supabase
    .from('profiles')
    .select('email')
    .eq('id', organization.leader_id!)
    .single();

  return (
    <div>
      <h1>{organization.name}</h1>
      <p>Leader email: {leader?.email}</p>
    </div>
  );
}
