'use client';

import { Post } from '@/definitions';
import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import PostPreview from './PostPreview';

export default function RealtimePostList({
  serverPosts,
}: {
  serverPosts: Post[];
}) {
  const supabase = createClient();

  const [posts, setPosts] = useState(serverPosts);

  useEffect(() => {
    const channel = supabase
      .channel('posts')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'posts',
        },
        (payload) => {
          setPosts((posts) => [...posts, payload.new as Post]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, posts, setPosts]);

  return (
    <>
      {posts.map((post) => (
        <PostPreview key={post.id} post={post} />
      ))}
    </>
  );
}
