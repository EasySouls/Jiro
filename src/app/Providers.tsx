'use client';

import SupabaseProvider from '@/contexts/supabase-provider';
import UserProvider from '@/contexts/user';
import { SupabaseAuthClient } from '@supabase/supabase-js/dist/module/lib/SupabaseAuthClient';

export function Providers({ children }: { children: React.ReactElement }) {
  return (
    <SupabaseProvider>
      <UserProvider>{children}</UserProvider>
    </SupabaseProvider>
  );
}
