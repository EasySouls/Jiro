import { addPost } from '@/lib/actions/postActions';

export default async function NewTodo() {
  return (
    <form action={addPost} className='flex flex-col'>
      <input type='text' name='title' placeholder='Title' />
      <input type='text' name='content' placeholder='Content' />
      <button type='submit'>Post</button>
    </form>
  );
}
