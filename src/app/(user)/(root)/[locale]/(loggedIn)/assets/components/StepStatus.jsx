"use client"

import { customers_statuses } from "@/constants/constants"
import { getLanguageDetails } from "@/constants/functions"
import { cn } from "@/lib/utils"
import { useLocale, useTranslations } from "next-intl"

export default function StepStatus({ status }) {

    const t = useTranslations()
    const currentLanguage = getLanguageDetails(useLocale())
    const active_language = currentLanguage.key
    const active_dir = currentLanguage.direction

    return (
        status && status != 'current' &&
        <>
            <span className={cn('absolute z-20  top-0 -translate-y-1/2 flex items-center gap-2 w-fit px-2 py-1 rounded-xl  text-[10px]', {
                [`${customers_statuses.find(this_status => this_status.key == status).border} border-1 bg-light-1 dark:bg-dark-1`]: status && status != 'accepted',
                'right-[90px]': active_dir == 'rtl',
                'left-[90px]': active_dir == 'ltr',
            })}>

                {
                    <span className={cn("h-1.5 w-1.5 rounded-full", {
                        [customers_statuses.find(this_status => this_status.key == status && status != 'accepted')?.background]: status,
                    })} />

                }

                <p className="text-center">
                    {/* {status == 'accepted' && <>{t('steps_area.this_step_has_been_accepted')}</>} */}
                    {status == 'in_process' && <>{t('steps_area.we_started_checking_your_reply')}</>}
                    {status == 'pending' && <>{t('steps_area.the_reply_has_been_sent')}</>}
                    {status == 'refused' && <>{t('steps_area.the_response_has_been_refused')}</>}
                    {status == 'files_refused' && <>{t('steps_area.the_response_has_been_refused')}</>}
                    {status == 'queued' && <>{t('steps_area.the_step_is_queued')}</>}
                    {status == 'new_files' && <>{t('steps_area.the_step_has_new_steps')}</>}
                </p>
            </span>
        </>
    )
}
