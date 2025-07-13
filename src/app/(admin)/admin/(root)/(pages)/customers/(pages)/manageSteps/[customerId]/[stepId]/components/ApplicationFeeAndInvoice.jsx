"use client"

import createToast from "@/app/assets/components/toast";
import HtmlActionHandlerButton from "@/app/assets/smallComponents/HtmlActionHandlerButton"


import { RadioGroup, Radio } from "@nextui-org/radio";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";


import { admins_api } from "@/constants/_api";
import { CheckMarkCircleIcon, CyrcleXMarkIcon, FeeIcon, FileIcon, InvoiceIcon } from "@/constants/Icons";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import HtmlInput from "@/app/assets/smallComponents/HtmlInput";
import axios from "axios";
import { calculateFileSize } from "@/constants/functions";

export default function ApplicationFeeAndInvoice({ parameters, customer_id, isOpen, onOpenChange }) {

    const [adminData, setAdminData] = useCookies('admin_data')


    // Statis data 
    const [applicationFeeOptions, setApplicationFeeOptions] = useState()

    // User chosen data 
    const [chosenApplicationFeeOptions, setChosenApplicationFeeOptions] = useState()
    const [applicationFeeInvoice, setApplicationFeeInvoice] = useState(null)


    const [isLoading, setIsLoading] = useState(null)



    // Set application fee options 
    useEffect(() => {
        var allOptions = []

        allOptions.push({
            id: 'true',
            text: 'Yes, with application fee',
            startContent: <CheckMarkCircleIcon />,
        })
        allOptions.push({
            id: "false",
            text: 'No, without application fee',
            startContent: <CyrcleXMarkIcon />,
        })

        setApplicationFeeOptions(allOptions)

    }, [])



    // Set chosen data 
    function setState(e, target) {
        var value = e?.target?.value

        if (target == 'is_with_application_fee') {

            // If the chosen value is false, then remove any value from the applicationFeeInvoice state 
            if (value == 'false') {
                setApplicationFeeInvoice(null)
            }

            setChosenApplicationFeeOptions(value)
        }

        else if (target == 'application_fee_invoice') {
            setApplicationFeeInvoice(e)
        }
    }



    // Submit step 2 details function 
    async function submitStep3Details() {
        const step_id = 'step_3'

        // console.log('clicked', step_id, customer_id)


        // return

        const { role, _id } = adminData.admin_data

        if (step_id && chosenApplicationFeeOptions) {
            var isValid = true

            // If the user chose application fee option, and has not chose the invoice, then set false 
            if (chosenApplicationFeeOptions == 'true' && !applicationFeeInvoice) {
                isValid = false
            }



            if (isValid) {
                setIsLoading(true)

                try {
                    const formData = new FormData()

                    formData.append('step_id', step_id)
                    formData.append('customer_id', customer_id)
                    formData.append('admin_id', _id)
                    formData.append('is_with_university_application_fee', chosenApplicationFeeOptions)

                    // Check if the application fee option is true, if so, then add the invoice file into formData 
                    if (chosenApplicationFeeOptions == 'true') {
                        formData.append('applicationFeeInvoice', applicationFeeInvoice[0].file)
                    }


                    const config = { headers: { 'Content-Type': 'multipart/form-data' } }
                    const response = await axios.post(`${admins_api}/updateSomeDataOfCustomer`, formData, config)
                    const result = response.data

                    console.log(result)
                    if (result.err) {
                        createToast(result.msg)
                    } else {
                        onOpenChange(false)
                    }

                } catch (error) {
                    console.log(error)
                } finally {
                    setIsLoading(false)
                }

            } else {
                createToast({ msg: 'Please fill all required inputs.', status: 'error' })
            }

        } else {
            createToast({ msg: 'Please fill all required inputs.', status: 'error' })
        }
    }



    return (
        <div>

            <Modal isOpen={isOpen} scrollBehavior="inside" backdrop="blur" aria-labelledby="modal-title" aria-modal="true">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col text-center items-center gap-2 justify-center">
                                <FeeIcon special_size={50} className="text-yellow-400" />
                                <p>Choose if university has application fee or no </p>
                            </ModalHeader>
                            <ModalBody>
                                <div className="flex flex-col gap-5">


                                    {/* Is with application fee or no */}
                                    {
                                        applicationFeeOptions &&
                                        <RadioGroup
                                            onChange={(e) => setState(e, 'is_with_application_fee')}
                                        >
                                            <p className="text-sm">Application fee options</p>
                                            {applicationFeeOptions.map((option) => (
                                                <Radio key={option.id} value={option.id}  >
                                                    <p className="text-sm">{option.text}</p>
                                                </Radio>
                                            ))}
                                        </RadioGroup>
                                    }



                                    {/* If the application fee value is "true", then show this file input  */}
                                    {
                                        chosenApplicationFeeOptions && (chosenApplicationFeeOptions == "true") &&
                                        <HtmlInput
                                            type="customized_file"
                                            placeholder={{ placeholder: 'Application fee invoice', icon: <InvoiceIcon /> }}
                                            onChange={(files) => setState(files, 'application_fee_invoice')}
                                        />
                                    }



                                    {
                                        applicationFeeInvoice && applicationFeeInvoice.length > 0 &&

                                        <div className="flex items-center justify-between p-2 border-1 rounded-xl bg-light-2 ">
                                            <div className="flex items-center gap-3">

                                                <span className="p-2 rounded-lg border-1">
                                                    <FileIcon special_size={30} />
                                                </span>
                                                <span className="max-w-[250px]">
                                                    <p className="text-sm sm:text-base font-medium truncate">{applicationFeeInvoice[0]?.fileName}</p>
                                                    <span className="flex items-center gap-1">
                                                        <p className="text-xs sm:text-sm flex items-center gap-1">
                                                            {applicationFeeInvoice[0]?.extension.toUpperCase()}
                                                        </p>
                                                        <span className="h-1 w-1 rounded-full bg-dark-3" />
                                                        <p className="text-[10px] sm:text-sm flex items-center gap-1">
                                                            {calculateFileSize(applicationFeeInvoice[0]?.size)}
                                                        </p>
                                                    </span>

                                                </span>
                                            </div>


                                            {/* <DownloadButton
                                            url={type == "contract" ? `${app_images_routes.steps.contracts}/${file.name}` : ''}
                                            fileName={file.name}
                                            text={t('global.download')}
                                            textClassName="hidden sm:flex"
                                        /> */}

                                        </div>
                                    }


                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <HtmlActionHandlerButton
                                    onClick={() => submitStep3Details()}
                                    className="w-full px-[15px]"
                                    text={`Ok, send it!`}
                                    isLoaderVisible={isLoading}
                                />
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>


        </div>
    )
}
