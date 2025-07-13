"use client"

import PageName from '@/app/(admin)/assets/components/PageName'
import { useEffect, useState } from 'react'
import SkeletenTemplate from '../../../editCustomer/[customerId]/components/SkeletenTemplate'
import { Skeleton } from '@nextui-org/skeleton'
import { admins_api, invoices_api, steps_api } from '@/constants/_api'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Avatar, Badge, Pagination, Spinner } from "@nextui-org/react";
import ManageStepsActionsDropbox from './ManageStepsActionsDropbox'
import Status from './Status'
import { FileIcon, InProcessIcon, InvoiceIcon, SettingsIcon, TimerIcon } from '@/constants/Icons'
import LoadingSteps from './LoadingSteps'
import createToast from '@/app/assets/components/toast'
import { extractDateFromTimestamp } from '@/constants/functions'
import { app_images_routes } from '@/constants/routes'
import { useCookies } from 'react-cookie'
import customers_steps from '@/constants/customers_steps'
import { cn } from '@/lib/utils'
import { CustomersBreadcrumb } from './Breadcrumb'
import TopPage from '../../../components/TopPage'

const columns = [
    {
        key: "step",
        label: "STEP",
        icon: <InvoiceIcon size={12} />,
    },
    {
        key: "status",
        label: "STATUS",
        icon: <InProcessIcon />,

    },
    {
        key: "createdAt",
        label: "RECEAVED AT",
        icon: <TimerIcon />,

    },
    {
        key: "updatedAt",
        label: "UPDATED AT",
        icon: <TimerIcon />,

    },
    {
        key: "actions",
        label: "ACTIONS",
        icon: <SettingsIcon />,

    },
]

