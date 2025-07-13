"use client"

import PageName from '@/app/(admin)/assets/components/PageName'
import { useEffect, useState } from 'react'
import SkeletenTemplate from '../../../editCustomer/[customerId]/components/SkeletenTemplate'
import { Skeleton } from '@nextui-org/skeleton'
import { admins_api, invoices_api } from '@/constants/_api'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Avatar, Badge, Pagination, Spinner } from "@nextui-org/react";
import ManageInvoicesActionsDropbox from './ManageInvoicesActionsDropbox'
import NoInvoicesToDisplay from './NoInvoicesToDisplay'
import { cn } from '@/lib/utils'
import Status from './Status'
import { FileIcon, InProcessIcon, InvoiceIcon, SettingsIcon, TimerIcon } from '@/constants/Icons'
import LoadingInvoices from './LoadingInvoices'
import createToast from '@/app/assets/components/toast'
import { extractDateFromTimestamp } from '@/constants/functions'
import { app_images_routes } from '@/constants/routes'
import { useCookies } from 'react-cookie'
import { CustomizedHoverCard } from '@/app/assets/components/CustomizedHoverCard'
import { CustomersBreadcrumb } from '../../../manageSteps/[customerId]/components/Breadcrumb'
import TopPage from '../../../components/TopPage'

const columns = [
    {
        key: "invoice",
        label: "INVOICE",
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
        key: "actions",
        label: "ACTIONS",
        icon: <SettingsIcon />,

    },
];


export default function ManageInvoicesForm({ params }) {
    const [customer, setCustomer] = useState()
    const [invoices, setInvoices] = useState()
    const [loadingInvoices, setLoadingInvoices] = useState(true)


    // Current admin role from the cookies 
    const [adminData, setAdminData] = useCookies('admin_data');




    const [selectedKeys, setSelectedKeys] = useState();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const { _id } = adminData.admin_data


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

                    // Fetch the invoices 
                    fetchInvoices(result.customer._id, _id)
                }
            } catch (error) {
                console.log(error.message)
            }
        }



        // Get this customer invoices
        const fetchInvoices = async (customer_id, admin_id) => {
            try {
                const { _id } = adminData.admin_data


                const response = await fetch(`${invoices_api}/special_customer_and_admin/${customer_id}/${admin_id}`, {
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
                    const invoices_arr = []



                    // console.log(result.data)

                    for (let i = 0; i < result.data.length; i++) {

                        var { id, _id: invoice_id, attachement, type, name, description, createdAt, status, refuse_comment, invoice_amount } = result.data[i]

                        if (status == 'pending') {
                            status = ['Pending', 'pending']
                        } else if (status == 'accepted') {
                            status = ['Accepted', 'accepted']
                        } else if (status == 'refused') {
                            status = ['Refused', 'refused']
                        } else if (status == 'refuse_with_comment') {
                            status = ['Refuse with comment', 'refuse_with_comment', refuse_comment] // The 3rd index is for the refuse reason
                        } else if (status == 'deleted') {
                            status = ['Deleted', 'deleted']
                        }

                        invoices_arr.push({
                            key: i + 1,
                            invoice_id,
                            attachement: {
                                src: attachement,
                                // file_type: type,
                                name,
                                description,
                            },
                            invoice_amount,
                            createdAt: extractDateFromTimestamp(createdAt).finalFormattedDate,
                            status, // Pending, Accepted, Refused
                        })
                    }

                    setInvoices(invoices_arr)
                }
            } catch (error) {
                console.log(error.message)

            } finally {
                setLoadingInvoices(false)
            }
        }


        // Get customer and invoices
        fetchData()
    }, [invoices])
    // }, [])



    return (
        <div className="flex flex-col gap-5">
            <CustomersBreadcrumb customer_id={params.customerId} current_page_key={'manageInvoices'} />
            <TopPage pageName={`Manage invoices of `} customer={customer} admin={adminData.admin_data} />

            {
                !customer && <SkeletenTemplate />
            }

            {
                customer &&
                <div className='flex flex-col'>
                    <Table
                        removeWrapper
                        aria-label="Controlled table example with dynamic content"
                        selectionMode="multiple"
                        selectedKeys={selectedKeys}
                        onSelectionChange={setSelectedKeys}
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

                        <TableBody isLoading={loadingInvoices} loadingContent={<LoadingInvoices full_name={`${customer.first_name} ${customer.last_name}`} />} emptyContent={customer && <NoInvoicesToDisplay full_name={`${customer.first_name} ${customer.last_name}`} />}>
                            {
                                invoices && !loadingInvoices &&
                                    invoices.map(({ key, invoice_id, attachement, createdAt, status, invoice_amount }) => (
                                    <TableRow key={key} className='border-b-1 last:border-none border-opacity-20'>
                                        <TableCell className='flex items-center gap-2'>
                                            <div className='max-w-[180px]'>
                                                <p className='text-base truncate'>{attachement.name} </p>
                                                <p className='text-gray-500 text-xs truncate'>{attachement.description}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div>
                                                {
                                                    status[1] == 'pending' &&
                                                    <Status color={"bg-blue-600"} text={status[0]} borderColor={'border-blue-400'} />
                                                }
                                                {
                                                    status[1] == 'accepted' &&
                                                    <Status color={"bg-green-700"} text={status[0]} borderColor={'border-green-400'} />
                                                }
                                                {
                                                    status[1] == 'refused' &&
                                                    <Status color={"bg-yellow-600"} text={status[0]} borderColor={'border-red-400'} />
                                                }
                                                {
                                                    status[1] == 'deleted' &&
                                                    <Status color={"bg-red-600"} text={status[0]} borderColor={'border-red-400'} />
                                                }
                                                {
                                                    status[1] == 'refuse_with_comment' &&
                                                    <Status color={"bg-yellow-600"} text={status[0]} borderColor={'border-yellow-400'} with_text={status[2] ? status[2] : ''} />
                                                }
                                            </div>

                                        </TableCell>
                                        <TableCell>
                                            <p className='text-xs rounded-3xl px-3 py-1 w-fit'>{createdAt}</p>
                                        </TableCell>

                                        {/* <TableCell><ManageInvoicesActionsDropbox invoice_src={`${attachement.file_type == 'image' ? app_images_routes.invoices.photo : app_images_routes.invoices.file}/${attachement.src}`} id={invoice_id} admin_id={_id} /></TableCell> */}
                                        <TableCell>
                                                <ManageInvoicesActionsDropbox invoice_src={`${app_images_routes.invoices.customers}/${attachement.src}`} id={invoice_id} admin_id={adminData.admin_data._id} invoice_amount={invoice_amount} />
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </div>
            }

        </div >
    )
}