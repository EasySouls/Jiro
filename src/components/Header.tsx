import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { cookies } from 'next/headers';
import LogOutButton from './LogOutButton';

export const revalidate = 0;

export default async function Header() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <header className='flex justify-between items-center p-4 bg-slate-600'>
      <h1 className='text-2xl font-semibold'>Jiro</h1>
      <nav className='flex gap-4 hover:[&>*]:underline items-center'>
        <Link href='/'>Home</Link>
        <Link href='/todos'>Todos</Link>
        <Link href='/projects'>Projects</Link>
        {session ? (
          <LogOutButton />
        ) : (
          <Link href='/login' className='ml-4'>
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}
