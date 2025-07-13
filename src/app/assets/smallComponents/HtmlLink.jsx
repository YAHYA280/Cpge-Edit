"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"



export default function HtmlLink({ children, href, text = '', icon = '', className = '' }) {
    return (
        <Link href={href} className={cn('text-sm flex items-center gap-2 font-medium ', className)}>
            {text}
            {icon}
            {children}
        </Link>

    )
}
