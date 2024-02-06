import AuthForm from '@/components/auth/AuthForm';
import { getSession } from '@/lib/supabase';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Signup | Jiro',
};

export default async function SignUpPage() {
  const session = await getSession();

  if (session) {
    return redirect('/dashboard');
  }

  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-2xl font-bold mt-4'>Sign Up</h1>
      <div className='w-2/3'>
        <AuthForm viewType='sign_up' />
      </div>
    </div>
  );
}
