import NewPost from '@/components/posts/NewPost';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'New Post | Jiro',
  description: 'Create a new post',
}

export default function NewPostPage() {
  return <NewPost />;
}
