// Tremor Accordion [v0.0.1]

import React from "react"
import * as AccordionPrimitives from "@radix-ui/react-accordion"
import { RiAddLine } from "@remixicon/react"

import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitives.Root

Accordion.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef(({ className, children, ...props }, forwardedRef) => (
    <AccordionPrimitives.Header className="flex">
        <AccordionPrimitives.Trigger
            className={cn(
                // base
                "group flex flex-1 cursor-pointer items-center justify-between py-3 text-left text-sm font-medium leading-none",
                // text color
                "text-gray-900 dark:text-gray-50",
                // disabled
                "data-[disabled]:cursor-default data-[disabled]:text-gray-400 dark:data-[disabled]:text-gray-600",
                //focus
                "focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500",
                className,
            )}
            {...props}
            ref={forwardedRef}
        >
            {children}
            {/* <RiAddLine
                className={cn(
                    // base
                    "size-5 shrink-0 transition-transform duration-150 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:-rotate-45",
                    // text color
                    "text-gray-400 dark:text-gray-600",
                    // disabled
                    "group-data-[disabled]:text-gray-300 group-data-[disabled]:dark:text-gray-700",
                )}
                aria-hidden="true"
                focusable="false"
            /> */}
        </AccordionPrimitives.Trigger>
    </AccordionPrimitives.Header>
))

AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef(({ className, children, ...props }, forwardedRef) => (
    <AccordionPrimitives.Content
        ref={forwardedRef}
        className={cn(
            "transform-gpu data-[state=closed]:animate-accordionClose data-[state=open]:animate-accordionOpen",
        )}
        {...props}
    >
        <div
            className={cn(
                // base
                "overflow-hidden pb-4 text-sm",
                // text color
                "text-gray-700 dark:text-gray-200",
                className,
            )}
        >
            {children}
        </div>
    </AccordionPrimitives.Content>
))

AccordionContent.displayName = "AccordionContent"

const AccordionItem = React.forwardRef(({ className, hasBottomBorder = true, ...props }, forwardedRef) => (
    <AccordionPrimitives.Item
        ref={forwardedRef}
        className={cn(
            // base
            "overflow-hidden  first:mt-0",
            // border color
            "border-gray-200 dark:border-gray-800",
            className,
            {
                'border-b': hasBottomBorder
            }
        )}
        tremor-id="tremor-raw"
        {...props}
    />
))

AccordionItem.displayName = "AccordionItem"

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }