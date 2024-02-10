import { Button } from '@/components/ui/button';
import { getUsersOrganizations } from '@/lib/actions/organizationActions';
import { createProject } from '@/lib/actions/projectActions';

// TODO Implement the form using a client component so we can use the `useForm` hook and receive errors from the server action

export default async function CreateProjectPage() {
  const availableOrganizations = await getUsersOrganizations();

  return (
    <main className='p-4'>
      <h1 className='mb-4'>Create your project</h1>
      <form
        action={createProject}
        className='flex flex-col gap-4 w-1/2 text-black'
      >
        <input
          type='text'
          name='projectName'
          placeholder='Project name'
          className='p-2 rounded-md'
        />
        <textarea
          name='projectDescription'
          placeholder='Project description'
          className='p-2 rounded-md'
        />
        <select name='organizationId' className='rounded-md p-2 text-slate-500'>
          <option>Organization</option>
          {availableOrganizations.map((organization) => (
            <option key={organization.id} value={organization.id}>
              {organization.name}
            </option>
          ))}
        </select>
        <Button
          className='w-fit bg-blue-500 hover:bg-blue-700 text-white rounded'
          type='submit'
        >
          Create
        </Button>
      </form>
    </main>
  );
}
