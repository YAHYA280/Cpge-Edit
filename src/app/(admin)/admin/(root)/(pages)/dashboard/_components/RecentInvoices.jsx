"use client"

import { DotsIcon, FileIcon, InvoiceIcon } from '@/constants/Icons'
import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { CustomizedHoverCard } from '@/app/assets/components/CustomizedHoverCard'
import { Button } from '@nextui-org/button'
import { cn } from '@/lib/utils'
import { capitalize } from '../../customers/utils'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Skeleton } from "@nextui-org/react";
import NumberTicker from '@/components/magicui/number-ticker'



export default function RecentInvoices() {
    const [areInvoicesLoading, setAreInvoicesLoading] = useState(true)
    const [invoices, setInvoices] = useState()



    // TODO: Fetch the recent invoices
    useEffect(() => {
        setInvoices([
            {
                id: 1,
                name: 'First invoice',
                date: 'Sep 20, 2:30pm',
                amount: '12000',
                status: 'pending'
            },
            {
                id: 2,
                name: 'First invoice',
                date: 'Sep 20, 2:30pm',
                amount: '12000',
                status: 'accepted'
            },
            {
                id: 3,
                name: 'First invoice',
                date: 'Sep 20, 2:30pm',
                amount: '12000',
                status: 'refused'
            },
            {
                id: 4,
                name: 'First invoice',
                date: 'Sep 20, 2:30pm',
                amount: '12000',
                status: 'refused'
            },
        ])


        setAreInvoicesLoading(false)
    }, [])



    return (

        <div className="flex flex-col gap-3 w-full">


            {
                (areInvoicesLoading || invoices) &&
                <>

                    <p className='font-medium'>Recent Payments</p>

                    {/*  Recent invoices */}
                    <div className="grid grid-cols-2 gap-3 w-full">


                        {/* If invoices are loading  */}
                        {
                            areInvoicesLoading &&
                            [0, 1, 2, 3].map((item) => (
                                <Skeleton key={item} className='rounded-xl h-[45px]' />
                            ))
                        }




                        {/* Invoice  */}
                        {
                            invoices &&
                            invoices.map(({ id, amount, date, name, status }) => (
                                <div key={id} className='bg-dark-1 flex items-center justify-between gap-3 p-2 rounded-xl'>

                                    <div className="flex gap-2 items-center">
                                        <span className="border-1 bg-dark-2 rounded-xl h-[40px] w-[40px] flex items-center justify-center">
                                            <FileIcon />
                                        </span>

                                        <div className="flex flex-col">
                                            <p className="text-sm">{name}</p>
                                            <p className="text-[10px] text-text_color-1">{date}</p>
                                        </div>
                                    </div>

                                    {/* Amount  */}
                                    <p className='text-xs font-medium'>
                                        <NumberTicker value={amount} />
                                        MAD
                                    </p>


                                    {/* Status  */}
                                    <p className={cn('text-xs py-0.5 px-2 rounded-xl bg-opacity-5', {
                                        'bg-yellow-500 text-yellow-500': status == 'pending',
                                        'bg-green-500 text-green-500': status == 'accepted',
                                        'bg-red-500 text-red-500': status == 'refused',
                                    })}>{capitalize(status)}</p>


                                </div>
                            ))
                        }


                    </div>
                </>

            }

        </div>
    )
}
