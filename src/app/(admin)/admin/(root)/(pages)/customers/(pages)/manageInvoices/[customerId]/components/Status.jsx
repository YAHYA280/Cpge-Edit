import { cn } from '@/lib/utils'
import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


export default function Status({ color, text, borderColor, with_text }) {
    return (
        <div className={cn(`flex items-center gap-2 border-1 border-opacity-50 ${borderColor} rounded-3xl px-3 py-1 w-fit`)}>
            <span className={cn(`h-2 w-2 rounded-full ${color}`)}></span>
            <p className='text-light-1 text-xs flex-1'>{text}</p>

            {
                with_text &&
                <div>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <span className='bg-light-2 dark:bg-dark-2 text-light-1 flex justify-center items-center h-5 w-5 text-xs rounded-full cursor-pointer'>?</span>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>This is the refuse reason</AlertDialogTitle>
                            </AlertDialogHeader>

                            <div>
                                <p className='text-text_color-1'>{with_text}</p>
                            </div>

                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            }
        </div>
    )
}
