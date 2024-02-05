import AuthForm from '@/components/auth/AuthForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Signup | Jiro',
};

export default function SignUpPage() {
  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-2xl font-bold mt-4'>Sign Up</h1>
      <div className='w-2/3'>
        <AuthForm viewType='sign_up' />
      </div>
    </div>
  );
}
