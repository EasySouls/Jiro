'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createClient } from '../supabase/server';
import { getSession } from '../supabase';

const ProjectSchema = z.object({
  id: z.number(),
  name: z.string({
    required_error: 'Project name is required',
    invalid_type_error: 'Project name must be a string',
  }),
  description: z.string({
    required_error: 'Project description is required',
    invalid_type_error: 'Project description must be a string',
  }),
  pm_id: z.string({
    invalid_type_error: 'Please select a project owner',
  }),
  organization_id: z.number({
    required_error: 'Please select an organization for this project',
  }),
  dateCreated: z.date(),
});

const CreateProject = ProjectSchema.pick({
  name: true,
  description: true,
  organization_id: true,
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
    name: formData.get('projectName'),
    description: formData.get('projectDescription'),
    organization_id: Number(formData.get('organizationId')),
  });

  if (!validatedFields.success) {
    console.error(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation error: Failed to create project.',
    };
  }

  const { name, description, organization_id } = validatedFields.data;

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const session = await getSession();

  if (!session) {
    console.error('Session not found');
    return {
      errors: null,
      message: 'Session not found',
    };
  }

  const { data: newProject, error } = await supabase
    .from('projects')
    .insert({
      name: name,
      description: description,
      pm_id: session?.user.id,
      organization_id: organization_id,
    })
    .select()
    .single();

  if (error) {
    console.error(error);
    return {
      errors: error.details,
      message: `Code: ${error.code} - ${error.message}`,
    };
  }

  // Also add the user as a member of the project
  // TODO Add this as a trigger in the database
  await supabase.from('members').insert({
    user_id: session.user.id,
    project_id: newProject?.id,
  });

  const newProjectId = newProject?.id;

  revalidatePath('/projects');
  redirect(`/projects/${newProjectId}`);
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

export async function getProjectById(id: string) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .match({ id })
    .single();

  return data;
}

export async function getProjectsByUserId(userId: string) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: projects, error } = await supabase
    .from('members')
    .select('projects(*)')
    .eq('user_id', userId);

  if (error) {
    console.error(error);
    return [];
  }

  return projects;
}

export async function getUsersOwnProjects() {
  const supabase = createClient(cookies());
  const session = await getSession();

  if (!session) {
    throw new Error('Session not found');
  }

  const { data, error } = await supabase
    .from('projects')
    .select()
    .eq('pm_id', session?.user.id!);

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}
