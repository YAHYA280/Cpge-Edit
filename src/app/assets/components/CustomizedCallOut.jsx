"use client"
import { customers_statuses } from '@/constants/constants'
import { getLanguageDetails } from '@/constants/functions'
import { cn } from '@/lib/utils'
import { useLocale, useTranslations } from 'next-intl'

export default function CustomizedCallOut({ variant = 'pending', title, children, className = '', icon = '' }) {
    const t = useTranslations()
    const currentLanguage = getLanguageDetails(useLocale())
    const active_language = currentLanguage.key
    const active_dir = currentLanguage.direction




    return (
        <div className={cn('flex flex-col gap-3 p-2 pl-3 rounded-xl bg-opacity-10 relative overflow-hidden', className, {
            // "bg-blue-400": customers_statuses.find(status => status.key == variant),
            [customers_statuses.find(status => status.key == variant).background]: variant,
            // Change padding when the direction changes
            "pl-0 pr-3": active_dir == 'rtl',
        })}>

            <div className={cn('h-full w-1 absolute left-0 top-0', {
                [customers_statuses.find(status => status.key == variant).background]: variant,
                // Change place when the direction changes 
                "right-0": active_dir == 'rtl',
            })} />


            <div className='flex items-center gap-2 text-sm'>
                {icon && icon}
                <p className='font-medium'>{title}</p>
            </div>


            <div className='text-sm font-normal'>
                {children}
            </div>
        </div>
    )
}
