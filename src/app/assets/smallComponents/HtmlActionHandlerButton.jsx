"use client"

import { cn } from "@/lib/utils";
import { Button } from "@nextui-org/button";
import { Spinner } from "@nextui-org/react";
import { useState } from "react";


export default function HtmlActionHandlerButton({ text, icon, onClick, isLoaderVisible = false, className = '', className2 = '', dataList = [], isActive = true }) {
    return (
        <Button
            color="primary"
            className={cn('bg-own_primary-1 text-dark-1 font-medium w-full', {
                'bg-light-3 bg-opacity-10 pointer-events-none': isLoaderVisible,
                'cursor-no-drop': !isActive,
            }, className)}
            onClick={onClick}
            // If the button is not active
            isDisabled={isActive == false}
            {...dataList.reduce((attrs, item) => ({ ...attrs, [item.key]: item.value }), {})}
        >
            <div className='flex items-center gap-2 justify-center'>
                {
                    isLoaderVisible &&
                    <Spinner color="primary" size="sm" />
                }


                {
                    !isLoaderVisible &&
                    <span className={cn(`flex items-center gap-2 justify-center ${className2}`)}>
                        {text}
                        {icon}
                    </span>
                }
            </div>

        </Button>

    )
}
