"use client"

import { useCookies } from "react-cookie";
import { CustomersBreadcrumb } from "../../components/Breadcrumb";
import { admins_api, steps_api } from "@/constants/_api";
import { useEffect, useState } from "react";
import createToast from "@/app/assets/components/toast";
import PageName from "@/app/(admin)/assets/components/PageName";
import { Skeleton } from "@nextui-org/skeleton";
import { capitalize } from "../../../../../utils";
import { Button } from "@nextui-org/button";
import ChangeStepStatusButton from "./ChangeStepStatusButton";
import CustomerPayload from "./CustomerPayload";
import customers_steps from "@/constants/customers_steps";
import { Badge } from "@/components/tremorComponents/Badge";
import { customers_statuses } from "@/constants/constants";
import UniversityDocuments from "./UniversityDocuments";
import ApplicationFeeAndInvoice from "./ApplicationFeeAndInvoice";
import { ArrowWithoutLineIcon, NormalArrowIcon } from "@/constants/Icons";
import VisaDecision from "./VisaDecision";


export default function ManageSpecialStepForm({ parameters }) {
    const [customer, setCustomer] = useState()
    const [step, setStep] = useState(null)
    const [currentStep, setCurrentStep] = useState(null)
    const [adminData, setAdminData] = useCookies('admin_data')
    const [isError, setIsError] = useCookies(false)



    // Steps states 
    const [showUniversityDocuments, setShowUniversityDocuments] = useState(false)
    const [showApplicationFeeModel, setShowApplicationFeeModel] = useState(false)
    const [showVisaModel, setShowVisaModel] = useState(false)


    // Get this customer 
    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await fetch(`${admins_api}/getSpecialcustomers`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ customer_id: parameters.customerId }),
                    cache: 'no-cache',
                    credentials: 'include'
                })

                const result = await response.json()


                if (result.err) {
                    createToast(result.msg)
                } else {
                    // Set customer state 
                    setCustomer(result.customer)
                }
            } catch (error) {
                console.log(error.message)
            }
        }
        // Get customer and invoices
        fetchData()
    }, [])


    // Get this special step data 
    useEffect(() => {

        const fetchSpecialStep = async () => {
            try {

                const response = await fetch(`${steps_api}/specialStep/${parameters.customerId}/${parameters.stepId}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    cache: 'no-cache',
                    credentials: 'include'
                })

                const result = await response.json()



                if (result.err) {
                    setIsError(true)
                } else {
                    // Set step state 
                    setStep(result.data)
                }
            } catch (error) {
                console.log(error.message)
                setIsError(true)
            }
        }
        // Get customer and invoices
        fetchSpecialStep()



        // Update steps status 
        if (step && step.status == 'pending') {

            async function update_step_status() {
                try {
                    const change_step_status = await fetch(`${steps_api}/changeStepStatus`, {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            status: 'in_process',
                            customer_id: parameters.customerId,
                            step_id: parameters.stepId,
                            admin_id: adminData.admin_data._id
                        }),
                        cache: 'no-cache',
                        credentials: 'include'
                    })

                    const result = await change_step_status.json()


                    // console.log(result)

                } catch (error) {
                    console.log(error.message)
                }
            }

            update_step_status()
        }



        if (step && step.status == 'queued') {

            if (step.step_id == 'step_2') {
                setShowUniversityDocuments(true)
            } else if (step.step_id == 'step_3') {
                setShowApplicationFeeModel(true)
            }
        }




        // Set the current step  
        const this_step = customers_steps.filter(step => step.key == parameters.stepId)[0]
        setCurrentStep(this_step)

    }, [step])



    function goBack() {
        window.history.back();
    }




    return (
        <div>
            {
                customer && adminData && step &&
                <>

                    <div className="flex flex-col gap-2 min-h-0">
                        <Button
                            onClick={() => goBack()}
                            className="w-fit p-1 h-fit min-w-0 font-semibold flex items-center gap-0 text-light-1 border-1">
                            <ArrowWithoutLineIcon />
                            Back
                        </Button>

                        <CustomersBreadcrumb customer_id={parameters.customerId} current_page_key={'manageSteps'} />
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        {
                            customer && step && currentStep &&

                            <PageName
                                pageName={`Manage ${currentStep.idName} for `}
                                beside={
                                    <div className="flex items-center gap-2">
                                        <p className="text-own_primary-1">{capitalize(customer.first_name)} {capitalize(customer.last_name)}</p>


                                        {
                                            Object.values(customers_statuses).map(({ key, name }) => {

                                                if (key == step.status) {
                                                    var variant = 'default'


                                                    if (key == 'accepted') {
                                                        variant = 'success'
                                                    } else if (key == 'refused') {
                                                        variant = 'error'
                                                    } else if (key == 'files_refused') {
                                                        variant = 'error'
                                                    } else if (key == 'in_process') {
                                                        variant = 'warning'
                                                    } else if (key == 'current') {
                                                        variant = 'default'
                                                    } else if (key == 'new_files') {
                                                        variant = 'default'
                                                    }

                                                    return <Badge key={key} variant={variant}>{name.en}</Badge>
                                                }
                                            })
                                        }

                                    </div>
                                }
                            />

                        }
                        {
                            (!customer || !currentStep) &&
                            <div className=" flex items-center gap-2">
                                <Skeleton className="h-7 w-[200px] rounded-lg" />
                                <Skeleton className="h-7 w-[90px] rounded-lg" />
                            </div>
                        }


                        <ChangeStepStatusButton parameters={parameters} current_step={step ? step.status : ''} customer_id={parameters.customerId} step_id={parameters.stepId} />
                    </div>


                    {/* Customer payload, the files that they sent to us  */}
                    <CustomerPayload admin_id={adminData.admin_data._id} customer={customer} step={step} isError={isError} />



                    {/* University documents model  */}
                    <UniversityDocuments customer_id={parameters.customerId} isOpen={showUniversityDocuments} onOpenChange={setShowUniversityDocuments} />

                    {/* Application fee model  */}
                    {/* <ApplicationFeeAndInvoice parameters={parameters} customer_id={parameters.customerId} isOpen={showApplicationFeeModel} onOpenChange={setShowApplicationFeeModel} /> */}



                    {/* Visa decision model  */}
                    <VisaDecision parameters={parameters} customer_id={parameters.customerId} isOpen={showVisaModel} onOpenChange={setShowVisaModel} />

                </>
            }
        </div>
    )
}
