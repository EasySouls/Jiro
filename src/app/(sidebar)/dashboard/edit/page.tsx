import EditAccountForm from '@/components/dashboard/EditAccountForm';
import { createClient } from '@/lib/supabase/server';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Edit Account',
  description: 'Edit your account',
};

export default async function EditAccountPage() {
  const supabase = createClient(cookies());
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/unauthenticated');
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .select()
    .eq('id', session.user.id)
    .single();

  if (error || !profile) {
    return <h1>Error fetching profile</h1>;
  }

  return <EditAccountForm profile={profile} />;
}
