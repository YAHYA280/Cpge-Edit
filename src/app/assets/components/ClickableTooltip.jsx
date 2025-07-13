"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"


const TooltipButton = ({ tooltipValue, children }) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleTooltip = () => {
        setIsOpen(!isOpen)
    }

    return (
        <TooltipProvider>
            <Tooltip open={isOpen} onOpenChange={setIsOpen}>
                <TooltipTrigger asChild>
                    <div
                        onClick={toggleTooltip}
                    >
                        {children}
                    </div>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                    <div>
                        {tooltipValue}
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default TooltipButton
