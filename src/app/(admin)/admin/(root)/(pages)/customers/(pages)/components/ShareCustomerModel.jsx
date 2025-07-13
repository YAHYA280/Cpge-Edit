'use client'
import { SendMessageIcon, UserIcon } from "@/constants/Icons";
import { Button } from "@nextui-org/button";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import HtmlActionHandlerButton from "@/app/assets/smallComponents/HtmlActionHandlerButton";
import { useState } from "react";
import Image from "next/image";
import { RadioGroup, Radio } from "@nextui-org/react";
import { cn } from "@/lib/utils";
import createToast from "@/app/assets/components/toast";
import { admins_api } from "@/constants/_api";
import NormalSkeleten from "@/app/assets/components/Skeleten";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { app_images_routes } from "@/constants/routes";

export default function ShareCustomerModel({ customer, admin }) {

    const [isOpen, setIsOpen] = useState(false)
    const [employees, setEmployees] = useState()
    const [areEmployeesLoading, setAreEmployeesLoading] = useState(true)
    const [selectedEmployee, setSelectedEmployee] = useState(true)

    // const employees = [
    //     {
    //         id: 'jddjjdd',
    //         name: 'Zaina mmch',
    //         photo: 'zaina.png',
    //         email: 'zaina.png',
    //         activity_status: 'active',
    //     },
    //     {
    //         id: 'zef',
    //         name: 'Zaina mmch',
    //         photo: 'zaina.png',
    //         email: 'zaina.png',
    //         activity_status: 'active',
    //     },
    //     {
    //         id: 'zfcsd',
    //         name: 'Zaina mmch',
    //         photo: 'zaina.png',
    //         email: 'zaina.png',
    //         activity_status: 'active',
    //     },
    //     {
    //         id: 'rfsdc',
    //         name: 'Zaina mmch',
    //         photo: 'zaina.png',
    //         email: 'zaina.png',
    //         activity_status: 'active',
    //     },
    //     {
    //         id: 'éeréd',
    //         name: 'Zaina mmch',
    //         photo: 'zaina.png',
    //         email: 'zaina.png',
    //         activity_status: 'active',
    //     },
    // ]





    async function getAdminColleagues() {
        try {
            setIsOpen(true)

            const response = await fetch(`${admins_api}/getColleagues`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ admin_id: admin._id }),
                cache: 'no-cache',
                credentials: 'include'
            })

            const result = await response.json()

            // console.log(result)
            var data = []

            if (result.err) {
                createToast(result.msg)
            } else {


                for (let i = 0; i < result.colleagues.length; i++) {
                    const { _id, full_name, avatar, email } = result.colleagues[i]

                    data.push({
                        id: _id,
                        name: full_name,
                        avatar,
                        avatar_callback: `${full_name.slice(0, 2)}`,
                        activity_status: 'active',
                    })

                }


                // Set employees state
                setEmployees(data)

                console.log(data)
            }
        } catch (error) {
            console.log('error', error)
            setIsOpen(false)
            createToast('Some error occurred! Try again.')
        } finally {
            setAreEmployeesLoading(false)
        }
    }


    return (
        <div>
            <Button
                className="border-1 hover:border-own_primary-1 bg-none flex items-center justify-center gap-2"
                color="none"
                onClick={getAdminColleagues}
            >
                Change customer owner
                <UserIcon />
            </Button>



            <AlertDialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Send <span className="font-semibold text-blue-700" > {customer ? `${customer.first_name} ${customer.last_name}` : ''} </span> to another employee
                        </AlertDialogTitle>


                        <AlertDialogDescription>
                            Please choose the employee you want to send <span className="font-semibold" > {customer ? `${customer.first_name} ${customer.last_name}` : ''} </span> to
                        </AlertDialogDescription>
                    </AlertDialogHeader>


                    <div className="w-full overflow-auto max-h-[50vh]">
                        <RadioGroup
                            className="w-full "
                            color="success"
                            onValueChange={setSelectedEmployee}
                        >

                            <div className="grid grid-cols-2 gap-1">
                                {
                                    areEmployeesLoading &&
                                    <>
                                        <NormalSkeleten width="100%" />
                                        <NormalSkeleten width="100%" />
                                        <NormalSkeleten width="100%" />
                                        <NormalSkeleten width="100%" />
                                    </>
                                }

                                {
                                    !areEmployeesLoading && employees &&
                                    employees.map(({ id, name, avatar, avatar_callback, activity_status }) => {


                                        return (
                                            <Radio
                                                key={id}
                                                classNames={{
                                                    base: cn(
                                                        "flex items-center justify-between",
                                                        "flex-row-reverse cursor-pointer",
                                                        "m-0",
                                                        "data-[selected=true]:border-own_primary-1"
                                                    ),
                                                }}
                                                value={id}
                                                className="border-1 rounded-xl p-2 w-full max-w-none m-0"
                                            >
                                                <div className="w-full flex items-center justify-between gap-2">
                                                    <Avatar >
                                                        <AvatarImage alt={`${name} photo`} className="w-[40px] h-[40px] rounded-xl object-cover " src={`${app_images_routes.adminAvatars}/${avatar}`} />
                                                        <AvatarFallback>{avatar_callback}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex flex-col flex-1">
                                                        <p className="text-sm">{name}</p>
                                                    </div>
                                                </div>
                                            </Radio>
                                        )
                                    })
                                }
                            </div>

                        </RadioGroup>



                    </div>
                    <AlertDialogFooter>
                        <Button
                            className="bg-gray-500 bg-opacity-10 text-gray-800"
                            onClick={() => setIsOpen(false)}
                        >
                            Cancel
                        </Button>

                        <HtmlActionHandlerButton
                            onClick={() => setIsOpen(false)}
                            className="w-fit px-[15px]"
                            text="Ok, send it!"
                        />
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
