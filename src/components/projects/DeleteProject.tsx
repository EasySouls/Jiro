import { deleteProject } from '@/lib/actions/projectActions';
import { TrashIcon } from '@heroicons/react/16/solid';

const DeleteProject = ({ id }: { id: number }) => {
  const deleteProjectWithId = deleteProject.bind(null, id);

  return (
    <form action={deleteProjectWithId}>
      <button type='submit' className='rounded-lg border p-2 hover:bg-gray-100'>
        <span className='sr-only'>Delete</span>
        <TrashIcon className='w-4' />
      </button>
    </form>
  );
};

export default DeleteProject;
