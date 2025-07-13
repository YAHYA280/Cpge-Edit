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
import { documents_api } from "@/constants/_api"
import Image from "next/image"
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { available_languages } from "@/languages/available_languages"
import HtmlInput from "@/app/assets/smallComponents/HtmlInput"
import createToast from "@/app/assets/components/toast"


export default function DocumentActionsDropbox({ id }) {
    const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0"


    const [isEditDocumentModelOpen, setIsEditDocumentModelOpen] = useState(false)
    const [isUpdateButtonLoading, setisUpdateButtonLoading] = useState(false)
    const [documentDetails, setDocumentDetails] = useState(null)
    const [dataToUpdate, setDataToUpdate] = useState(null)



    function setDataToUpdateFunc(e, target, key) {
        const value = e.target.value

        var mainObj = dataToUpdate || {}

        if (key == 'names') {

            // If there is no data in update state, just unsert the current target, with the data
            if (!mainObj[key]) {
                mainObj[key] = { [target]: value }
            }

            else {
                var name_existing_details = mainObj[key]
                mainObj[key] = { ...name_existing_details, [target]: value }
            }
        }



        if (key == 'descriptions') {

            // If there is no data in update state, just unsert the current target, with the data
            if (!mainObj[key]) {
                mainObj[key] = { [target]: value }
            }

            else {
                var description_existing_details = mainObj[key]
                mainObj[key] = { ...description_existing_details, [target]: value }
            }
        }




        // Update the documentDetails in the main state 
        var data = { ...documentDetails }

        // Update targeted key 
        data[key][target] = value
        setDocumentDetails(data)


        // Set the updated data into dataToUpdate state 
        setDataToUpdate(mainObj)
    }






    // Show edit document model, and get the current document details 
    async function showDocumentDetails() {
        // Show edit document model 
        setIsEditDocumentModelOpen(true)


        // Get this document details 
        try {

            const response = await fetch(`${documents_api}/getSpecialUniversityDocument`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
                cache: 'no-cache',
                credentials: 'include'
            })


            const result = await response.json()


            console.log(result)

            if (result.err) {
                console.log(result.err)
            } else {


                var { names, descriptions, key, _id, } = result.data

                names = JSON.parse(names)
                descriptions = JSON.parse(descriptions)


                setDocumentDetails({ names, descriptions, key, _id })

            }




        } catch (error) {
            console.log('error', error)
            setIsEditDocumentModelOpen(false)
        }

    }






    // Update this document 
    async function updateDocumentDetails() {



        // If dataToUpdate state has value 
        if (dataToUpdate) {

            const data = {}

            for (let i = 0; i < Object.keys(dataToUpdate).length; i++) {
                const key = Object.keys(dataToUpdate)[i]
                const value = dataToUpdate[key]

                data[key] = JSON.stringify(value)
            }


            try {
                // Start button loading 
                setisUpdateButtonLoading(true)

                const response = await fetch(`${documents_api}/updateSpecialUniversityDocument`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ dataToUpdate: data, document_id: id }),
                    cache: 'no-cache',
                    credentials: 'include'
                })


                const result = await response.json()


                console.log(result)

                if (result.err) {
                    console.log(result.err)
                    createToast({ msg: 'Unable to update the document! Please try again.', status: 'error' })

                } else {
                    setIsEditDocumentModelOpen(false)
                    createToast({ msg: 'The document has been updated successfully', status: 'success' })

                    setDataToUpdate(null)
                }


            } catch (error) {
                console.log('error', error)
                setisUpdateButtonLoading(true)
            } finally {
                setisUpdateButtonLoading(false)
            }

        } else {
            // Hide update document model
            setIsEditDocumentModelOpen(false)
        }
    }


    return (
        <div>

            <Dropdown aria-labelledby="Dropdown menu with description" aria-label="Dropdown menu with description">
                <DropdownTrigger>
                    <Button
                        variant="bordered"
                        className="p-0 min-w-fit w-10 h-10"
                    >
                        <RiMore2Line size={size} />
                    </Button>
                </DropdownTrigger>


                <DropdownMenu variant="faded" aria-labelledby="Dropdown menu with description" aria-label="Dropdown menu with description">

                    <DropdownSection showDivider>
                        <DropdownItem
                            aria-labelledby="edit_document"
                            aria-label="edit_document"
                            textValue="edit_document"
                            key="edit_document"
                            startContent={<EditIcon size={size} className={iconClasses} />}
                            onClick={showDocumentDetails}
                        >
                            <p>Edit document</p>
                        </DropdownItem>


                    </DropdownSection>


                    <DropdownSection >
                        <DropdownItem
                            textValue="delete"
                            aria-labelledby="delete"
                            aria-label="delete"
                            key="delete"
                            className="text-danger"
                            color="danger"
                            startContent={<DeleteIcon size={size} className={cn(iconClasses, "text-danger")} />}
                        >

                            <button className="flex flex-col items-start">
                                <p>Delete document</p>
                            </button>
                        </DropdownItem>
                    </DropdownSection>
                </DropdownMenu>
            </Dropdown>







            <AlertDialog open={isEditDocumentModelOpen} onOpenChange={setIsEditDocumentModelOpen}>
                <AlertDialogContent >
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Edit document
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Here you can update this document
                        </AlertDialogDescription>
                    </AlertDialogHeader>


                    <div className="w-full overflow-auto max-h-[50vh]">
                        {
                            documentDetails &&

                            <div className=" flex flex-col gap-4">

                                <div className="flex flex-col gap-4">
                                    <p className="font-semibold text-sm">Document name</p>

                                    <div className="flex flex-col gap-1">


                                        {
                                            Object.keys(available_languages).map((lang) => {

                                                const { key, name, logo } = available_languages[lang]

                                                const input_value = documentDetails.names[key]

                                                const LogoIcon = () => (
                                                    <Image
                                                        className="rounded-full"
                                                        src={`${logo}`}
                                                        height={20}
                                                        width={20}
                                                        alt={`${name} Country logo`}
                                                    />
                                                )

                                                return (
                                                    <HtmlInput
                                                        key={key}
                                                        type="text"
                                                        placeholder={{ text: `Name in ${name}`, placeholder: "Write here", icon: <LogoIcon /> }}
                                                        inputValue={input_value}
                                                        onChange={(e) => setDataToUpdateFunc(e, key, 'names')}
                                                    />
                                                )
                                            }

                                            )
                                        }

                                    </div>
                                </div>


                                <div className="flex flex-col gap-4">
                                    <p className="font-semibold text-sm">Document description</p>

                                    <div className="flex flex-col gap-1">


                                        {
                                            Object.keys(available_languages).map((lang) => {

                                                const { key, name, logo } = available_languages[lang]
                                                const input_value = documentDetails.descriptions[key]


                                                const LogoIcon = () => (
                                                    <Image
                                                        className="rounded-full"
                                                        src={`${logo}`}
                                                        height={20}
                                                        width={20}
                                                        alt={`${name} Country logo`}
                                                    />
                                                )

                                                return (
                                                    <HtmlInput
                                                        key={key}
                                                        type="text"
                                                        placeholder={{ text: `Description in ${name}`, placeholder: "Write here", icon: <LogoIcon /> }}
                                                        inputValue={input_value}
                                                        onChange={(e) => setDataToUpdateFunc(e, key, 'descriptions')}

                                                    />
                                                )
                                            }

                                            )
                                        }
                                    </div>
                                </div>

                            </div>

                        }

                    </div>
                    <AlertDialogFooter className={'w-full flex items-center gap-2'}>
                        <Button
                            className="bg-gray-500 w-full bg-opacity-10 text-gray-800"
                            onClick={() => {
                                setDataToUpdate(null)
                                setIsEditDocumentModelOpen(false)
                            }}
                        >
                            Cancel
                        </Button>

                        <HtmlActionHandlerButton
                            onClick={updateDocumentDetails}
                            className="w-full px-[15px]"
                            text="Update document"
                            isLoaderVisible={isUpdateButtonLoading}
                        />
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>


        </div>
    )
}
