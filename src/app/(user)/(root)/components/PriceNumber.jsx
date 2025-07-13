"use client"

import { currencies } from "@/constants/currencies";
import { formatNumberWithCommas, getLanguageDetails } from "@/constants/functions";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"

export default function ActivePriceNumber({ number, isNumberChangeToMad = false, special_currency = '', className }) {

    const t = useTranslations()
    const currentLanguage = getLanguageDetails(useLocale())
    const active_language = currentLanguage.key
    const active_dir = currentLanguage.direction


    const [cookies, setCookies] = useCookies(['customer_data'])
    const [currency, setCurrency] = useState()
    const [amount, setAmount] = useState()


    useEffect(() => {
        const this_currency = cookies.customer_data.currency

        // Set currency 
        const this_currency_data = currencies[this_currency]


        let amount = ''
        // If the amount has been changed to mad 
        if (isNumberChangeToMad) {
            amount = formatNumberWithCommas(number)
        } else {
            amount = formatNumberWithCommas(number / this_currency_data.toMAD)
        }


        setCurrency(this_currency_data.id)
        setAmount(amount)

    }, [cookies, number])


    return (
        <>
            {
                (!currency || !amount) &&
                <p>Loading</p>
            }

            {
                currency && amount &&
                <div className={cn('flex items-center gap-[2px] w-fit', className)}>

                    <p className="w-fit">
                        {/* If there is special currency  */}
                        {special_currency && special_currency}

                        {/* If there is no special currency  */}
                        {!special_currency && currency}
                    </p>

                    <p>{amount}</p>
                </div>
            }
        </>

    )
}
