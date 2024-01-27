'use client';

import { createClient } from '@/lib/supabase/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export default function LogOutButton() {
  const supabase = createClient();

  const handleLogOut = () => {
    supabase.auth.signOut();
    redirect('/');
  };

  return (
    <button
      onClick={() => handleLogOut()}
      className='py-1 px-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-300'
    >
      Sign Out
    </button>
  );
}
