import NewPost from '@/components/posts/NewPost';
import RealtimePostList from '@/components/posts/RealtimePostList';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

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
      {/* Only show the option to write a post, if the user is logged in */}
      {session && <NewPost />}
      <RealtimePostList serverPosts={data ?? []} />;
    </>
  );
}
