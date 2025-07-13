'use client'

import { app_images_routes } from "@/constants/routes";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection, Button } from "@nextui-org/react";
import { settings_list } from "../../others/links";
import { LogoutIcon } from "@/constants/Icons";
import { RiArrowDownSLine } from "@remixicon/react";
import Link from "next/link";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { useCookies } from "react-cookie";
import Cookies from 'js-cookie'
import { useRouter } from "next/navigation";
import { useState } from "react";
import HtmlActionHandlerButton from "@/app/assets/smallComponents/HtmlActionHandlerButton";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import axios from "axios";
import { admins_api } from "@/constants/_api";
import createToast from "@/app/assets/components/toast";


export default function ProfileButton({ avatar, full_name_fall_callback, username, email }) {

    const router = useRouter()
    const [adminData, setAdminData, removeCookie] = useCookies(['admin_data'])
    const [isLoggedOutLoading, setIsLoggedOutLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)









    async function handleLoginOut() {
        // Start button loading state 
        setIsLoggedOutLoading(true)

        // Remove server cookies 
        try {
            const response = await fetch(`${admins_api}/adminLogout`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
                cache: 'no-cache',
                credentials: 'include'
            })

            const result = await response.json()
            console.log(result)


            if (!result.err) {

                // Remove client side cookies 
                Cookies.remove('admin_data');
                Cookies.remove('admin_token')


                // Stop button loading state 
                setIsLoggedOutLoading(false)
                // Redirect to the login page 
                window.location.href = '/admin/login'
            }

        } catch (error) {
            console.log(error)
            createToast('Unable to logout! Try again.', 'error')
        }



    }



    return (
        <div>

            <Dropdown placement="bottom-start">
                <DropdownTrigger>
                    <div className="group flex flex-row gap-2 items-center p-1 rounded-3xl border-1 hover:bg-light-3 transition-all  hover:dark:bg-dark-3">
                        <div className="relative">
                            <Avatar >
                                <AvatarImage src={avatar ? `${app_images_routes.adminAvatars}/${avatar}` : '/icons/preload-avatar.png'} />
                                <AvatarFallback>{full_name_fall_callback}</AvatarFallback>
                            </Avatar>


                            <span className='absolute h-3 w-3 bg-green-500 bottom-0 right-0 rounded-full border-2 border-white dark:border-dark-1'></span>
                        </div>

                        <RiArrowDownSLine
                            size={16} // set custom `width` and `height` 
                            className="rotate-[-90deg] group-hover:rotate-[0] transition-all"
                        />
                    </div>
                </DropdownTrigger>

                <DropdownMenu>
                    <DropdownSection showDivider>
                        <DropdownItem>
                            <div className="flex items-center gap-2">
                                <div className="relative">
                                    <Avatar >
                                        <AvatarImage src={avatar ? `${app_images_routes.adminAvatars}/${avatar}` : '/icons/preload-avatar.png'} />
                                        <AvatarFallback>{full_name_fall_callback}</AvatarFallback>
                                    </Avatar>

                                    <span className='absolute h-3 w-3 bg-green-500 bottom-0 right-0 rounded-full border-2 border-white'></span>
                                </div>
                                <div className="username-email flex flex-col gap-0 items-start text-sm">
                                    <p className="font-medium">{username}</p>
                                    <p className="text-xs font-normal text-gray-400">{email}</p>
                                </div>
                            </div>
                        </DropdownItem>
                    </DropdownSection>

                    <DropdownSection>
                        {
                            settings_list.map(link => {
                                return (
                                    <DropdownItem key={link.id}>
                                        <Link key={link.id} href={`/admin${link.link}`} className="flex gap-2 items-center font-normal cursor-pointer">
                                            {link.icon}
                                            {link.name}
                                        </Link>
                                    </DropdownItem>
                                )
                            })
                        }
                        <DropdownItem
                            key='Logout button'
                            className=" text-danger"
                            color="danger"
                        >
                            <div className="flex gap-2 items-center" onClick={() => setIsModalOpen(true)}>
                                <LogoutIcon />
                                Log out
                            </div>
                        </DropdownItem>
                    </DropdownSection>
                </DropdownMenu>

            </Dropdown>


            <AlertDialog open={isModalOpen} onOpenChange={() => setIsModalOpen(false)} >

                <AlertDialogContent className="sm:max-w-[425px] bg-light-1 dark:bg-dark-1">

                    <div className="flex flex-col gap-2 justify-center items-center">
                        <div className="h-[60px] w-[60px] rounded-full bg-red-600 bg-opacity-40 text-red-600 flex items-center justify-center">
                            <LogoutIcon special_size={30} />
                        </div>

                        <p className="font-bold text-xl">Oh! You are leaving!</p>
                        <p className="text-sm text-text_color-1">Are you sure you want to log out?</p>
                    </div>


                    <AlertDialogFooter>
                        <Button
                            onClick={() => setIsModalOpen(false)}
                            className="w-full"
                        >
                            Cancel
                        </Button>
                        <HtmlActionHandlerButton
                            isLoaderVisible={isLoggedOutLoading}
                            onClick={handleLoginOut}
                            text={'Yes, Log out'}
                            icon={<LogoutIcon />}
                            className="bg-red-600 text-light-1"
                        />
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </div>
    )
}
