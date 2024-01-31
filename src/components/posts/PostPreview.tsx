import { Post } from '@/definitions';
import { FaceFrownIcon, FaceSmileIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function PostPreview({ post }: { post: Post }) {
  // TODO Show the athor's username

  return (
    <Link
      href={`/posts/${post.id}`}
      className='flex flex-col w-full items-center m-2 p-4 rounded-md dark:bg-slate-800 dark:text-white'
    >
      <h2 className='text-xl font-bold'>{post.title}</h2>
      <p className='text-md'>{post.content}</p>
      <div className='flex w-full gap-4'>
        <span className='flex gap-2'>
          <FaceSmileIcon className='w-6 h-6 text-gray-500 dark:text-white' />
          {post.likes}
        </span>
        <span className='flex gap-2'>
          <FaceFrownIcon className='w-6 h-6 text-gray-500 dark:text-white' />
          {post.dislikes}
        </span>
      </div>
    </Link>
  );
}
