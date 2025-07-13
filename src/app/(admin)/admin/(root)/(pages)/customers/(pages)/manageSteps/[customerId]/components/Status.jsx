import { cn } from '@/lib/utils'
import React from 'react'

export default function Status({color, text, borderColor}) {
    return (
        <div className={cn(`flex items-center gap-2 border-1 border-opacity-50 ${borderColor} rounded-3xl px-3 py-1 w-fit`)}>
            <span className={cn(`h-2 w-2 rounded-full ${color}`)}></span>
            <p className='text-light-1 text-xs'>{text}</p>
        </div>
    )
}
