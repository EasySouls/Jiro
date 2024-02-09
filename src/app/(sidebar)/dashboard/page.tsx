import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default async function DashboardPage() {
  const supabase = createClient(cookies());
  const {
    data: { session },
  } = await supabase.auth.getSession();

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

  return (
    <main>
      <h1>Dashboard</h1>
      <h2>Welcome, {profile.username}!</h2>
      <p>Email: {profile.email}</p>
      <Image
        src={profile.avatar_url || ''}
        alt='Profile picture'
        width={30}
        height={30}
      />
      <Link href='/dashboard/edit'>Edit profile</Link>
    </main>
  );
}
