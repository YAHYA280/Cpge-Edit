"use client"

import customers_steps from "@/constants/customers_steps"
import { calculateFileSize, downloadFile } from "@/constants/functions"
import { ViewFileIcon, EditFileIcon, EditIcon, FileIcon, ShareIcon, UploadIcon, DotsIcon, Dots2Icon, CyrcleXMarkIcon, CheckMarkCircleIcon, EmptyFileIcon, ReminderIcon, DeleteIcon, SendMessageIcon } from "@/constants/Icons"
import { app_images_routes } from "@/constants/routes"
import { Button } from "@nextui-org/button"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Tooltip } from "@nextui-org/tooltip";
import DownloadButton from "@/app/assets/components/DownloadButton"
import { getUniversityDocuments, getVisaDocuments } from "@/constants/get_data"
import createToast from "@/app/assets/components/toast"
import { university_documents } from "@/constants/university_documents"
import { customers_statuses } from "@/constants/constants"
import { Badge } from "@/components/tremorComponents/Badge"
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem } from "@nextui-org/dropdown";
import { visa_documents } from "@/constants/visa_documents"
import { admins_api, steps_api } from "@/constants/_api"
import { CheckCircle, CheckCircle2, Key } from "lucide-react"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"
import HtmlInput from "@/app/assets/smallComponents/HtmlInput"
import HtmlActionHandlerButton from "@/app/assets/smallComponents/HtmlActionHandlerButton"

