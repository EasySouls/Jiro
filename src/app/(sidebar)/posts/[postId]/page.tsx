import DeletePostButton from '@/components/posts/DeletePostButton';
import NewComment from '@/components/posts/NewComment';
import RealtimeCommentList from '@/components/posts/RealtimeCommentList';
import RealtimePost from '@/components/posts/RealtimePost';
import { createClient } from '@/lib/supabase/server';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const revalidate = 0;

function onPostDeleteSuccess() {
  console.log('Post deleted successfully');
}

function onPostDeleteFailure(error: Error) {
  console.error('Failed to delete post:', error);
}

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

  const { data: comments } = await supabase
    .from('comments')
    .select()
    .match({ post_id: postId });

  if (comments?.length === 0) {
    console.log('No comments yet for post with id', postId);
  } else {
    console.log('Comments for post with id', postId, ':', comments);
  }

  const { data: session } = await supabase.auth.getSession();

  const isOwnPost = post.user_id === session?.session?.user?.id;

  return (
    <>
      <div className='flex justify-between mt-4'>
        <Link href='/posts' className='flex items-center gap-2 pl-2'>
          <ArrowLeftIcon className='h-5 w-5' />
          Back
        </Link>
        {isOwnPost && (
          <div className='flex gap-2 pr-2'>
            <DeletePostButton
              postId={post.id}
              onSuccess={onPostDeleteSuccess}
              onFailure={onPostDeleteFailure}
            />
            <Link
              href={`/posts/${post.id}/edit`}
              className='p-2 flex items-center gap-2 rounded-md text-white bg-green-600 hover:bg-green-500 transition-colors duration-100'
            >
              Edit Post
            </Link>
          </div>
        )}
      </div>
      <RealtimePost serverPost={post} />
      <NewComment postId={postId} />
      <RealtimeCommentList serverComments={comments ?? []} postId={postId} />
    </>
  );
}
