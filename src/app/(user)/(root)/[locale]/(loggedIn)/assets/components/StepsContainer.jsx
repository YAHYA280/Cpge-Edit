"use client"

import customers_steps from "@/constants/customers_steps";
import { getLanguageDetails } from "@/constants/functions";
import { useEffect, useState } from "react"
import StepsSkeleten from "./StepsSkeleten";
import { steps_api } from "@/constants/_api";
import { useCookies } from "react-cookie";
import createToast from "@/app/assets/components/toast";
import Step from "./Step";
import PageTitle from "./PageTitle";
import { useLocale, useTranslations } from "next-intl";


export default function StepsContainer() {
    // Translation 
    const t = useTranslations()
    const currentLanguage = getLanguageDetails(useLocale())
    const active_language = currentLanguage.key
    const active_dir = currentLanguage.direction


    const [opendedStepKey, setOpendedStepKey] = useState(false)

    const [allSubmittedSteps, setAllSubmittedSteps] = useState()
    const [customer, setCustomer] = useState()
    const [i, setI] = useState(1)

    const [customerData, setCustomerData] = useCookies(['customer_data'])



    useEffect(() => {
        const fetchData = async () => {
            try {
                var customer_id = customerData?.customer_data?._id

                const response = await fetch(`${steps_api}/${customer_id}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    cache: 'no-cache',
                    credentials: 'include'
                })

                const result = await response.json()

                // console.log(result)

                if (result.err) {
                    createToast(result.msg)
                } else {
                    var steps = []
                    for (let i = 0; i < result.steps.length; i++) {
                        const { step_id: key, status, refuse_comment, _id: id, upload_values, download_values } = result.steps[i]
                        steps.push({
                            id,
                            key,
                            status,
                            refuse_comment,
                            upload_values,
                            download_values
                        })
                    }

                    setAllSubmittedSteps(steps)

                    setCustomer(result?.customer)
                }
            } catch (error) {
                console.log(error.message)
            }
        }

        fetchData()

    }, [allSubmittedSteps, customer])



    return (
        <>
            <div className="flex flex-col gap-[20px] w-full max-width mx-auto">
                <PageTitle title={t('steps_area.your_application_steps')} />



                {
                    allSubmittedSteps && customer && (
                        (() => {
                            let manualIndex = 0; // Track the manual index outside of the map function

                            return customers_steps.map((customer_step, index) => {
                                const key = customer_step.key

                                const customer_id = customerData?.customer_data?._id;
                                const is_with_university_application_fee = customer?.is_with_university_application_fee;
                                const is_local_step = customer_step?.isLocalSteps

                                // The files that customer must upload 
                                var files_to_upload = null

                                // Condition to check for step_3
                                // if (customer_step.key == 'step_3') {
                                if (key == 'step_3') {
                                    // console.log(is_with_university_application_fee)
                                    if (is_with_university_application_fee == false) {
                                        // console.log('it is false')
                                        return; // Skip rendering this step
                                    } else {
                                        // console.log('it is true')

                                    }
                                }


                                // Increment the manual index for steps that are rendered
                                manualIndex++;



                                // Check if this step has local steps, or steps are coming from database
                                if (is_local_step) {
                                    files_to_upload = customer_step?.what_to_do
                                } else {
                                    files_to_upload = allSubmittedSteps?.find(item => item.key == key)
                                }


                                // console.log('allSubmittedSteps', allSubmittedSteps)


                                return (
                                    <Step
                                        key={manualIndex} // Use manual index for the key
                                        customer={customer}
                                        customer_step={customer_step}
                                        allSubmittedSteps={allSubmittedSteps}
                                        index={manualIndex} // Use manual index for the step component
                                        customer_id={customer_id}
                                        is_local_step={is_local_step}
                                        step_key={key}
                                    />
                                );
                            });
                        })()
                    )
                }

                {
                    !allSubmittedSteps &&
                    <StepsSkeleten />
                }
            </div >
        </>

    )
}