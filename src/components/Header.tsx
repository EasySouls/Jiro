'use client';

import Link from 'next/link';
import LogOutButton from './LogOutButton';
import { useUser } from '@/contexts/user';

export const revalidate = 0;

export default function Header() {
  const { user } = useUser();

  return (
    <header className='flex justify-between items-center p-4 bg-slate-600'>
      <Link href='/' className='text-2xl font-semibold'>
        Jiro
      </Link>
      <nav className='flex gap-4 hover:[&>*]:underline items-center'>
        <Link href='/posts'>Posts</Link>
        <Link href='/todos'>Todos</Link>
        <Link href='/projects'>Projects</Link>
        {user ? (
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
