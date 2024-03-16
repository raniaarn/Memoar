import { UserContext } from '@/components';
import { useContext, useState } from 'react';
import React from 'react';
import { Flex, Spinner } from '@chakra-ui/react'
import { Card } from '@/components/elements/Card';
import Cookies from 'js-cookie';
import { useQueries } from '@/components';
import { PostDataProps } from '@/components/types/postData';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

export const OwnPostsSection = () => {
  const userData = useContext(UserContext)

  const { data, isLoading } = useQueries({
    prefixUrl: `${process.env.NEXT_PUBLIC_API}/api/posts?type=all`,
    headers: {
      'Authorization': `Bearer ${Cookies.get('user_token')}`
    }
  })

  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false)
  const [isModalEditOpen, setIsModalEditOpen] = useState<boolean>(false)
  const [id, setId] = useState<any>(undefined)
  const router = useRouter()

  const handleModalDeleteOpen = () => setIsModalDeleteOpen(!isModalDeleteOpen)
  const handleModalEditOpen = () => setIsModalEditOpen(!isModalEditOpen)

  const [post, setPost] = useState({
    description: ""
  })

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/api/post/delete/${id}`,
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
      toast.success("Berhasil menghapus post")
    } catch (error) {
      toast.error("gagal")
    }
  };

  const HandleEdit = async () => {
    try {
      console.log(JSON.stringify({ description: post.description }))
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/api/post/update/${id}`,
        {
          method: "PATCH",
          headers: {
            'Authorization': `Bearer ${Cookies.get('user_token')}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ description: post.description })
        })
      const result = await response.json();
      if (result?.success) {
        toast.success("Berhasil mengubah post")
        router.reload();
      }
    } catch (error) { }
  }

  const filteredData = data?.data?.filter((item: PostDataProps) => item.user.id === userData.data.id);

  return (
    <>
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
                  onClickDelete={handleModalDeleteOpen}
                  onClickEdit={handleModalEditOpen}
                  setPost={setPost}
                  setId={setId}
                >
                </Card>
              </div>
            ))
          )
        }
      </div>

      <Modal isOpen={isModalDeleteOpen} onClose={handleModalDeleteOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this post?
          </ModalBody>

          <ModalFooter>
            <div className="w-full flex flex-row gap-4">
              <button className="w-full px-6 py-2 border-2 border-blue-600 rounded-md justify-center items-center text-black text-lg" onClick={handleDelete}>
                Delete
              </button>
              <button className="w-full px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-900 text-white  rounded-md justify-center items-center gap-2 inline-flex"
                onClick={handleModalDeleteOpen}>Cancel</button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isModalEditOpen} onClose={handleModalEditOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div>
              <input
                className="w-full pt-0 h-[80px] p-6 bg-blue-100 rounded-[10px] justify-start items-start gap-4 inline-flex"
                value={post?.description || ""}
                onChange={(event: any) => setPost({ ...post, description: event.target.value })}
              />
            </div>
          </ModalBody>

          <ModalFooter>
            <div className="w-full flex flex-row gap-4">
              <button className="w-full px-6 py-2 border-2 border-blue-600 rounded-md justify-center items-center text-black text-lg" onClick={handleModalEditOpen}>
                Close
              </button>
              <button className="w-full px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-900 text-white  rounded-md justify-center items-center gap-2 inline-flex"
                onClick={HandleEdit}>Save</button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>

  )
}