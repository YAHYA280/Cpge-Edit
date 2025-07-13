"use client"

import { useEffect, useState } from "react"
import StepStatus from "./StepStatus"
import { calculateFileSize, checkIfFileDuplicated, downloadFile, formatNumber, getLanguageDetails } from "@/constants/functions"
import Particles from "@/components/magicui/particles"
import { ArrowWithoutLineIcon, CheckMarkCircleIcon, CyrcleXMarkIcon, DownloadFilelIcon, FileIcon, InProcessIcon, NormalXMarkIcon, QuestionCyrcleIcon, SendMessageIcon, StepAcceptedIcon, StepInProcessIcon, StepNotOpenedYetIcon, StepRefusedIcon, ViewFileIcon } from "@/constants/Icons";
import { Button, Tooltip } from "@nextui-org/react"
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";

import { cn } from "@/lib/utils"
import Link from "next/link"
import HtmlInput from "@/app/assets/smallComponents/HtmlInput"
import HtmlActionHandlerButton from "@/app/assets/smallComponents/HtmlActionHandlerButton"
import { useCookies } from "react-cookie"
import { app_images_routes } from "@/constants/routes"
import StepCommentStatus from "./StepCommentStatus"
import customers_steps from "@/constants/customers_steps"
import createToast from "@/app/assets/components/toast"
import axios from "axios"
import { admins_api, steps_api } from "@/constants/_api"
import { useLocale, useTranslations } from "next-intl"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, RadioGroup, Radio } from "@nextui-org/react";
import Image from "next/image"
import StepTitle from "./StepTitle"
import DownloadButton, { ViewLink } from "@/app/assets/components/DownloadButton"
import { getUniversityDocuments, getVisaDocuments } from "@/constants/get_data"
import { university_documents } from "@/constants/university_documents"
import TooltipButton from "@/app/assets/components/ClickableTooltip"
import { visa_documents } from "@/constants/visa_documents"