export default function ManageStepsForm({ params }) {
    const [customer, setCustomer] = useState()
    const [steps, setSteps] = useState([])
    const [loadingSteps, setLoadingSteps] = useState(false)


    // Current admin role from the cookies 
    const [adminData, setAdminData] = useCookies('admin_data');
    // const { _id } = adminData.admin_data




    // const [selectedKeys, setSelectedKeys] = useState();


    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await fetch(`${admins_api}/getSpecialcustomers`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ customer_id: params.customerId }),
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
                    // fetchSteps(result.customer._id, _id)
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
                const customer_id = params.customerId

                const response = await fetch(`${steps_api}/${customer_id}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    cache: 'no-cache',
                    credentials: 'include'
                })

                const result = await response.json()

                // return console.log(result)
                if (result.err) {
                    createToast(result.msg, true)
                } else {
                    const stepsArr = []

                    for (let i = 0; i < result.steps.length; i++) {

                        var { id, _id, step_id, values, createdAt, updatedAt, status } = result.steps[i]

                        if (status == 'pending') {
                            status = ['Pending', 'pending']
                        } else if (status == 'current') {
                            status = ['Current', 'pending']
                        } else if (status == 'accepted') {
                            status = ['Accepted', 'accepted']
                        } else if (status == 'refused') {
                            status = ['Refused', 'refused']
                        } else if (status == 'deleted') {
                            status = ['Deleted', 'deleted']
                        }


                        stepsArr.push(
                            {
                                _id,
                                key: step_id,
                                createdAt,
                                updatedAt,
                                status,
                                values,
                            }
                        )
                    }


                    setSteps(stepsArr)
                }
            } catch (error) {
                console.log(error.message)

            } finally {
                setLoadingSteps(false)
            }
        }

        fetchSteps()

    }, [steps]);



    // const steps = [
    //     {
    //         _id: 'j8373Jjdh_3U3I3JDJ',
    //         key: 'step_1',
    //         createdAt: "2024-07-29T17:08:51.897+00:00",
    //         updatedAt: "2024-07-29T17:08:51.897+00:00",
    //         status: ["Pending", "pending"],
    //         attachement: {
    //             type: 'file',
    //             src: "src.pdf",
    //         },
    //     },
    // ]




    return (
        <div className="flex flex-col gap-5">
            <CustomersBreadcrumb customer_id={params.customerId} current_page_key={'manageSteps'} />

            <TopPage pageName={`Manage steps of `} customer={customer} admin={adminData.admin_data} />
            {
                !customer && <SkeletenTemplate />
            }

            {
                customer &&
                <div className='flex flex-col'>
                    <Table
                        removeWrapper
                        aria-label="Controlled table example with dynamic content"
                        className='bg-light-1 dark:bg-dark-1 rounded-xl border-1 overflow-hidden'
                    >
                        <TableHeader>
                            {
                                columns.map(({ key, label, icon }) => (
                                    <TableColumn key={key}>
                                        <div className='flex items-center gap-1'>
                                            {icon} {label}
                                        </div>
                                    </TableColumn>
                                ))
                            }
                        </TableHeader>

                        <TableBody isLoading={loadingSteps} loadingContent={<LoadingSteps full_name={`${customer.first_name} ${customer.last_name}`} />}>
                            {
                                !loadingSteps &&
                                customers_steps.map(({ key, name, description, icon }, index) => {

                                    var step_key = key
                                    var next_step = customers_steps[index + 1] || ''
                                    // console.log(next_step?.key)
                                    var step_id = ''
                                    var step_created_at = ''
                                    var step_updated_at = ''
                                    var step_status = ''
                                    var step_uploaded_attachement = ''
                                    var step_downloaded_attachement = ''
                                    const empty = '---------'

                                    for (let i = 0; i < steps.length; i++) {
                                        const step = steps[i]
                                        // Catch this step by key
                                        if (step.key == key) {
                                            step_id = step._id
                                            step_created_at = extractDateFromTimestamp(step.createdAt).finalFormattedDate
                                            step_updated_at = extractDateFromTimestamp(step.updatedAt).finalFormattedDate
                                            step_status = step.status

                                            step_uploaded_attachement = step.values?.upload || []
                                            step_downloaded_attachement = step.values?.download || []


                                            // console.log(step_uploaded_attachement)
                                        }
                                    }


                                    return (
                                        <TableRow key={key} className={cn('border-b-1 last:border-none border-opacity-20', {
                                            'bg-yellow-500 bg-opacity-10 opacity-10': !step_id
                                        })}>

                                            <TableCell className='flex items-center gap-2'>
                                                { /* HERE IS THE STEP ICON */}
                                                {icon}
                                                {name.en}
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    step_status ?
                                                        (
                                                            <div>
                                                                {
                                                                    step_status[1] == 'pending' &&
                                                                    <Status color={"bg-blue-600"} text={step_status[0]} borderColor={'border-blue-400'} />
                                                                }
                                                                {
                                                                    step_status[1] == 'current' &&
                                                                    <Status color={"bg-blue-600"} text={step_status[0]} borderColor={'border-blue-400'} />
                                                                }
                                                                {
                                                                    step_status[1] == 'accepted' &&
                                                                    <Status color={"bg-green-700"} text={step_status[0]} borderColor={'border-green-400'} />
                                                                }
                                                                {
                                                                    step_status[1] == 'refused' &&
                                                                    <Status color={"bg-red-600"} text={step_status[0]} borderColor={'border-red-400'} />
                                                                }
                                                            </div>
                                                        )
                                                        : empty
                                                }


                                            </TableCell>

                                            <TableCell><p className='text-xs py-1 w-fit'>{step_created_at || empty}</p></TableCell>

                                            <TableCell><p className='text-xs py-1 w-fit'>{step_updated_at || empty}</p></TableCell>

                                            <TableCell>
                                                {
                                                    step_uploaded_attachement ?
                                                        <ManageStepsActionsDropbox
                                                            // attachement_src={`${step_uploaded_attachement.type == 'step' ? app_images_routes.steps.step : ''}/${step_uploaded_attachement.src}`}
                                                            attachements_srcs={step_uploaded_attachement}
                                                            step_id={step_key}
                                                            customer_id={params.customerId}
                                                            admin_id={adminData.admin_data._id}
                                                            next_step={next_step?.key}
                                                        />
                                                        : empty
                                                }
                                                {/* {next_step} */}
                                            </TableCell>
                                        </TableRow>
                                    )
                                }

                                )
                            }
                        </TableBody>
                    </Table>
                </div>
            }

        </div >
    )
}
