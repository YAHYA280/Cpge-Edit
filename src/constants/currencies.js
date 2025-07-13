import { DollarCurrencyIcon, EuroCurrencyIcon, MadCurrencyIcon, PoundCurrencyIcon } from "./Icons"



// toMAD => toMAD is the number that must be devided on the existing amount
export const currencies = {
    dollar: {
        key: 'dollar',
        id: '$',
        name: {
            en: 'United states dollar',
            fr: 'Dollar des États-Unis',
            ar: 'الدولار الأمريكي',
        },
        icon: <DollarCurrencyIcon />,
        toMAD: 10
    },
    euro: {
        key: 'euro',
        id: '€',
        name: {
            en: 'Euro',
            fr: 'Euro',
            ar: 'اليورو',
        },
        icon: <EuroCurrencyIcon />,
        toMAD: 10

    },
    mad: {
        key: 'mad',
        id: 'MAD',
        name: {
            en: 'Maroc dirham',
            fr: 'Dirham marocain',
            ar: 'درهم مغربي',
        },
        icon: <MadCurrencyIcon />,
        toMAD: 1

    },
    pound: {
        key: 'pound',
        id: '£',
        name: {
            en: 'Uk pound',
            fr: 'Livre sterling',
            ar: 'الجنيه البريطاني',
        },
        icon: <PoundCurrencyIcon />,
        toMAD: 10
    },

}


export const default_currency = currencies.en
