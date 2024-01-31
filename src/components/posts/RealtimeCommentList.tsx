'use client';

import { createClient } from '@/lib/supabase/client';
import { useState, useEffect } from 'react';
import { Comment } from '@/definitions';
import { Comme } from 'next/font/google';
import CommentPreview from './CommentPreview';

export default function RealtimeCommentList({
  serverComments,
  postId,
}: {
  serverComments: Comment[];
  postId: string;
}) {
  const supabase = createClient();
  const [comments, setComments] = useState(serverComments);

  useEffect(() => {
    const channel = supabase
      .channel('comments-by-post-id')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'comments',
          filter: `post_id=eq.${postId}`,
        },
        (payload) => {
          console.log(payload);
          setComments((posts) => [...posts, payload.new as Comment]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, comments, setComments, postId]);

  return (
    <ul className='p-2 mt-2 flex flex-col gap-2'>
      {comments.map((comment) => (
        <CommentPreview key={comment.id} comment={comment} />
      ))}
    </ul>
  );
}
