"use client"

import { CheckIcon, CopyIcon } from "@/constants/Icons"
import { cn } from "@/lib/utils"
import { Button } from "@nextui-org/button"
import { Tooltip } from "@nextui-org/react"
import { useState } from "react"

export default function ToClipboard({ value, showFullValue = false, beforeIcon = '', isButtonOnly = false, className = '', tooltip_text_before_copy = 'Copy to clipboard', buttonSize = 15, showBackground = true }) {
    const [isCopiedOpen, setIsCopiedOpen] = useState(false)


    function copyText() {
        navigator.clipboard.writeText(value)

        // Show copied alert 
        setIsCopiedOpen(true)



        setTimeout(() => {
            // Hide copied alert 
            setIsCopiedOpen(false)
        }, 1000)
    }


    return (
        <div className={cn('bg-light-1 dark:bg-dark-1 flex items-center gap-2 p-1.5 rounded-2xl w-fit border-1', {
            'p-0': isButtonOnly,
            'bg-transparent border-none': showBackground == false,

        }, className)}>
            {
                value &&
                <>
                    {beforeIcon}
                    {
                        !isButtonOnly &&
                        <div className='flex items-center font-normal'>
                            <p className="text-sm">
                                {/* Show full value  */}
                                {
                                    showFullValue &&
                                    <>{value}</>
                                }

                                {/* Don't show full value  */}
                                {
                                    !showFullValue &&
                                    <>{value.slice(0, 15)}...</>
                                }
                            </p>
                        </div>
                    }


                    <Tooltip
                        content={isCopiedOpen ? 'Copied' : tooltip_text_before_copy}
                        size="sm"
                        showArrow
                        isDismissable={true}
                        shouldCloseOnBlur={true}
                    >
                        <Button
                            className={cn("min-w-0 p-0 flex items-center justify-center w-[30px] h-[30px] relative overflow-hidden", {
                                'bg-transparent': showBackground == false,
                                'bg-green-700': isCopiedOpen
                            })}
                            onClick={() => copyText()}
                        >
                            <CopyIcon className={`h-4 w-4 transition-all duration-300 ${isCopiedOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'
                                }`} />

                            <CheckIcon className={`h-4 w-4 absolute inset-0 m-auto transition-all duration-300 ${isCopiedOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
                                }`} />
                        </Button>
                    </Tooltip>
                </>
            }
        </div>
    )
}
