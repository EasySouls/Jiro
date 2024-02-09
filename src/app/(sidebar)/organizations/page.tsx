import OrganizationPreview from '@/components/organizations/OrganizationPreview';
import { Button } from '@/components/ui/button';
import { getSession } from '@/lib/supabase';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function OrganizationsPage() {
  const supabase = createClient(cookies());

  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  const { data: organizations } = await supabase
    .from('organizations')
    .select()
    .eq('leader_id', session?.user.id!)
    .order('created_at', { ascending: true });

  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-2xl mt-4'>Organizations</h1>
      <div className='flex flex-col items-center gap-2'>
        <h2>Create your own organization!</h2>
        <Button asChild>
          <Link href='/organizations/create'>Create</Link>
        </Button>
      </div>
      <div className='w-full mt-6 p-2 flex flex-col'>
        {organizations &&
          organizations.map((organization) => (
            <OrganizationPreview
              key={organization.id}
              organization={organization}
            />
          ))}
      </div>
    </div>
  );
}
