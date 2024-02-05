'use client';

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa, ViewType } from '@supabase/auth-ui-shared';
import { createClient } from '@/lib/supabase/client';

export default function AuthForm({ viewType }: { viewType: ViewType }) {
  const supabase = createClient();

  return (
    <Auth
      supabaseClient={supabase}
      view={viewType}
      appearance={{ theme: ThemeSupa }}
      theme='dark'
      showLinks={true}
      providers={['google']}
    />
  );
}
