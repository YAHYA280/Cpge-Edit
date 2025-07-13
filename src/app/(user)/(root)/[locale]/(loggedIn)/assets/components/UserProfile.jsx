"use client"

import { capitalize } from "@/app/(admin)/admin/(root)/(pages)/customers/utils"
import CheckBadge from "@/app/assets/components/CheckBadge"
import ShinyText from "@/components/reactbits/ShinyText"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { customers_api } from "@/constants/_api"
import { getLanguageDetails } from "@/constants/functions"
import { InvoiceIcon, LogoutIcon, QuestionCyrcleIcon, StepInProcessIcon, UserIcon } from "@/constants/Icons"
import { app_images_routes } from "@/constants/routes"
import { cn } from "@/lib/utils"
import { Button } from "@nextui-org/button"
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown"
import { Tooltip } from "@nextui-org/tooltip"
import { useLocale, useTranslations } from "next-intl"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useCookies } from "react-cookie"

const global_key = process.env.NEXT_PUBLIC_GLOBAL_KEY



const myLinks = [
    {
        id: 0,
        key: 'my_steps',
        name: 'My steps',
        link: '/account',
        icon: <StepInProcessIcon />,
        type: 'link'
    },
    {
        id: 1,
        name: 'My account',
        key: 'my_account',

        link: '/account/details',
        icon: <UserIcon />,
        type: 'link'
    },
    {
        id: 2,
        name: 'My invoices',
        key: 'my_invoices',

        link: '/account/invoices',
        icon: <InvoiceIcon />,
        type: 'link'
    },
    {
        id: 3,
        name: 'Need help?',
        key: 'need_help',
        link: '/account/help',
        icon: <QuestionCyrcleIcon />,
        type: 'link',

    },
]

export default function UserProfile({ user }) {
    const t = useTranslations()
    const currentLanguage = getLanguageDetails(useLocale())
    const active_dir = currentLanguage.direction

    const [cookies, setCookies, removeCookies] = useCookies(['customer_data']);
    const router = useRouter()

    const [isModalOpen, setIsModalOpen] = useState(false)


    async function handleLogOut() {
        const { _id } = cookies.customer_data


        try {
            const response = await fetch(`${customers_api}/logout`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ customer_id: _id }),
                cache: 'no-cache',
                credentials: 'include'
            })

            const result = await response.json()

            console.log(result)

            if (result?.ok) {
                // Remove cookies on the client side
                removeCookies('customer_token', { path: '/' });
                removeCookies('customer_data', { path: '/' });

                window.location.href = '/login'
            }

        } catch (error) {
            console.log('error', error)
        }


        console.log('logout now')
    }




    return (
        <div>

            {
                user &&
                <Dropdown closeOnSelect={false}>
                    <DropdownTrigger>
                        <div className="flex items-center gap-2 cursor-pointer">
                            <div className="h-fit w-fit relative">
                                <Avatar>
                                    <AvatarImage src={user.customer_photo ? `${app_images_routes.customersPhotos}/${user.customer_photo}` : '/icons/preload-avatar.png'} alt={user.username + " photo"} />
                                    <AvatarFallback>{user.first_name[0]}{user.last_name[0]}</AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="text-start flex flex-col ">
                                <div className="flex items-center gap-2 h-[21px]">
                                    <p className="text-base sm:text-xl font-semibold text-start flex items-center gap-2">{capitalize(user.first_name)} {capitalize(user.last_name)}</p>

                                    <div>
                                        <Tooltip dir={active_dir} placement="right-end" content={<div className="flex items-center gap-2"><CheckBadge /> {t(`global.header.profile.this_customer_was_verified_by`)} <strong>{global_key}</strong></div>} delay={1000}>
                                            <Button variant="flat" color="secondary" className="capitalize bg-transparent min-w-0 p-0">
                                                <CheckBadge />
                                            </Button>
                                        </Tooltip>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <ShinyText text={user.username} disabled={false} speed={3} className='custom-class text-xs' />
                                </div>
                            </div>

                        </div>

                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions" dir={active_dir}>
                        {/* <DropdownMenu aria-label="Static Actions"> */}
                        {
                            myLinks.map(link => {
                                const isLink = link.type == 'link'

                                return (
                                    <DropdownItem key={link.key} textValue={t(`global.header.profile.${link.key}`)} className="p-0">
                                        {
                                            isLink &&
                                            <Link href={`${link.link}`} className={cn(`flex gap-2 items-center font-normal cursor-pointer px-1 py-2`, {
                                                'text-yellow-600': link.key == 'need_help'
                                            })}>
                                                {link.icon}
                                                {t(`global.header.profile.${link.key}`)}
                                            </Link>
                                        }

                                        {/* {
                                        !isLink &&
                                        <div className={cn('flex gap-2 items-center', {
                                            'text-yellow-600': link.key == 'need_help'
                                        })}
                                        >
                                            {link.icon}
                                            {t(`global.header.profile.${link.key}`)}
                                        </div>
                                    } */}
                                    </DropdownItem>
                                )
                            })
                        }


                        <DropdownItem
                            key='Logout button'
                            className="text-danger"
                            color="danger"
                            textValue="Logout button"
                        >
                            {/* <div className="flex gap-2  items-center" onClick={() => setIsModalOpen(true)}> */}
                            <div className="flex gap-2  items-center" onClick={() => handleLogOut()}>
                                <LogoutIcon />
                                {t(`global.header.profile.log_out`)}
                            </div>
                        </DropdownItem>

                    </DropdownMenu>
                </Dropdown>
            }

        </div>
    )
}



