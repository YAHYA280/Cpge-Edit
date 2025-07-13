import { CustomerIcon, SettingsIcon } from '@/constants/Icons'
import React from 'react'
import CustomerCard from './CustomerCard'
import { Badge } from '@/components/ui/badge'
import { CustomizedHoverCard } from '@/app/assets/components/CustomizedHoverCard'
import Link from 'next/link'

export default function RecentNotifications() {
  return (





      <div className="bg-light-1 dark:bg-dark-1 border-1 w-1/2 p-3 rounded-2xl flex flex-col gap-2">
          <div className="flex justify-between items-center">
              <p className="flex items-center gap-2 text-base font-medium">
                  Recent Notifications
              </p>


              <CustomizedHoverCard
                  explaining_content="Manage notifications"
              >
                  <Link href={'/admin/notifications'}>
                      <SettingsIcon />
                  </Link>
              </CustomizedHoverCard>
          </div>


          {/* All notifications  */}
          <div className="flex flex-col gap-2 p-3">

              {/* Notification  */}
              <div className="flex flex-col gap-3 border-1 p-3 rounded-xl cursor-pointer">
                  <div className="flex gap-2 items-center text-base font-medium">
                      <span className="bg-light-3 dark:bg-dark-2 border-1 rounded-xl h-[35px] w-[35px] flex items-center justify-center">
                          <CustomerIcon />
                      </span>
                      <div className="flex gap-1 items-center">
                          <p className="text-base">New form submited</p>
                          <p className="text-xs text-gray-500">Sep 20, 2:30pm</p>

                      </div>
                  </div>

                  <div className="flex gap-1 items-center flex-wrap text-sm">
                      {/* <div> */}
                      <p>The customer </p>

                      <CustomerCard
                          customer_name="Ayoub Farahi"
                          customer_email="Boy.doss2002@gmail.com"
                          customer_id="zefezfzezerze"
                          avatar_url="https://i.pravatar.cc/150?u=a04258a2462d826712d"
                          joined_at="Joined December 2021"
                      />
                      <p>just submited his</p>
                      <Badge variant="outline">4th step</Badge>.
                  </div>

              </div>


          </div>
      </div>
  )
}
