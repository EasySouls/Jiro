import { createClient } from './server';
import { cookies } from 'next/headers';

export async function getSession() {
  const supabase = createClient(cookies());
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
}
