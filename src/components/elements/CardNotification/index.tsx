import React from 'react'
import { TrashIcon } from '@heroicons/react/20/solid'
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { NotificationProps } from '@/components/types/notificationProps';
import { parseISO, differenceInDays, differenceInMonths, differenceInYears, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';
import { difference } from 'next/dist/build/utils';

export const CardNotifications: React.FC<NotificationProps> = ({
  id,
  remark,
  read,
  user,
  created_at,
  updated_at,
  posts
}) => {
  const router = useRouter()

  function formatTimeDifference(startDate: string) {
    const parsedDate = parseISO(startDate);

    const now = new Date();

    const daysDifference = differenceInDays(now, parsedDate);
    const monthsDifference = differenceInMonths(now, parsedDate);
    const yearsDifference = differenceInYears(now, parsedDate);
    const hoursDifference = differenceInHours(now, parsedDate);
    const minutesDifference = differenceInMinutes(now, parsedDate);
    const secondsDifference = differenceInSeconds(now, parsedDate);

    if (yearsDifference > 0) {
      return `${yearsDifference} years`;
    }
    else if (monthsDifference > 0) {
      return `${monthsDifference} months`;
    }
    else if (daysDifference > 0) {
      return `${daysDifference} days`;
    }
    else if (hoursDifference > 0) {
      return `${hoursDifference} hours`;
    }
    else if (minutesDifference > 0) {
      return `${minutesDifference} minutes`;
    }
    else {
      return `${secondsDifference} seconds`;
    }
  }


  return (
    <div className='flex gap-2 flex-row items-center w-full shadow bg-white'>
      <div className='flex gap-2 mx-2 my-2 flex-row bg-gray-200 rounded-full items-center px-4 py-2'>
        <div className="flex justify-center items-center bg-blue-600 text-white p-2 rounded-full aspect-[2.5/1] text-xl font-bold">
          {user.name.charAt(0)}
        </div>
        <div>
          {user.name}
        </div>
      </div>
      <div className="text-md">
        {remark} your post, <span className='italic'>about {formatTimeDifference(created_at)} ago</span>
      </div>
    </div>
  )
}
