'use client';

import { use, useEffect } from 'react';

const ProjectsErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className='flex flex-col h-full items-center justify-center'>
      <h2 className='text-2xl font-bold'>Something went wrong</h2>
      <button
        className='mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400'
        onClick={
          // Attempt to recover by trying to re-render the projects route
          () => reset()
        }
      >
        Try again
      </button>
    </main>
  );
};
