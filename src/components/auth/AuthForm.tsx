'use client';

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa, ViewType } from '@supabase/auth-ui-shared';
import { createClient } from '@/lib/supabase/client';
import { getUrl } from '@/lib/helpers';

export default function AuthForm({ viewType }: { viewType: ViewType }) {
  const supabase = createClient();

  return (
    <Auth
      supabaseClient={supabase}
      view={viewType}
      appearance={{
        theme: ThemeSupa,
        variables: {
          default: {
            colors: {
              brand: 'blue',
              brandAccent: 'darkblue',
            },
          },
        },
      }}
      showLinks={true}
      providers={['google']}
      redirectTo={`${getUrl()}/auth/callback`}
    />
  );
}
