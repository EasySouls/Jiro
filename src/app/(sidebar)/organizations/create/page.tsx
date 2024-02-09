import { createOrganization } from '@/lib/actions/organizationActions';
import { getSession } from '@/lib/supabase';
import { redirect } from 'next/navigation';

export default async function CreateOrganizationPage() {
  const user = (await getSession())?.user;

  if (!user) {
    redirect('/login');
  }

  return (
    <main className='min-h-full flex flex-col items-center justify-center'>
      <h1>Create Organization</h1>
      <form className='flex flex-col space-y-4' action={createOrganization}>
        <label>
          Name
          <input type='text' name='name' className='p-2 text-black' />
        </label>
        <button
          type='submit'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Create
        </button>
      </form>
    </main>
  );
}
