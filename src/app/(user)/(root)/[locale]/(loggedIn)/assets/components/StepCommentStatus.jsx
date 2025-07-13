"use client"

import CustomizedCallOut from "@/app/assets/components/CustomizedCallOut"
import { getLanguageDetails } from "@/constants/functions"
import { AcceptWalletIcon, CyrcleXMarkIcon, SendMessageIcon, StepAcceptedIcon, StepInProcessIcon } from "@/constants/Icons"
import { cn } from "@/lib/utils"
import { useLocale, useTranslations } from "next-intl"
import { useEffect, useState } from "react"

export default function StepCommentStatus({ status, specialText = '' }) {
    const t = useTranslations()
    const currentLanguage = getLanguageDetails(useLocale())
    const active_language = currentLanguage.key
    const active_dir = currentLanguage.direction

    const [text, setText] = useState()
    const [icon, setIcon] = useState()


    useEffect(() => {
        if (status) {

            if (status == 'pending') {

                setText(t('steps_area.the_reply_has_been_sent'))
                setIcon(<SendMessageIcon />)

            } else if (status == 'in_process') {

                setText(t('steps_area.we_started_checking_your_reply'))
                setIcon(<StepInProcessIcon />)

            } else if (status == 'refused') {
                setText(specialText)
                setIcon(<CyrcleXMarkIcon />)

            } else if (status == 'queued') {
                // setText('This step is queued, so you cannot yet open it.')
                setText(t('steps_area.the_step_is_queued_description'))
                setIcon(<CyrcleXMarkIcon />)

            }
        }
    }, [status])


    return (

        status && icon && text &&

        <CustomizedCallOut variant={status} title={t(`global.note`)} icon={icon}>
            <div className="flex items-center flex-wrap gap-1">
                {text}
            </div>
        </CustomizedCallOut>




        // <div className={cn('w-fit border-1 rounded-lg bg-dark-2 text-[15px] text-light-1 relative  bg-opacity-10', {
        //     'bg-blue-600': status == 'pending',
        //     'bg-yellow-600': status == 'in_process',
        //     'bg-red-600': status == 'refused',

        //     // Direction
        //     // 'translate-x-10': active_dir == 'ltr',
        //     // 'left-0': active_dir == 'ltr',
        //     // 'right-0': active_dir == 'rtl'
        // })}>

        //     <div className="w-full h-full overflow-hidden flex items-center gap-2 rounded-lg px-3 py-1.5 relative">
        //         <span className={cn('absolute left-0 top-0 h-full w-1', {
        //             'bg-blue-600': status == 'pending',
        //             'bg-yellow-600': status == 'in_process',
        //             'bg-red-600': status == 'refused',
        //         })} />
        //         {
        //             status == 'pending' &&
        //             <>
        //                 <SendMessageIcon />
        //                 <p className="text-center">{t('steps_area.the_reply_has_been_sent')}</p>
        //             </>
        //         }

        //         {
        //             status == 'in_process' &&
        //             <>
        //                 <StepInProcessIcon />
        //                 <p className="text-center">{t('steps_area.we_started_checking_your_reply')}</p>
        //             </>
        //         }


        //         {
        //             status == 'refused' &&
        //             <>
        //                 <CyrcleXMarkIcon />
        //                 <p className="text-center">{specialText}</p>
        //             </>
        //         }
        //     </div>

        // </div>
    )
}
