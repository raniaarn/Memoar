import React from 'react'
import { PostDataProps } from '@/components/types/postData';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { HiOutlineChat, HiOutlineHeart, HiHeart } from "react-icons/hi";

export const Card: React.FC<PostDataProps> = ({
  id,
  description,
  user,
  updated_at,
  created_at,
  likes_count,
  replies_count,
  is_like_post,
  is_own_post
}) => {
  function formatTimestampToDate(timestamp: string):string {
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${day}-${month}-${year}`;
  }

  return (
    <div key={id} className="w-full flex-col justify-center items-center mt-4 w-[90%] mx-auto">
      <div className="flex-col w-full justify-center items-center bg-white rounded-[10px] gap-2 inline-flex shadow pb-4">
        <div className='w-full px-4 py-4 flex'>
          <div className='flex flex-col w-full bg-white gap-4 items-start'>
            <div className=' justify-center items-center gap-4 inline-flex'>
              <div className="flex justify-center items-center bg-blue-600 text-white p-2 rounded-full aspect-[2.5/1] text-xl font-bold">
                {user.name.charAt(0)}
              </div>
              <div className="flex-col justify-start items-start inline-flex">
                <div className="text-black text-lg font-bold">{user.name}</div>
                <div className="text-black text-sm font-normal">{user.email}</div>
                <div className="text-black text-sm font-normal"> {formatTimestampToDate(created_at)} </div>
              </div>
            </div>
            <div className="text-md">
              {description}
            </div>
          </div>
          {(is_own_post) ? (
            <button className="w-fit h-fit">
              <EllipsisVerticalIcon className="w-4 h-4" />
            </button>

          ) : (
            <></>
          )}
        </div>
        <div className="flex flex-row w-full justify-center">
          <button className="w-full flex flex-row gap-2 items-center justify-center">
            {(!is_like_post) ? (
              <HiOutlineHeart className="w-6 h-6" />
            ) : (
              <HiHeart className="w-6 h-6" />
            )}
            {likes_count} Like
          </button>
          <button className="w-full flex flex-row gap-2 items-center justify-center">
            <HiOutlineChat className="w-6 h-6" />
            {replies_count} Replies
          </button>
        </div>
      </div>
    </div>
  )
}