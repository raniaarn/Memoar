import React from "react";
import dynamic from "next/dynamic";
import Image from 'next/image';
import { UserContext } from '@/components';
import { useContext } from 'react';
import Link from "next/link";

const LayoutComponent = dynamic(
  () => import('@/components/Layout').then(mod => mod.Layout)
);

export const LandingModule = () => {
  const userData = useContext(UserContext)

  return (
    <LayoutComponent metaTitle="Home" metaDescription="Welcome to Memoar">
      <div className="px-12 w-full flex-col justify-start items-center gap-4 inline-flex">
        <div className="relative md:w-[30%] w-[80%] aspect-[5.625/1] overflow-hidden">
          <Image
            src="/memoar.png"
            alt="Memoar Logo"
            layout="fill"
            priority
          />
        </div>
        <div className="text-black font-bold xl:text-[32px]">Ring the Bell of Your Memories!</div>
        {!userData?.data ?
          (
            <Link href="/">
              <button
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-900 rounded-md justify-center items-center text-white text-lg">
                Join Memoar now!
              </button>
            </Link>
          ) :
          (
            <Link href="/">
              <button
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-900 rounded-md justify-center items-center text-white text-lg">
                See All Posts            
                </button>
            </Link>
          )
        }

      </div>
    </LayoutComponent>
  )
}