"use client"

import createToast from "@/app/assets/components/toast";
import HtmlActionHandlerButton from "@/app/assets/smallComponents/HtmlActionHandlerButton"

import { Select, SelectItem } from "@nextui-org/react";

import { RadioGroup, Radio } from "@nextui-org/radio";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";


import { admins_api, customers_api, documents_api } from "@/constants/_api";
import { CheckMarkCircleIcon, CyrcleXMarkIcon, InvoiceIcon, QuestionFileIcon, SchoolIcon } from "@/constants/Icons";
import { university_documents } from "@/constants/university_documents";
import { Button } from "@nextui-org/button"
import { useEffect, useState } from "react";
import { FileWarning } from "lucide-react";
import { getUniversityDocuments } from "@/constants/get_data";
import { useCookies } from "react-cookie";
import HtmlInput from "@/app/assets/smallComponents/HtmlInput";

export default function UniversityDocuments({ customer_id, isOpen, onOpenChange }) {

    const [adminData, setAdminData] = useCookies('admin_data')

    // Statis data 
    const [universityDocuments, setUniversityDocuments] = useState()
    const [selectedByDefaultuniversityDocuments, setSelectedByDefaultUniversityDocuments] = useState()

    // User chosen data 
    const [chosenUniversityDocuments, setChosenUniversityDocuments] = useState()


    // Is button loading 
    const [isLoading, setIsLoading] = useState(null)


    // Get university documents 
    useEffect(() => {

        async function getDocuments() {

            try {
                const documents = await getUniversityDocuments()


                if (documents.err) {
                    createToast(documents.msg, true)
                } else {

                    var allUniversityDocuments = []
                    const default_university_documents = []


                    // Check if there any documents in the database, if so, then insert it with the existing university documents  
                    var existing_university_documenst = documents?.data.length > 0 ? [...university_documents, ...documents?.data] : university_documents


                    for (let i = 0; i < existing_university_documenst.length; i++) {
                        var { key, names, isSelected } = existing_university_documenst[i]

                        allUniversityDocuments.push({
                            id: key,
                            text: names.en,
                            startContent: '',
                        })


                        // Set default selected document 
                        if (isSelected) {
                            default_university_documents.push(key)
                        }
                    }

                    setUniversityDocuments(allUniversityDocuments)
                    setSelectedByDefaultUniversityDocuments(default_university_documents)


                    // Set chosen by default university documents  
                    setChosenUniversityDocuments(default_university_documents)


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
        if (target == 'university_documents') {
            // If there is value, then separate them into array using ","
            if (value) {
                value = value.split(',')
            } else {
                value = []
            }
            setChosenUniversityDocuments(value)
        }

    }



    // Submit step 2 details function 
    async function submitStep2Details() {
        const step_id = 'step_2'

        const { role, _id } = adminData.admin_data

        if (step_id && chosenUniversityDocuments.length > 0) {

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
                        required_university_documents: chosenUniversityDocuments,
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
                                <p>Choose university documents</p>
                            </ModalHeader>
                            <ModalBody>
                                <div className="flex flex-col gap-5">
                                    {/* University documents  */}
                                    {
                                        universityDocuments &&
                                        <Select
                                            label="University requested documents"
                                            defaultSelectedKeys={selectedByDefaultuniversityDocuments}
                                            startContent={<SchoolIcon />}
                                            placeholder="Select documents"
                                            labelPlacement="outside"
                                            onChange={(e) => setState(e, 'university_documents')}
                                            selectionMode="multiple"
                                        >
                                            {universityDocuments.map((document) => (
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
                                    onClick={() => submitStep2Details()}
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
