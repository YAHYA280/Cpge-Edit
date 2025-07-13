"use client"

import createToast from "@/app/assets/components/toast";
import HtmlActionHandlerButton from "@/app/assets/smallComponents/HtmlActionHandlerButton"


import { RadioGroup, Radio } from "@nextui-org/radio";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";


import { admins_api } from "@/constants/_api";
import { CheckMarkCircleIcon, CyrcleXMarkIcon, FeeIcon, FileIcon, InvoiceIcon, SchoolIcon } from "@/constants/Icons";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import HtmlInput from "@/app/assets/smallComponents/HtmlInput";
import axios from "axios";
import { calculateFileSize } from "@/constants/functions";

export default function AdmissionLetterUploadArea({ parameters, customer_id, isOpen, onOpenChange }) {

    const [adminData, setAdminData] = useCookies('admin_data')


    const [admissionLetter, setAdmissionLetter] = useState(null)

    const [isLoading, setIsLoading] = useState(null)






    // Set chosen data 
    function setState(e, target) {
        var value = e?.target?.value

        if (target == 'admission_letter') {
            setAdmissionLetter(e)
        }

    }



    // Submit step 3 details function 
    async function submitStep4Details() {
        const step_id = 'step_6'


        const { role, _id } = adminData.admin_data

        var isValid = true

        // If the user chose application fee option, and has not chose the invoice, then set false 
        if (!admissionLetter || admissionLetter.length == 0) {
            isValid = false
        }


        if (isValid) {
            setIsLoading(true)

            try {
                const formData = new FormData()

                formData.append('step_id', step_id)
                formData.append('customer_id', customer_id)
                formData.append('admin_id', _id)
                formData.append('admission_letter', admissionLetter[0].file)


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


    }



    return (
        <div>

            <Modal isOpen={isOpen} scrollBehavior="inside" backdrop="blur" aria-labelledby="modal-title" aria-modal="true">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col text-center items-center gap-2 justify-center">
                                <SchoolIcon special_size={50} className="text-yellow-400" />
                                <p>Upload admission letter file</p>
                            </ModalHeader>
                            <ModalBody>
                                <div className="flex flex-col gap-5">



                                    {/* Pre-admission letter upload area  */}
                                    <HtmlInput
                                        type="customized_file"
                                        placeholder={{ placeholder: 'Admission letter', icon: <SchoolIcon /> }}
                                        onChange={(files) => setState(files, 'admission_letter')}
                                    />



                                    {
                                        admissionLetter && admissionLetter.length > 0 &&

                                        <div className="flex items-center justify-between p-2 border-1 rounded-xl bg-light-2 ">
                                            <div className="flex items-center gap-3">

                                                <span className="p-2 rounded-lg border-1">
                                                    <FileIcon special_size={30} />
                                                </span>
                                                <span className="max-w-[250px]">
                                                    <p className="text-sm sm:text-base font-medium truncate">{admissionLetter[0]?.fileName}</p>
                                                    <span className="text-xs sm:text-sm flex items-center gap-1">
                                                        <p className="flex items-center gap-1">
                                                            {admissionLetter[0]?.extension.toUpperCase()}
                                                        </p>
                                                        <span className="h-1 w-1 rounded-full bg-dark-3" />
                                                        <p className="flex items-center gap-1">
                                                            {calculateFileSize(admissionLetter[0]?.size)}
                                                        </p>
                                                    </span>

                                                </span>
                                            </div>

                                        </div>
                                    }


                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <HtmlActionHandlerButton
                                    onClick={() => submitStep4Details()}
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
