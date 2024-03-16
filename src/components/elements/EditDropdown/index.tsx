import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import { useMutation } from '@/components'
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { EllipsisVerticalIcon } from '@heroicons/react/16/solid';
import { PostIdProps } from '@/components/types/postData';

export const EditDropdown = ({ 
  id, 
  description,
  onClickEdit,
  onClickDelete,
  setId,
  setPost,
 }: PostIdProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const ref = useRef(null)
  const { mutate } = useMutation();
  const router = useRouter()

  useEffect(() => {
    setIsOpen(false)
  }, [])

  useOnClickOutside(ref, () => {
    setIsOpen(false)
  })

  const handleDeleteButton = () => {
    setId(id)
    onClickDelete()
  }

  const handleEditButton = () => {
    setId(id)
    setPost({
      description: description ?? ""
    })
    onClickEdit()
  }

  return (
    <div className='relative' ref={ref}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`cursor-pointer ${isOpen ? 'rounded-t-2xl' : 'rounded-2xl'} px-4 py-2 text-md font-bold flex items-center justify-between text-black`}
      >
        <button className="w-fit h-fit">
          <EllipsisVerticalIcon className="w-4 h-4" />
        </button>
        {isOpen && (
          <div
            className='absolute w-[200px] top-8 right-0 mt-2 w-56 bg-gradient-to-r from-blue-600 to-blue-900 rounded-2xl shadow-lg ring-1 ring-black ring-opacity-5 text-white'
            role='menu'
            aria-orientation='vertical'
            aria-labelledby='options-menu'
          >
            <div className='py-1'>
              <div
                onClick={handleEditButton}
                className='block px-4 py-2 text-sm hover:bg-green-300 hover:rounded-2xl cursor-pointer'>
                Edit
              </div>
              <div
                onClick={handleDeleteButton}
                className='block px-4 py-2 text-sm hover:bg-red-500 hover:rounded-2xl cursor-pointer'
              >
                Delete
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )

}