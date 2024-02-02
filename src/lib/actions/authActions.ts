'use server';

import { cookies, headers } from 'next/headers';
import { createClient } from '../supabase/server';
import { redirect } from 'next/navigation';
import { track } from '@vercel/analytics/server';

export const signIn = async (formData: FormData) => {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return redirect('/login?message=Could not authenticate user');
  }

  return redirect('/');
};

export const signUp = async (formData: FormData) => {
  // TODO - add validation with Zod
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const username = formData.get('username') as string;
  const fullName = formData.get('fullname') as string;

  const origin = headers().get('origin');
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: {
        username: username,
        full_name: fullName,
      },
    },
  });

  if (error) {
    return redirect('/login?message=Could not authenticate user');
  }

  return redirect(
    '/login?message=Check your email to continue sign in process'
  );
};

export const getEmailbyUserId = async (userId: string) => {
  const supabase = createClient(cookies());
  const { data, error } = await supabase
    .from('users')
    .select('email')
    .eq('id', userId);

  if (error) {
    return null;
  }

  return data?.[0]?.email;
};
