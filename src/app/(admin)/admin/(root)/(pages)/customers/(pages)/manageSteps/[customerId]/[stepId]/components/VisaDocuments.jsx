"use client"

import createToast from "@/app/assets/components/toast";
import HtmlActionHandlerButton from "@/app/assets/smallComponents/HtmlActionHandlerButton"

import { Select, SelectItem } from "@nextui-org/react";

import { RadioGroup, Radio } from "@nextui-org/radio";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";


import { admins_api, customers_api, documents_api } from "@/constants/_api";
import { CheckMarkCircleIcon, CyrcleXMarkIcon, InvoiceIcon, QuestionFileIcon, SchoolIcon } from "@/constants/Icons";
import { visa_documents } from "@/constants/visa_documents";
import { Button } from "@nextui-org/button"
import { useEffect, useState } from "react";
import { FileWarning } from "lucide-react";
import { getVisaDocuments } from "@/constants/get_data";
import { useCookies } from "react-cookie";
import HtmlInput from "@/app/assets/smallComponents/HtmlInput";

export default function VisaDocuments({ customer_id, isOpen, onOpenChange }) {

    const [adminData, setAdminData] = useCookies('admin_data')

    // Statis data 
    const [visaDocuments, setVisaDocuments] = useState()
    const [selectedByDefaultvisaDocuments, setselectedByDefaultvisaDocuments] = useState()

    // User chosen data 
    const [chosenVisaDocuments, setChosenVisaDocuments] = useState()


    // Is button loading 
    const [isLoading, setIsLoading] = useState(null)


    // Get visa documents 
    useEffect(() => {

        async function getDocuments() {

            try {
                const documents = await getVisaDocuments()


                if (documents.err) {
                    createToast(documents.msg, true)
                } else {

                    var allVisaDocuments = []
                    const default_visa_documents = []


                    // Check if there any documents in the database, if so, then insert it with the existing visa documents  
                    var existing_visa_documenst = documents?.data.length > 0 ? [...visa_documents, ...documents?.data] : visa_documents


                    for (let i = 0; i < existing_visa_documenst.length; i++) {
                        var { key, names, isSelected } = existing_visa_documenst[i]

                        allVisaDocuments.push({
                            id: key,
                            text: names.en,
                            startContent: '',
                        })


                        // Set default selected document 
                        if (isSelected) {
                            default_visa_documents.push(key)
                        }
                    }

                    setVisaDocuments(allVisaDocuments)
                    setselectedByDefaultvisaDocuments(default_visa_documents)


                    // Set chosen by default visa documents  
                    setChosenVisaDocuments(default_visa_documents)


                }
            } catch (error) {
                console.log(error)
            }
        }

        getDocuments()

    }, [])




    // Set chosen data 
    function setState(e, target) {
        var value = e?.target?.value

        // This one is for the multiple select inputs 
        if (target == 'visa_documents') {
            // If there is value, then separate them into array using ","
            if (value) {
                value = value.split(',')
            } else {
                value = []
            }
            setChosenVisaDocuments(value)
        }

    }


    // Submit step 7 details function 
    async function submitStep7Details() {
        const step_id = 'step_7'

        const { role, _id } = adminData.admin_data

        if (step_id && chosenVisaDocuments.length > 0) {

            try {


                // Start button loading 
                setIsLoading(true)

                const response = await fetch(`${admins_api}/updateSomeDataOfCustomer`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        admin_id: _id,
                        customer_id,
                        step_id,
                        visa_documents: chosenVisaDocuments,
                    }),
                    cache: 'no-cache',
                    credentials: 'include'
                })

                const result = await response.json()


                console.log(result)

                if (result.err) {
                    createToast(result.msg)
                } else {
                    onOpenChange(false)
                }


            } catch (error) {
                console.log(error)
            } finally {
                // Stop button loading 
                setIsLoading(false)
            }



        } else {
            createToast({ msg: 'Please fill all required inputs.', status: 'error' })
        }
    }


    return (
        <div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior="inside" backdrop="blur" aria-labelledby="modal-title" aria-modal="true">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col text-center items-center gap-2 justify-center">
                                <QuestionFileIcon special_size={50} className="text-yellow-400" />
                                <p>Choose visa documents</p>
                            </ModalHeader>
                            <ModalBody>
                                <div className="flex flex-col gap-5">
                                    {/* visa documents  */}
                                    {
                                        visaDocuments &&
                                        <Select
                                            label="Visa requested documents"
                                            defaultSelectedKeys={selectedByDefaultvisaDocuments}
                                            startContent={<SchoolIcon />}
                                            placeholder="Select documents"
                                            labelPlacement="outside"
                                            onChange={(e) => setState(e, 'visa_documents')}
                                            selectionMode="multiple"
                                        >
                                            {visaDocuments.map((document) => (
                                                <SelectItem key={document.id} textValue={document.text}>
                                                    {document.text}
                                                </SelectItem>
                                            ))}
                                        </Select>
                                    }

                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <HtmlActionHandlerButton
                                    onClick={() => submitStep7Details()}
                                    className="w-full px-[15px]"
                                    text="Ok, send it!"
                                />
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>


        </div>
    )
}
