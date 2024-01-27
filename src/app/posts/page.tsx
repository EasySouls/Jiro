import NewTodo from '@/components/posts/NewTodo';
import RealtimePostList from '@/components/posts/RealtimePostList';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

export const revalidate = 0;

export default async function PostsPage() {
  const supabase = createClient(cookies());
  const { data, error } = await supabase.from('posts').select();

  if (error) {
    console.error(error);
    return <div>Error</div>;
  }

  return (
    <>
      <NewTodo />
      <RealtimePostList serverPosts={data ?? []} />;
    </>
  );
}
