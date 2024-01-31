import { Comment } from '@/definitions';
import { FaceFrownIcon, FaceSmileIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function CommentPreview({ comment }: { comment: Comment }) {
  return (
    <li className='flex flex-col p-4 gap-2 text-black dark:bg-slate-600 dark:text-white rounded-md'>
      <div className='flex justify-between'>
        <Link href={`/users/${comment.user_id}`}>@{comment.user_id}</Link>
        <span className='text-xs text-gray-400'>
          {new Date(comment.created_at).toLocaleString()}
        </span>
      </div>
      <div className='flex justify-between'>
        <p className='font-semibold'>{comment.content}</p>
        <button className='text-xs text-gray-400'>Reply</button>
      </div>
      <div className='flex w-full gap-4 mt-2'>
        <button className='flex gap-2 hover:bg-slate-400 p-2 rounded-md'>
          <FaceSmileIcon className='w-6 h-6 text-gray-500 dark:text-white' />
          {comment.likes}
        </button>
        <button className='flex gap-2 hover:bg-slate-400 p-2 rounded-md'>
          <FaceFrownIcon className='w-6 h-6 text-gray-500 dark:text-white' />
          {comment.dislikes}
        </button>
      </div>
    </li>
  );
}
