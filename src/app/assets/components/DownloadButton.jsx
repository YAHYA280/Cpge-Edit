"use client"

import { downloadFile, getLanguageDetails } from "@/constants/functions"
import { DownloadFilelIcon, ViewFileIcon } from "@/constants/Icons"
import { cn } from "@/lib/utils"
import { Button } from "@nextui-org/button"
import Link from "next/link"
import { useState } from "react"

export default function DownloadButton({ withText = true, text = 'Download', icon = '', url, fileName, className = '', textClassName = '' }) {




    const status = 'translate-y-2'
    // States 
    const loading_status = document.getElementById('loading--status')
    const success_status = document.getElementById('success--status')
    const error_status = document.getElementById('error--status')


    function startLoading() {
        console.log('Start loading')

        loading_status.classList.add(status)
        success_status.classList.remove(status)
        error_status.classList.remove(status)

    }
    function endLoading() {
        console.log('End loading')

        loading_status.classList.remove(status)
        error_status.classList.remove(status)
        success_status.classList.add(status)

        // Remove loading 
        setTimeout(() => {
            success_status.classList.remove(status)
        }, 1500);
    }
    function errorWhileLoading() {
        console.log('Error while loading')

        loading_status.classList.remove(status)
        error_status.classList.add(status)
        success_status.classList.remove(status)

        // Remove error 
        setTimeout(() => {
            error_status.classList.remove(status)
        }, 1500)
    }


    function hh() {
        downloadFile(url, fileName, startLoading, endLoading, errorWhileLoading)
    }


    return (
        <Button
            onClick={() => hh()}
            className={cn('border-1 flex items-center justify-center gap-2 bg-transparent shadow-md text-light-1 p-2 text-sm rounded-xl min-w-0', className)}
        >
            {
                withText &&
                <p className={cn('', textClassName)}>
                    {text}
                </p>
            }

            {
                !icon &&
                <DownloadFilelIcon />
            }
            {
                icon && icon
            }
        </Button>
    )
}




export function ViewLink({ withText = true, text = 'View', icon = '', url, className = '', textClassName = '' }) {


    return (

        <Link
            target="_blank"
            href={url}
            className={cn('border-1 flex items-center justify-center gap-2 bg-transparent shadow-md text-light-1 p-2 text-sm rounded-xl min-w-0', className)}
        >
            {
                withText &&
                <p className={cn('', textClassName)}>
                    {text}
                </p>
            }

            {
                !icon &&
                <ViewFileIcon />
            }
            {
                icon && icon
            }
        </Link>
    )
}
