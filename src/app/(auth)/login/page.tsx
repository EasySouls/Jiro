import { signIn, signUp } from '@/lib/actions/authActions';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sign in | Jiro',
};

const LoginPage = ({ searchParams }: { searchParams: { message: string } }) => {
  return (
    <main className='flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2'>
      <Link
        href='/'
        className='w-fit py-2 px-4 rounded-md no-underline text-white bg-blue-500 hover:bg-blue-600 flex items-center group text-sm'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1'
        >
          <polyline points='15 18 9 12 15 6' />
        </svg>{' '}
        Back
      </Link>

      <form
        className='animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground'
        action={signIn}
      >
        {/* Email */}
        <label className='text-md' htmlFor='email'>
          Email
        </label>
        <input
          className='rounded-md px-4 py-2 bg-inherit border mb-6'
          name='email'
          placeholder='you@example.com'
          required
        />

        {/* Username */}
        <label className='text-md' htmlFor='username'>
          Username
        </label>
        <input
          className='rounded-md px-4 py-2 bg-inherit border mb-6'
          name='username'
          placeholder='Username'
          required
        />

        {/* Full Name */}
        <label className='text-md' htmlFor='fullname'>
          Full Name
        </label>
        <input
          className='rounded-md px-4 py-2 bg-inherit border mb-6'
          name='fullname'
          placeholder='Full Name'
          required
        />

        {/* Password */}
        <label className='text-md' htmlFor='password'>
          Password
        </label>
        <input
          className='rounded-md px-4 py-2 bg-inherit border mb-6'
          type='password'
          name='password'
          placeholder='••••••••'
          required
        />

        <button className='bg-green-700 rounded-md px-4 py-2 text-foreground mb-2'>
          Sign In
        </button>
        <button
          formAction={signUp}
          className='border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2'
        >
          Sign Up
        </button>
        {searchParams?.message && (
          <p className='mt-4 p-4 bg-foreground/10 text-foreground text-center'>
            {searchParams.message}
          </p>
        )}
      </form>
    </main>
  );
};

export default LoginPage;