export default function Step({ customer, customer_step, allSubmittedSteps, index, customer_id, is_local_step }) {

    const t = useTranslations()
    const currentLanguage = getLanguageDetails(useLocale())
    const active_language = currentLanguage.key
    const active_dir = currentLanguage.direction



    const [opendedStepKey, setOpendedStepKey] = useState(false)
    const [activeTooltip, setActiveTooltip] = useState(null)
    // const [customer, setCustomer] = useState()
    const [universityDocuments, setUniversityDocuments] = useState()
    const [visaDocuments, setVisaDocuments] = useState()

    // const [allSubmittedSteps, setAllSubmittedSteps] = useState()
    // const [activeTooltip, setActiveTooltip] = useState(null)
    const [isSubmittedStepAlertOpen, setIsSubmittedStepAlertOpen] = useState(false)
    const [isHovering, setIsHovering] = useState(false)
    const [customerData, setCustomerData] = useCookies(['customer_data'])
    const [submittedStep, setSubmittedStep] = useState({})
    const [isButtonLoading, setIsButtonLoading] = useState(false)


    // console.log(submittedStep?.files)


    var key = customer_step.key
    var icon = customer_step.icon
    var step_id = ''
    var step_status = ''
    var step_refuse_comment = ''

    var step_name = customer_step.name[active_language]
    var step_description = customer_step.description[active_language]
    var step_what_to_do = customer_step?.what_to_do || null
    // var is_local_step = customer_step?.what_to_do || null
    var step_values = {}

    // Values 
    var step_download_values = ''
    var step_upload_values = ''
    var refused_files = {}
    var newest_files = {}
    var new_files = {}





    for (let i = 0; i < allSubmittedSteps.length; i++) {
        var step = allSubmittedSteps[i]

        if (step.key == key) {
            step_id = step.key
            step_status = step.status

            step_download_values = step?.download_values ? JSON.parse(step?.download_values) : []
            step_upload_values = step?.upload_values ? JSON.parse(step?.upload_values) : {}

            step_values = {
                download: step_download_values,
                upload: step_upload_values,
            }

            step_refuse_comment = step.refuse_comment



            // If step status is "refused_files"
            if (step_status == 'files_refused') {

                // Get refused files 
                Object.keys(step_upload_values).forEach(document => {
                    const value = step_upload_values[document]

                    // If the file status if "new", insert it, newest_files, object 
                    if (value.status == 'new') {
                        newest_files[document] = value
                    }

                    // If the file status if "refused", insert it, refused_files, object 
                    if (value.status == 'refused') {
                        refused_files[document] = value
                    }


                    new_files[document] = value

                })
            }




            // If step status is "new_files"
            if (step_status == 'new_files') {

                // console.log('step_upload_values', step_upload_values)
                // return
                // Get refused files 
                Object.keys(step_upload_values).forEach(document => {
                    const value = step_upload_values[document]

                    // If the file status if "new", insert it, newest_files, object 
                    if (value.status == 'new') {
                        newest_files[document] = value
                    }


                    // If the file status if "refused", insert it, refused_files, object 
                    if (value.status == 'refused') {
                        refused_files[document] = value
                    }


                    new_files[document] = value


                })
            }



            // console.log('newest_files', newest_files)
            // console.log('refused_files', refused_files)
        }
    }




    // Get university documents 
    useEffect(() => {

        async function getDocuments() {

            try {
                const documents = await getUniversityDocuments()


                if (documents.err) {
                    createToast(documents.msg, true)
                } else {

                    var allUniversityDocuments = []
                    // const default_university_documents = []


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



    // Functions 
    function handleOpenCloseStepConstainer(key) {
        if (opendedStepKey == key) {
            setOpendedStepKey(null)
        } else {
            setOpendedStepKey(key)
        }
    }



    // Get the uploaded fiels 
    function setStepFile(files, what_to_do__key, step_id, isMultiple) {

        console.log('step_id', step_id, 'files', files)


        var validFiles = {}
        // If there is submitted files in the state 
        if (submittedStep?.files) {
            validFiles = checkIfFileDuplicated(files, submittedStep?.files).valid_data
        }

        // The object that contains the uploaded files on the specific what_to_do__key 
        const files_and_what_to_do_obj = {
            files,
            what_to_do__key
        }


        // Check if submittedStep state already has this step_id 
        var data_to_insert = submittedStep || {}

        if (!data_to_insert?.step_id) { // If it hasn't this step_id

            data_to_insert.step_id = step_id
            data_to_insert.files = [files_and_what_to_do_obj]

        }

        else {

            // Check if the the submitted what_to_do_key is already exist
            const isWhatToDoKeyAlreadySubmitted = data_to_insert.files.some(file => file.what_to_do__key == what_to_do__key)


            if (isWhatToDoKeyAlreadySubmitted) { // If exist
                // All existing files
                var existing_files = data_to_insert.files


                // Remove this object that contains the files, and what_to_do_key 

                const new_array_after_deleting_this_what_to_do_value = existing_files.filter(obj => obj.what_to_do__key != what_to_do__key)

                // console.log(`The object with th what_to_do_key ${what_to_do__key} has been deleted from the array, and been replaced with another.`)

                var this_step_existing_files = [...new_array_after_deleting_this_what_to_do_value, files_and_what_to_do_obj]

                // Insert the old and the newest files in the main object 
                data_to_insert.files = this_step_existing_files


            } else {

                // Get the submitted files of this step 
                var this_step_existing_files = data_to_insert.files

                this_step_existing_files = [...this_step_existing_files, files_and_what_to_do_obj]


                // Insert the old and the newest files in the main object 
                data_to_insert.files = this_step_existing_files

            }


        }

        // Insert the step object with the old and the newest data
        setSubmittedStep(data_to_insert)
    }



    async function handleSubmitStep(step_id, customer_id) {
        // ########## The main status of the step 
        var isValid = false

        var step_files = submittedStep.files || []

        // console.log('step_id', step_id)
        // console.log('customer_id', customer_id)
        console.log('submittedStep', submittedStep)



        return


        if (step_status == 'pending' || step_status == 'current' || step_status == 'refused') {

            if (step_id == 'step_2') { // Is the current step is university documents step

                // Get the count of university documents 
                const university_documents_length = JSON.parse(customer.required_university_documents).length
                const submittedStep_length = submittedStep?.files?.length || 0


                // Check if the length of the university document is the same as the submitted step files length
                isValid = university_documents_length == submittedStep_length


                // console.log('university_documents_length', university_documents_length)
                // console.log('submittedStep_length', submittedStep_length)
                // console.log('isValid', isValid)

            } else if (step_id == 'step_7') { // Is the current step is visa documents step

                // Get the count of visa documents 
                const visa_documents_length = JSON.parse(customer.visa_documents).length
                const submittedStep_length = submittedStep?.files?.length || 0


                // Check if the length of the visa document is the same as the submitted step files length
                isValid = visa_documents_length == submittedStep_length

            }
            else { // All other steps

                // Get the current step what_to_do steps length
                const current_step_download_what_to_do_length = customer_step?.what_to_do?.filter(obj => obj.actionType == "upload-file").length
                const submittedStep_length = submittedStep?.files?.length || 0


                // Check if the submitted step, is exists, and all required files are uploaded by the user, and check the length if it is the same
                isValid = current_step_download_what_to_do_length == submittedStep_length

            }

        } else if (step_status == 'files_refused') {
            // Get this step required files 
            const this_required_files_keys = Object.keys(refused_files)


            // Check if all required files are uploaded  
            const allExist = this_required_files_keys.every(str =>
                step_files.some(obj => obj.what_to_do__key === str)
            )

            // Change tha value of isValid depending on the value of allExist 
            isValid = allExist

        } else if (step_status == 'new_files') {
            // Get this step required files 
            const this_required_files_keys = Object.keys(newest_files)


            // Check if all required files are uploaded  
            const allExist = this_required_files_keys.every(str =>
                step_files.some(obj => obj.what_to_do__key === str)
            )

            // Change tha value of isValid depending on the value of allExist 
            isValid = allExist

        }


        // console.log('isValid', isValid)
        // console.log('step_files', step_files)
        // console.log('step_status', step_status)



        if (!isValid) {
            // createToast({ msg: 'Please upload all the requested steps', status: 'error' })
            createToast([t(`accountDetailsPage.backend_errors.files_are_missing.title`), t(`accountDetailsPage.backend_errors.files_are_missing.description`)], true)

        } else {

            // console.log('step_id', step_id)
            // console.log('customer_id', customer_id)
            // console.log('submittedStep', submittedStep)


            // const submitted_step_files = submittedStep.files
            const submitted_step_files = step_files


            // console.log('submitted_step_files', submitted_step_files)

            // return

            const formData = new FormData()


            // Loop submittedStep to and append them into formData
            for (let i = 0; i < submitted_step_files.length; i++) {
                const step = submitted_step_files[i]

                const what_to_do__key = step.what_to_do__key

                const files = step.files.map(file => file.file)


                for (let a = 0; a < files.length; a++) {
                    const file = files[a]

                    // console.log(what_to_do__key, file)
                    formData.append(what_to_do__key, file)

                }


            }

            formData.append('step_id', step_id)
            formData.append('customer_id', customer_id)




            // // Using for...of
            // for (const [key, value] of formData.entries()) {
            //     console.log(`${key}: ${value}`);
            // }


            try {
                setIsButtonLoading(true)

                const config = { headers: { 'Content-Type': 'multipart/form-data' } }
                const response = await axios.post(`${steps_api}/analyseStep`, formData, config)
                const result = response.data


                // console.log(result)

                if (result.err) {

                    // createToast(result.msg, true)
                    createToast([t(`accountDetailsPage.backend_errors.${result.msg}.title`), t(`accountDetailsPage.backend_errors.${result.msg}.description`)], true)

                } else {
                    setIsSubmittedStepAlertOpen(true)

                    // Empty the submittedSteps state 
                    setSubmittedStep({})
                }



            } catch (error) {
                console.log('error', error)
                createToast([t(`accountDetailsPage.backend_errors.something_went_wrong.title`), t(`accountDetailsPage.backend_errors.something_went_wrong.description`)], true)

            } finally {
                setIsButtonLoading(false)
            }
        }

    }



    // console.log('step_what_to_do', step_what_to_do)



    return (
        <div key={key} className="flex flex-col gap-4">

            <div className="flex gap-2 relative">
                <p className="bg-light-1 dark:bg-dark-3 h-[30px] w-[30px] rounded-full flex items-center justify-center mt-2 text-xs">
                    {formatNumber(index)}
                </p>


                {/* This is for the status of the step  */}
                <StepStatus status={step_status} />


                <div className={cn(`overflow-hidden rounded-xl bg-light-1 dark:bg-dark-1 border-1 flex-1 relative`, {
                    'border-own_primary-1 border-opacity-45': opendedStepKey == key && (step_status != 'in_process' && step_status != 'accepted' && step_status != 'pending' && step_status != 'current'),
                    'opacity-85': !step_id,
                    'bg-[url("/backgrounds/step-visa-background.avif")] bg-no-repeat bg-center bg-cover': key == 'step_8',
                })}>


                    {/* This is the step 7 */}
                    {
                        key == 'step_8' &&
                        <div className=" w-full h-full absolute left-0 top-0">
                            <Particles
                                className="absolute inset-0"
                                quantity={100}
                                ease={80}
                                refresh
                            />
                        </div>
                    }




                    {/* The header of the step  */}
                    <div
                        onClick={() => {
                            if (step_id) {
                                handleOpenCloseStepConstainer(key)
                            }
                        }
                        }
                        className={cn(`border-b-small border-transparent p-3 py-2 flex justify-between items-center cursor-pointer`, {
                            'border-default-100 border-b-small': opendedStepKey == key || step_status == 'pending' || step_status == 'current',
                        })}
                    >
                        <div className="flex items-center gap-3">
                            <StepTitle index={index} step_id={step_id} step_status={step_status} />


                            <div className="text-sm flex-1 flex items-center gap-1">
                                <p className={cn('', {
                                    "text-light-1": key == 'step_8'
                                })}>{step_name}</p>

                                <div className="flex gap-2">

                                    <TooltipButton
                                        tooltipValue={step_description}
                                    >
                                        <Button
                                            className="flex justify-center items-center bg-transparent cursor-pointer min-w-0 p-0 text-own_primary-1"
                                        >
                                            <QuestionCyrcleIcon />
                                        </Button>
                                    </TooltipButton>

                                </div>


                                {/* Check if step 6, and it is accepted => Admession letter  */}
                                {
                                    step_id == 'step_6' && step_status == 'accepted' &&
                                    <DownloadButton
                                        url={`${app_images_routes.admissionLetters}/${step_values?.download[0]?.files[0]?.name}`}
                                        fileName={step_values?.download[0]?.files[0]?.name}
                                        className="flex-1 md:flex-none bg-green-700"
                                        text={t('global.download')}
                                        textClassName="hidden sm:flex"
                                    />
                                }



                                {/* Check if step 8, and it is accepted => Visa decision  */}
                                {
                                    step_id == 'step_8' && step_status == 'accepted' &&
                                    <DownloadButton
                                        url={`${app_images_routes.visa}/${step_values?.download[0]?.files[0]?.name}`}
                                        fileName={step_values?.download[0]?.files[0]?.name}
                                        className="flex-1 md:flex-none bg-green-700"
                                        text={t('global.download')}
                                        textClassName="hidden sm:flex"
                                    />
                                }
                            </div>

                        </div>


                        <div className={cn('w-[25px] h-[25px] -rotate-90 transition-all ml-2', {
                            'rotate-0': opendedStepKey == key && (step_status != 'pending' && step_status != 'accepted' && step_status != 'in_process' && step_status != 'current')
                        })}>
                            <ArrowWithoutLineIcon />
                        </div>
                    </div>




                    {/* The content of the step  */}
                    <div className={cn(`max-h-0 transition-all`, {
                        'max-h-[1200vh]': (opendedStepKey == key && step_status != 'accepted' && step_status != 'in_process' && step_status != 'queued') || step_status == 'pending' || step_status == 'refused' || step_status == 'files_refused' || step_status == 'new_files' || step_status == 'current',
                    })}>

                        <div className="p-3 flex justify-between sm:gap-10">

                            <div className="flex flex-col gap-3 overflow-hidden h-0 max-w-0 sm:max-w-[25%] sm:h-fit">
                                {icon}
                                <p className="text-xs text-text_color-1">{step_description}</p>
                            </div>




                            <div className="flex-1 flex flex-col gap-5">


                                {/* If this step has local steps, and they not coming from database   */}
                                {
                                    step_what_to_do &&
                                    <div className="flex flex-col gap-4">
                                        {
                                            step_what_to_do.map(({ key, description, name, actionType }) => {

                                                if (step_id) {

                                                    const all_what_to_download = step_values?.download
                                                    const all_what_to_upload = step_values?.upload

                                                    // console.log(all_what_to_download, all_what_to_upload)
                                                    // console.log('step_id', step_id)

                                                    return (
                                                        <div key={key} className="flex flex-col gap-3">
                                                            <div className="flex items-center gap-2">
                                                                <p className="h-[20px] w-[20px] rounded-full bg-dark-3 flex justify-center items-center text-xs">{key}</p>
                                                                <p className="text-sm">{name[active_language]}</p>
                                                            </div>

                                                            <div>

                                                                {
                                                                    actionType == 'upload-file' &&
                                                                    <div className="flex flex-col gap-5">

                                                                        {/* If this step is already accepted, then show all uploaded data  */}

                                                                        {
                                                                            step_status != 'accepted' &&
                                                                            <>
                                                                                <HtmlInput
                                                                                    type="customized_file"
                                                                                    placeholder={{ placeholder: '', icon: '', isMultiple: true }}
                                                                                    onChange={(files) => setStepFile(files, key, step_id, true)}
                                                                                />
                                                                            </>
                                                                        }
                                                                    </div>
                                                                }



                                                                {/* If there is any files to download first  */}
                                                                {
                                                                    (actionType == 'download-file' && step_id) &&
                                                                    all_what_to_download.map(({ files, type }, index) => {




                                                                        return (
                                                                            <div className="flex flex-col" key={index}>
                                                                                {
                                                                                    files.map((file, index) => {

                                                                                        var download_path = ''
                                                                                        if (type == "contract") {
                                                                                            download_path = `${app_images_routes.steps.contracts}/${file.name}`
                                                                                        } else if (type == "pre_admission") {
                                                                                            download_path = `${app_images_routes.preAdmissionLetter}/${file.name}`
                                                                                        }

                                                                                        return (
                                                                                            <div key={index + 1} className="flex justify-between flex-col md:flex-row md:items-center gap-2 p-2 border-1 rounded-xl bg-dark-2 ">
                                                                                                <div className="flex flex-1 items-center gap-3">

                                                                                                    <span className="p-2 rounded-lg border-1">
                                                                                                        <FileIcon special_size={30} />
                                                                                                    </span>
                                                                                                    <span>
                                                                                                        <p className="text-sm sm:text-base font-medium">{name[active_language]}</p>
                                                                                                        <span className="flex items-center gap-1">
                                                                                                            <p className="text-xs sm:text-sm flex items-center gap-1">
                                                                                                                {file.extension.toUpperCase()}
                                                                                                            </p>
                                                                                                            <span className="h-1 w-1 rounded-full bg-dark-3" />
                                                                                                            <p className="text-xs sm:text-sm flex items-center gap-1">
                                                                                                                {calculateFileSize(file.size)}
                                                                                                            </p>
                                                                                                        </span>

                                                                                                    </span>
                                                                                                </div>


                                                                                                <div className="flex items-center gap-1">
                                                                                                    <DownloadButton
                                                                                                        url={download_path}
                                                                                                        fileName={file.name}
                                                                                                        className="flex-1 md:flex-none bg-yellow-600"
                                                                                                        text={t('global.download')}
                                                                                                    />

                                                                                                    <ViewLink
                                                                                                        url={download_path}
                                                                                                        className="flex-1 md:flex-none"
                                                                                                        text={t('global.file.view')}
                                                                                                    />
                                                                                                </div>


                                                                                            </div>
                                                                                        )
                                                                                    })
                                                                                }

                                                                            </div>
                                                                        )
                                                                    })
                                                                }

                                                            </div>

                                                        </div>

                                                    )

                                                }
                                            })
                                        }

                                    </div>
                                }





                                {/* If this is step 2 */}
                                {
                                    step_id == 'step_2' && (step_status == 'current' || step_status == 'pending' || step_status == 'refused') && universityDocuments && customer &&
                                    <div className=" flex flex-col gap-2">
                                        {
                                            JSON.parse(customer.required_university_documents).map((document, index) => {

                                                const this_document = universityDocuments.find(doc => doc.key == document)


                                                // Check if the current step_id and uploaded files key, is the same as this upload file area
                                                const isTheCurrentStepSubmitted = submittedStep?.step_id == 'step_2' && submittedStep?.files.find(step => step.what_to_do__key == document) != undefined


                                                return (
                                                    <div key={document} className="flex flex-col gap-2">
                                                        <div className="flex items-center gap-2">
                                                            <p className="h-[20px] w-[20px] rounded-full bg-own_primary-1 text-dark-1 font-bold flex justify-center items-center text-xs">{index + 1}</p>
                                                            <p className="text-sm">{this_document.names[active_language]}</p>
                                                        </div>


                                                        <HtmlInput
                                                            type="customized_file"
                                                            placeholder={{ placeholder: '', icon: '' }}
                                                            onChange={(files) => setStepFile(files, document, step_id, true)}
                                                            className={cn('', {
                                                                'border-green-600': isTheCurrentStepSubmitted
                                                            })}
                                                        />


                                                        {
                                                            (submittedStep?.files && submittedStep?.files.length > 0) &&

                                                            <div className="w-full flex flex-col gap-2 rounded-xl">
                                                                {
                                                                    submittedStep.files.map(({ files, what_to_do__key }, index) => {
                                                                        const file = files[0]

                                                                        if (what_to_do__key == this_document.key) {
                                                                            return <UploadedFile
                                                                                step_id={step_id}
                                                                                submittedStep={submittedStep}
                                                                                setSubmittedStep={setSubmittedStep}
                                                                                what_to_do__key={what_to_do__key}
                                                                                key={index}
                                                                                file={file}
                                                                                t={t}
                                                                            />
                                                                        }
                                                                    })
                                                                }
                                                            </div>
                                                        }

                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                }




                                {/* This is the UI of the step 7  */}
                                {
                                    step_id == 'step_7' && (step_status == 'current' || step_status == 'pending' || step_status == 'refused') && visaDocuments && customer &&
                                    <div className=" flex flex-col gap-2">
                                        {
                                            JSON.parse(customer.visa_documents).map((document, index) => {

                                                const this_document = visaDocuments.find(doc => doc.key == document)

                                                // Check if the current step_id and uploaded files key, is the same as this upload file area
                                                const isTheCurrentStepSubmitted = submittedStep?.step_id == 'step_7' && submittedStep?.files.find(step => step.what_to_do__key == document) != undefined

                                                const all_what_to_download = step_values?.download
                                                const all_what_to_upload = step_values?.upload

                                                const this_what_to_download = all_what_to_upload[document]

                                                return (
                                                    <div key={document} className="flex flex-col gap-2">
                                                        <div className="flex items-center gap-2">
                                                            <p className="h-[20px] w-[20px] rounded-full bg-own_primary-1 text-dark-1 font-bold flex justify-center items-center text-xs">{index + 1}</p>
                                                            <p className="text-sm">{this_document.names[active_language]}</p>
                                                        </div>


                                                        <div className="flex flex-col gap-1">
                                                            <HtmlInput
                                                                type="customized_file"
                                                                placeholder={{ placeholder: '', icon: '' }}
                                                                onChange={(files) => setStepFile(files, document, step_id, true)}
                                                                className={cn('', {
                                                                    'border-green-600': isTheCurrentStepSubmitted
                                                                })}
                                                            />

                                                            {
                                                                step_status == 'refused' && this_what_to_download.status == 'refused' &&
                                                                <p className="text-red-500">{t('steps_area.the_uploaded_file_is_incorrect_please_try_to_upload_another_one')}</p>
                                                            }
                                                        </div>



                                                        {
                                                            (submittedStep?.files && submittedStep?.files.length > 0) &&

                                                            <div className="w-full flex flex-col gap-2 rounded-xl">
                                                                {
                                                                    submittedStep.files.map(({ files, what_to_do__key }, index) => {
                                                                        const file = files[0]

                                                                        if (what_to_do__key == this_document.key) {
                                                                            return <UploadedFile
                                                                                step_id={step_id}
                                                                                submittedStep={submittedStep}
                                                                                setSubmittedStep={setSubmittedStep}
                                                                                what_to_do__key={what_to_do__key}
                                                                                key={index}
                                                                                file={file}
                                                                                t={t}
                                                                            />
                                                                        }
                                                                    })
                                                                }
                                                            </div>
                                                        }

                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                }



                                {/* If there is refused files for step 7  */}
                                {
                                    step_id == 'step_7' && step_status == 'files_refused' && visaDocuments && customer &&
                                    <div className=" flex flex-col gap-2">
                                        {
                                            Object.keys(refused_files).map((document, index) => {

                                                const document_key = document
                                                const document_value = refused_files[document]


                                                const this_document = visaDocuments.find(doc => doc.key == document)

                                                // Check if the current step_id and uploaded files key, is the same as this upload file area
                                                const isTheCurrentStepSubmitted = submittedStep?.step_id == 'step_7' && submittedStep?.files.find(step => step.what_to_do__key == document) != undefined

                                                // const all_what_to_download = step_values?.download
                                                const all_what_to_upload = refused_files

                                                const this_what_to_download = all_what_to_upload[document]

                                                return (
                                                    <div key={document} className="flex flex-col gap-2">
                                                        <div className="flex items-center gap-2">
                                                            <p className="h-[20px] w-[20px] rounded-full bg-own_primary-1 text-dark-1 font-bold flex justify-center items-center text-xs">{index + 1}</p>
                                                            <p className="text-sm">{this_document.names[active_language]}</p>
                                                        </div>

                                                        <div className="flex flex-col gap-1">
                                                            <HtmlInput
                                                                type="customized_file"
                                                                placeholder={{ placeholder: '', icon: '' }}
                                                                onChange={(files) => setStepFile(files, document, step_id, true)}
                                                                className={cn('', {
                                                                    'border-green-600': isTheCurrentStepSubmitted
                                                                })}
                                                            />

                                                            <p className="text-red-500">{t('steps_area.the_uploaded_file_is_incorrect_please_try_to_upload_another_one')}</p>
                                                        </div>


                                                        {
                                                            (submittedStep?.files && submittedStep?.files.length > 0) &&

                                                            <div className="w-full flex flex-col gap-2 rounded-xl">
                                                                {
                                                                    submittedStep.files.map(({ files, what_to_do__key }, index) => {
                                                                        const file = files[0]

                                                                        if (what_to_do__key == this_document.key) {
                                                                            return <UploadedFile
                                                                                step_id={step_id}
                                                                                submittedStep={submittedStep}
                                                                                setSubmittedStep={setSubmittedStep}
                                                                                what_to_do__key={what_to_do__key}
                                                                                key={index}
                                                                                file={file}
                                                                                t={t}
                                                                            />
                                                                        }
                                                                    })
                                                                }
                                                            </div>
                                                        }

                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                }





                                {/* If there is new files for step 7  */}
                                {
                                    step_id == 'step_7' && step_status == 'new_files' && visaDocuments && customer &&
                                    <div className=" flex flex-col gap-2">
                                        {
                                            Object.keys(new_files).map((document, index) => {

                                                const document_key = document
                                                const document_value = new_files[document]


                                                // console.log('new_files', new_files)


                                                const this_document = visaDocuments.find(doc => doc.key == document)

                                                // Check if the current step_id and uploaded files key, is the same as this upload file area
                                                const isTheCurrentStepSubmitted = submittedStep?.step_id == 'step_7' && submittedStep?.files.find(step => step.what_to_do__key == document) != undefined

                                                // const all_what_to_download = step_values?.download
                                                const all_what_to_upload = new_files

                                                const this_what_downloaded = all_what_to_upload[document]


                                                // console.log('this_what_to_download', this_what_to_download)


                                                return (
                                                    <div key={document} className="flex flex-col gap-2">
                                                        <div className="flex items-center gap-2">
                                                            <p className="h-[20px] w-[20px] rounded-full bg-own_primary-1 text-dark-1 font-bold flex justify-center items-center text-xs">{index + 1}</p>
                                                            <p className="text-sm">{this_document.names[active_language]}</p>
                                                        </div>

                                                        <div className="flex flex-col gap-1">
                                                            <HtmlInput
                                                                type="customized_file"
                                                                placeholder={{ placeholder: '', icon: '' }}
                                                                onChange={(files) => setStepFile(files, document, step_id, true)}
                                                                className={cn('', {
                                                                    'border-green-600': isTheCurrentStepSubmitted
                                                                })}
                                                            />


                                                            {
                                                                this_what_downloaded.status == 'refused' &&
                                                                <p className="text-red-500">{t('steps_area.the_uploaded_file_is_incorrect_please_try_to_upload_another_one')}</p>
                                                            }

                                                        </div>


                                                        {
                                                            (submittedStep?.files && submittedStep?.files.length > 0) &&

                                                            <div className="w-full flex flex-col gap-2 rounded-xl">
                                                                {
                                                                    submittedStep.files.map(({ files, what_to_do__key }, index) => {
                                                                        const file = files[0]

                                                                        if (what_to_do__key == this_document.key) {
                                                                            return <UploadedFile
                                                                                step_id={step_id}
                                                                                submittedStep={submittedStep}
                                                                                setSubmittedStep={setSubmittedStep}
                                                                                what_to_do__key={what_to_do__key}
                                                                                key={index}
                                                                                file={file}
                                                                                t={t}
                                                                            />
                                                                        }
                                                                    })
                                                                }
                                                            </div>
                                                        }

                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                }





                                {/* These are the uploaded files  */}
                                {
                                    (submittedStep?.files && submittedStep?.files.length > 0) && step_id != 'step_2' && step_id != 'step_7' &&
                                    <div className="w-full flex flex-col gap-2 rounded-xl">
                                        {
                                            submittedStep.files.map(({ files, what_to_do__key }) => {

                                                return (
                                                    <div key={what_to_do__key} className="flex flex-col gap-2">
                                                        {
                                                            // files.map(({ fileName, size, extension }, index) => {
                                                            files.map((file, index) => {

                                                                // console.log('file', file, what_to_do__key)

                                                                return <UploadedFile
                                                                    step_id={step_id}
                                                                    submittedStep={submittedStep}
                                                                    setSubmittedStep={setSubmittedStep}
                                                                    what_to_do__key={what_to_do__key}
                                                                    key={index}
                                                                    file={file}
                                                                    t={t}
                                                                />


                                                                return (
                                                                    <div key={index} className="flex items-center justify-between w-full py-3 border-t-light-2 dark:bg-dark-2 px-2 rounded-xl">
                                                                        <div className="flex items-center gap-3">
                                                                            <span className="p-2 rounded-lg border-1">
                                                                                <FileIcon special_size={25} />
                                                                            </span>
                                                                            <span className=" max-w-[100px] sm:max-w-[200px] lg:max-w-[500px]">
                                                                                <p className="text-base font-medium  truncate">{fileName}</p>
                                                                                <span className="flex items-center gap-1">
                                                                                    <p className="text-sm flex items-center gap-1">
                                                                                        {extension}
                                                                                    </p>
                                                                                    <span className="h-1 w-1 rounded-full bg-dark-3" />
                                                                                    <p className="text-sm flex items-center gap-1">
                                                                                        {size}
                                                                                    </p>
                                                                                </span>

                                                                            </span>
                                                                        </div>

                                                                        <div className="w-fit flex items-center justify-center gap-2">
                                                                            <Tooltip size="sm" showArrow delay={1000} content={t('global.file.view_file')}>
                                                                                <Button
                                                                                    className="min-w-0 p-0 h-[30px] w-[30px] bg-transparent border-1"
                                                                                >
                                                                                    <ViewFileIcon />
                                                                                </Button>
                                                                            </Tooltip>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })

                                                        }
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                }





                                {/* This is the submit button  */}
                                <HtmlActionHandlerButton
                                    icon={<SendMessageIcon />}
                                    text={t('steps_area.submit_step_button')}
                                    onClick={() => handleSubmitStep(step_id, customer_id)}
                                    isLoaderVisible={isButtonLoading}
                                />




                                {/* Success submitted step alert */}
                                <Modal
                                    isOpen={isSubmittedStepAlertOpen}
                                    onOpenChange={setIsSubmittedStepAlertOpen}
                                    scrollBehavior={'inside'}
                                    backdrop={'blur'}
                                >
                                    <ModalContent dir={active_dir}>
                                        <>
                                            <ModalBody>

                                                <div className="flex flex-col justify-center items-center gap-5">
                                                    <Image
                                                        src={'/illustrations/submitted-step.webp'}
                                                        height={200}
                                                        width={200}
                                                        alt="Submitted step image"
                                                    />

                                                    <p className="text-center">
                                                        {t('steps_area.submitted_step_success_message')}
                                                    </p>
                                                </div>
                                            </ModalBody>
                                            <ModalFooter>
                                                <div className="w-full" >
                                                    <Button
                                                        className="w-full bg-own_primary-1 text-dark-1 font-semibold flex items-center justify-center"
                                                        onClick={() => setIsSubmittedStepAlertOpen(false)}
                                                    >
                                                        <CheckMarkCircleIcon />
                                                        {t('global.ok')}
                                                    </Button>
                                                </div>
                                            </ModalFooter>
                                        </>
                                    </ModalContent>
                                </Modal>

                            </div>


                        </div>

                    </div>


                </div >

            </div >

            {
                (step_status == 'pending' || step_status == 'in_process' || step_status == 'refused' || step_status == 'queued') &&
                <StepCommentStatus status={step_status} specialText={step_refuse_comment} />
            }
        </div >
    )
}






function UploadedFile({ file, t, what_to_do__key, step_id, submittedStep, setSubmittedStep }) {


    const size = calculateFileSize(file?.size || 0)




    // Remove this file 
    function handleRemoveFile() {

        // Get all other files except this one 
        const other_files = submittedStep?.files?.filter(step => step.what_to_do__key != what_to_do__key)

        // Get this file 
        const this_file = submittedStep?.files?.find(step => step.what_to_do__key = what_to_do__key)

        setSubmittedStep({ step_id, files: other_files })
    }



    // // Show the uploaded file 
    // function handleShowFile() {


    //     // console.log('hdhdhdh')
    //     // return


    //     // Get this file 
    //     const this_file = submittedStep?.files?.find(step => step.what_to_do__key = what_to_do__key)

    //     const file = this_file?.files?.[0]?.file


    //     console.log(file)


    //     return

    //     if (file) {
    //         // Create an object URL for the file
    //         const objectURL = window.URL.createObjectURL(file);


    //         // Open the file in a new window
    //         const newWindow = window.open(objectURL);

    //         // Release the object URL after the new window has loaded
    //         newWindow.onload = () => {
    //             URL.revokeObjectURL(objectURL);
    //         };
    //     }

    // }


    return (
        <div className="flex items-center justify-between w-full py-3 border border-opacity-50 border-own_primary-1 dark:bg-dark-2 px-2 rounded-xl">
            <div className="flex items-center gap-3">
                <span className="p-2 rounded-lg border-1">
                    <FileIcon special_size={25} />
                </span>
                <span className=" max-w-[100px] sm:max-w-[200px] lg:max-w-[500px]">
                    <p className="text-base font-medium  truncate">{file?.fileName}</p>
                    <span className="flex items-center gap-1">
                        <p className="text-sm flex items-center gap-1">
                            {file?.extension}
                        </p>
                        <span className="h-1 w-1 rounded-full bg-dark-3" />
                        <p className="text-sm flex items-center gap-1">
                            {size}
                        </p>
                    </span>

                </span>
            </div>

            <div className="w-fit flex items-center justify-center gap-2">
                {/* <Tooltip size="sm" showArrow delay={1000} content={t('global.file.view_file')}>
                    <Button
                        className="min-w-0 p-0 h-[30px] w-[30px] bg-transparent border-1"
                        onClick={() => handleShowFile()}
                    >
                        <ViewFileIcon />
                    </Button>
                </Tooltip> */}


                <Tooltip size="sm" showArrow delay={1000} content={t('global.file.remove_file')}>
                    <Button
                        className="min-w-0 p-0 h-[30px] w-[30px] bg-transparent border-1"
                        onClick={() => handleRemoveFile()}
                    >
                        <StepRefusedIcon />
                    </Button>
                </Tooltip>

            </div>
        </div>
    )
}