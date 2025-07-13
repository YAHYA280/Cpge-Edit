"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Importing icons 
import Link from 'next/link';
import Cookies from 'js-cookie';


// Admin settings list 
import HtmlSeparator from '../../../../assets/smallComponents/HtmlSeparator';
import { NotificationIcon } from "@/constants/Icons"
import AddCustomerLink from "./AddCustomerLink";
import ProfileButton from "./ProfileButton";
import Welcome from "./Welcome";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
export default function Header() {

    const [adminData, setAdminData] = useCookies(['admin_data']);
    var [admin_Data, setAdmin_Data] = useState();

    useEffect(() => {
        setAdmin_Data(adminData.admin_data)
    }, [])

    // var full_name_fall_callback = full_name.split(" ")
    // full_name_fall_callback = `${full_name_fall_callback[0][0]}${full_name_fall_callback[1][0]}`


    return (
        <header className="p-5 flex justify-between items-center z-50 bg-light-1 dark:bg-dark-1 border-b-1">
            {
                admin_Data &&
                <>
                    <Welcome
                        username={admin_Data.username}
                    />
                    <div className="right-side flex flex-row items-center gap-5">


                        {/* Add customer button  */}
                        <AddCustomerLink />


                        {/* Notifications button  */}
                        <AlertDialog>
                            <AlertDialogTrigger className="bg-light-1 dark:bg-dark-2 border-1 p-3 flex justify-center items-center rounded-xl h-[35px]">
                                <NotificationIcon
                                />

                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Notifications</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        <Alert className="flex gap-3">
                                            <Avatar>
                                                <AvatarImage src="https://github.com/shadcn.png" />
                                                {/* <AvatarFallback>{full_name_fall_callback}</AvatarFallback> */}
                                            </Avatar>
                                            <div className='flex flex-col'>
                                                <AlertTitle className="font-extrabold">Heads up!</AlertTitle>
                                                <AlertDescription>
                                                    You can add components and dependencies to your app using the cli.
                                                </AlertDescription>
                                            </div>
                                        </Alert>

                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <Link
                                        href={"/admin/notifications"}
                                    >
                                        <AlertDialogCancel>
                                            My all notSifications
                                        </AlertDialogCancel>
                                    </Link>

                                    <AlertDialogAction>
                                        Cancel
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>

                        <HtmlSeparator width="1px" height="30px" />


                        {/* Profile button  */}
                        {/* <Dropdown placement="bottom-start">

                    <DropdownTrigger>
                        <div className="group flex flex-row gap-2 items-center p-1 rounded-3xl border-1 hover:bg-light-3 transition-all  hover:dark:bg-dark-3">
                            <div className="relative">
                                <Avatar>
                                    <AvatarImage src={`${app_images_routes.adminAvatars}${image}`} />
                                    <AvatarFallback>{full_name_fall_callback}</AvatarFallback>
                                </Avatar>

                                <span className='absolute h-3 w-3 bg-green-500 bottom-0 right-0 rounded-full border-2 border-white'></span>
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
                                        <Avatar>
                                            <AvatarImage src="https://github.com/shadcn.png" />
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
                                <div className="flex gap-2 items-center">
                                    <LogoutIcon
                                    />
                                    Log out
                                </div>
                            </DropdownItem>
                        </DropdownSection>
                    </DropdownMenu>


                </Dropdown> */}
                        <ProfileButton
                            avatar={admin_Data.avatar}
                            username={admin_Data.username}
                            email={admin_Data.email}
                        />

                    </div>
                </>
            }
        </header>
    )
}
