import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const supabase = createClient(cookies());
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    redirect('/unauthenticated');
  }

  return (
    <>
      <h1>Dashboard</h1>
    </>
  );
}
