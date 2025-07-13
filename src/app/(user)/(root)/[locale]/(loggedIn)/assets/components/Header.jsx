"use client"

import { Button } from "@nextui-org/button";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { CheckIcon, CheckMarkCircleIcon, DarkThemeIcon, DollarCurrencyIcon, InProcessIcon, MenuListIcon, MoneyIcon, StepInProcessIcon, TranslateIcon, UserIcon } from "@/constants/Icons";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Spinner } from "@nextui-org/react";
import { available_languages } from "@/languages/available_languages";
import Image from "next/image";
import { currencies } from "@/constants/currencies";
import createToast from "@/app/assets/components/toast";
import { admins_api, customers_api } from "@/constants/_api";
import UserProfile from "./UserProfile";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import RestToPay from "./RestToPay"
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import HtmlLink from "@/app/assets/smallComponents/HtmlLink";
import { cn } from "@/lib/utils";
import AddInvoiceModal from "@/app/assets/components/AddInvoiceModal";
import { useLocale, useTranslations } from "next-intl";
import { calculateArrayOfNumbers, getLanguageDetails } from "@/constants/functions";

import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from 'next/navigation'
import { themes } from "@/constants/constants";


export default function Header() {
    const router = useRouter()
    const pathname = usePathname()


    const t = useTranslations()
    const currentLanguage = getLanguageDetails(useLocale())
    const active_language = currentLanguage.key
    const active_dir = currentLanguage.direction


    const [cookies, setCookies] = useCookies(['customer_data']);
    var [customer_Data, setCustomer_Data] = useState()
    const [isSideBarOpened, setIsSideBarOpened] = useState(false)

    var [user, setUser] = useState()
    var [isCurrencySwitcherLoading, setIsCurrencySwitcherLoading] = useState(false)
    var [isLanguageSwitcherLoading, setIsLanguageSwitcherLoading] = useState(false)

    var [theRestToPay, setTheRestToPay] = useState()


    // Set customer data cookies 
    useEffect(() => {
        const data = cookies.customer_data
        setCustomer_Data(data)


        // Set the currency 
        // setActiveCurrency(data.currency)


    }, [])



    // Get this customer 
    useEffect(() => {
        async function getThisCustomer() {
            const { _id } = cookies.customer_data


            try {

                const response = await fetch(`${admins_api}/getSpecialcustomersAndTheirInvoices`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ customer_id: _id }),
                    cache: 'no-cache',
                    credentials: 'include'
                })

                const result = await response.json()


                if (result.err) {
                    createToast(result.msg)
                } else {

                    var { birthday, ...restCustomerData } = result.customer
                    var myInvoices = result.invoices

                    birthday = JSON.parse(birthday)


                    setUser({ ...restCustomerData, birthday })

                    // Fetch all invoices and catch only the accepted ones 
                    // const myInvoicesArr = []
                    const myPaidInvoicesArr = []

                    for (let i = 0; i < myInvoices.length; i++) {
                        const invoice = myInvoices[i]
                        const status = invoice.status

                        // Push the accepted invoice 
                        if (status == 'accepted') {
                            myPaidInvoicesArr.push(invoice.invoice_amount)
                        }
                    }

                    // setUserInvoices(myInvoicesArr)


                    // Calculate package price and paid invoices 
                    const package_price = result.customer.package_price


                    const paid_invoices_amounts = calculateArrayOfNumbers(myPaidInvoicesArr)


                    var totalRestToPay = package_price - paid_invoices_amounts


                    // Get this customer favorite currency 
                    // const this_currency__to_mad = currencies[cookies.customer_data.currency].toMAD


                    setTheRestToPay(totalRestToPay)
                }
            } catch (error) {
                console.log(error.message)

            }
        }

        getThisCustomer()

    }, [user, theRestToPay])



    async function handleChangeLanguage(language) {


        // update this customer favorite language 
        const { _id } = cookies.customer_data

        try {
            // Start currency loader 
            setIsLanguageSwitcherLoading(true)

            // Send currency updates to server 
            const response = await fetch(`${customers_api}/updateLanguage`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ customer_id: _id, language }),
                cache: 'no-cache',
                credentials: 'include'
            })

            const result = await response.json()


            console.log(result)

            if (result.err) {
                createToast(content, true)
            } else {

                // Change the pathname to the selected language 
                router.replace(`/${language}${pathname}`)
                // Reload the page 
                // window.location.reload()

                console.log('language changed.')
            }

        } catch (error) {
            console.log(error)
        } finally {
            setIsLanguageSwitcherLoading(false)
        }


    }




    // Change and update customer currency 
    async function handleChangeCurrency(currency) {
        const { _id } = cookies.customer_data



        try {
            // Start currency loader 
            setIsCurrencySwitcherLoading(true)

            // Send currency updates to server 
            const response = await fetch(`${customers_api}/updateCurrency`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ customer_id: _id, currency }),
                cache: 'no-cache',
                credentials: 'include'
            })

            const result = await response.json()


            console.log(result)

            if (result.err) {
                createToast(content, true)
            } else {
                // Extract the current customer_data
                const customerData = cookies.customer_data || {}
                // Update the currency key
                customerData.currency = currency

                setCookies('customer_data', customerData, { path: '/' })
                console.log('currency changed to: ' + currency)
            }

        } catch (error) {
            console.log(error)
        } finally {
            setIsCurrencySwitcherLoading(false)
        }

    }







    return (
        <header className="flex items-center justify-between border-b-1 p-5 bg-light-1 dark:bg-dark-1">
            {
                customer_Data &&
                <div className="flex justify-between w-full max-width mx-auto">
                    {
                        user &&
                        <UserProfile user={user} />
                    }


                    <div className="flex items-center justify-end w-fit gap-5 flex-1">

                        <RestToPay theRestToPay={theRestToPay} />

                        <AddInvoiceModal className={'hidden sm:flex h-full'} btnClassNames={'text-light-1'} />

                        {/* If device is mobile, then show this section  */}
                        <Button className="min-w-0 p-0 h-full aspect-square flex items-center justify-center " onClick={() => setIsSideBarOpened(prev => !prev)}><MenuListIcon /></Button>
                    </div>




                    {/* Updating currency loader  */}
                    <div className={cn('w-fit p-2 rounded-xl bg-light-1 shadow-2xl text-dark-1 flex items-center gap-2 absolute -top-full transition-all left-1/2 -translate-x-1/2 text-xs z-[1000]', {
                        'top-3': isCurrencySwitcherLoading || isLanguageSwitcherLoading
                    })}>
                        <Spinner color="default" size="sm" />
                        {
                            isCurrencySwitcherLoading &&
                            <p>{t('global.updating_currency')}</p>
                        }


                        {
                            isLanguageSwitcherLoading &&
                            <p>{t('global.updating_language')}</p>
                        }

                    </div>



                    <Sheet open={isSideBarOpened} onOpenChange={setIsSideBarOpened} className="text-light-1">

                        <SheetContent>

                            <SheetHeader>
                                <SheetTitle>
                                    <Image
                                        src={'/icons/cpe-dark.svg'}
                                        width={120}
                                        height={120}
                                        alt="logo"
                                    />
                                </SheetTitle>
                            </SheetHeader>


                            <Accordion>
                                <AccordionItem dir={active_dir} key="1" className="text-light-1" aria-label="Accordion 1" title={<div className="flex items-center gap-2 text-sm"><TranslateIcon special_size={25} /> {t('global.header.the_translation')}</div>}>
                                    <ul dir={active_dir}>
                                        {
                                            Object.keys(available_languages).map((index) => {
                                                const lang = available_languages[index]
                                                const key = lang.key
                                                const name = lang.name
                                                const logo = lang.logo

                                                return (
                                                    <li key={key}>
                                                        <Button
                                                            textValue={name}
                                                            onClick={() => handleChangeLanguage(key)}
                                                            className="flex items-center justify-normal gap-3 min-w-0 p-0 px-2 w-full bg-transparent hover:bg-own_primary-1"
                                                        >
                                                            <Image
                                                                src={logo}
                                                                height={30}
                                                                width={30}
                                                                alt={`${name} logo`}
                                                            />
                                                            <p>
                                                                {name}
                                                            </p>
                                                        </Button>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </AccordionItem>
                                <AccordionItem dir={active_dir} key="2" aria-label="Accordion 2" title={<div className="flex items-center gap-2 text-sm"><DollarCurrencyIcon special_size={25} /> {t('global.header.the_currency')}</div>}>
                                    <ul dir={active_dir}>
                                        {
                                            Object.keys(currencies).map((index) => {
                                                const currency = currencies[index]
                                                const key = currency.key
                                                const name = currency.name[active_language]
                                                const icon = currency.icon

                                                return (
                                                    <li key={key}>

                                                        <Button
                                                            onClick={() => handleChangeCurrency(key)}
                                                            className="flex items-center justify-normal gap-3 min-w-0 p-0 w-full bg-transparent hover:bg-own_primary-1"
                                                        >
                                                            {icon}
                                                            <p>{name}</p>
                                                        </Button>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </AccordionItem>


                                <AccordionItem dir={active_dir} key="3" aria-label="Accordion 2" title={<div className="flex items-center gap-2 text-sm"><DarkThemeIcon special_size={25} /> {t('global.header.the_theme')}</div>}>
                                    <ul dir={active_dir}>
                                        {
                                            Object.keys(themes).map((index) => {
                                                const theme = themes[index]

                                                const key = theme.key
                                                const name = theme.name[active_language]
                                                const icon = theme.icon

                                                return (
                                                    <li key={key}>

                                                        <Button
                                                            // onClick={() => handleChangeCurrency(key)}
                                                            className="flex items-center justify-normal gap-3 min-w-0 p-0 w-full bg-transparent hover:bg-own_primary-1"
                                                        >
                                                            {icon}
                                                            <p>{name}</p>
                                                        </Button>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </AccordionItem>

                            </Accordion>

                            <AddInvoiceModal className={'w-full'} btnClassNames={'w-full'} />

                        </SheetContent>
                    </Sheet>

                </div>
            }
        </header>
    )
}
