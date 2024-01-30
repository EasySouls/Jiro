import RealtimePostList from '@/components/posts/RealtimePostList';
import { createClient } from '@/lib/supabase/server';
import { BookOpenIcon } from '@heroicons/react/24/outline';
import { cookies } from 'next/headers';
import Link from 'next/link';

export const revalidate = 0;

export default async function PostsPage() {
  const supabase = createClient(cookies());
  const { data, error } = await supabase.from('posts').select();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (error) {
    console.error(error);
    return <div>Error</div>;
  }

  return (
    <>
      <div className='flex justify-between p-2 items-center'>
        <h1 className='text-2xl'>Posts</h1>
        <Link
          className='p-2 flex items-center gap-2 rounded-md text-white bg-green-600 hover:bg-green-500 transition-colors duration-100'
          href='/posts/new'
        >
          <BookOpenIcon className='h-6 w-6' />
          New Post
        </Link>
      </div>
      <RealtimePostList serverPosts={data ?? []} />;
    </>
  );
}
