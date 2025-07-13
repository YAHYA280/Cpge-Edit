'use client'

import Link from "next/link";
import { PasswordIcon, SecurityIcon, UserIcon } from '@/constants/Icons'
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const icons_size = 18
const settings_links = [
    {
        name: 'User',
        links: [
            {
                name: 'General',
                icon: <UserIcon special_size={icons_size} />,
                href: '/admin/settings',
            },
            {
                name: 'Security',
                icon: <SecurityIcon special_size={icons_size} />,
                href: '/admin/settings/security',
            },

        ]
    }
]

export default function SideHeader() {
    const pathName = usePathname()

    return (
        <div className="w-[400px] p-10 flex flex-col gap-2 border-r-1 bg-light-1 dark:bg-dark-1">
            {
                settings_links.map((container, id) => {
                    return (
                        <div key={id} className="flex flex-col gap-3">
                            <p>{container.name}</p>
                            <div className="flex flex-col gap-2">
                                {
                                    container.links.map((link, id) => {
                                        const isActive = pathName === link.href || pathName.endsWith(link.href)

                                        return (
                                            <Link
                                                key={id}
                                                className={cn('hover:bg-light-3 hover:dark:bg-dark-2 flex gap-2 items-center p-2 pl-3 pr-3 rounded-md', {
                                                    'bg-light-1 dark:bg-dark-2': isActive
                                                })}
                                                href={link.href}
                                            >
                                                <p className={cn('text-gray-1', {
                                                    'text-dark-1 dark:text-light-1': isActive
                                                })}>
                                                    {link.icon}
                                                </p>
                                                {/* {isActive ? link.colored_icon : link.icon} */}
                                                <p className={cn('text-gray-1 text-base ', {
                                                    'text-dark-1 dark:text-light-1': isActive
                                                })}>

                                                    {link.name}
                                                </p>
                                            </Link>
                                        )
                                    })
                                }

                            </div>
                        </div>
                    )
                })
            }

        </div>
    )
}
