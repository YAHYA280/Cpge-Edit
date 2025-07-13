"use client"

import { useEffect, useState } from 'react'
import SkeletenTemplate from '../../../editCustomer/[customerId]/components/SkeletenTemplate'
import { Skeleton } from '@nextui-org/skeleton'
import { admins_api, invoices_api, steps_api } from '@/constants/_api'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Avatar, Badge, Pagination, Spinner, Tooltip, Button } from "@nextui-org/react";
import ManageStepsActionsDropbox from './ManageStepsActionsDropbox'
import Status from './Status'
import { Dots2Icon, DotsIcon, FileIcon, FingerLockIcon, InProcessIcon, InvoiceIcon, LockClosedIcon, LockedFileIcon, MenuListIcon, QuestionCyrcleIcon, SettingsIcon, TimerIcon } from '@/constants/Icons'
import LoadingSteps from './LoadingSteps'
import createToast from '@/app/assets/components/toast'
import { calculateArrayOfNumbers, calculateFileSize, extractDateFromTimestamp, getTimeWithDateName } from '@/constants/functions'
import { app_images_routes } from '@/constants/routes'
import { useCookies } from 'react-cookie'
import customers_steps from '@/constants/customers_steps'
import { cn } from '@/lib/utils'
import { CustomersBreadcrumb } from './Breadcrumb'
import TopPage from '../../../components/TopPage'


// import {
//     Accordion,
//     AccordionContent,
//     AccordionItem,
//     AccordionTrigger,
// } from '@/components/tremorComponents/Accourding';
// import { RiCoupon3Fill } from '@remixicon/react'
import Link from 'next/link'
import Image from 'next/image'
import { customers_statuses } from '@/constants/constants'
import DaysCalculator from '@/app/assets/components/DaysCalculator'
import ChangeStepStatusButton from '../[stepId]/components/ChangeStepStatusButton'
import UniversityDocuments from '../[stepId]/components/UniversityDocuments'
import ApplicationFeeAndInvoice from '../[stepId]/components/ApplicationFeeAndInvoice'
import PreAdmissionLetterUploadArea from '../[stepId]/components/PreAdmissionLetterUploadArea'
import AdmissionLetterUploadArea from '../[stepId]/components/AdmissionLetterUploadArea'
import VisaDecision from '../[stepId]/components/VisaDecision'
import VisaDocuments from '../[stepId]/components/VisaDocuments'


