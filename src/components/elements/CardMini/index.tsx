import React from 'react'
import { ReplyDataProps } from '@/components/types/postData';
import { TrashIcon } from '@heroicons/react/20/solid'
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

export const CardMini: React.FC<ReplyDataProps> = ({
  id,
  description,
  user,
  posts_id,
  users_id,
  deleted_at,
  updated_at,
  created_at,
  is_own_reply
}) => {
  const router = useRouter()

  function formatTimestampToDate(timestamp: string): string {
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${day}-${month}-${year}`;
  }

  const HandleDelete = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/api/replies/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            'Authorization': `Bearer ${Cookies.get('user_token')}`
          }
        },
      )
      const result = await response.json();
      if (result?.success) {
        router.reload();
      }
      toast.success("Berhasil menghapus notes")
    } catch (error) { 
      toast.error("gagal")
    }
  };

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
                <div className="text-black text-sm font-normal"> {formatTimestampToDate(created_at)} </div>
              </div>
            </div>
            <div className="text-md">
              {description}
            </div>
          </div>
          {(is_own_reply) ? (
            <button
              onClick={HandleDelete}
              className="w-fit h-fit">
              <TrashIcon className="w-4 h-4" />
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  )
}
