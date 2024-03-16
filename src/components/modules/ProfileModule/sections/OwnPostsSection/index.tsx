import { UserContext } from '@/components';
import { useContext } from 'react';
import React from 'react';
import { Flex, Spinner } from '@chakra-ui/react'
import { Card } from '@/components/elements/Card';
import Cookies from 'js-cookie';
import { useQueries } from '@/components';
import { PostDataProps } from '@/components/types/postData';

export const OwnPostsSection = () => {
  const userData = useContext(UserContext)

  const { data, isLoading } = useQueries({
    prefixUrl: `${process.env.NEXT_PUBLIC_API}/api/posts?type=all`,
    headers: {
      'Authorization': `Bearer ${Cookies.get('user_token')}`
    }
  })

  const filteredData = data?.data?.filter((item: PostDataProps) => item.user.id === userData.data.id);

  console.log(filteredData)

  return (
    <div className=" flex-col w-full justify-center items-center infline-flex">
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
          filteredData?.map((item: PostDataProps) => (
            <div className="flex w-[90%] mx-auto flex-col gap-4">
              <Card
                id={item.id}
                description={item.description}
                user={item.user}
                updated_at={item.updated_at}
                created_at={item.updated_at}
                likes_count={item.likes_count}
                replies_count={item.replies_count}
                is_like_post={item.is_like_post}
                is_own_post={item.is_own_post}
                users_id={item.user.id}
              >
              </Card>
            </div>
          ))
        )
      }
    </div>
  )
}