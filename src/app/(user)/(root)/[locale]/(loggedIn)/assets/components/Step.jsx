"use client"

import { useEffect, useRef, useState } from "react"
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
import { Download } from "lucide-react"

export default function Step({ customer, customer_step, allSubmittedSteps, index, customer_id, is_local_step, step_key }) {

    const t = useTranslations()
    const currentLanguage = getLanguageDetails(useLocale())
    const active_language = currentLanguage.key
    const active_dir = currentLanguage.direction


    // File input ref 
    const stepFileRef = useRef([])


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
    var all_steps_statuses = {}
    var step_refuse_comment = ''

    var step_name = customer_step.name[active_language]
    var step_description = customer_step.description[active_language]



    // Customer university documents 
    const customer_university_documents = customer.required_university_documents ? JSON.parse(customer.required_university_documents) : []
    // Customer visa documents 
    const customer_visa_documents = customer.visa_documents ? JSON.parse(customer.visa_documents) : []






    // var step_what_to_do = customer_step?.what_to_do || null

    var step_what_to_download = customer_step?.what_to_download || null
    var step_what_to_upload = customer_step?.what_to_upload || null
    // var is_local_step = customer_step?.what_to_do || null
    var step_values = {}

    // Values 

    // If this step is already submitted, then this step would be filled 
    var step_download_values = ''
    var step_upload_values = ''


    var refused_files = {}
    var newest_files = {}
    var new_files = {}


    // These are the static files or steps to do
    var what_to_upload = null
    var what_to_download = null

    // console.log('what_to_download', what_to_download)

    // If this step is already submitted, then this step would be filled 
    // var uploaded_files = null
    // var downloaded_files = null


    // console.log('allSubmittedSteps', allSubmittedSteps)
    // console.log('step_what_to_upload', step_what_to_upload)



    for (let i = 0; i < allSubmittedSteps.length; i++) {

        var step = allSubmittedSteps[i]

        // console.log('step', step)


        // Add step status to the all steps object 
        // all_steps_statuses.push({
        //     key: step.key,
        //     status: step.status
        // })
        all_steps_statuses[step.key] = step.status

        // console.log('step', step)
        // console.log('key', key)

        // If the current step is is the same as this one 
        if (step.key == key && (step.status == "current" || step.status == "pending" || step.status == "in_process" || step.status == "new_files" || step.status == "refused" || step.status == "files_refused")) {

            // console.log(step.key, key)
            // console.log("step", step)


            // Check if this step has local steps 
            if (is_local_step) {


                // Check if step is step 4
                if (step.key == "step_1" || step.key == "step_3" || step.key == "step_4") {

                    // Insert all what to download files 
                    what_to_download = JSON.parse(step.download_values)


                    // Insert all what to upload files 
                    what_to_upload = step_what_to_upload


                    // console.log('what_to_download', what_to_download)
                    // console.log('what_to_upload', what_to_upload)


                } else {


                    // console.log(step.key, key)


                    // Insert all what to upload files 
                    what_to_upload = step_what_to_upload

                    // console.log('step_what_to_upload', step_what_to_upload)
                    // what_to_upload.files = step.upload_values

                    // Insert all what to download files 
                    what_to_download = step_what_to_download
                    // what_to_download.files = JSON.parse(step.download_values)

                    // console.log('step_what_to_download', step_what_to_download)



                    // console.log('what_to_upload + key', what_to_upload, key)
                    // console.log('what_to_download', what_to_download)
                    // console.log('step', step)




                }





            } else {

                // Check step id 


                // If this step is step 2
                if (key == "step_2") {

                    const required_university_documents = []


                    if (customer_university_documents && customer_university_documents.length != 0) {

                        customer_university_documents.filter(key => {

                            // const data = (universityDocuments && universityDocuments.length != 0) && universityDocuments.find(obj => obj.key == key)


                            if (universityDocuments && universityDocuments.length != 0) {

                                const data = universityDocuments.find(obj => obj.key == key)

                                required_university_documents.push(data)

                            }


                            // console.log('data', data)

                            // Push this data into the main array 
                            // required_university_documents.push(data)

                        });
                    }



                    // console.log('required_university_documents', required_university_documents)




                    // Insert all what to upload files 
                    what_to_upload = required_university_documents

                    // console.log('what_to_upload', what_to_upload)


                    // console.log('what_to_upload', what_to_upload)

                }


                // If this step is step 7
                else if (key == "step_7") {

                    const required_visa_documents = []


                    if (customer_visa_documents && customer_visa_documents.length != 0) {

                        customer_visa_documents.filter(key => {

                            // const data = (visaDocuments && visaDocuments.length != 0) && visaDocuments.find(obj => obj.key == key)


                            if (visaDocuments && visaDocuments.length != 0) {

                                const data = visaDocuments.find(obj => obj.key == key)

                                required_visa_documents.push(data)

                            }


                            // console.log('data', data)

                            // Push this data into the main array 
                            // required_visa_documents.push(data)

                        });
                    }



                    // console.log('required_visa_documents', required_visa_documents)




                    // Insert all what to upload files 
                    what_to_upload = required_visa_documents

                    // console.log('what_to_upload', what_to_upload)


                    // console.log('what_to_upload', what_to_upload)

                }

                // // Insert all what to upload files 
                // what_to_upload = JSON.parse(step.upload_values)
                // // what_to_upload.files = step.upload_values



                // console.log("what_to_upload", what_to_upload)

            }


            // // Set the files that are already uploaded 
            // uploaded_files = step?.upload_values ? JSON.parse(step.upload_values) : []
            // downloaded_files = step?.download_values ? JSON.parse(step.download_values) : []



            // Set the files that are already uploaded 
            step_download_values = step?.download_values ? JSON.parse(step?.download_values) : []
            step_upload_values = step?.upload_values ? JSON.parse(step?.upload_values) : {}


            // Step id
            step_id = step.key

            // Step status 
            step_status = step.status

            step_values = {
                download: step_download_values,
                upload: step_upload_values,
            }

            step_refuse_comment = step.refuse_comment



            // If step status is "refused_files"
            if (step_status == 'files_refused') {

                // This array used to contain only the files that are new or refused 
                const new_what_to_upload = []


                // Get refused files 
                // Object.keys(step_upload_values).forEach(document => {
                //     const value = step_upload_values[document]

                //     // If the file status if "new", insert it, newest_files, object 
                //     if (value.status == 'new') {
                //         newest_files[document] = value
                //     }

                //     // If the file status if "refused", insert it, refused_files, object 
                //     if (value.status == 'refused') {
                //         refused_files[document] = value



                //         // Fetch a new array where the key exists
                //         const filteredArray = what_to_upload.filter(item => item.key == document)?.[0]

                //         // console.log(filteredArray);
                //         new_what_to_upload.push(filteredArray)


                //         // Find this file in what_to_upload Array, and insert payload into it 


                //         // Remove all files in the array except this one 
                //         // console.log('what_to_upload', what_to_upload)
                //         // console.log('document', document)



                //     }


                //     // console.log('new_what_to_upload', new_what_to_upload)
                //     // Make the what_to_upload as this new array of data  
                //     what_to_upload = new_what_to_upload

                //     // console.log('what_to_upload', what_to_upload)


                //     new_files[document] = value

                // })
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
    // console.log('what_to_upload', what_to_upload)
    // console.log('what_to_download', what_to_download)



    // console.log('all_steps_statuses', all_steps_statuses)

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

        // console.log('step_id', step_id, 'files', files)
        console.log('step_id', step_id)


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



        // return


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



            const allExist = this_required_files_keys.every(str =>
                step_files.some(obj => obj.what_to_do__key == str)
            )

            // console.log('allExist', allExist)


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


                console.log(result)

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


    // console.log('step_upload_values', step_upload_values)

    return (
        <div key={key} className="flex flex-col gap-4">

            <div className="flex gap-2 relative">
                <p className="bg-light-1 dark:bg-dark-3 h-[30px] w-[30px] rounded-full flex items-center justify-center mt-2 text-xs">
                    {formatNumber(index)}
                </p>

                {/* This is for the status of the step  */}
                <StepStatus status={step_status} />

                {/* {all_steps_statuses?.[step_key] || 'Not exist yet'} */}

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
                            {/* <StepTitle index={index} step_id={step_id} step_status={step_status} /> */}
                            <StepTitle index={index} step_id={step_id} step_status={all_steps_statuses?.[step_key]} />


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
                        // 'max-h-[1200vh]': (opendedStepKey == key && step_status != 'accepted' && step_status != 'in_process' && step_status != 'queued') || step_status == 'pending' || step_status == 'refused' || step_status == 'files_refused' || step_status == 'new_files' || step_status == 'current',
                        'max-h-[1200vh]': (opendedStepKey == key && step_status != 'accepted' && step_status != 'in_process' && step_status != 'queued') || step_status == 'refused' || step_status == 'files_refused' || step_status == 'new_files' || step_status == 'current',
                    })}>

                        <div className="p-3 flex justify-between sm:gap-10">

                            <div className="flex flex-col gap-3 overflow-hidden h-0 max-w-0 sm:max-w-[25%] sm:h-fit">
                                {icon}
                                <p className="text-xs text-text_color-1">{step_description}</p>
                            </div>


                            <div className="flex-1 flex flex-col gap-5">


                                {
                                    what_to_download &&
                                    what_to_download.map(({ files, type }, index) => {


                                        // console.log('item to download', item)
                                        var download_path = ''
                                        if (type == "contract") {
                                            download_path = `${app_images_routes.steps.contracts}/${files[0].name}`
                                        } else if (type == "pre_admission") {
                                            download_path = `${app_images_routes.preAdmissionLetter}/${files[0].name}`
                                        }




                                        return (
                                            <div key={index + 1} className="flex justify-between flex-col md:flex-row md:items-center gap-2 p-2 border-1 rounded-xl bg-dark-2 ">
                                                <div className="flex flex-1 items-center gap-3">

                                                    <span className="p-2 rounded-lg border-1">
                                                        <FileIcon special_size={30} />
                                                    </span>
                                                    <p className="text-sm sm:text-base font-medium">{t("steps_area.please_download_this_file")}</p>
                                                </div>


                                                <div className="flex items-center gap-1">
                                                    <DownloadButton
                                                        url={download_path}
                                                        fileName={files[0].name}
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
                                            // <div key={index} className="bg-own_primary-1/10 rounded-2xl border p-2 flex justify-between items-center gap-2">
                                            //     <p>Please download</p>

                                            //     <Button className="p-0 h-[40px] w-fit aspect-square">
                                            //         <Download />
                                            //     </Button>
                                            // </div>
                                        )
                                    })
                                }


                                {/* Set all what to upload here  */}

                                {
                                    (what_to_upload && what_to_upload.length != 0 && what_to_upload[0] != undefined) &&
                                    what_to_upload.map((item, index) => {


                                        // Check if this step has already uploaded files 
                                        // console.log('item', item)



                                        // return
                                        // console.log('step_upload_values', step_upload_values)
                                        // console.log('step_id', step_id)

                                        // Step details 
                                        const key = item.key
                                        const name = item?.name || item?.names
                                        const description = item.description


                                        // Get this uploaded file 
                                        const uploaded_file = step_upload_values?.[key] || null


                                        // console.log('uploaded_file', uploaded_file)

                                        const file_comment = uploaded_file?.comment || null
                                        const file_status = uploaded_file?.status || null
                                        const file_payload = uploaded_file?.payload || null

                                        // console.log('key', key)
                                        // console.log('name', name)

                                        // File link 
                                        let file_path = ""

                                        // If this is contract step
                                        if (step_id == "step_1") {
                                            // file_path = `${app_images_routes.steps.contracts}/${file.name}`
                                            file_path = app_images_routes.steps.contracts
                                        }
                                        // else if (type == "pre_admission") {
                                        //     // file_path = `${app_images_routes.preAdmissionLetter}/${file.name}`
                                        //     file_path = app_images_routes.preAdmissionLetter
                                        // }
                                        // console.log('submittedStep', submittedStep)


                                        // console.log('refused_files.hasOwnProperty(key)', refused_files.hasOwnProperty(key))



                                        if (step_status == 'files_refused' && file_status != 'refused') {
                                            return
                                        } else {

                                            return (
                                                <div key={key} className="flex flex-col gap-3">
                                                    <div className="flex items-center gap-2">
                                                        <p className="h-[20px] w-[20px] rounded-full bg-dark-3 flex justify-center items-center text-xs">{index + 1}</p>
                                                        <p className="text-sm">{name?.[active_language]}</p>
                                                    </div>

                                                    <div>

                                                        <div className="flex flex-col gap-5">

                                                            {/* If this step is not accepted, then show all uploaded data  */}
                                                            {
                                                                // (step_status != 'accepted' || refused_files.hasOwnProperty(key)) &&
                                                                (step_status != 'accepted') &&
                                                                <>
                                                                    <HtmlInput
                                                                        type="customized_file"
                                                                        placeholder={{ placeholder: '', icon: '' }}
                                                                        onChange={(files) => setStepFile(files, key, step_id, true)}
                                                                        // reference={stepFileRef}
                                                                        reference={(el) => (stepFileRef.current[key] = el)} // Assign ref dynamically

                                                                    />
                                                                </>
                                                            }


                                                            {/* Check if this step status has uploaded file  */}
                                                            {
                                                                uploaded_file && (Object.keys(submittedStep).length == 0) &&
                                                                // <div key={index + 1} className="flex justify-between flex-col md:flex-row md:items-center gap-2 p-2 border-1 rounded-xl bg-dark-2 ">
                                                                //     <div className="flex flex-1 items-center gap-3">

                                                                //         <span className="p-2 rounded-lg border-1">
                                                                //             <FileIcon special_size={30} />
                                                                //         </span>
                                                                //         <span>
                                                                //             <p className="text-sm sm:text-base font-medium">{name[active_language]}</p>
                                                                //             <span className="flex items-center gap-1">
                                                                //                 <p className="text-xs sm:text-sm flex items-center gap-1">
                                                                //                     {file.extension.toUpperCase()}
                                                                //                 </p>
                                                                //                 <span className="h-1 w-1 rounded-full bg-dark-3" />
                                                                //                 <p className="text-xs sm:text-sm flex items-center gap-1">
                                                                //                     {calculateFileSize(file.size)}
                                                                //                 </p>
                                                                //             </span>

                                                                //         </span>
                                                                //     </div>


                                                                //     <div className="flex items-center gap-1">
                                                                //         <DownloadButton
                                                                //             url={download_path}
                                                                //             fileName={file.name}
                                                                //             className="flex-1 md:flex-none bg-yellow-600"
                                                                //             text={t('global.download')}
                                                                //         />

                                                                //         <ViewLink
                                                                //             url={download_path}
                                                                //             className="flex-1 md:flex-none"
                                                                //             text={t('global.file.view')}
                                                                //         />
                                                                //     </div>


                                                                // </div>

                                                                // <p>dddhhd</p>
                                                                file_payload.map((file, index2) => {

                                                                    const { file_name } = file
                                                                    // console.log('file', file)


                                                                    return (
                                                                        <UploadedFile
                                                                            key={index2}
                                                                            step_id={step_id}
                                                                            submittedStep={submittedStep}
                                                                            file={file}
                                                                            status={file_status}
                                                                            comment={file_comment}
                                                                            changeFileEvent={() => {
                                                                                if (stepFileRef.current[key]) {
                                                                                    stepFileRef.current[key].click();
                                                                                }
                                                                            }}
                                                                        />
                                                                    )
                                                                })
                                                            }




                                                            {
                                                                (submittedStep?.files && submittedStep?.files.length > 0) &&

                                                                <div className="w-full flex flex-col gap-2 rounded-xl">
                                                                    {
                                                                        submittedStep.files.map(({ files, what_to_do__key }, index) => {
                                                                            const file = files[0]

                                                                            if (what_to_do__key == key) {
                                                                                return (
                                                                                    <div key={index}>
                                                                                        {/* {step_id} {what_to_do__key} */}
                                                                                        <UploadedFile
                                                                                            key={index}
                                                                                            step_id={step_id}
                                                                                            submittedStep={submittedStep}
                                                                                            setSubmittedStep={setSubmittedStep}
                                                                                            what_to_do__key={what_to_do__key}
                                                                                            file={file}
                                                                                            changeFileEvent={() => {
                                                                                                if (stepFileRef.current[key]) {
                                                                                                    stepFileRef.current[key].click();
                                                                                                }
                                                                                            }}
                                                                                        />
                                                                                    </div>
                                                                                )
                                                                            }
                                                                        })
                                                                    }
                                                                </div>
                                                            }

                                                        </div>


                                                    </div>

                                                </div>
                                            )
                                        }

                                    })
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






// function UploadedFile({ file, t, what_to_do__key, step_id, submittedStep, setSubmittedStep }) {
function UploadedFile({ file, comment, status, what_to_do__key, step_id, submittedStep, setSubmittedStep, changeFileEvent }) {


    const size = calculateFileSize(file?.size)

    const t = useTranslations()
    const currentLanguage = getLanguageDetails(useLocale())
    const active_language = currentLanguage.key
    const active_dir = currentLanguage.direction



    // Remove this file 
    function handleRemoveFile() {

        const all_submitted_files = submittedStep

        // console.log('all_submitted_files', all_submitted_files)

        changeFileEvent()

    }




    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between w-full py-3 border border-opacity-50 border-own_primary-1 dark:bg-dark-2 px-2 rounded-xl">

                <div className="flex items-center gap-3">

                    <span className="p-2 rounded-lg border-1">
                        <FileIcon special_size={25} />
                    </span>

                    <span className=" max-w-[100px] sm:max-w-[200px] lg:max-w-[500px]">
                        <p className="text-base font-medium  truncate">{file?.fileName || file?.original_name}</p>
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


            {
                comment &&
                <p className="text-red-500 text-sm">{comment}</p>
            }
        </div>
    )
}




// function FileBox({ name, file, download_path }) {


//     const t = useTranslations()
//     const currentLanguage = getLanguageDetails(useLocale())
//     const active_language = currentLanguage.key
//     const active_dir = currentLanguage.direction


//     console.log('file.extension', file.extension)


//     return <p>dhdhdh</p>

//     return (
//         <div key={index + 1} className="flex justify-between flex-col md:flex-row md:items-center gap-2 p-2 border-1 rounded-xl bg-dark-2 ">
//             <div className="flex flex-1 items-center gap-3">

//                 <span className="p-2 rounded-lg border-1">
//                     <FileIcon special_size={30} />
//                 </span>
//                 <span>
//                     <p className="text-sm sm:text-base font-medium">{name[active_language]}</p>
//                     <span className="flex items-center gap-1">
//                         <p className="text-xs sm:text-sm flex items-center gap-1">
//                             {file.extension.toUpperCase()}
//                         </p>
//                         <span className="h-1 w-1 rounded-full bg-dark-3" />
//                         <p className="text-xs sm:text-sm flex items-center gap-1">
//                             {calculateFileSize(file.size)}
//                         </p>
//                     </span>

//                 </span>
//             </div>


//             <div className="flex items-center gap-1">
//                 <DownloadButton
//                     url={download_path}
//                     fileName={file.name}
//                     className="flex-1 md:flex-none bg-yellow-600"
//                     text={t('global.download')}
//                 />

//                 <ViewLink
//                     url={download_path}
//                     className="flex-1 md:flex-none"
//                     text={t('global.file.view')}
//                 />
//             </div>


//         </div>
//     )
// }