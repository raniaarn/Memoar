import { RepliesModule, useQueries } from "@/components"
import { PostDataProps } from "@/components/types/postData";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const defaultPostData: PostDataProps = {
  id: 0,
  description: "",
  user: {
    id: 0,
    name: "",
    email: ""
  },
  created_at: "",
  updated_at: "",
  users_id: 0,
  likes_count: 0,
  is_like_post: false,
  is_own_post: false,
  replies_count: 0,
}

export default function Posts() {
  const router = useRouter()
  const id = router.query.id
  const [post, setPost] = useState<PostDataProps>(defaultPostData)


  useEffect(() => {
    getPostData()
  }, [id])

  const getPostData = async () => {
    if (!id) return
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/api/post/${id}`,
        {
          headers: {
            'Authorization': `Bearer ${Cookies.get('user_token')}`
          }
        }
      )
      const received = await response.json()
      setPost(received.data)
    } catch (error: any) {
      toast.error("gagal mengambil data")
    }
  }

  return (
    <RepliesModule
      id={post.id}
      description={post.description}
      user={post.user}
      created_at={post.created_at}
      updated_at={post.updated_at}
      users_id={post.users_id}
      likes_count={post.likes_count}
      is_like_post={post.is_like_post}
      is_own_post={post.is_own_post}
      replies_count={post.replies_count} />

  )
}