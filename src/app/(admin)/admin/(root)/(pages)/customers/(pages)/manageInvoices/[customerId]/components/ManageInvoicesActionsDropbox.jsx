"use client"

import { AcceptWalletIcon, CheckMarkCircleIcon, DeleteIcon, DotsIcon, EditIcon, FileIcon, InvoiceIcon, ManageFileIcon, NormalXMarkIcon, RefuseWalletIcon, SendMessageIcon } from "@/constants/Icons"
import { Button, Spinner } from "@nextui-org/react"


const size = 15
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem, cn } from "@nextui-org/react"
import { useState } from "react"
import createToast from "@/app/assets/components/toast"
import HtmlInput from "@/app/assets/smallComponents/HtmlInput"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"
import HtmlActionHandlerButton from "@/app/assets/smallComponents/HtmlActionHandlerButton"
import Link from "next/link"
import { invoices_api } from "@/constants/_api"
import { isAValidString, isValidNumber } from "@/constants/functions"


export default function ManageInvoicesActionsDropbox({ id, admin_id, invoice_src, invoice_amount }) {
    const iconClasses = "text-xl pointer-events-none flex-shrink-0"

    const [isMainDropdownOpen, setIsMainDropdownOpen] = useState(false)
    const [isNestedDropdownOpen, setIsNestedDropdownOpen] = useState(false)
    const [isMessageModelOpen, setIsMessageModelOpen] = useState(false)


    // Drawer input state
    const [comment, setComment] = useState('')
    const [amount, setAmount] = useState(1)


    // Buttons loading states
    const [isDeleteButtonLoading, setIsDeleteButtonLoading] = useState(false)
    const [isAcceptButtonLoading, setIsAcceptButtonLoading] = useState(false)
    const [isRefuseButtonLoading, setIsRefuseButtonLoading] = useState(false)
    const [isRefuseWithMessageButtonLoading, setIsRefuseWithMessageButtonLoading] = useState(false)
    const [isEditInvoiceModalOpen, setIsEditInvoiceModalOpen] = useState(false)
    const [isInvoiceAmountPickerOpen, setIsInvoiceAmountPickerOpen] = useState(false)



    function closesAllDrops() {
        setIsNestedDropdownOpen(false)
        setTimeout(() => {
            setIsMainDropdownOpen(false)
        }, 10);
    }

    function opensAllDrops() {
        setIsNestedDropdownOpen(true)
        setIsMainDropdownOpen(true)
    }




    // ###### Functions 

    // Handle deleting invoice 
    function handleDeleteInvoice() {
        refuseAndAccept(setIsDeleteButtonLoading, 'deleted')
    }


    // Handle accepting invoice
    async function handleAcceptInvoice() {
        closesAllDrops()

        // Show invoice amount picker 
        setIsInvoiceAmountPickerOpen(true)
    }


    // Handle refusing invoice
    function handleRefuseInvoice() {
        opensAllDrops()
        refuseAndAccept(setIsRefuseButtonLoading, 'refused')
    }



    // Show edit invoice modal 
    function showEditInvoiceModal() {
        setIsEditInvoiceModalOpen(true)
    }



    // Helper function 
    async function refuseAndAccept(setTheButtonState, status) {

        var pass = true // Used for checking status

        // Check if the status is equals "accepted" 
        if (status == 'accepted') {

            if (!isValidNumber(amount)) { // If the amount is not a valid number
                pass = false
                createToast(`The amount must be a number!`)
            } else if (amount <= 0) { // If the amount is less than 1
                pass = false
                createToast(`The amount must be greater than 0!`)
            } else if (amount == '') { // If the amount is empty string
                pass = false
                createToast(`Please write the amount!`)
            }
        }


        // Accepting this invoice 
        if (pass) {

            try {
                // This function is for the special button setState 
                setTheButtonState(true)



                const response = await fetch(`${invoices_api}/acceptAndRefuseInvoice`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ invoice_id: id, admin_id, status, amount }),
                    cache: 'no-cache',
                    credentials: 'include'
                })

                const result = await response.json()
                console.log(result)

                if (!result.err) {
                    closesAllDrops()
                    createToast(`This invoice has been ${status}`)
                    
                    // Close invoice amount picker modal 
                    setIsInvoiceAmountPickerOpen(false)
                } else {
                    createToast(result.msg, true)
                }

            } catch (error) {

            } finally {
                setTheButtonState(false)
            }
        }
    }



    // Handle refusing invoice
    function handleOpenRefuseWithMessageModel() {
        // Close all dropdowns 
        closesAllDrops()
        // Open the message popover 
        setIsMessageModelOpen(true)
    }


    // Send refuse comment 
    async function handleRefuseWithMessageInvoice() {
        // Close all dropdowns 
        closesAllDrops()
        // Open the message popover 
        setIsMessageModelOpen(true)



        try {
            // Start refuse with comment button loader 
            setIsRefuseWithMessageButtonLoading(true)


            const response = await fetch(`${invoices_api}/acceptAndRefuseInvoice`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ invoice_id: id, admin_id, status: 'refuse_with_comment', comment }),
                cache: 'no-cache',
                credentials: 'include'
            })

            const result = await response.json()
            console.log(result)

            if (!result.err) {
                closesAllDrops()
                setIsMessageModelOpen(false)
                createToast(`This invoice has been refused, and the reason has been sent to the customer`)
            } else {
                createToast(result.msg, true)
            }

        } catch (error) {
            console.log(error)
            createToast(`Some error happend! Please try again.`)
        } finally {
            setIsRefuseWithMessageButtonLoading(false)
        }
    }




    return (
        <div>

            <Dropdown
                closeOnSelect={false}
                isOpen={isMainDropdownOpen}
                backdrop="blur"
                showArrow
                classNames={{
                    base: "before:bg-default-200", // change arrow background
                    content: "py-1 px-1 border border-default-200 bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black",
                }}
            >
                <DropdownTrigger>
                    <Button
                        variant="bordered"
                        className="p-0 min-w-fit w-10 h-10"
                        onClick={() => setIsMainDropdownOpen(true)}
                    >
                        <DotsIcon special_size={13} />
                    </Button>
                </DropdownTrigger>


                <DropdownMenu variant="faded" className="relative" aria-label="Dropdown menu with description">
                    <DropdownSection showDivider>
                        <DropdownItem key="view_file" textValue="view_file">
                            {/* Button that closes the dropdown */}
                            <span
                                onClick={closesAllDrops}
                                className="text-light-1 h-6 w-6 flex justify-center items-center rounded-lg absolute -top-[40px] right-0">
                                <NormalXMarkIcon special_size="11" />
                            </span>

                            <Link
                                className="flex items-center justify-start gap-2"
                                onClick={closesAllDrops}
                                href={invoice_src}
                                target="_blank"
                            >
                                <FileIcon size={size} className={iconClasses} />
                                <div>
                                    <p className="text-start">View file</p>
                                    <p className="text-xs text-gray-500">View this file</p>
                                </div>
                            </Link>
                        </DropdownItem>


                        <DropdownItem
                            textValue="edit_invoice"
                            key="edit_invoice"

                        >
                            <Link
                                className="flex items-center justify-start gap-2"
                                href={`editInvoice/${id}`}
                            >
                                <InvoiceIcon size={size} className={iconClasses} />

                                <div>
                                    <p className="text-start">Edit invoice</p>
                                    <p className="text-xs text-gray-500">Edit this invoice</p>
                                </div>
                            </Link>
                        </DropdownItem>



                        {/* Opens new dropdown  */}
                        <DropdownItem key="react_to_invoice" textValue="react_to_invoice">
                            <Dropdown
                                isOpen={isNestedDropdownOpen}
                                showArrow
                            >
                                <DropdownTrigger onClick={opensAllDrops}>
                                    <div className="flex items-center gap-2">
                                        <EditIcon size={size} className={iconClasses} />
                                        <div>
                                            <p className="text-start">React to invoice</p>
                                            <p className="text-xs text-gray-500">React to this invoice</p>
                                        </div>
                                    </div>
                                </DropdownTrigger>

                                <DropdownMenu
                                    variant={'faded'}
                                >
                                    <DropdownItem
                                        key="accept"
                                        textValue="accept"
                                        color="success"
                                    >
                                        {/* Button that closes the dropdown */}
                                        <span
                                            onClick={() => setIsNestedDropdownOpen(false)}
                                            className="bg-red-500 text-light-1 h-6 w-6 flex justify-center items-center rounded-lg absolute -top-[40px] right-0">
                                            <NormalXMarkIcon special_size="11" />
                                        </span>
                                        {/* ---  */}

                                        <div
                                            className="flex items-center gap-2"
                                            onClick={handleAcceptInvoice}
                                        >
                                            <AcceptWalletIcon size={12} className={iconClasses} />
                                            {/* {isAcceptButtonLoading ? <Spinner size="sm" color="success" /> : <AcceptWalletIcon size={12} className={iconClasses} />} */}
                                            <p>Accept invoice</p>
                                        </div>
                                    </DropdownItem>
                                    <DropdownItem
                                        onClick={handleRefuseInvoice}
                                        key="refuse"
                                        textValue="refuse"
                                        color="danger">
                                        <div className="flex items-center gap-2 ">
                                            {isRefuseButtonLoading ? <Spinner size="sm" color="danger" /> : <RefuseWalletIcon size={12} className={iconClasses} />}
                                            <p>Refuse invoice</p>
                                        </div>
                                    </DropdownItem>
                                    <DropdownItem
                                        onClick={handleOpenRefuseWithMessageModel}
                                        key="refuse_with_comment"
                                        textValue="refuse_with_comment"
                                        color="warning">
                                        <div className="flex items-center gap-2 ">
                                            <SendMessageIcon size={12} className={iconClasses} />
                                            <p>Refuse with comment</p>
                                        </div>
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </DropdownItem>
                    </DropdownSection>



                    <DropdownSection >
                        <DropdownItem
                            textValue="delete"
                            key="delete"
                            className="text-danger"
                            color="danger"
                            onClick={handleDeleteInvoice}
                            startContent={isDeleteButtonLoading ? <Spinner size="sm" color="danger" /> : <DeleteIcon size={size} className={cn(iconClasses, "text-danger")} />}
                        >
                            <button className="flex flex-col items-start">
                                <p>Delete invoice</p>
                                <p className="text-xs text-gray-500">Permanently delete the invoice</p>
                            </button>
                        </DropdownItem>
                    </DropdownSection>
                </DropdownMenu>
            </Dropdown>


            {/* Refuse invoice comment  */}
            <Drawer open={isMessageModelOpen} className="outline-none" onOpenChange={setIsMessageModelOpen}>
                <DrawerContent >
                    <div className="mx-auto w-full max-w-sm">
                        <DrawerHeader>
                            <DrawerTitle>Refuse invoice with comment</DrawerTitle>
                            <DrawerDescription>Write the refuse reason to send it as a comment to your customer</DrawerDescription>
                        </DrawerHeader>

                        <div className="p-4 pb-0">
                            <HtmlInput
                                type="normal_textarea"
                                placeholder={'Enter your comment...'}
                                inputValue={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </div>
                        <DrawerFooter>
                            <HtmlActionHandlerButton
                                isLoaderVisible={isRefuseWithMessageButtonLoading}
                                onClick={handleRefuseWithMessageInvoice}
                                text={'Send comment'}
                                icon={<SendMessageIcon />}
                            />
                            <DrawerClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </div>
                </DrawerContent>
            </Drawer>




            {/* Invoice amount picker  */}
            <Drawer open={isInvoiceAmountPickerOpen} className="outline-none" onOpenChange={setIsInvoiceAmountPickerOpen}>
                <DrawerContent >
                    <div className="mx-auto w-full max-w-sm">
                        <DrawerHeader>
                            <DrawerTitle>Write invoice amount</DrawerTitle>
                            <DrawerDescription>Write this invoice amount (MAD)</DrawerDescription>
                        </DrawerHeader>

                        <div className="p-4 pb-0">
                            <HtmlInput
                                type="normal_textarea"
                                placeholder={'Enter amount...'}
                                inputValue={invoice_amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </div>
                        <DrawerFooter>
                            <HtmlActionHandlerButton
                                isLoaderVisible={isAcceptButtonLoading}
                                onClick={() => refuseAndAccept(setIsAcceptButtonLoading, 'accepted')}
                                text={'Accept invoice'}
                                icon={<AcceptWalletIcon />}
                            />
                            <DrawerClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </div>
                </DrawerContent>
            </Drawer>






        </div >
    )
}
