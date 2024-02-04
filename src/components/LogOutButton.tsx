'use client';

import { useUser } from '@/contexts/user';
import { useRouter } from 'next/navigation';

export default function LogOutButton() {
  const { logout } = useUser();
  const router = useRouter();

  return (
    <button
      onClick={() => {
        logout();
        router.push('/');
      }}
      className='py-1 px-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-300'
    >
      Sign Out
    </button>
  );
}
