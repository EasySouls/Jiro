import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function UnauthenticatedPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect('/');
  }

  return <div>Please sign in to view your content!</div>;
}
