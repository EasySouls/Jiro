import RealtimePost from '@/components/posts/RealtimePost';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

export const revalidate = 0;

export default async function PostPage({
  params: { postId },
}: {
  params: { postId: string };
}) {
  const supabase = createClient(cookies());
  const { data: post } = await supabase
    .from('posts')
    .select()
    .match({ id: postId })
    .single();

  if (!post) {
    notFound();
  }

  return <RealtimePost serverPost={post} />;
}
