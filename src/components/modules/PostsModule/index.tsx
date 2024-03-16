import { FloatingPostForm } from "@/components";
import dynamic from "next/dynamic";
import { useQueries } from "@/components";
import Cookies from 'js-cookie';
import { PostDataProps } from "@/components/types/postData";
import { Flex, Spinner } from "@chakra-ui/react";
import { Card } from "@/components/elements/Card";

const LayoutComponent = dynamic(
  () => import('@/components/Layout').then(mod => mod.Layout)
);

export const PostsModule = () => {
  const { data, isLoading } = useQueries({
    prefixUrl: `${process.env.NEXT_PUBLIC_API}/api/posts?type=all`,
    headers: {
      'Authorization': `Bearer ${Cookies.get('user_token')}`
    }
  })

  return (
    <LayoutComponent metaTitle="Posts" metaDescription="Memories">
      <div className="relative flex-col w-full justify-center items-center infline-flex mt-[100px]">
        <div className="sticky top-[100px] w-[90%] p-4 mx-auto bg-white rounded-[10px] shadow gap-4">
          <FloatingPostForm />
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
            data?.data?.map((item: PostDataProps) => (
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
    </LayoutComponent>
  )
}