export default function CustomerPayload({ step, isError, customer, admin_id }) {

    const [downloadedFiles, setDownloadedFiles] = useState()
    const [uploadedFiles, setUploadedFiles] = useState()
    const [thisStep, setThisStep] = useState()
    const [universityDocuments, setUniversityDocuments] = useState()
    const [visaDocuments, setVisaDocuments] = useState()


    useEffect(() => {
        if (step) {
            var { createdAt, download_values, upload_values, for_admin_id, refuse_comment, status, step_id, updatedAt, _id } = step


            // Parse the objects
            if (download_values) {
                download_values = JSON.parse(download_values)
                setDownloadedFiles(download_values)
            }
            if (upload_values) {
                upload_values = JSON.parse(upload_values)
                setUploadedFiles(upload_values)
            }

            // console.log('download_values', download_values)
            // console.log('upload_values', upload_values)




            // Set this step details 
            const step_details = customers_steps.find(step => step.key == step_id) || {}
            // console.log('step_details', step_details)
            setThisStep(step_details)

        }


    }, [step])



    // Set all university documents 
    useEffect(() => {

        async function getDocuments() {

            try {
                const documents = await getUniversityDocuments()

                if (documents.err) {
                    createToast(documents.msg, true)
                } else {

                    var allUniversityDocuments = []
                    const default_university_documents = []


                    // Check if there any documents in the database, if so, then insert it with the existing university documents  
                    var existing_university_documenst = documents?.data.length > 0 ? [...university_documents, ...documents?.data] : university_documents


                    for (let i = 0; i < existing_university_documenst.length; i++) {
                        var { key, names, descriptions } = existing_university_documenst[i]

                        allUniversityDocuments.push({
                            key, names, descriptions
                        })

                    }

                    setUniversityDocuments(allUniversityDocuments)

                }
            } catch (error) {
                console.log(error)
            }
        }

        getDocuments()



        async function getAllVisaDocuments() {

            try {
                const documents = await getVisaDocuments()

                if (documents.err) {
                    createToast(documents.msg, true)
                } else {

                    var allVisaDocuments = []

                    // Check if there any documents in the database, if so, then insert it with the existing university documents  
                    var existing_visa_documenst = documents?.data.length > 0 ? [...visa_documents, ...documents?.data] : visa_documents


                    for (let i = 0; i < existing_visa_documenst.length; i++) {
                        var { key, names, descriptions } = existing_visa_documenst[i]

                        allVisaDocuments.push({
                            key, names, descriptions
                        })

                    }

                    setVisaDocuments(allVisaDocuments)

                }
            } catch (error) {
                console.log(error)
            }
        }

        getAllVisaDocuments()

    }, [])



    return (
        <div className=" flex flex-col gap-5 mt-5">

            <ol className="relative border-s ">
                {/* The data that this admin has uploaded to the customer  */}
                {
                    downloadedFiles && thisStep &&
                    <li className="mb-10 ms-6">
                        <div className=" rounded-xl flex flex-col gap-2">

                            <div>
                                <span className="absolute flex items-center justify-center w-7 h-7 bg-own_primary-1 rounded-full -start-3 ring-white dark:ring-gray-900 text-dark-1">
                                    <UploadIcon />
                                </span>
                                <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">Your uploaded files</h3>
                            </div>

                            {/* Data section */}
                            <div className="bg-dark-1 border-1 p-2 rounded-xl flex flex-col gap-2">

                                {
                                    downloadedFiles.map(({ files, id, type }) => {

                                        return (
                                            <div key={id}>
                                                {
                                                    thisStep?.what_to_do.map(({ key, description, name }) => {

                                                        if (key == id) {
                                                            return (

                                                                <div className="flex flex-col gap-2" key={key}>
                                                                    {
                                                                        files.map((file, index) => {


                                                                            var download_href = ''

                                                                            switch (type) {
                                                                                case "contract":
                                                                                    download_href = `${app_images_routes.steps.contracts}/${file.name}`
                                                                                    break;

                                                                                // case "schoole_invoice":
                                                                                case "invoice":
                                                                                    // download_href = `${app_images_routes.steps.contracts}/${file.name}`
                                                                                    download_href = `${app_images_routes.invoices.schools}/${file.name}`
                                                                                    break;

                                                                                case "pre_admission":
                                                                                    download_href = `${app_images_routes.preAdmissionLetter}/${file.name}`
                                                                                    break;

                                                                                default:
                                                                                    break;
                                                                            }

                                                                            return (
                                                                                <div key={index + 1} className="flex items-center justify-between p-2 border-1 rounded-xl bg-dark-2 ">
                                                                                    <div className="flex items-center gap-3">

                                                                                        <span className="p-2 rounded-lg border-1">
                                                                                            <FileIcon special_size={30} />
                                                                                        </span>
                                                                                        <span>
                                                                                            <p className="text-sm font-medium">{name.en}</p>
                                                                                            <span className="flex items-center gap-1">
                                                                                                <p className="text-[10px] flex items-center gap-1">
                                                                                                    {file.extension.toUpperCase()}
                                                                                                </p>
                                                                                                <span className="h-1 w-1 rounded-full bg-dark-3" />
                                                                                                <p className="text-[10px] flex items-center gap-1">
                                                                                                    {calculateFileSize(file.size)}
                                                                                                </p>
                                                                                            </span>

                                                                                        </span>
                                                                                    </div>


                                                                                    <div className=" flex items-center gap-2">
                                                                                        <Tooltip size="sm" delay={500} closeDelay={0} content="View file">
                                                                                            <Link href={download_href}
                                                                                                className="border-1 flex items-center gap-2 bg-transparent shadow-md text-light-1 p-2 text-sm rounded-xl"
                                                                                                download={true}
                                                                                                target="_blank"
                                                                                            >
                                                                                                <ViewFileIcon />
                                                                                            </Link>
                                                                                        </Tooltip>

                                                                                    </div>

                                                                                </div>
                                                                            )
                                                                        })
                                                                    }
                                                                </div>

                                                            )

                                                        }

                                                    })
                                                }

                                            </div>
                                        )
                                    })
                                }

                            </div>

                        </div>
                    </li>
                }



                {/* The customer response  */}
                <li className=" ms-6">

                    {
                        uploadedFiles && universityDocuments && thisStep &&
                        <div className=" rounded-xl flex flex-col gap-2 ">
                            <div>
                                <span className="absolute flex items-center justify-center w-7 h-7 bg-own_primary-1 rounded-full -start-3 ring-white dark:ring-gray-900 text-dark-1">
                                    <ShareIcon />
                                </span>

                                <div className="flex flex-col">
                                    <h3 className="flex items-center gap-2 mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                                        Student response

                                        {
                                            Object.values(customers_statuses).map(({ key, name }) => {

                                                if (key == step.status) {
                                                    var variant = 'default'

                                                    if (key == 'accepted') {
                                                        variant = 'success'
                                                    } else if (key == 'refused') {
                                                        variant = 'error'
                                                    } else if (key == 'files_refused') {
                                                        variant = 'error'
                                                    } else if (key == 'in_process') {
                                                        variant = 'warning'
                                                    } else if (key == 'current') {
                                                        variant = 'default'
                                                    } else if (key == 'new_files') {
                                                        variant = 'default'
                                                    }


                                                    return <Badge key={key} variant={variant}>{name.en}</Badge>
                                                }
                                            })
                                        }
                                    </h3>
                                    <p className="text-sm text-text_color-1">These are the uploaded files from the customer</p>

                                </div>
                            </div>

                            {/* Data section */}
                            <div className="bg-dark-1 border-1 border-own_primary-1 p-2 rounded-xl flex flex-col gap-2">

                                {
                                    Object.keys(uploadedFiles).map((id) => {

                                        const what_to_do__key = id
                                        const { payload: files, status } = uploadedFiles[what_to_do__key]

                                        const this_step = thisStep
                                        const is_local_steps = this_step.isLocalSteps


                                        // console.log('files', files)


                                        // If the current step is step 2 
                                        if (this_step.key == 'step_2') {

                                            const name = universityDocuments.find(document => document.key == what_to_do__key).names.en

                                            return (

                                                <div className="flex flex-col gap-2" key={id}>
                                                    {
                                                        files.map((file, index) => {

                                                            return (
                                                                <FileBox key={what_to_do__key} status={status} admin_id={admin_id} customer_id={customer?._id} step_id={this_step.key} what_to_do__key={what_to_do__key} file={file} name={name} />
                                                            )
                                                        })
                                                    }
                                                </div>

                                            )

                                        }

                                        // If the current step is step 7
                                        else if (this_step.key == 'step_7') {

                                            const name = visaDocuments.find(document => document.key == what_to_do__key).names.en

                                            // console.log(name, files)
                                            return (

                                                <div className="flex flex-col gap-2" key={id}>
                                                    {
                                                        files.map((file, index) => {

                                                            // console.log(file)
                                                            return (
                                                                <FileBox key={what_to_do__key} status={status} admin_id={admin_id} customer_id={customer?._id} step_id={this_step.key} what_to_do__key={what_to_do__key} file={file} name={name} />

                                                            )
                                                        })
                                                    }
                                                </div>

                                            )

                                        }

                                        else {

                                            return (
                                                <div key={id} className="">

                                                    {
                                                        thisStep?.what_to_do.map(({ key, description, name }) => {

                                                            if (key == id) {

                                                                // console.log('hh', thisStep)

                                                                return (

                                                                    <div className="flex flex-col gap-2" key={key}>
                                                                        {
                                                                            files.map((file, index) => {
                                                                                return (
                                                                                    <FileBox key={what_to_do__key} status={status} admin_id={admin_id} customer_id={customer?._id} step_id={this_step.key} what_to_do__key={what_to_do__key} file={file} name={name.en} isPayload={false} />

                                                                                )
                                                                            })
                                                                        }
                                                                    </div>

                                                                )

                                                            }

                                                        })
                                                    }

                                                </div>
                                            )

                                        }
                                    })
                                }


                            </div>
                        </div>
                    }

                </li>

            </ol>



            {
                !uploadedFiles &&
                <div className="border-1 w-full p-2 rounded-xl flex items-center flex-col gap-3">
                    <EmptyFileIcon special_size={70} />
                    <p className="text-xl font-semibold">No data available</p>
                    <p>This student did not response yet.</p>
                    <Button className="flex items-center gap-2 border-1 border-red-500 border-opacity-25 text-red-500 bg-red-500 bg-opacity-0 hover:bg-opacity-5">
                        <ReminderIcon />
                        Notify client
                    </Button>
                </div>
            }


        </div >

    )
}







