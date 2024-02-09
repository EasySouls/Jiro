'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createClient } from '../supabase/server';

const ProjectSchema = z.object({
  id: z.string(),
  name: z.string({
    required_error: 'Project name is required',
    invalid_type_error: 'Project name must be a string',
  }),
  description: z.string({
    required_error: 'Project description is required',
    invalid_type_error: 'Project description must be a string',
  }),
  ownerId: z.string({
    invalid_type_error: 'Please select a project owner',
  }),
  dateCreated: z.date(),
});

const CreateProject = ProjectSchema.omit({
  id: true,
  dateCreated: true,
});

// This is temporary until @types/react-dom is updated
export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createProject(formData: FormData) {
  const validatedFields = CreateProject.safeParse({
    projectName: formData.get('projectName'),
    projectDescription: formData.get('projectDescription'),
    ownerId: formData.get('ownerId'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation error: Failed to create project.',
    };
  }

  const { name, description, ownerId } = validatedFields.data;

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  supabase.from('projects').insert({
    name,
    description,
    ownerId,
  });

  revalidatePath('/projects');
  redirect('/projects');
}

const UpdateProject = ProjectSchema.pick({
  name: true,
  description: true,
});

export async function updateProject(id: number, formData: FormData) {
  const { name, description } = UpdateProject.parse({
    name: formData.get('projectName'),
    description: formData.get('projectDescription'),
  });

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  try {
    supabase.from('projects').update({ name, description }).match({ id });

    console.log(`Project ${name} updated successfully`);
  } catch (e) {
    return {
      message: 'Firestore error: Failed to update project.',
    };
  } finally {
  }

  revalidatePath(`/projects/${id}`);
  redirect(`/projects/${id}`);
}

export async function deleteProject(id: number) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  try {
    supabase.from('projects').delete().match({ id });
    console.log(`Project ${id} deleted successfully`);
  } catch (e) {
    console.error(`Supabase error: ${e}`);
  }

  revalidatePath('/projects');
  redirect('/projects');
}

export async function fetchProjectById(id: string) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .match({ id })
    .single();

  return data;
}

export async function fetchProjectsByUserId(userId: string) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: projectIds } = await supabase
    .from('members')
    .select()
    .eq('user_id', userId);

  const { data, error } = await supabase.from('projects').select('*').match({});

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}
