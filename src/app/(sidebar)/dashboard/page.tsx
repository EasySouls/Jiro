import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getSession } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { getUsersOwnProjects } from '@/lib/actions/projectActions';

export default async function DashboardPage() {
  const supabase = createClient(cookies());
  const session = await getSession();

  // Middleware automatically redirects to the login page if the session is not found, but this handles edge cases
  if (!session) {
    redirect('/unauthenticated');
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .select()
    .eq('id', session.user.id)
    .single();

  if (error) {
    return <h1>Error fetching profile</h1>;
  }

  const projects = await getUsersOwnProjects();

  return (
    <main className='p-4'>
      <h1 className='text-3xl'>Dashboard</h1>
      <h2 className=''>Welcome, {profile.username}!</h2>
      <p>Email: {profile.email}</p>
      <Image
        src={profile.avatar_url || ''}
        alt='Profile picture'
        width={30}
        height={30}
      />
      <Button asChild className='mt-4'>
        <Link href='/dashboard/edit'>Edit profile</Link>
      </Button>
      <div className='grid-cols-2'>
        {/** Projects */}
        <div className=''>
          <h3>Projects</h3>
          {projects.map((project) => (
            <div key={project.id}>
              <Link href={`/projects/${project.id}`}>{project.name}</Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