function FileBox({ name, file, status = 'pending', what_to_do__key, step_id, admin_id, customer_id, isPayload = true }) {


    const [isModalOpen, setIsModalOpen] = useState(false)
    const [comment, setComment] = useState('')
    const [isButtonLoading, setIsButtonLoading] = useState(false)

    var variant = 'default'
    var statusName = ''



    // console.log('file', file)


    Object.values(customers_statuses).map(({ key, name }) => {


        if (key == status) {
            if (key == 'accepted') {
                variant = 'success'
            } else if (key == 'refused') {
                variant = 'error'
            } else if (key == 'in_process') {
                variant = 'warning'
            } else if (key == 'current') {
                variant = 'default'
            } else if (key == 'new_files') {
                variant = 'default'
            }

            statusName = name.en
            // return <Badge key={key} variant={variant}>{name.en}</Badge>
        }
    })



    // async function refuseStep() {

    //     try {
    //         const response = await fetch(`${steps_api}/refuseSpecificFile`, {
    //             method: 'POST',
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({
    //                 admin_id,
    //                 customer_id,
    //                 step_id,
    //                 file_id: what_to_do__key,
    //             }),
    //             cache: 'no-cache',
    //             credentials: 'include'
    //         })

    //         const result = await response.json()

    //         createToast(result.msg, true)


    //     } catch (error) {
    //         console.log('error', error)
    //     }

    // }


    async function handleAcceptStep() {


        try {

            setIsButtonLoading(true)

            const response = await fetch(`${steps_api}/acceptSpecificFile`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    admin_id,
                    customer_id,
                    step_id,
                    file_id: what_to_do__key,
                }),
                cache: 'no-cache',
                credentials: 'include'
            })

            const result = await response.json()

            createToast(result.msg, true)


            setIsModalOpen(false)


        } catch (error) {
            console.log('error', error)
        } finally {
            setIsButtonLoading(false)
        }

    }



    async function handleRefuseStep() {



        if (comment) {

            try {

                setIsButtonLoading(true)

                const response = await fetch(`${steps_api}/refuseSpecificFile`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        admin_id,
                        customer_id,
                        step_id,
                        comment,
                        file_id: what_to_do__key,
                    }),
                    cache: 'no-cache',
                    credentials: 'include'
                })

                const result = await response.json()

                createToast(result.msg, true)


                setIsModalOpen(false)


            } catch (error) {
                console.log('error', error)
            } finally {
                setIsButtonLoading(false)
            }

        }


    }




    async function removeFile() {

        try {
            const response = await fetch(`${steps_api}/deleteSpecificFile`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    admin_id,
                    customer_id,
                    step_id,
                    file_id: what_to_do__key,
                }),
                cache: 'no-cache',
                credentials: 'include'
            })

            const result = await response.json()


            createToast(result.msg, true)

        } catch (error) {
            console.log('error', error)
        }

    }



    return (
        <div className="flex items-center justify-between p-2 border-1 rounded-xl bg-dark-2 ">
            <div className="flex items-center gap-3">

                <span className="p-2 rounded-lg border-1">
                    <FileIcon special_size={30} />
                </span>
                <span>
                    <div className="flex items-start gap-2">
                        <p className="text-sm  font-medium">{name}</p>
                        <Badge variant={variant}>{statusName}</Badge>
                    </div>
                    <span className="flex items-center gap-1">
                        <p className="text-[10px] flex items-center gap-1">
                            {file.extension.toUpperCase()}
                        </p>
                        <span className="h-1 w-1 rounded-full bg-dark-3" />
                        <p className="text-[10px] flex items-center gap-1">
                            {calculateFileSize(file.size)}
                        </p>
                    </span>

                </span>
            </div>

            <div className=" flex items-center gap-2">

                <Tooltip size="sm" delay={500} closeDelay={0} content="View file">
                    <Link href={`${app_images_routes.steps.step}/${file.name}`}
                        className="border-1 flex items-center gap-2 bg-transparent shadow-md text-light-1 p-2 text-sm rounded-xl"
                        download={true}
                        target="_blank"
                    >
                        <ViewFileIcon />
                    </Link>
                </Tooltip>


                <Tooltip size="sm" delay={500} closeDelay={0} content="Download file">
                    <div>
                        <DownloadButton
                            url={`${app_images_routes.steps.step}/${file.name}`}
                            fileName={file.name}
                            withText={false}
                        />
                    </div>
                </Tooltip>


                {/* If this file is payload of the customer  */}
                {
                    // isPayload &&

                    <Dropdown>
                        <DropdownTrigger>
                            <Button
                                className="min-w-0 h-fit w-fit p-0 bg-opacity-0 border-1"
                            >
                                <Tooltip size="sm" delay={500} closeDelay={0} content="Make action to file">
                                    <div
                                        className="p-2 flex items-center justify-center"
                                    >
                                        <Dots2Icon />
                                    </div>
                                </Tooltip>
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions">

                            <DropdownItem
                                startContent={<CheckCircle2 />}
                                className="text-green-600"
                                key="accepted"
                                onClick={() => handleAcceptStep(what_to_do__key)}
                            >
                                Accept file
                            </DropdownItem>


                            <DropdownItem
                                startContent={<CyrcleXMarkIcon />}
                                className="text-red-600"
                                key="refused"
                                onClick={() => setIsModalOpen(what_to_do__key)}
                            >
                                Refuse file
                            </DropdownItem>

                            <DropdownItem
                                startContent={<DeleteIcon />}
                                className="text-red-600"
                                key="remove"
                                onClick={() => removeFile(what_to_do__key)}
                            >
                                Delete file
                            </DropdownItem>

                        </DropdownMenu>
                    </Dropdown>
                }

            </div>





            {/* <Drawer open={isMessageModelOpen} className="outline-none" onOpenChange={setIsMessageModelOpen}> */}
            <Drawer open={isModalOpen} className="outline-none" onOpenChange={setIsModalOpen}>
                <DrawerContent >
                    <div className="mx-auto w-full max-w-sm">
                        <DrawerHeader>
                            <DrawerTitle>Refuse file with comment</DrawerTitle>
                            <DrawerDescription>Write the refuse reason to send it as a comment to your student</DrawerDescription>
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
                                isLoaderVisible={isButtonLoading}
                                onClick={handleRefuseStep}
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

        </div>
    )
}