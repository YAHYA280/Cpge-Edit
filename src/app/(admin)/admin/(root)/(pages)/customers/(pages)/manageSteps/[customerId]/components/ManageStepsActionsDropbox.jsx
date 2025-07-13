"use client"

import { AcceptWalletIcon, AddNewFileIcon, CheckIcon, CheckMarkCircleIcon, CyrcleCheckIcon, CyrcleXMarkIcon, DeleteIcon, DotsIcon, EditIcon, EmptyFileIcon, FileIcon, ManageFileIcon, NormalXMarkIcon, RefuseWalletIcon, SendMessageIcon, StepRefusedIcon, UploadIcon, ViewFileIcon } from "@/constants/Icons"
import { Button, Spinner, Tooltip } from "@nextui-org/react"


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
import { steps_api } from "@/constants/_api"
import { app_images_routes } from "@/constants/routes"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import Image from "next/image"
import { openFileInNewTab } from "@/constants/functions"
import customers_steps from "@/constants/customers_steps"



export default function ManageStepsActionsDropbox({ step_id, admin_id, customer_id, attachements_srcs, next_step }) {
    const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0"

    const [isMainDropdownOpen, setIsMainDropdownOpen] = useState(false)
    const [isFirstNestedDropdownOpen, setIsFirstNestedDropdownOpen] = useState(false)
    const [is2ndNestedDropdownOpen, setIs2ndNestedDropdownOpen] = useState(false)
    const [isMessageModelOpen, setIsMessageModelOpen] = useState(false)
    const [isAllUploadedAttachementsModalOpen, setisAllUploadedAttachementsModalOpen] = useState(false)


    // Drawer input state
    const [comment, setComment] = useState('');


    // Buttons loading states
    const [isAcceptButtonLoading, setIsAcceptButtonLoading] = useState(false)
    // const [isRefuseButtonLoading, setIsRefuseButtonLoading] = useState(false)
    const [isRefuseWithMessageButtonLoading, setIsRefuseWithMessageButtonLoading] = useState(false)



    function closesAllDrops() {
        setIsFirstNestedDropdownOpen(false)
        setIs2ndNestedDropdownOpen(false)
        setTimeout(() => {
            setIsMainDropdownOpen(false)
        }, 10)
    }

    function opensAllDrops() {
        setIs2ndNestedDropdownOpen(true)
        // setIsFirstNestedDropdownOpen(true)
        setIsMainDropdownOpen(true)
    }


    function opensFirstDropAnd2ndDrop() {
        setIsMainDropdownOpen(true)
        setIsFirstNestedDropdownOpen(true)
    }



    // ###### Functions 

    // Handle accepting step
    async function handleAcceptStep() {
        opensAllDrops()
        acceptStep(setIsAcceptButtonLoading, 'accepted', next_step)
    }


    // Helper function 
    async function acceptStep(setTheButtonState, status, next_step) {
        // This function is for the special button setState 
        setTheButtonState(true)

        // Accepting this step 
        try {

            const response = await fetch(`${steps_api}/acceptAndRefuseStep`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ step_id, customer_id, admin_id, status, next_step }),
                cache: 'no-cache',
                credentials: 'include'
            })

            const result = await response.json()
            console.log(result)

            if (!result.err) {
                closesAllDrops()
                createToast(`This step has been ${status}`)
            } else {
                createToast(result.msg, true)
            }

        } catch (error) {

        } finally {
            setTheButtonState(false)
        }
    }



    // Handle refusing step
    function handleRefuseStep() {
        // Close all dropdowns 
        closesAllDrops()
        // Open the message popover 
        setIsMessageModelOpen(true)
    }



    // Send refuse comment 
    async function handleRefuseWithMessageStep() {
        // Close all dropdowns 
        closesAllDrops()
        // Open the message popover 
        setIsMessageModelOpen(true)

        try {
            // Start refuse with comment button loader 
            setIsRefuseWithMessageButtonLoading(true)

            const response = await fetch(`${steps_api}/acceptAndRefuseStep`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ step_id, customer_id, admin_id, status: 'refused', refuse_comment: comment }),
                cache: 'no-cache',
                credentials: 'include'
            })

            const result = await response.json()
            console.log(result)

            if (!result.err) {
                closesAllDrops()
                setIsMessageModelOpen(false)
                createToast(`This step has been refused, and the reason has been sent to the customer`)
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




    function showAllUploadedAttachements() {
        // Close all drop boxes 
        closesAllDrops()

        // Open uploaded attachements container 
        setisAllUploadedAttachementsModalOpen(true)
        console.log(attachements_srcs)
    }


    function handleDownloadFile(file) {

        console.log(file)
        openFileInNewTab(file)

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
                    <DropdownSection>


                        <DropdownItem
                            key="view_attachements"
                            textValue="view_attachements"
                        >
                            {/* Button that closes the dropdown */}
                            <span
                                onClick={closesAllDrops}
                                className="bg-red-500 text-light-1 h-6 w-6 flex justify-center items-center rounded-lg absolute -top-[40px] right-0">
                                <NormalXMarkIcon special_size="11" />
                            </span>



                            <div
                                className="flex items-center gap-2"
                                onClick={showAllUploadedAttachements}
                            >
                                <ViewFileIcon size={size} className={iconClasses} />
                                <div>
                                    <p className="text-start">View attachements</p>
                                    <p className="text-xs text-gray-500">View attachements</p>
                                </div>
                            </div>

                        </DropdownItem>


                        {/* Opens new dropdown  */}
                        <DropdownItem key="upload_attachement" textValue="upload_attachement">
                            <Dropdown
                                isOpen={isFirstNestedDropdownOpen}
                                showArrow
                            >
                                <DropdownTrigger onClick={opensFirstDropAnd2ndDrop}>
                                    <div className="flex items-center gap-2">
                                        <UploadIcon size={size} className={iconClasses} />
                                        <div>
                                            <p className="text-start">Upload attachement</p>
                                            <p className="text-xs text-gray-500">Upload an attachement</p>
                                        </div>
                                    </div>
                                </DropdownTrigger>

                                <DropdownMenu
                                    variant={'faded'}
                                >

                                    <DropdownItem
                                        key="upload_new_attachement"
                                        textValue="upload_new_attachement"
                                    >
                                        {/* Button that closes the dropdown */}
                                        <span
                                            onClick={() => setIsFirstNestedDropdownOpen(false)}
                                            className="bg-red-500 text-light-1 h-6 w-6 flex justify-center items-center rounded-lg absolute -top-[40px] right-0">
                                            <NormalXMarkIcon special_size="11" />
                                        </span>
                                        {/* ---  */}

                                        <div
                                            className="flex items-center gap-2"
                                        // onClick={handleAcceptStep}
                                        >
                                            <AddNewFileIcon size={12} />
                                            <p>Upload new file</p>
                                        </div>
                                    </DropdownItem>

                                    <DropdownItem
                                        // onClick={handleRefuseStep}
                                        key="view_new_attachement"
                                        textValue="view_new_attachement"
                                    >
                                        <div className="flex items-center gap-2 ">
                                            <ViewFileIcon size={12} />
                                            <p>View existing file</p>
                                        </div>
                                    </DropdownItem>

                                </DropdownMenu>
                            </Dropdown>
                        </DropdownItem>

                        {/* Opens new dropdown  */}
                        <DropdownItem key="react_to_step" textValue="react_to_step">
                            <Dropdown
                                isOpen={is2ndNestedDropdownOpen}
                                showArrow
                            >
                                <DropdownTrigger onClick={opensAllDrops}>
                                    <div className="flex items-center gap-2">
                                        <EditIcon size={size} className={iconClasses} />
                                        <div>
                                            <p className="text-start">React to step</p>
                                            <p className="text-xs text-gray-500">React to this step</p>
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
                                            onClick={() => setIs2ndNestedDropdownOpen(false)}
                                            className="bg-red-500 text-light-1 h-6 w-6 flex justify-center items-center rounded-lg absolute -top-[40px] right-0">
                                            <NormalXMarkIcon special_size="11" />
                                        </span>
                                        {/* ---  */}

                                        <div
                                            className="flex items-center gap-2"
                                            onClick={handleAcceptStep}
                                        >
                                            {isAcceptButtonLoading ? <Spinner size="sm" color="success" /> : <CyrcleCheckIcon size={12} className={iconClasses} />}
                                            <p>Accept step</p>
                                        </div>
                                    </DropdownItem>

                                    <DropdownItem
                                        onClick={handleRefuseStep}
                                        key="refuse"
                                        textValue="refuse"
                                        color="danger">
                                        <div className="flex items-center gap-2 ">
                                            <CyrcleXMarkIcon size={12} className={iconClasses} />
                                            <p>Refuse step</p>
                                        </div>
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </DropdownItem>
                    </DropdownSection>

                </DropdownMenu>
            </Dropdown>



            {/* Uploaded attachements list  */}
            <Modal
                isOpen={isAllUploadedAttachementsModalOpen}
                backdrop="opaque"
                size="2xl"
                onOpenChange={setisAllUploadedAttachementsModalOpen}
                scrollBehavior="inside"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                <p className="text-xl">Uploaded attachement for step 1</p>
                                <span className="text-base flex gap-1">
                                    <p className=" font-normal">Check the uploaded files from the customer</p>
                                    <p className="font-semibold">{'Ayoub Farahi'}</p>
                                </span>
                            </ModalHeader>
                            <ModalBody>
                                <div className="flex flex-col gap-3 w-full">
                                    {
                                        (!attachements_srcs || attachements_srcs.length == 0) &&
                                        <div className="border-1 flex flex-col items-center justify-center gap-1 w-full p-5 rounded-xl">
                                            <EmptyFileIcon special_size={50} />
                                            <p className="text-xl font-semibold">Nothing to show</p>
                                            <p>There is no uploaded files to show</p>
                                        </div>
                                    }


                                    {
                                        attachements_srcs.map(({ src, status, key }, index) => {

                                            // const this_step = customers_steps.fin 
                                            const the_current_step = customers_steps.find(step => step.key == step_id)
                                            console.log(the_current_step)


                                            return (
                                                <div key={index} className="flex items-center justify-between w-full py-3">
                                                    <div className="flex items-center gap-3">
                                                        <span className="p-2 rounded-lg border-1">
                                                            <FileIcon special_size={35} />
                                                        </span>
                                                        <span>
                                                            <p className="text-base font-medium">Contract file</p>
                                                            <span className="flex items-center gap-1">
                                                                <p className="text-sm flex items-center gap-1">
                                                                    PDF
                                                                </p>
                                                                <span className="h-1 w-1 rounded-full bg-dark-3" />
                                                                <p className="text-sm flex items-center gap-1">
                                                                    50k
                                                                </p>
                                                            </span>

                                                        </span>
                                                    </div>

                                                    {/* File controllers  */}
                                                    <div className="w-fit flex items-center justify-center gap-2">
                                                        <Tooltip delay={1000} content="View this file">
                                                            <Button
                                                                className="min-w-0 p-0 h-[30px] w-[30px] bg-transparent border-1"
                                                                onClick={() => handleDownloadFile(`${app_images_routes.steps.step}/${src}`)}
                                                            >
                                                                <ViewFileIcon />
                                                            </Button>
                                                        </Tooltip>


                                                        <Tooltip delay={1000} content="Refuse this file">
                                                            <Button
                                                                className="min-w-0 p-0 h-[30px] w-[30px] bg-transparent border-1"
                                                            >
                                                                <StepRefusedIcon />
                                                            </Button>
                                                        </Tooltip>

                                                    </div>
                                                </div>
                                            )
                                        })
                                    }

                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>




            {/* Refuse input alert */}
            <Drawer open={isMessageModelOpen} className="outline-none" onOpenChange={setIsMessageModelOpen}>

                <DrawerContent >
                    <div className="mx-auto w-full max-w-sm">
                        <DrawerHeader>
                            <DrawerTitle>Refuse step with comment</DrawerTitle>
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
                                onClick={handleRefuseWithMessageStep}
                                text={'Refuse & Send comment'}
                                icon={<SendMessageIcon />}
                            />
                            <DrawerClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    )
}
