'use client';

import { Post } from '@/definitions';
import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import PostPreview from './PostPreview';

export default function RealtimePost({ serverPost }: { serverPost: Post }) {
  const supabase = createClient();

  const [post, setPost] = useState(serverPost);

  useEffect(() => {
    const channel = supabase
      .channel('posts')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'posts',
          filter: `id=eq.${post.id}`,
        },
        (payload) => {
          setPost(payload.new as Post);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, post, setPost]);

  return <PostPreview post={post} />;
}
