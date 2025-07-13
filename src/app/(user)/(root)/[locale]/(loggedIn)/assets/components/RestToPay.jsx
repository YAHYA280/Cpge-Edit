import { currencies } from "@/constants/currencies";
import { CheckMarkCircleIcon, MoneyIcon, StepInProcessIcon } from "@/constants/Icons";
import { cn } from "@/lib/utils";
import { Tooltip } from "@nextui-org/react";
import { Badge } from "@/components/ui/badge";
import ActivePriceNumber from "@/app/(user)/(root)/components/PriceNumber";
import { useLocale, useTranslations } from "next-intl";
import { getLanguageDetails } from "@/constants/functions";


export default function RestToPay({ theRestToPay }) {
    const t = useTranslations()
    const currentLanguage = getLanguageDetails(useLocale())
    const active_language = currentLanguage.key
    const active_dir = currentLanguage.direction


    return (
        <Tooltip
            className="w-fit"
            content={
                <>
                    {/* If the rest to pay is not 0  */}
                    {
                        (theRestToPay != 0) &&
                        <div className="flex items-center gap-2 text-yellow-600" dir={active_dir}>
                            <StepInProcessIcon />

                            {t('global.header.rest_to_pay.the_rest_that_you_have_to_pay_is')}

                            <ActivePriceNumber number={theRestToPay} className={cn('font-semibold')} />
                        </div>
                    }


                    {/* If the rest to pay is 0  */}
                    {
                        (theRestToPay == 0) &&
                        <div className="flex items-center gap-2 text-green-600" dir={active_dir}>
                            <CheckMarkCircleIcon />
                            {t('global.header.rest_to_pay.you_completed_the_package_price')}
                        </div>
                    }
                </>
            }
        >

            <div className={cn('flex gap-1 items-center border-1 border-own_primary-1 border-opacity-25 bg-own_primary-1 bg-opacity-5 text-own_primary-1 h-full px-3 rounded-xl', {
                'bg-green-600 border-green-600 text-green-900': theRestToPay == 0
            })}>
                <MoneyIcon special_size={16} />

                {/* <ActivePriceNumber number={theRestToPay} className={cn('font-semibold text-sm')} /> */}
                <ActivePriceNumber number={theRestToPay} className={cn('font-semibold text-sm')} />
            </div>

        </Tooltip>
    )
}