export default function ManageStepsForm({ parameters }) {
    const [customer, setCustomer] = useState()
    const [steps, setSteps] = useState([])

    // console.log('parameters',parameters)

    // Steps states 
    const [showUniversityDocuments, setShowUniversityDocuments] = useState(false)
    const [showApplicationFeeModel, setShowApplicationFeeModel] = useState(false)
    const [showPreAdmissionLetterUploadModel, setShowPreAdmissionLetterUploadModel] = useState(false)
    const [showAdmissionLetterUploadModel, setShowAdmissionLetterUploadModel] = useState(false)
    const [showVisaDocuments, setShowVisaDocuments] = useState(false)

    // Current admin role from the cookies 
    const [adminData, setAdminData] = useCookies('admin_data')


    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await fetch(`${admins_api}/getSpecialcustomers`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ customer_id: parameters.customerId }),
                    cache: 'no-cache',
                    credentials: 'include'
                })

                const result = await response.json()


                if (result.err) {
                    createToast(result.msg)
                } else {

                    // Set customer state 
                    setCustomer(result.customer)

                    // Fetch the steps 
                }
            } catch (error) {
                console.log(error.message)
            }
        }
        // Get customer and invoices
        fetchData()

    }, [])


    useEffect(() => {
        // Get this customer steps
        const fetchSteps = async () => {
            try {
                const customer_id = parameters.customerId

                const response = await fetch(`${steps_api}/${customer_id}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    cache: 'no-cache',
                    credentials: 'include'
                })

                const result = await response.json()

                if (result.err) {
                    createToast(result.msg, true)
                } else {
                    const stepsArr = []



                    for (let i = 0; i < result.steps.length; i++) {

                        var { _id, step_id, download_values, upload_values, createdAt, updatedAt, status } = result.steps[i]



                        // Check if there is the step 2, and if the status if "queued", which means that this step is not available for the student to submit 
                        if (step_id == 'step_2' && status == 'queued') { // Show university documents modal
                            setShowUniversityDocuments(true)
                        } else if (step_id == 'step_3' && status == 'queued') { // Show application fee modal
                            setShowApplicationFeeModel(true)
                        } else if (step_id == 'step_4' && status == 'queued') { // Show pre-admission letter modal
                            setShowPreAdmissionLetterUploadModel(true)
                        } else if (step_id == 'step_6' && status == 'queued') { // Show admission letter upload file modal
                            setShowAdmissionLetterUploadModel(true)
                        }
                        else if (step_id == 'step_7' && status == 'queued') { // Show visa documents modal
                            setShowVisaDocuments(true)
                        }
                        // else if (step_id == 'step_8' && status == 'queued') { // University documents step
                        //     setShowVisaModel(true)
                        // }




                        stepsArr.push(
                            {
                                _id,
                                key: step_id,
                                createdAt,
                                updatedAt,
                                status,
                                download_values: JSON.parse(download_values || '[]') || [],
                                upload_values: JSON.parse(upload_values || '{}') || {},
                            }
                        )

                    }

                    setSteps(stepsArr)

                }
            } catch (error) {
                console.log(error.message)
            }
        }

        fetchSteps()

    }, [steps])


    return (
        <div className="flex flex-col gap-5">
            <CustomersBreadcrumb customer_id={parameters.customerId} current_page_key={'manageSteps'} />

            <TopPage pageName={`Manage steps of `} customer={customer} admin={adminData.admin_data} />
            {
                !customer && <SkeletenTemplate />
            }


            {
                customer && steps &&
                <div className='flex flex-col'>

                    <div className='flex flex-col border-1 rounded-2xl'>

                        {
                            customers_steps.map(({ key, idName, icon, name, description }, index) => {
                                var hasBottomBorder = !(customers_steps.length - 1 == index)

                                // Current step details 
                                var step_name = name.en
                                var step_description = description.en


                                // Submitted step details 
                                const submitted_step = steps.find(obj => obj.key == key) || null
                                const submitted_step_status = submitted_step?.status && customers_statuses.find(obj => obj.key == submitted_step?.status) || null

                                const submitted_step_status_name = submitted_step_status?.name.en
                                const submitted_step_status_background = submitted_step_status?.background


                                // Uploaded files count 

                                var uploaded_files_count = 0
                                var total_uploaded_files_size = []



                                // Get the values of upload_values object 
                                const upload_values_obj_values = Object.values(submitted_step?.upload_values || [])

                                // const how_much_files = 
                                for (let i = 0; i < upload_values_obj_values.length; i++) {
                                    const arr = upload_values_obj_values[i].payload

                                    for (let a = 0; a < arr.length; a++) {
                                        const file = arr[a]
                                        // console.log('file', file)

                                        uploaded_files_count += Number(1)

                                        total_uploaded_files_size.push(file.file_size)
                                    }

                                }


                                // Update the data of file details 
                                total_uploaded_files_size = calculateFileSize(calculateArrayOfNumbers(total_uploaded_files_size))


                                const last_update = submitted_step ? getTimeWithDateName(submitted_step?.updatedAt) : null


                                // The link that redirects the user to manage this specifi step 
                                var toLink = ''
                                if (submitted_step) {
                                    toLink = `${parameters.customerId}/${submitted_step.key}` // customer_id + stpe_id 
                                }

                                return (
                                    <div key={index} className={cn('flex items-center ', {
                                        'border-b': hasBottomBorder,
                                        'pointer-events-none': !submitted_step
                                    })}>
                                        <Link href={toLink} className='p-3 flex items-center justify-between flex-1 gap-1 pr-10'>
                                            {/* Step icon and name  */}
                                            <div className='flex items-center gap-2 w-[250px]'>
                                                <span className='bg-dark-2 border-1 h-[40px] w-[40px] rounded-lg flex items-center justify-center relative'>
                                                    {icon}

                                                    {
                                                        !submitted_step &&
                                                        <span className='bg-dark-2 border-2 border-dark-2 h-[20px] w-[20px] rounded-md flex items-center justify-center absolute -bottom-1/2 -right-1/2 -translate-x-1/2 -translate-y-1/2'>
                                                            <LockClosedIcon className='text-own_primary-1' />
                                                        </span>
                                                    }

                                                </span>

                                                {/* Access Your Booking */}
                                                <p className='truncate text-sm flex-1'>{step_name}</p>

                                                <Tooltip size='sm' content={step_description}>
                                                    <button>
                                                        <QuestionCyrcleIcon special_size={15} />
                                                    </button>
                                                </Tooltip>
                                            </div>

                                            {/* Step status  */}
                                            <div className='flex flex-col gap-1 '>
                                                <div className='flex items-center gap-2'>
                                                    {
                                                        !submitted_step_status &&
                                                        <span
                                                            className={'h-3 w-3 rounded-full bg-gray-500'} // If the status is not exist, then the step is not submitted yet
                                                        />
                                                    }

                                                    {
                                                        submitted_step_status &&
                                                        <span
                                                            className={cn(`h-3 w-3 rounded-full ${submitted_step_status_background}`, {
                                                            })}
                                                        />
                                                    }


                                                    {
                                                        submitted_step_status_name &&
                                                        <p>{submitted_step_status_name}</p>
                                                    }


                                                    {
                                                        !submitted_step_status &&
                                                        <p>Locked</p>
                                                    }

                                                </div>

                                                {/* Updated date  */}
                                                {
                                                    last_update &&
                                                    <div className={cn('flex items-center gap-[3px] text-text_color-1 text-xs ml-5')}>
                                                        {/* If the step status equals to "current", then this step ha no response yet from the customer  */}
                                                        {
                                                            (submitted_step.status == 'current') &&
                                                            <p>No response yet</p>
                                                        }
                                                        {/* {submitted_step_status} */}

                                                        {
                                                            (submitted_step.status != 'current') &&
                                                            <div className='flex items-center gap-[3px]'>
                                                                <p>Before</p>
                                                                <p>
                                                                    {last_update.this_time} {last_update.date_name}
                                                                </p>
                                                            </div>
                                                        }

                                                    </div>
                                                }
                                            </div>


                                            {/* Uploaded files count, and total size  */}
                                            <>
                                                {
                                                    !submitted_step?.upload_values &&
                                                    <div className='flex flex-col gap-1 '>
                                                        <div className='flex items-center gap-1'>
                                                            <LockedFileIcon special_size={18} />
                                                            <p>Locked</p>
                                                        </div>
                                                        <p className='text-text_color-1 text-xs pl-[20px]'>Locked</p>
                                                    </div>
                                                }

                                                {
                                                    submitted_step?.upload_values &&
                                                    <div className='flex flex-col gap-1 '>
                                                        <div className='flex items-center gap-1'>
                                                            <FileIcon special_size={18} />
                                                            <p>{uploaded_files_count} Files</p>
                                                        </div>
                                                        <p className='text-text_color-1 text-xs pl-[20px]'>{total_uploaded_files_size}</p>
                                                    </div>
                                                }
                                            </>

                                        </Link>


                                        {/* Actions  */}
                                        <div className='p-3 flex items-center  gap-3 w-[300px] '>
                                            <div className='flex items-center justify-end gap-2 flex-1  h-full'>
                                                {
                                                    last_update &&
                                                    <p className='text-[12px] text-text_color-1 flex items-center gap-1'>
                                                        {last_update.this_time} {last_update.date_name} by {customer.first_name} {customer.last_name}
                                                    </p>
                                                }


                                                <div className='relative h-[30px] w-[30px]'>
                                                    <Image
                                                        src={customer.customer_photo ? `${app_images_routes.customersPhotos}/${customer.customer_photo}` : '/icons/preload-avatar.png'}
                                                        fill
                                                        alt={customer.username + " photo"}
                                                        className='rounded-full object-cover'
                                                    />
                                                </div>

                                            </div>

                                            <ChangeStepStatusButton current_step={submitted_step_status_name} customer_id={parameters.customerId} parameters={parameters} step_id={key} className="bg-transparent text-dark-1 dark:text-light-1" />

                                        </div>

                                    </div>

                                )
                            })
                        }


                        {/* University documents model  */}
                        <UniversityDocuments parameters={parameters} customer_id={parameters.customerId} isOpen={showUniversityDocuments} onOpenChange={setShowUniversityDocuments} />


                        {/* Application fee model  */}
                        <ApplicationFeeAndInvoice parameters={parameters} customer_id={parameters.customerId} isOpen={showApplicationFeeModel} onOpenChange={setShowApplicationFeeModel} />


                        {/* Pre-admission letter upload area model  */}
                        <PreAdmissionLetterUploadArea parameters={parameters} customer_id={parameters.customerId} isOpen={showPreAdmissionLetterUploadModel} onOpenChange={setShowPreAdmissionLetterUploadModel} />


                        {/* Pre-admission letter upload area model  */}
                        <AdmissionLetterUploadArea parameters={parameters} customer_id={parameters.customerId} isOpen={showAdmissionLetterUploadModel} onOpenChange={setShowAdmissionLetterUploadModel} />



                        {/* Visa documents model  */}
                        <VisaDocuments parameters={parameters} customer_id={parameters.customerId} isOpen={showVisaDocuments} onOpenChange={setShowVisaDocuments} />


                        {/* Visa model  */}
                        {/* <VisaDecision parameters={parameters} customer_id={parameters.customerId} isOpen={showVisaModel} onOpenChange={setShowVisaModel} /> */}

                    </div>
                </div>
            }

        </div >
    )
}
