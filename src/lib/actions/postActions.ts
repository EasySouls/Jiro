'use server';

import { cookies } from 'next/headers';
import { createClient } from '../supabase/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { redirect } from 'next/navigation';

const PostSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Title is required' })
    .max(100, { message: 'Title should not be longer than 100 characters' }),
  content: z.string().min(1, { message: 'Content is required' }),
});

export type State = {
  errors?: {
    title?: string[];
    content?: string[];
  };
  message?: string | null;
};

export async function addPost(prevState: State, formData: FormData) {
  const supabase = createClient(cookies());

  const validatedFields = PostSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
  });

  if (!validatedFields.success) {
    console.error(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Please fill out all fields.',
    };
  }

  const { title, content } = validatedFields.data;
  const { error } = await supabase.from('posts').insert({ title, content });

  if (error) {
    console.error(error);
    return {
      message: 'Supabase error. Failed to create post.',
    };
  }

  revalidatePath('/posts');
  redirect('/posts');
}
