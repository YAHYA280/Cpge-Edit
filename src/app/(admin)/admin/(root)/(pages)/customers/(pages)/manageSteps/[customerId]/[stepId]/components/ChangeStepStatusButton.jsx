"use client"

import { Skeleton, Button, Spinner } from "@nextui-org/react";
import { CheckMarkCircleIcon, CyrcleXMarkIcon, Dots2Icon, StepAcceptedIcon } from "@/constants/Icons";
import { Tooltip } from "@nextui-org/tooltip";
import { useState } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { cn } from "@/lib/utils";
import { steps_api } from "@/constants/_api";
import customers_steps from "@/constants/customers_steps";
import createToast from "@/app/assets/components/toast";
import UniversityDocuments from "./UniversityDocuments";
import ApplicationFeeAndInvoice from "./ApplicationFeeAndInvoice";
import VisaDecision from "./VisaDecision";


export default function ChangeStepStatusButton({ parameters, customer_id, step_id, className = '', current_step = '' }) {

    const [isOpen, setIsOpen] = useState(false)
    const [isActionMessageVisible, setIsActionMessageVisible] = useState(false)

    // This state is, if the next step is step_2 => The university documents step, then show a model, where the admin can choose the university requested documents, and with application fee or no 
    const [showUniversityDocumentsModel, setShowUniversityDocumentsModel] = useState(false)
    const [showApplicationFeeModel, setShowApplicationFeeModel] = useState(false)
    const [showVisaModel, setShowVisaModel] = useState(false)



    async function acceptAndRefuseStep(status) {
        try {
            // Start loading 
            setIsActionMessageVisible(true)

            // get the next step 
            var next_step = ''
            for (let i = 0; i < customers_steps.length; i++) {
                const { key } = customers_steps[i]
                if (key == step_id) {
                    const next = customers_steps[i + 1]
                    if (next) {
                        next_step = next.key
                    }
                }
            }
            // console.log(next_step)


            const response = await fetch(`${steps_api}/acceptAndRefuseStep`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    step_id,
                    customer_id,
                    status,
                    next_step
                }),
                cache: 'no-cache',
                credentials: 'include'
            })

            const result = await response.json()

            if (result.err) {
                createToast(result.msg, true)
            } else {
                createToast({ msg: 'The changes has been applied', status: 'success' })

                console.log(next_step, result)


                // If this steps was accepted 
                if (status == 'accepted') {

                    if (next_step == 'step_2') { // University documents step
                        setShowUniversityDocumentsModel(true)
                    }
                    else if (next_step == 'step_3') { // University documents step
                        setShowApplicationFeeModel(true)
                    }


                    // If the current step is step_8
                    else if (step_id == 'step_8') { // Visa decision step
                        setShowVisaModel(true)
                    }
                }


            }

        } catch (error) {
            console.log(error)
        } finally {
            setIsActionMessageVisible(false)
        }
    }





    return (
        <div>
            <Dropdown backdrop="blur">
                <DropdownTrigger>
                    <Button
                        className={cn('min-w-0 h-fit w-fit p-0 bg-own_primary-1 text-dark-1', className)}
                        onClick={() => setIsOpen(true)}
                    >
                        <div>
                            <Tooltip placement="left" size="sm" delay={1000} content="Change this step status">
                                <div
                                    className="h-[40px] w-[40px] flex items-center justify-center"
                                >
                                    <Dots2Icon special_size={25} />
                                </div>
                            </Tooltip>
                        </div>
                    </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions" disabledKeys={current_step == 'current' ? ['accepted', 'refused'] : [current_step]}>
                    <DropdownItem
                        startContent={<CheckMarkCircleIcon />}
                        className="text-green-600"
                        key="accepted"
                        onClick={() => acceptAndRefuseStep('accepted')}
                    >
                        Accept response
                    </DropdownItem>
                    <DropdownItem
                        startContent={<CyrcleXMarkIcon />}
                        className="text-red-600"
                        key="refused"
                        onClick={() => acceptAndRefuseStep('refused')}

                    >
                        Refuse response
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>






            <div className={cn('absolute flex items-center gap-1 text-sm top-0 -translate-y-full transition-all z-50 left-1/2 -translate-x-1/2 bg-dark-1 dark:bg-light-1 shadow-xl p-1 px-2 rounded-xl text-light-1 dark:text-dark-1', {
                'translate-y-4': isActionMessageVisible
            })}>
                <Spinner size="sm" color="default" />
                Changing ...
            </div>




            {/* University documents model  */}
            <UniversityDocuments parameters={parameters} customer_id={parameters.customerId} isOpen={showUniversityDocumentsModel} onOpenChange={setShowUniversityDocumentsModel} />



            {/* Application fee model  */}

            <ApplicationFeeAndInvoice parameters={parameters} customer_id={parameters.customerId} isOpen={showApplicationFeeModel} onOpenChange={setShowApplicationFeeModel} />



            {/* Visa decision model  */}
            <VisaDecision parameters={parameters} customer_id={parameters.customerId} isOpen={showVisaModel} onOpenChange={setShowVisaModel} />

        </div>
    )
}
