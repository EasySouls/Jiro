'use server';

import { cookies } from 'next/headers';
import { createClient } from '../supabase/server';
import { redirect } from 'next/navigation';
import { getSession } from '../supabase';

export async function createOrganization(formData: FormData) {
  const name = formData.get('name') as string;

  try {
    if (!name || name === '') {
      throw new Error('Name is required to create an organization.');
    }

    const supabase = createClient(cookies());
    const session = await getSession();
    const user = session?.user;

    if (!user) {
      throw new Error('You must be loggin in to create organizations.');
    }

    const { error } = await supabase.from('organizations').insert({
      name: name,
      leader_id: user?.id,
    });

    if (error) {
      console.error('Error creating organization', error);
      throw error;
    }
  } catch (error) {
    console.error('Error creating organization', error);
    throw new Error('Error creating organization');
  }

  redirect(`/organizations/${name}`);
}

export async function getOrganizationByName(name: string) {
  const supabase = createClient(cookies());
  const { data, error } = await supabase
    .from('organizations')
    .select()
    .eq('name', name)
    .maybeSingle();

  if (error) {
    console.error('Error getting organization', error);
  }

  return data;
}

export async function getLeaderById(leaderId: string) {
  const supabase = createClient(cookies());
  const { data, error } = await supabase
    .from('profiles')
    .select('email')
    .eq('id', leaderId)
    .single();

  if (error) {
    console.error('Error getting leader', error);
  }

  return data;
}
