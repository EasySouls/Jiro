'use client';

import Link from 'next/link';
import LogOutButton from './LogOutButton';
import Logo from './Logo';
import { useUser } from '@/contexts/user';
import { Button } from './ui/button';

export const revalidate = 0;

export default function Header() {
  const { user } = useUser();

  return (
    <header className='w-full flex items-center py-2 px-4 bg-white dark:bg-slate-600 border-b shadow-md'>
      <div className='md:max-w-screen-2xl mx-auto flex items-center w-full justify-between'>
        <Logo />
        <nav className='hidden w-full space-x-4 md:block md:w-auto hover:[&>*]:underline items-center justify-between'>
          <Link href='/posts'>Posts</Link>
          <Link href='/todos'>Todos</Link>
          <Link href='/projects'>Projects</Link>
          <Link href='/organizations'>Organizations</Link>
        </nav>
        {user ? (
          <LogOutButton />
        ) : (
          <Button variant='default' size='sm' asChild>
            <Link href='/login' className='ml-4'>
              Login
            </Link>
          </Button>
        )}
      </div>
    </header>
  );
}
