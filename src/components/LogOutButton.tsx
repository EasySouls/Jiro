'use client';

import { useUser } from '@/contexts/user';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

export default function LogOutButton() {
  const { logout } = useUser();
  const router = useRouter();

  return (
    <Button
      onClick={() => {
        logout();
        router.push('/');
      }}
      variant='outline'
      size='sm'
    >
      Sign Out
    </Button>
  );
}
