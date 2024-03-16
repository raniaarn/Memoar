import { UserContext } from '@/components';
import { useContext } from 'react';
import React from 'react';

export const ProfileDataSection = () => {
  const userData = useContext(UserContext)
  const firstName = userData?.data.name ? userData.data.name.charAt(0) : '';

  return (
    <div className='justify-center items-center gap-4 inline-flex mx-auto'>
      <div className="flex justify-center items-center bg-blue-600 text-white p-2 rounded-full w-[60px] h-[60px] text-3xl">
        {firstName}
      </div>
      <div className="flex-col justify-start items-start inline-flex">
        <div className="text-black text-2xl font-bold">{userData?.data.name}</div>
        <div className="text-black text-lg font-normal">{userData?.data.email}</div>
      </div>
    </div>
  )
}