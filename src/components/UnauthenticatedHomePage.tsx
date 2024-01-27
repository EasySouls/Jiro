import Link from 'next/link';

export default function UnauthenticatedHomePage() {
  return (
    <div className='flex flex-col items-center gap-2 h-screen'>
      <h1 className='text-4xl font-semibold'>Welcome to Jiro</h1>
      <p className='text-xl text-center'>
        Jiro helps you stay organized and ease your teamwork.
      </p>
      <button className='p-2 bg-slate-600 text-white rounded-md'>
        <Link href='/login'>Login</Link>
      </button>
    </div>
  );
}
