import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import { useMutation } from '@/components'
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { DropDownProps } from './interface';

export const DropDown = ({ username }: DropDownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const ref = useRef(null)
  const { mutate } = useMutation();
  const router = useRouter()

  useEffect(() => {
    setIsOpen(false)
  }, [])

  const handleLogout = async () => {
    const response = await mutate({
      prefixUrl: `${process.env.NEXT_PUBLIC_API}/api/logout`,
      method: "GET",
      headers: {
        'Authorization': `Bearer ${Cookies.get('user_token')}`
      }
    })

    if (!response?.result?.success) {
      console.log(response)
      toast.error("gagal logout")
    } else {
      Cookies.remove("user_token")
      toast.success("Berhasil Logout!")
      router.push('/login')
    }
  }

  useOnClickOutside(ref, () => {
    setIsOpen(false)
  })

  return (
    <div className='relative' ref={ref}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-[200px] cursor-pointer ${isOpen ? 'rounded-t-2xl' : 'rounded-2xl'} bg-gradient-to-r from-blue-600 to-blue-900 px-4 py-2 text-md font-bold flex items-center justify-between shadow text-white`}
      >
        <span className='pr-6'>{username}</span>
        <div>
          <svg
            className={`-mr-1 ml-2 h-5 w-5  origin-center ${isOpen ? 'rotate-180' : ''}`}
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
            aria-hidden='true'
          >
            <path
              fillRule='evenodd'
              d='M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 011.414-1.414L10 9.586l3.293-3.293a1 1 0 111.414 1.414l-4 4A1 1 0 0110 12z'
              clipRule='evenodd'
            />
          </svg>
        </div>
        {isOpen && (
          <div
            className='w-[200px] absolute top-8 left-0 mt-2 w-56 bg-gradient-to-r from-blue-600 to-blue-900 rounded-b-2xl shadow-lg ring-1 ring-black ring-opacity-5'
            role='menu'
            aria-orientation='vertical'
            aria-labelledby='options-menu'
          >
            <div className='py-1'>
              <div
                className='block px-4 py-2 text-sm hover:bg-red-500 hover:rounded-2xl cursor-pointer'
                onClick={handleLogout}
              >
                Logout
              </div>
              <div
                className='block px-4 py-2 text-sm hover:bg-green-300 hover:rounded-2xl cursor-pointer'
              >
                Profile
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )

}