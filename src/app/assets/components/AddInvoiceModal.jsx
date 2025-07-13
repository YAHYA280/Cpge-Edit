"use client"

import { Button } from "@nextui-org/button"
import { useState } from "react"
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogFooter,
} from "@/components/ui/alert-dialog"
import HtmlActionHandlerButton from "../smallComponents/HtmlActionHandlerButton"
import HtmlInput from "../smallComponents/HtmlInput"
import { AddWalletIcon, CheckMarkCircleIcon, MoneyIcon, SaveIcon, SendMessageIcon } from "@/constants/Icons"
import { cn } from "@/lib/utils"
import FilesVisibleTemplate from "./FilesVisibleTemplate"
import { useLocale, useTranslations } from "next-intl"
import { getLanguageDetails } from "@/constants/functions"
import createToast from "./toast"
import { useCookies } from "react-cookie"
import { invoices_api } from "@/constants/_api"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, RadioGroup, Radio } from "@nextui-org/react";
import Image from "next/image"
import ShinyButton from "@/components/magicui/shiny-button";

export default function AddInvoiceModal({ className, btnClassNames }) {
    const [cookies, setCookies] = useCookies(['customer_data']);


    const t = useTranslations()
    const currentLanguage = getLanguageDetails(useLocale())
    const active_language = currentLanguage.key
    const active_dir = currentLanguage.direction


    var [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false)
    var [isLoading, setIsLoading] = useState(false)
    var [invoiceFiles, setInvoiceFiles] = useState()
    const [isSentInvoiceAlertOpen, setIsSentInvoiceAlertOpen] = useState(false)






    // Open the invoice modal 
    function handleClick() {
        setIsInvoiceModalOpen(true)
    }



    // Get the uploaded invoice file 
    function handleGetInvoiceFile(files) {
        // const invoice_file = files[0]
        console.log(files)
        setInvoiceFiles(files)
    }




    // Submit the uploaded invoice 
    async function handleAddInvoice() {
        // If there is a selected invoice 
        if (invoiceFiles && invoiceFiles.length > 0) {

            try {
                // Start button loading 
                setIsLoading(true)


                const { _id } = cookies.customer_data

                const invoice_file = invoiceFiles[0].file
                const formData = new FormData()
                console.log(invoice_file)
                formData.append('invoice', invoice_file)
                formData.append('customer_id', _id)




                // Send currency updates to server 
                const response = await fetch(`${invoices_api}/addInvoice/customer`, {
                    method: 'POST',
                    body: formData,
                    cache: 'no-cache',
                    credentials: 'include'
                })

                const result = await response.json()

                console.log(result)

                if (!result.err) {
                    setIsSentInvoiceAlertOpen(true)
                    // Close upload invoice modal 
                    setIsInvoiceModalOpen(false)
                    // Empty invoice state 
                    setInvoiceFiles()
                }


            } catch (error) {
                console.log('error', error)
            } finally {
                // Stop button loading 
                setIsLoading(false)
            }



        } else { // Show warning message
            createToast({ msg: 'Please choose an invoice', status: 'warning' })
        }
    }

    return (
        <div className={className}>
           
            <ShinyButton
                onClick={handleClick}
                text={t('global.header.new_invoice')}
                icon={<AddWalletIcon />}
                className={'rounded-xl'}
            />

            {/* TODO: Put a model here for adding a new invoice, contains the invoice file  */}
            <AlertDialog open={isInvoiceModalOpen} onOpenChange={setIsInvoiceModalOpen}>
                <AlertDialogContent className="w-full h-full sm:h-fit sm:max-w-[425px] bg-light-1 dark:bg-dark-1" dir={active_dir}>

                    <div className="flex flex-col gap-1 justify-center items-center">
                        <AddWalletIcon special_size={40} />

                        <p className="text-lg font-semibold">{t('global.header.add_invoice_modal.title')}</p>
                        <p className="text-text_color-1 text-xs">{t('global.header.add_invoice_modal.description')}</p>
                    </div>

                    <div className="flex items-center flex-col gap-2 w-full">

                        <HtmlInput
                            type="customized_file"
                            placeholder={{ placeholder: '', icon: '' }}
                            onChange={(files) => handleGetInvoiceFile(files)}
                        />


                        {
                            invoiceFiles &&
                            <FilesVisibleTemplate myFiles={invoiceFiles} box_className={''} />
                        }
                    </div>

                    <AlertDialogFooter className="flex items-center gap-3">
                        <Button
                            onClick={() => setIsInvoiceModalOpen(false)}
                            className="w-full"
                        >
                            {t('global.cancel')}
                        </Button>


                        <HtmlActionHandlerButton
                            text={t('global.header.add_invoice_modal.action_button')}
                            icon={<SendMessageIcon />}
                            onClick={handleAddInvoice}
                            isLoaderVisible={isLoading}
                        />
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>



            {/* Success sent invoice alert */}
            <Modal
                isOpen={isSentInvoiceAlertOpen}
                backdrop={'blur'}
                onOpenChange={setIsSentInvoiceAlertOpen}
                scrollBehavior={'inside'}
            >
                <ModalContent dir={active_dir}>
                    <>
                        <ModalBody>

                            <div className="flex flex-col justify-center items-center gap-5">
                                <Image
                                    src={'/illustrations/invoice-sent.webp'}
                                    height={200}
                                    width={200}
                                    alt="Invoice sent image"
                                />
                                <p className="font-semibold text-lg">{t('invoicesPage.the_invoice_was_sent_message_title')}</p>
                                <p className="text-center">
                                    {t('invoicesPage.the_invoice_was_sent_message_description')}
                                </p>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <div className="w-full" >
                                <Button className="w-full bg-own_primary-1 text-dark-1 font-semibold flex items-center justify-center" >
                                    <CheckMarkCircleIcon />
                                    {t('global.ok')}
                                </Button>
                            </div>
                        </ModalFooter>
                    </>
                </ModalContent>
            </Modal>
        </div>
    )
}
