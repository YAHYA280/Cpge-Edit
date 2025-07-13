"use client"

import { CustomerIcon, DotsIcon, FileIcon, InvoiceIcon, StudyIcon } from '@/constants/Icons'
import { useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { CustomizedHoverCard } from '@/app/assets/components/CustomizedHoverCard'
import { Button } from '@nextui-org/button'
import { cn } from '@/lib/utils'
import { capitalize } from '../../customers/utils'
import Image from 'next/image'
import { app_images_routes } from '@/constants/routes'
import { Tooltip } from '@nextui-org/react'
import Link from 'next/link'




export default function RecentCustomers({ customers }) {



    useEffect(() => {

        console.log(customers)
    }, [])



    return (

        <div className=" border-1 w-full p-3 pt-4 rounded-2xl flex flex-col gap-7">

            <div className="flex justify-between items-center">
                <p className="flex items-center gap-2 text-lg">
                    <StudyIcon />
                    Recent Students
                </p>
            </div>


            {/* Recent customers  */}
            <div className="flex gap-5 pl-3">

                {/* Customer  */}
                {
                    customers.map(({ key, full_name, customer_photo, current_step, createdAt, status, age }) => (

                        <Tooltip key={key} content={<CustomerProfile customer={{ key, full_name, customer_photo, current_step, createdAt, status, age }} />} offset={-7} delay={1000} >

                            <Link href={`/admin/customers/editCustomer/${key}`} className="flex gap-3 rounded-xl cursor-pointer w-fit">

                                <div className="flex gap-2 items-center flex-col justify-center w-fit">

                                    <div className="relative rounded-xl flex items-center justify-center">

                                        <div className='h-[50px] w-[50px] relative shadow-lg'>
                                            <Image
                                                src={`${app_images_routes.customersPhotos}/${customer_photo}`}
                                                fill
                                                alt={`customer image`}
                                                className='object-fill rounded-2xl'
                                            />

                                            <div className='bg-dark-1 shadow-lg h-[30px] w-[30px] flex items-center justify-center rounded-full absolute bottom-0 right-0 translate-x-1/2 '>
                                                <FileIcon />
                                            </div>
                                        </div>


                                    </div>

                                    <div className="flex flex-col">
                                        <p className="text-sm">{full_name}</p>
                                    </div>
                                </div>


                            </Link>
                        </Tooltip>

                    ))
                }


            </div>
        </div>
    )
}






export function CustomerProfile({ customer }) {
    return (
        <div className=''>

            <div className='flex items-center gap-3'>
                <Image
                    src={`${app_images_routes.customersPhotos}/${customer.customer_photo}`}
                    height={40}
                    width={40}
                    alt={`customer image`}
                    className='object-fill rounded-2xl shadow-lg'
                />

                <div>
                    <p className='font-medium text-sm'>{customer.full_name}</p>
                    <p className='text-[10px]'>{customer.createdAt}</p>
                </div>
            </div>
        </div>
    )
}