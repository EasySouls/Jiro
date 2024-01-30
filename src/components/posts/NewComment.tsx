'use client';

import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { useState } from 'react';

export default function NewComment({ postId }: { postId: string }) {
  const [comment, setComment] = useState('');

  async function createComment() {
    'use server';

    const supabase = createClient(cookies());
    const { data: session } = await supabase.auth.getSession();

    if (!session) {
      throw new Error('Not authenticated');
    }

    await supabase.from('comments').insert({
      post_id: Number(postId),
      content: comment,
    });
  }

  return (
    <div className='flex'>
      <input
        type='text'
        name='comment'
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder='Add a comment...'
        className='w-5/6'
      />
      <button onClick={() => createComment()} className='w-1/6 p-2 '>
        Comment
      </button>
    </div>
  );
}
