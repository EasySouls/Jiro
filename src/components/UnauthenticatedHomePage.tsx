import Link from 'next/link';
import { Button } from './ui/button';

export default function UnauthenticatedHomePage() {
  return (
    <div className='flex flex-col items-center justify-center gap-2 h-screen'>
      <h1 className='text-4xl font-semibold'>Welcome to Jiro</h1>
      <p className='text-xl text-center'>
        Jiro helps you stay organized and ease your teamwork.
      </p>
      <Button asChild>
        <Link href='/login'>Login</Link>
      </Button>
    </div>
  );
}
