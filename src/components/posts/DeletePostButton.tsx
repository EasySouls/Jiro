import { deletePostById } from '@/lib/actions/postActions';

export default function DeletePostButton({
  postId,
  onSuccess,
  onFailure,
}: {
  postId: number;
  onSuccess: () => void;
  onFailure: (error: Error) => void;
}) {
  async function deletePost() {
    'use server';

    await deletePostById(postId).catch(onFailure);
    onSuccess();
  }

  return (
    <form
      className='p-2 flex items-center gap-2 rounded-md text-white bg-red-600 hover:bg-red-500 transition-colors duration-100'
      action={deletePost}
    >
      Delete
    </form>
  );
}
