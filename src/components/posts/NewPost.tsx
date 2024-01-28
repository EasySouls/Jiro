'use client';

import { addPost } from '@/lib/actions/postActions';
import { useFormState } from 'react-dom';

export default function NewPost() {
  const initialState = {
    message: '',
    errors: {},
  };
  const [state, dispatch] = useFormState(addPost, initialState);

  return (
    <form
      action={dispatch}
      className='flex flex-col w-fit items-center m-2 p-4 rounded-md dark:bg-slate-800 dark:text-white'
    >
      {/* Post Title */}
      <div className=''>
        <label htmlFor='title' className='sr-only'>
          Title
        </label>
        <input
          type='text'
          name='title'
          id='title'
          placeholder='Title'
          aria-describedby='title-error'
          className='m-2 p-2 rounded-md bg-slate-800 text-white dark:bg-slate-200 dark:text-black'
        />
        <div
          className=''
          id='title-error'
          aria-live='polite'
          aria-atomic='true'
        >
          {state?.errors?.title &&
            state.errors.title.map((error: string) => (
              <p className='ml-2 mt-1 text-sm text-red-500' key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>

      {/* Post Content */}
      <div className=''>
        <label htmlFor='content' className='sr-only'>
          Content
        </label>
        <textarea
          name='content'
          id='content'
          placeholder='Content'
          aria-describedby='content-error'
          className='m-2 p-2 rounded-md bg-slate-800 text-white dark:bg-slate-200 dark:text-black'
        />
        <div
          className=''
          id='content-error'
          aria-live='polite'
          aria-atomic='true'
        >
          {state?.errors?.content &&
            state.errors.content.map((error: string) => (
              <p className='ml-2 mt-1 text-sm text-red-500' key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>
      <button
        type='submit'
        className='bg-blue-600 py-1 px-2 rounded-md cursor-pointer hover:border-blue-600 hover:bg-black dark:text-white dark:hover:bg-slate-200 dark:hover:text-blue-600 transition-colors duration-200'
      >
        Post
      </button>
    </form>
  );
}
