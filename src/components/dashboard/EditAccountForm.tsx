'use client';

import { useCallback, useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Profile } from '@/definitions';
import { redirect } from 'next/navigation';
import Avatar from './Avatar';

export default function EditAccountForm({ profile }: { profile: Profile }) {
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(profile.username);
  const [email, setEmail] = useState(profile.email);
  const [avatarUrl, setAvatarUrl] = useState(profile.avatar_url);

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from('profiles')
        .select('username, email, avatar_url')
        .eq('id', profile.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setEmail(data.email);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert('Error fetching user profile');
    } finally {
      setLoading(false);
    }
  }, [profile.id, supabase]);

  useEffect(() => {
    getProfile();
  }, [profile, getProfile]);

  async function updateProfile({
    username,
    email,
    avatar_url,
  }: {
    username: string | null;
    email: string | null;
    avatar_url: string | null;
  }) {
    try {
      setLoading(true);

      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: profile.id,
          username,
          email,
          avatar_url,
          updated_at: new Date().toISOString(),
        })
        .eq('id', profile.id);

      if (error) {
        throw error;
      }

      redirect('/dashboard');
    } catch (error) {
      alert('Error updating user profile');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='flex flex-col'>
      <h1 className='text-2xl my-4'>Edit Profile</h1>
      <div>
        <label htmlFor='username'>Username</label>
        <input
          id='username'
          type='text'
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
          className='ml-2 h-2/3 p-2 border-2 text-black border-slate-300 rounded-md transition-colors duration-200 focus:border-blue-700 focus:outline-none'
        />
      </div>
      <div>
        <label htmlFor='email'>Email</label>
        <input
          id='email'
          type='text'
          value={email || ''}
          className='ml-2 h-2/3 p-2 border-2 border-slate-300 rounded-md transition-colors duration-200 focus:border-blue-700 focus:outline-none'
          disabled
        />
      </div>

      <Avatar
        uid={profile.id}
        url={avatarUrl}
        size={150}
        onUpload={(url) => {
          setAvatarUrl(url);
          updateProfile({ username, email, avatar_url: url });
        }}
      />

      <div>
        <button
          className='p-2 bg-blue-700 hover:bg-blue-600 rounded-md transition-colors duration-200'
          onClick={() =>
            updateProfile({ username, email, avatar_url: avatarUrl })
          }
        >
          {loading ? 'Loading ...' : 'Update Profile'}
        </button>
      </div>

      <div className='mt-4'>
        <form action='/auth/signout' method='post'>
          <button
            type='submit'
            className='p-2 rounded-md bg-red-600 text-white hover:bg-white hover:text-red-600 transition-colors duration-200'
          >
            Sign Out
          </button>
        </form>
      </div>
    </div>
  );
}
