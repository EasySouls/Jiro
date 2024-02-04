'use client';

import UserProvider from '@/contexts/user';

export function Providers({ children }: { children: React.ReactElement }) {
  return <UserProvider>{children}</UserProvider>;
}
