"use client"

import PageTitle from "../../../assets/components/PageTitle"
import { useEffect, useState } from "react"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { invoices_api } from "@/constants/_api"
import { useCookies } from "react-cookie"
import createToast from "@/app/assets/components/toast"
import { extractDateFromTimestamp, formatNumberWithCommas, getLanguageDetails, timeDifference } from "@/constants/functions"
import { cn } from "@/lib/utils"
import DaysCalculator from "@/app/assets/components/DaysCalculator"
import { Popover, PopoverTrigger, PopoverContent, Button, Skeleton, Tooltip } from "@nextui-org/react";
import { AcceptWalletIcon, AddressIcon, DownloadFileIcon, UserIcon, ViewFileIcon } from "@/constants/Icons"
import CustomizedCallOut from "@/app/assets/components/CustomizedCallOut"
import ActivePriceNumber from "@/app/(user)/(root)/components/PriceNumber"
import LoadingInvoicesSkeleten from "./LoadingInvoicesSkeleten"
import { useLocale, useTranslations } from "next-intl"
import ToClipboard from "@/app/assets/smallComponents/ToClipboard"
import Link from "next/link"
import { app_images_routes } from "@/constants/routes"





export default function InvoicesTable() {
    const t = useTranslations()
    const currentLanguage = getLanguageDetails(useLocale())
    const active_language = currentLanguage.key
    const active_dir = currentLanguage.direction




    const [cookies, setCookies] = useCookies(['customer_data'])

    const [loadingInvoices, setLoadingInvoices] = useState(false)
    const [invoices, setInvoices] = useState()
    const [totalPaid, setTotalPaid] = useState()
    // const [totalAmount, setTotalAmount] = useState()
    const [stillToPay, setStillToPay] = useState()





    useEffect(() => {
        const { _id } = cookies.customer_data

        // Get this customer invoices
        const fetchInvoices = async (customer_id) => {

            try {
                // Start loading invoices 
                setLoadingInvoices(true)



                const response = await fetch(`${invoices_api}/special_customer/${customer_id}`, {
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
                    // console.log(result.invoices)



                    const invoices_arr = []
                    var total = 0
                    var total_verified_payment = 0

                    for (let i = 0; i < result.invoices.length; i++) {

                        var { id, _id, attachement, type, name, description, createdAt, updatedAt, status, refuse_comment, invoice_amount, transaction_id } = result.invoices[i]

                        if (status == 'pending') {
                            status = ['Pending', 'pending']
                        } else if (status == 'accepted') {
                            status = ['Accepted', 'accepted']


                            // calculate total verified payment => "With accepted status"
                            total_verified_payment += Number(invoice_amount)

                        } else if (status == 'refused') {
                            status = ['Refused', 'refused']
                        } else if (status == 'refuse_with_comment') {
                            status = ['Refuse with comment', 'refuse_with_comment', refuse_comment] // The 3rd index is for the refuse reason
                        }

                        invoices_arr.push({
                            key: id,
                            invoice_id: _id,
                            attachement: {
                                src: attachement,
                                file_type: type,
                                name,
                                description,
                            },

                            createdAt,
                            createdAt__formatted: extractDateFromTimestamp(createdAt).finalFormattedDate,

                            updatedAt: timeDifference(updatedAt),
                            amount: invoice_amount,
                            refuse_comment,
                            transaction_id,
                            status, // Pending, Accepted, Refused
                        })

                        // Calculate total amount 
                        total += Number(invoice_amount)

                    }


                    const this_customer = result.customer

                    // Calculate still to pay, package_price - total paid 
                    const still_to_pay = this_customer.package_price - total_verified_payment
                    setStillToPay(still_to_pay)



                    // Set invoices 
                    setInvoices({
                        invoices: invoices_arr,
                        customer: this_customer
                    })


                    // Set total paid invoices 
                    setTotalPaid(total_verified_payment)
                }
            } catch (error) {
                console.log(error.message)

            } finally {
                setLoadingInvoices(false)
            }
        }

        fetchInvoices(_id)
    }, [])


    return (
        <div className="flex flex-col gap-5 w-full max-width">
            <PageTitle title={t('invoicesPage.my_invoices')} description={t('invoicesPage.here_are_all_your_invoices')} />


            {
                // stillToPay && totalPaid &&
                <CustomizedCallOut variant={'warning'} title={t(`global.note`)} icon={<AcceptWalletIcon />}>
                    <div className="flex items-center flex-wrap gap-1">
                        {t(`invoicesPage.the_rest_to_pay_description.you_have_paid`)}

                        {/* If there is no totalPaid  */}
                        {
                            !totalPaid &&
                            <Skeleton className={cn('h-3 w-10 rounded-xl')} />
                        }
                        {
                            totalPaid &&
                            <ActivePriceNumber number={totalPaid} className={'text-own_primary-1'} />
                        }

                        {t(`invoicesPage.the_rest_to_pay_description.and_you_still_have_to_pay`)}


                        {/* If there is no stillToPay  */}
                        {
                            !stillToPay &&
                            <Skeleton className={cn('h-3 w-10 rounded-xl')} />
                        }
                        {
                            stillToPay &&
                            <ActivePriceNumber number={stillToPay} className={'text-own_primary-1'} />
                        }
                    </div>

                </CustomizedCallOut>
            }


            {
                loadingInvoices &&
                <LoadingInvoicesSkeleten />
            }



            {
                invoices && !loadingInvoices &&
                <div className="flex flex-col gap-5">
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">

                        {
                            invoices.invoices.map(({ invoice_id, attachement, createdAt, updatedAt, status, amount, refuse_comment, transaction_id }) => (
                                <div key={invoices} className="p-3 rounded-xl border-1 flex flex-col gap-5">

                                    {/* Invoice details  */}
                                    <div className="w-full flex justify-between">
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-2">

                                                <span
                                                    className={cn('h-2 w-2 rounded-full', {
                                                        'bg-blue-600': status[1] == 'pending',
                                                        'bg-green-500': status[1] == 'accepted',
                                                        'bg-red-600': status[1] == 'refused',
                                                        'bg-yellow-600': status[1] == 'refuse_with_comment',
                                                    })}
                                                />

                                                {t(`global.statuses.${status[1]}`)}

                                                {
                                                    status[1] == 'refuse_with_comment' &&
                                                    <div>
                                                        <Popover showArrow>
                                                            <PopoverTrigger>
                                                                <Button className="min-w-0 p-0 h-[20px] w-[20px] flex items-center justify-center rounded-full bg-own_primary-1 text-dark-1">?</Button>
                                                            </PopoverTrigger>
                                                            <PopoverContent dir={active_dir}>
                                                                <div className="flex flex-col">
                                                                    <p className="font-semibold">{t('invoicesPage.refuse_reason')}</p>
                                                                    <p>{refuse_comment || ('This is the text that is going to be showed.')}</p>
                                                                </div>
                                                            </PopoverContent>
                                                        </Popover>
                                                    </div>
                                                }

                                            </div>



                                            {/* Updated date  */}
                                            <div className={cn('flex items-center gap-1 text-xs', {
                                                'ml-4': active_dir == 'ltr',
                                                'mr-4': active_dir == 'rtl',
                                            })}>
                                                <p>
                                                    {t(`invoicesPage.invoice_date`)}
                                                </p>

                                                <Tooltip showArrow size="sm" delay={1000} content="I am a tooltip">
                                                    <div className="flex items-center gap-1 text-text_color-1">
                                                        <p>{t('global.before')}</p>
                                                        <DaysCalculator date={updatedAt} />
                                                    </div>
                                                </Tooltip>
                                            </div>

                                        </div>


                                        <div className="flex items-center gap-2">
                                            <p className="px-2 py-1 rounded-xl border-1 h-fit w-fit text-xs" dir={'ltr'}>#{transaction_id}</p>

                                            <ToClipboard
                                                value={transaction_id}
                                                isButtonOnly={true}
                                                buttonSize={14}
                                                showBackground={false}
                                            />
                                        </div>
                                    </div>


                                    {/* Bill to details  */}
                                    <div className="flex flex-col gap-2">

                                        <div className="flex flex-col gap-2">
                                            <h3 className="font-semibold text-xs text-muted-foreground border-1 rounded-xl p-1 px-2 w-fit">{t('invoicesPage.bill_to')}</h3>

                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2">
                                                    <UserIcon special_size={14} />
                                                    <p className="text-sm">{`${invoices.customer.first_name} ${invoices.customer.last_name}`}</p>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <AddressIcon special_size={14} />
                                                    <p className="text-sm">{invoices.customer.address}</p>
                                                </div>
                                            </div>

                                        </div>

                                        {/* <div className="flex flex-col gap-1">

                                            <h3 className="font-semibold text-xs text-muted-foreground border-1 rounded-xl p-1 px-2 w-fit">{t('invoicesPage.description')}</h3>

                                            <div className="flex flex-col gap-1">
                                                <p className="text-sm text-text_color-1">{attachement.description}</p>
                                            </div>

                                        </div> */}



                                        <div className="flex flex-col gap-1">

                                            <h3 className="font-semibold text-xs text-muted-foreground border-1 rounded-xl p-1 px-2 w-fit">{t('global.attachement')}</h3>

                                            <div className="flex flex-col gap-1">

                                                <Button
                                                    href={`${app_images_routes.invoices.customers}/${attachement.src}`}
                                                    as={Link}
                                                    target="_blank"
                                                    color="primary"
                                                    variant="solid"
                                                    className="text-sm flex items-center gap-2"
                                                >
                                                    {t('global.download_attachement')}
                                                    <DownloadFileIcon />
                                                </Button>
                                            </div>

                                        </div>
                                    </div>



                                    {/* Invoice amount  */}
                                    <div className="flex justify-between items-center pt-4 border-t">
                                        <span className="font-semibold">{t('invoicesPage.Total_amount_due')}</span>
                                        <ActivePriceNumber number={amount} className={cn('text-2xl font-bold', {
                                            'ml-auto': active_dir == 'ltr',
                                            'mr-auto': active_dir == 'rtl',
                                        })} />
                                    </div>

                                </div>
                            ))
                        }


                    </div>
                    <div className="rounded-xl overflow-hidden border-1">


                        <Table>

                            <TableHeader>
                                <TableRow>
                                    <TableHead key={1} className="text-justify">{t(`invoicesPage.table.status`)}</TableHead>
                                    <TableHead key={2} className="text-justify">{t(`invoicesPage.table.sent_before`)}</TableHead>
                                    <TableHead key={3} className="text-justify">{t(`invoicesPage.table.transaction_id`)}</TableHead>

                                    <TableHead key={4}
                                        className={cn('', {
                                            'text-right': active_dir == 'ltr',
                                            'text-left': active_dir == 'rtl',
                                        })}>
                                        {t(`invoicesPage.table.amount`)}
                                    </TableHead>

                                </TableRow>
                            </TableHeader>

                            <TableBody className="rounded-xl">
                                {
                                    invoices.invoices.map(({ invoice_id, attachement, description, createdAt, updatedAt, status, amount, refuse_comment, transaction_id }) => (
                                        <TableRow key={invoice_id}>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <div className="flex items-center gap-2">

                                                        <span
                                                            className={cn('h-3 w-3 rounded-full', {
                                                                'bg-blue-600': status[1] == 'pending',
                                                                'bg-green-500': status[1] == 'accepted',
                                                                'bg-red-600': status[1] == 'refused',
                                                                'bg-yellow-600': status[1] == 'refuse_with_comment',
                                                            })}
                                                        />

                                                        {t(`global.statuses.${status[1]}`)}

                                                        {
                                                            status[1] == 'refuse_with_comment' &&
                                                            // status[1] == 'accepted' &&
                                                            <div>
                                                                <Popover showArrow>
                                                                    <PopoverTrigger>
                                                                        <Button className="min-w-0 p-0 h-[20px] w-[20px] flex items-center justify-center rounded-full bg-own_primary-1 text-dark-1">?</Button>
                                                                    </PopoverTrigger>
                                                                    <PopoverContent dir={active_dir}>
                                                                        <div className="flex flex-col">
                                                                            <p className="font-semibold">{t('invoicesPage.refuse_reason')}</p>
                                                                            <p>{refuse_comment || ('This is the text that is going to be showed.')}</p>
                                                                        </div>
                                                                    </PopoverContent>
                                                                </Popover>
                                                            </div>
                                                        }

                                                    </div>



                                                    {/* Updated date  */}
                                                    <div className={cn('flex items-center gap-[3px] text-text_color-1 text-xs', {
                                                        'ml-5': active_dir == 'ltr',
                                                        'mr-5': active_dir == 'rtl',
                                                    })}>
                                                        <p>{t('global.before')}</p>
                                                        <DaysCalculator date={updatedAt} />
                                                    </div>


                                                </div>
                                            </TableCell>

                                            <TableCell>
                                                <DaysCalculator date={timeDifference(createdAt)} className={'text-light-1 font-normal text-sm'} />
                                            </TableCell>

                                            <TableCell>
                                                <p>{transaction_id}</p>
                                            </TableCell>


                                            <TableCell>
                                                <ActivePriceNumber number={amount} className={cn('', {
                                                    'ml-auto': active_dir == 'ltr',
                                                    'mr-auto': active_dir == 'rtl',
                                                })} />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>


                            <TableFooter className="w-full" >
                                <TableRow className="w-full">
                                    <TableCell colSpan={3}>{t('global.total')}</TableCell>
                                    <TableCell className={cn('', {
                                        'text-right': active_dir == 'ltr',
                                        'text-left': active_dir == 'rtl',
                                    })}>
                                        {
                                            totalPaid &&
                                            <div>
                                                <ActivePriceNumber number={totalPaid} className={cn('', {
                                                    'ml-auto': active_dir == 'ltr',
                                                    'mr-auto': active_dir == 'rtl',
                                                })} />
                                            </div>
                                        }

                                        {
                                            !totalPaid &&
                                            <Skeleton className={cn('h-3 w-10 rounded-xl', {
                                                'ml-auto': active_dir == 'ltr',
                                                'mr-auto': active_dir == 'rtl',
                                            })} />
                                        }
                                    </TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>

                </div>
            }

        </div>
    )
}
