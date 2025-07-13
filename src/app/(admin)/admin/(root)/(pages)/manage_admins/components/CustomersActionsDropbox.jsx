"use client"

import { DeleteIcon, EditIcon, FileIcon, InvoiceIcon, ManageFileIcon, SaveIcon, UserIcon } from "@/constants/Icons"
import { button, Button } from "@nextui-org/react"

import { RiMore2Line } from "@remixicon/react"

const size = 15
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem, cn } from "@nextui-org/react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import Link from "next/link"
import HtmlActionHandlerButton from "@/app/assets/smallComponents/HtmlActionHandlerButton"
import { useState } from "react"



export default function CustomersActionsDropbox({ id }) {
    const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0"


    return (
        <div>

            <Dropdown>
                <DropdownTrigger>
                    <Button
                        variant="bordered"
                        className="p-0 min-w-fit w-10 h-10"
                    >
                        <RiMore2Line size={size} />
                    </Button>
                </DropdownTrigger>


                <DropdownMenu variant="faded" aria-label="Dropdown menu with description">

                    <DropdownSection showDivider>
                        <DropdownItem
                            textValue="edit_customer"
                            key="edit_customer"
                        >
                            <Link href={`customers/editCustomer/${id}`} className="flex items-center gap-2">
                                <EditIcon size={size} className={iconClasses} />
                                <div>
                                    <p>Edit student info</p>
                                    <p className="text-xs text-gray-500">Edit this student</p>
                                </div>
                            </Link>
                        </DropdownItem>


                        <DropdownItem
                            textValue="manage_steps"
                            key="manage_steps"
                        >
                            <Link href={`customers/manageSteps/${id}`} className="flex items-center gap-2">
                                <ManageFileIcon size={size} className={iconClasses} />
                                <div>
                                    <p>Manage steps</p>
                                    <p className="text-xs text-gray-500">Manage this student submitted steps</p>
                                </div>
                            </Link>
                        </DropdownItem>

                        <DropdownItem
                            textValue="manage_invoices"
                            key="manage_invoices"
                        >
                            <Link href={`customers/manageInvoices/${id}`} className="flex items-center gap-2">
                                <InvoiceIcon size={size} className={iconClasses} />
                                <div>
                                    <p>Manage invoices</p>
                                    <p className="text-xs text-gray-500">Manage this student invoices</p>
                                </div>
                            </Link>
                        </DropdownItem>
                    </DropdownSection>


                    <DropdownSection >
                        <DropdownItem
                            textValue="delete"
                            key="delete"
                            className="text-danger"
                            color="danger"
                            startContent={<DeleteIcon size={size} className={cn(iconClasses, "text-danger")} />}
                        >

                            <button className="flex flex-col items-start">
                                <p>Delete student</p>
                                <p className="text-xs text-gray-500">Permanently delete the file</p>

                            </button>
                        </DropdownItem>
                    </DropdownSection>
                </DropdownMenu>
            </Dropdown>

        </div>

    )
}
