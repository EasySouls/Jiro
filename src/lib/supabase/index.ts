import { createClient } from './server';
import { cookies } from 'next/headers';

export async function getSession() {
  const supabase = createClient(cookies());
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
}
