import React, { useState } from 'react'
import { PostDataProps, ReplyDataProps } from '@/components/types/postData';
import { useMutation, useQueries } from '@/components';
import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
import { CardMini } from '@/components/elements/CardMini';

export const RepliesModule: React.FC<PostDataProps> = ({
  id,
  description,
  user,
}) => {
  const { mutate } = useMutation()
  const [descriptionNew, setDescriptionNew] = useState<string>();

  console.log(id)

  const LayoutComponent = dynamic(
    () => import('@/components/Layout').then(mod => mod.Layout)
  );

  const { data, isLoading } = useQueries({
    prefixUrl: `${process.env.NEXT_PUBLIC_API}/api/replies/post/${id}`,
    headers: {
      'Authorization': `Bearer ${Cookies.get('user_token')}`
    }
  })

  return (
    <LayoutComponent metaTitle="Post" metaDescription="Memoar Post">
      <div className='mt-[100px]'>
        <div className="w-[90%] flex-col justify-center items-center mt-4 w-[90%] mx-auto">
          <div className="flex-col w-full justify-center items-center bg-white rounded-[10px] gap-2 inline-flex shadow pb-4">
            <div className='w-full px-4 py-4 flex'>
              <div className='flex flex-col w-full bg-white gap-4 items-start'>
                <div className='justify-center items-center gap-4 inline-flex'>
                  <div className="flex justify-center items-center bg-blue-600 text-white p-2 rounded-full aspect-[2.5/1] text-xl font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <div className="flex-col justify-start items-start inline-flex">
                    <div className="text-black text-lg font-bold">{user.name}</div>
                  </div>
                </div>
                <div className="text-md">
                  {description}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full p-4 mx-auto bg-white rounded-[10px] shadow">
            <textarea
              className="w-full p-6 bg-blue-100 rounded-[10px] justify-start items-start gap-4 inline-flex"
              value={descriptionNew}
              onChange={(event) => setDescriptionNew(event.target.value)}
              placeholder="What's happening ..."
            />
            <button
              className="w-full px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-900 rounded-md justify-center items-center text-white text-lg"
            >
              Reply
            </button>
          </div>
          <div className=" flex-col w-full justify-center items-center infline-flex">
            {
              data?.data?.map((item: ReplyDataProps) => (
                <div key={item.id} className="flex w-[90%] mx-auto flex-col gap-4">
                  <CardMini
                    posts_id={item.posts_id}
                    id={item.id}
                    description={item.description}
                    user={item.user}
                    updated_at={item.updated_at}
                    created_at={item.updated_at}
                    deleted_at={item.deleted_at}
                    is_own_reply={item.is_own_reply}
                    users_id={item.user.id}
                  >
                  </CardMini>
                </div>
              )
              )
            }
          </div>
        </div>
      </div>
    </LayoutComponent>
  )
}
