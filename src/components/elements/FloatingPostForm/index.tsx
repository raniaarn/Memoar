import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "@/components";
import Cookies from 'js-cookie';
import { useRouter } from "next/router";

export const FloatingPostForm = () => {
  const router = useRouter()
  const { mutate } = useMutation()
  const [description, setDescription] = useState<string>();

  const handleSubmit = async () => {
    const response = await mutate({
      prefixUrl: `${process.env.NEXT_PUBLIC_API}/api/post`,
      payload: { description: description },
      headers: {
        'Authorization': `Bearer ${Cookies.get('user_token')}`
      }
    })

    if (!response?.result?.success) {
      toast.error("Gagal posting :(")
    } else {
      toast.success("Berhasil Post!")
      router.reload()
    }
  }

  return (
    <>
      <textarea
        className="w-full p-6 bg-blue-100 rounded-[10px] justify-start items-start gap-4 inline-flex"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="What's happening ..."
      />
      <button
        className="w-full px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-900 rounded-md justify-center items-center text-white text-lg"
        onClick={handleSubmit}>
        Post
      </button>
    </>
  )
}