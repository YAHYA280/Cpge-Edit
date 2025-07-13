import { customers_statuses } from '@/constants/constants'
import customers_steps from '@/constants/customers_steps'
import { SnowIcon, StepAcceptedIcon, StepInProcessIcon, StepNotOpenedYetIcon, StepRefusedIcon } from '@/constants/Icons'
import { cn } from '@/lib/utils'
import React from 'react'

export default function StepTitle({ step_status, step_id, index }) {

    const this_step = customers_steps.find(step => step.key == step_id)



    return (
        <span className={cn(`rounded-full h-[30px] w-[30px] flex items-center justify-center overflow-hidden `, {
            [`${customers_statuses.find(this_status => this_status.key == step_status)?.background}`]: step_status,

        })}>

            {
                step_status == 'accepted' &&
                <span className="rounded-full h-full w-full flex justify-center items-center border-2 border-green-800">
                    <StepAcceptedIcon />
                </span>
            }


            {
                (step_status == 'current') &&
                <span className="rounded-full h-full w-full flex justify-center items-center border-2 border-blue-800">
                    <StepInProcessIcon />
                </span>
            }


            {
                step_status == 'queued' && // This status is when the responsable refused the the customer response
                <span className={cn(`rounded-full h-full w-full flex justify-center items-center text-light-1 text-xs ${customers_statuses.find(status => status.key == 'queued').background}`)}>
                    <SnowIcon special_size={20} />
                </span>
            }

            {
                (step_status == 'pending' || step_status == 'new_files') &&
                <span className="rounded-full h-full w-full flex justify-center items-center text-light-1 text-xs">
                    <StepInProcessIcon />
                </span>
            }

            {
                step_status == 'in_process' && // This status is when the responsable started checking the the customer response
                <StepInProcessIcon />
            }

            {
                step_status == 'refused' && // This status is when the responsable refused the the customer response
                <StepRefusedIcon special_size="14" />
            }


            {
                step_status == 'files_refused' && // This status is when the responsable refused the the customer response
                <StepRefusedIcon special_size="14" />
            }


            {
                !step_status && // This step has no status
                <StepNotOpenedYetIcon />
            }

        </span>
    )
}
