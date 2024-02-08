import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
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

  return (
    <div className='w-full h-full flex flex-col gap-8 items-center pt-20'>
      <h2 className='text-2xl'>Please sign in to view your content!</h2>
      <Button asChild>
        <Link href='/signup'>Sign up</Link>
      </Button>
    </div>
  );
}
