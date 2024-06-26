'use client';
import GenerateImage from '@/components/GenerateImage'
import React from 'react';
import useAuthRedirect from '@/utils/useAuthRedirect';
import { useAuth } from '@/utils/auth';

const generate = () => {
  useAuthRedirect();
  // const { logout } = useAuth();
  return (
    <div className='min-h-screen bg-white flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8'>
        <GenerateImage />
    </div>
  )
}

export default generate