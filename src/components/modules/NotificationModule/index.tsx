import { UserContext } from '@/components';
import { useContext } from 'react';
import React from 'react';
import { Flex, Spinner } from '@chakra-ui/react'
import { CardNotifications } from '@/components';
import Cookies from 'js-cookie';
import { useQueries } from '@/components';
import { NotificationProps } from '@/components/types/notificationProps';
import dynamic from 'next/dynamic';

const LayoutComponent = dynamic(
  () => import('@/components/Layout').then(mod => mod.Layout)
);


export const NotificationModule = () => {
  const userData = useContext(UserContext)

  const { data, isLoading } = useQueries({
    prefixUrl: `${process.env.NEXT_PUBLIC_API}/api/notifications`,
    headers: {
      'Authorization': `Bearer ${Cookies.get('user_token')}`
    }
  })

  return (
    <LayoutComponent metaTitle='Notifications' metaDescription='Your memoar updates!'>
      <div className="mt-[100px] mb-[100px] flex-col w-full justify-center items-center infline-flex">
      <div className='py-4 font-bold text-center text-2xl text-[#0B50FF]'>
        Notifications🔔
      </div>
        {
          (isLoading) ? (
            <Flex alignItems="center" justifyContent="center">
              <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
              />
            </Flex>
          ) : (
            (data?.data.length > 0) ? (
              data.data.map((item: NotificationProps) => (
                <div className="flex my-4 w-[90%] mx-auto flex-col gap-4" key={item.id}>
                  <CardNotifications
                    id={item.id}
                    remark={item.remark}
                    user={item.user}
                    updated_at={item.updated_at}
                    created_at={item.updated_at}
                    read={item.read}
                    posts={item.posts}
                  />
                </div>
              ))
            ) : (
              <div className='text-center '>
                No notifications!
              </div>
            )
          )
        }
      </div>
    </LayoutComponent>
  )
}