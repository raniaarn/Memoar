import React, { useState } from 'react';
import Link from 'next/link';
import { Bars3Icon } from '@heroicons/react/20/solid'
import Image from 'next/image';
import { UserContext } from '@/components';
import { useContext } from 'react';
import { DropDown } from '../DropDown';
import { usePathname } from 'next/navigation';

export const Navbar = () => {
  const userData = useContext(UserContext)
  const [isCollapsed, setIsCollapsed] = useState(true)
  const pathname = usePathname()
  const isLoginPage = pathname && pathname.startsWith('/login');

  const handleNavCollapse = () => setIsCollapsed(!isCollapsed)

  return (
    <nav className="fixed top-0 z-50 w-full flex flex-col md:items-center justify-center shadow-lg bg-white">
      <div className="flex items-center py-3 px-7 md:px-12 lg:px-16 xl:px-20 justify-between w-full">
        <Link href={'/'} as={'/'}>
          <Image
            src={'/icons/memoar-icon.svg'}
            alt={'Memoar'}
            width={60}
            height={60}
            placeholder="blur"
            blurDataURL={'/icons/memoar-icon.svg'}
          />
        </Link>

        {
          (userData?.data) ?
            (
              <div className="items-center gap-7 hidden md:flex">
                <Link href={"/posts"} className='text-blue-500'>
                  Posts
                </Link>
                <Link href={"/notifications"} className='text-blue-500'>
                  Notifications
                </Link>
                <DropDown username={userData?.data?.name} />
              </div>
            ) :
            (
              (!isLoginPage) ?
                (
                  <div className="items-center gap-7 hidden md:flex">
                    <Link href={"/login"} className='text-blue-500'>
                      <button
                        className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-900 rounded-md justify-center items-center text-white text-lg">
                        Login
                      </button>
                    </Link>
                  </div>
                ) : (
                  <></>
                )
            )
        }

        <button className="flex md:hidden" onClick={handleNavCollapse}>
          <Bars3Icon className="w-6 text-blue-500" />
        </button>
      </div>

      <div
        className={`flex-col items-start gap-4 py-4 px-8 md:hidden ${isCollapsed ? 'hidden' : 'flex'
          }`}
      >
        {
          (userData?.data) ?
            (
              <>
                <Link href={"/posts"} className='text-blue-500'>
                  Posts
                </Link>
                <Link href={"/notifications"} className='text-blue-500'>
                  Notifications
                </Link>
                <DropDown username={userData?.data.name} />
              </>
            ) :
            (
              <>
                <Link href={"/login"} className='text-blue-500'>
                  Login
                </Link>
              </>
            )
        }
      </div>
    </nav>
  );
};