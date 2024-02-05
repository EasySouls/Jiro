'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Profile } from '@/definitions';
import { createClient } from '@/lib/supabase/client';

export default function Avatar({
  uid,
  url,
  size,
  onUpload,
}: {
  uid: string;
  url: Profile['avatar_url'];
  size: number;
  onUpload: (url: string) => void;
}) {
  const supabase = createClient();

  const [avatarUrl, setAvatarUrl] = useState(url);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const { data, error } = await supabase.storage
          .from('avatars')
          .download(path);
        if (error) {
          throw error;
        }

        const url = URL.createObjectURL(data);
        setAvatarUrl(url);
      } catch (error) {
        console.error('Error downloading image', error);
      }
    }

    if (url) {
      downloadImage(url);
    }
  }, [supabase.storage, url]);

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (
    event
  ) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileText = file.name.split('.').pop();
      const filePath = `${uid}-${Math.random()}.${fileText}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      alert('Error uploading avatar');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {avatarUrl ? (
        <Image
          width={size}
          height={size}
          src={avatarUrl}
          alt='Profile picture'
          className='rounded-full'
          style={{ height: size, width: size }}
        />
      ) : (
        <div className='w-32 h-32 bg-gray-300 rounded-full' />
      )}
      <div style={{ width: size }}>
        <label className='text-blue-600 cursor-pointer' htmlFor='single'>
          {uploading ? 'Uploading...' : 'Upload'}
        </label>
        <input
          style={{ visibility: 'hidden', position: 'absolute' }}
          type='file'
          id='single'
          accept='image/*'
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div>
  );
}
