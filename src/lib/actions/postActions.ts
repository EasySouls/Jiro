'use server';

import { cookies } from 'next/headers';
import { createClient } from '../supabase/server';
import { revalidatePath } from 'next/cache';

export async function addPost(formData: FormData) {
  const supabase = createClient(cookies());

  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  await supabase.from('posts').insert({ title, content });
  revalidatePath('/posts');
}
