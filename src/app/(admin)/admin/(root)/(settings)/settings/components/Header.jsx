'use client'

import { cn } from "@/lib/utils";
import { Button } from "@nextui-org/button";
import { RiCloseLine } from "@remixicon/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const settings_list = [
    {
        name: 'General',
        href: '/admin/settings',
    },
    {
        name: 'Security',
        href: '/admin/settings/security',
    },
]


export default function Header() {
    const pathName = usePathname()
    const router = useRouter()


    return (
        <header className="flex justify-between items-center border-b-1 p-3 pl-10 pr-10 bg-light-1 dark:bg-dark-1 sticky top-0 z-50">
            <div className="h-full flex gap-3 items-center">
                {/* {
                    settings_list.map(({ name, href }, i) => {
                        const isActive = pathName === href || pathName.endsWith(href)

                        return <Link
                            key={i}
                            href={href}
                            className={cn('relative p-5 flex items-center justify-center h-full before:content-[""] before:h-[3px]  before:w-full  before:absolute before:bottom-0 before:left-0 before:rounded-lg', {
                                'before:bg-own_primary-1': isActive
                            })}
                        >
                            {name}
                        </Link>
                    })
                } */}

                <p className="text-lg font-semibold">Settings</p>

            </div>


            <Button
                color="primary"
                variant="flat"
                className="h-10 w-10 min-w-min p-0"
                onClick={() => router.push('/admin/dashboard')}
            >
                <RiCloseLine />
            </Button>
        </header>
    )
}
