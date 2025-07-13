"use client"

import createToast from "@/app/assets/components/toast";
import HtmlActionHandlerButton from "@/app/assets/smallComponents/HtmlActionHandlerButton"


import { RadioGroup, Radio } from "@nextui-org/radio";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";


import { admins_api } from "@/constants/_api";
import { CheckMarkCircleIcon, CyrcleXMarkIcon, FeeIcon, FileIcon, InvoiceIcon, PassportIcon } from "@/constants/Icons";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import HtmlInput from "@/app/assets/smallComponents/HtmlInput";
import axios from "axios";
import { calculateFileSize } from "@/constants/functions";

export default function VisaDecision({ parameters, customer_id, isOpen, onOpenChange }) {

    const [adminData, setAdminData] = useCookies('admin_data')


    // Statis data 
    const [visaDecisionOptions, setVisaDecisionOptions] = useState()

    // User chosen data 
    const [chosenVisaDecisionOptions, setChosenVisaDecisionOptions] = useState()
    const [visaDecisionFile, setVisaDecisionFile] = useState(null)


    const [isLoading, setIsLoading] = useState(null)



    // // Set application fee options 
    useEffect(() => {
        var allOptions = []

        allOptions.push({
            id: 'true',
            text: 'Yes, visa accepted',
            startContent: <CheckMarkCircleIcon />,
        })
        allOptions.push({
            id: "false",
            text: 'No, visa is not accepted',
            startContent: <CyrcleXMarkIcon />,
        })

        setVisaDecisionOptions(allOptions)

    }, [])



    // Set chosen data 
    function setState(e, target) {
        var value = e?.target?.value

        if (target == 'visa_decision') {

            // If the chosen value is false, then remove any value from the visaDecisionFile state 
            if (value == 'false') {
                setVisaDecisionFile(null)
            }

            setChosenVisaDecisionOptions(value)
        }

        else if (target == 'visa_file') {
            setVisaDecisionFile(e)
        }
    }



    // Submit step 8 details function 
    async function submitVisaDecision() {
        const step_id = 'step_8'

        // console.log('clicked', step_id, customer_id)


        // return

        const { role, _id } = adminData.admin_data

        if (step_id && chosenVisaDecisionOptions) {
            var isValid = true

            // // If the user chose visa option, and has not chose the visa file, then set false 
            // if (chosenVisaDecisionOptions == 'true' && !visaDecisionFile) {
            //     isValid = false
            // }



            if (isValid) {
                setIsLoading(true)

                try {
                    const formData = new FormData()

                    formData.append('step_id', step_id)
                    formData.append('customer_id', customer_id)
                    formData.append('admin_id', _id)
                    formData.append('visa_accepted', chosenVisaDecisionOptions)

                    // Check if the application fee option is true, if so, then add the invoice file into formData 
                    // if (chosenVisaDecisionOptions == 'true') {
                    //     formData.append('visa_file', visaDecisionFile[0].file)
                    // }




                    // // Use .entries() to get the entries as key-value pairs
                    // for (let [key, value] of formData.entries()) {
                    //     console.log(`${key}: ${value}`);
                    // }

                    // return

                    const config = { headers: { 'Content-Type': 'multipart/form-data' } }
                    const response = await axios.post(`${admins_api}/updateCustomer`, formData, config)
                    const result = response.data

                    // console.log(result)
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
                                <p>Choose if the visa has been accepted or no </p>
                            </ModalHeader>
                            <ModalBody>
                                <div className="flex flex-col gap-5">


                                    {/* Is with application fee or no */}
                                    {
                                        visaDecisionOptions &&
                                        <RadioGroup
                                            onChange={(e) => setState(e, 'visa_decision')}
                                        >
                                            <p className="text-sm">Visa decision options</p>
                                            {visaDecisionOptions.map((option) => (
                                                <Radio key={option.id} value={option.id}  >
                                                    <p className="text-sm">{option.text}</p>
                                                </Radio>
                                            ))}
                                        </RadioGroup>
                                    }



                                    {/* If the application fee value is "true", then show this file input  */}
                                    {/* {
                                        chosenVisaDecisionOptions && (chosenVisaDecisionOptions == "true") &&
                                        <HtmlInput
                                            type="customized_file"
                                            placeholder={{ placeholder: 'Visa decision file', icon: <PassportIcon /> }}
                                            onChange={(files) => setState(files, 'visa_file')}
                                        />
                                    } */}



                                    {/* {
                                        visaDecisionFile && visaDecisionFile.length > 0 &&

                                        <div className="flex items-center justify-between p-2 border-1 rounded-xl bg-light-2 ">
                                            <div className="flex items-center gap-3">

                                                <span className="p-2 rounded-lg border-1">
                                                    <FileIcon special_size={30} />
                                                </span>
                                                <span className="max-w-[250px]">
                                                    <p className="text-sm sm:text-base font-medium truncate">{visaDecisionFile[0]?.fileName}</p>
                                                    <span className="flex items-center gap-1">
                                                        <p className="text-xs sm:text-sm flex items-center gap-1">
                                                            {visaDecisionFile[0]?.extension.toUpperCase()}
                                                        </p>
                                                        <span className="h-1 w-1 rounded-full bg-dark-3" />
                                                        <p className="text-[10px] sm:text-sm flex items-center gap-1">
                                                            {calculateFileSize(visaDecisionFile[0]?.size)}
                                                        </p>
                                                    </span>

                                                </span>
                                            </div>

                                        </div>
                                    } */}


                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <HtmlActionHandlerButton
                                    onClick={() => submitVisaDecision()}
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
