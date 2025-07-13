"use client"

import { getLanguageDetails } from "@/constants/functions"
import { cn } from "@/lib/utils"
import { useLocale, useTranslations } from "next-intl"
import { useEffect } from "react"

export default function DaysCalculator({ date, className }) {
    const t = useTranslations()
    const currentLanguage = getLanguageDetails(useLocale())
    const active_language = currentLanguage.key
    const active_dir = currentLanguage.direction


    var days = date.days
    var hours = date.hours
    var minutes = date.minutes
    var seconds = date.seconds

    // Plural 
    var days__translation = t('global.date.days')
    var hours__translation = t('global.date.hours')
    var minutes__translation = t('global.date.minutes')
    var seconds__translation = t('global.date.seconds')


    // Singular 
    var day__translation = t('global.date.day')
    var hour__translation = t('global.date.hour')
    var minute__translation = t('global.date.minute')
    var second__translation = t('global.date.second')


    // Check if the active language is arabic 
    if (active_language == 'ar') {
        if (days > 10) { // Switch plural to singular
            days__translation = day__translation
        }
        if (hours > 10) { // Switch plural to singular
            hours__translation = hour__translation
        }
        if (minutes > 10) { // Switch plural to singular
            minutes__translation = minute__translation
        }
        if (seconds > 10) { // Switch plural to singular
            seconds__translation = second__translation
        }
    }





    return (
        <div className={cn('text-xs text-text_color-1 font-normal', className)} dir={active_dir}>
            {/* If there is days */}
            {
                date.days > 0 && <p> {date.days} {days__translation}</p>
            }

            {/* If there is no days and there is hours */}
            {
                date.days == 0 && date.hours > 0 && <p> {date.hours} {hours__translation}</p>
            }



            {/* If there is no days, no hours and there is minutes */}
            {
                date.days == 0 && date.hours == 0 && date.minutes > 0 && <p> {date.minutes} {minutes__translation}</p>
            }


            {/* If there is no days, no hours, no minutes and there is seconds */}
            {
                date.days == 0 && date.hours == 0 && date.minutes == 0 && date.seconds > 0 && <p> {date.seconds} {seconds__translation}</p>
            }


        </div>
    )
}
