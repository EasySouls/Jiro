import AuthenticatedHomePage from '@/components/AuthenticatedHomePage';
import UnauthenticatedHomePage from '@/components/UnauthenticatedHomePage';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import Image from 'next/image';

export default async function Home() {
  const supabase = createClient(cookies());
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div className='flex flex-col items-center justify-center min-h-full py-2'>
      <Image
        src='/vercel.svg'
        alt='Vercel Logo'
        className='h-1/4 w-1/4'
        width={300}
        height={300}
      />
      {session ? (
        <AuthenticatedHomePage session={session} />
      ) : (
        <UnauthenticatedHomePage />
      )}
    </div>
  );
}

