"use client"

import PageName from "@/app/(admin)/assets/components/PageName"
import createToast from "@/app/assets/components/toast"
import HtmlInput from "@/app/assets/smallComponents/HtmlInput"
import { Skeleton } from "@nextui-org/skeleton"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"

import HtmlActionHandlerButton from "@/app/assets/smallComponents/HtmlActionHandlerButton"
import SkeletenTemplate from "../../../../editCustomer/[customerId]/components/SkeletenTemplate"
import { invoices_api } from "@/constants/_api"
import { FlagIcon, MoneyIcon, NormalXMarkIcon, SaveIcon, SendMessageIcon, StatusIcon, TransactionIdIcon, UsersIcon } from "@/constants/Icons"
import ToClipboard from "@/app/assets/smallComponents/ToClipboard"
import { all_statuses } from "@/constants/constants"
import { Avatar } from "@nextui-org/react"
import { removeEmptyValues } from "@/constants/functions"
import axios from "axios"

export default function EditInvoiceForm({ invoiceId }) {

    const [cookies, setCookies] = useCookies('admin_data')

    const [isLoading, setIsLoading] = useState(false)
    const [invoice, setInvoice] = useState()
    const [statuses, setStatuses] = useState()


    var [dataToUpdate, setDataToUpdate] = useState()



    useEffect(() => {

        const fetchInvoice = async () => {
            try {

                const response = await fetch(`${invoices_api}/getInvoice/${invoiceId}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    cache: 'no-cache',
                    credentials: 'include'
                })

                const result = await response.json()

                console.log(result)


                // console.log(result)
                if (result.err) {
                    createToast(result.msg)
                } else {
                    setInvoice(result.invoice)
                }
            } catch (error) {
                console.log(error.message)

            }
        }

        fetchInvoice()




        // Set statuses 
        const invoice_statuses = []
        for (let i = 0; i < all_statuses.length; i++) {
            const status = all_statuses[i]
            const key = status.key
            const name = status.name.en
            const icon = status.icon

            if (key != 'refused') {
                invoice_statuses.push({
                    id: key,
                    text: name,
                    startContent: icon,
                })
            }

        }

        setStatuses(invoice_statuses)
    }, [])



    // Set the invoice state when the user changes the inputs values 
    function setInvoiceStateToUpdate(e, target) {
        var value = e.target.value


        setDataToUpdate(prevState => { return { ...prevState, [target]: value } })

        // Update the value from customers object 
        setInvoice(prevState => { return { ...prevState, [target]: value } })
    }



    // // Set state for image 
    // function setImage(files) {
    //     if (files) {
    //         const file = files[0].file
    //         setDataToUpdate(prev => ({ ...prev, customer_photo: file }))
    //         // Update the value from customers object 
    //         setCustomer(prevState => { return { ...prevState, customer_photo: file } })
    //     }
    // }

    // Update invoice function 
    async function handleUpdateInvoice() {

        const { role, _id } = cookies.admin_data

        const formData = new FormData()

        // Remove all empty values from the dataToUpdate object
        const valid_data_to_update = removeEmptyValues(dataToUpdate || {})

        // Check if valid_data_to_update has any valid values
        const isdataToUpdateHasValues = Object.values(valid_data_to_update).length > 0 && valid_data_to_update != undefined && valid_data_to_update != null


        // console.log(dataToUpdate, isdataToUpdateHasValues)

        // return

        // If valid_data_to_update has values
        if (isdataToUpdateHasValues) {
            setIsLoading(true)


            valid_data_to_update.admin_id = _id
            valid_data_to_update.invoice_id = invoiceId


            try {
                const response = await fetch(`${invoices_api}/updateInvoiceByAdmin`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(valid_data_to_update),
                    cache: 'no-cache',
                    credentials: 'include'
                })
                const { err, msg } = await response.json()



                // If there is no errors, empty valid_data_to_update
                if (!err) {
                    // dataToUpdate = {}
                    setDataToUpdate(undefined)
                }
                const content = [msg[0], msg[1]]
                createToast(content, true)


            } catch (error) {
                console.log('some error', error)
            } finally {
                setIsLoading(false)
            }



        }

    }



    return (
        <div className="flex flex-col gap-5">
            <PageName pageName={'Edit invoice'} beside={!invoice ? <Skeleton className="h-7 w-[90px] rounded-lg" /> : <ToClipboard beforeIcon={<TransactionIdIcon />} value={invoice.transaction_id} tooltip_text_before_copy="Copy translaction id" />} />
            {/* <PageName pageName={'Edit invoice'} beside={<ToClipboard value={'invoice.transaction_id'} />} /> */}



            {
                !invoice && <SkeletenTemplate />
            }



            {
                invoice &&
                <div className="flex flex-col gap-5">

                    <div className="grid grid-cols-3 gap-3">
                        <HtmlInput
                            type="name"
                            placeholder="Invoice name"
                            inputValue={invoice.name}
                            onChange={(e) => setInvoiceStateToUpdate(e, 'name')}
                        />
                        <HtmlInput
                            type="name"
                            placeholder="Invoice description"
                            inputValue={invoice.description}
                            onChange={(e) => setInvoiceStateToUpdate(e, 'description')}
                        />


                        <HtmlInput
                            type="number" // Number
                            placeholder={{ text: 'Invoice amount', placeholder: invoice.invoice_amount, icon: <MoneyIcon /> }}
                            inputValue={invoice.invoice_amount}
                            onChange={(e) => setInvoiceStateToUpdate(e, 'invoice_amount')}
                        />


                        {
                            statuses &&
                            <HtmlInput
                                type="select"
                                inputValue={invoice.status}
                                placeholder={{ name: 'Invoice status', placeholder: 'Select status', data: statuses, icon: <StatusIcon /> }}
                                onChange={(e) => setInvoiceStateToUpdate(e, 'status')}
                            />
                        }



                        {/* Check if the status is "refuse_with_comment" */}
                        {
                            invoice.status == 'refuse_with_comment' &&
                            <HtmlInput
                                type="text"
                                placeholder={{ text: "Refuse comment", placeholder: "Write refuse comment", icon: <SendMessageIcon /> }}
                                inputValue={invoice.refuse_comment}
                                onChange={(e) => setInvoiceStateToUpdate(e, 'refuse_comment')}

                            />
                        }



                    </div>






                    <HtmlActionHandlerButton
                        text="Update invoice"
                        icon={<SaveIcon />}
                        onClick={handleUpdateInvoice}
                        isLoaderVisible={isLoading}
                    />
                </div>

            }
        </div>
    )
}