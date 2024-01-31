'use client';

import { createComment } from '@/lib/actions/postActions';
import { useState } from 'react';

export default function NewComment({ postId }: { postId: string }) {
  const [comment, setComment] = useState('');

  return (
    <div className='flex p-2 gap-2'>
      <input
        type='text'
        name='comment'
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder='Add a comment...'
        className='w-5/6 rounded-md p-2 text-black'
      />
      <button
        onClick={async () => createComment(postId, comment)}
        className='max-w-1/6 w-1/6 p-2 bg-green-500 rounded-md'
        disabled={comment.length === 0}
      >
        Comment
      </button>
    </div>
  );
}
