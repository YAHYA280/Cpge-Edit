"use client"

// import { Button } from "@/components/ui/button"
import {
    Command,
    CommandGroup,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@nextui-org/button"
import createToast from "@/app/assets/components/toast"
import { useEffect, useState } from "react"
import { Avatar, Spinner } from "@nextui-org/react"
import HtmlInput from "@/app/assets/smallComponents/HtmlInput"
import { FlagIcon } from "@/constants/Icons"
import { useCountryAndCityContext } from "../context/CountryAndCityContext"


export function CountriesSelector({defaultValue}) {
    const [open, setOpen] = useState(false)

    const [countries, setCountries] = useState([])
    const [selectedCountry, setselectedCountry] = useState('')
    const [isLoading, setisLoading] = useState(false)
    const [isNoCountryFound, setIsNoCountryFound] = useState(true)
    const [timer, setTimer] = useState(null)

    const { countryAndCity, setCountryAndCity } = useCountryAndCityContext()


    // Get world wide countries
    async function handleGetCountries(e) {
        const country_name = e.target.value
        clearTimeout(timer)


        const newTimer = setTimeout(() => {
            async function get() {
                setisLoading(true)
                try {
                    const response = await fetch(`https://restcountries.com/v3.1/name/${country_name}`, {
                        method: 'GET',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: 'include'
                    })

                    var countries = await response.json()

                    var user_countries = []
                    for (let i = 0; i < countries.length; i++) {
                        const country = countries[i]
                        const name = country.name.common
                        const flag = country.flags.svg
                        const country_code = country.cioc
                        const id = name.toLowerCase()

                        user_countries.push({
                            id,
                            text: name,
                            flag,
                        })
                    }
                    if (user_countries.length > 0) {
                        setCountries(user_countries)
                        setIsNoCountryFound(false)
                    } else {
                        setCountries([])
                        setIsNoCountryFound(true)
                    }
                } catch (error) {
                    console.log(error)
                    // Create alert
                    createToast('Something went wrong! Try again.')
                } finally {
                    setisLoading(false)
                }
            }
            get()
        }, 100)
        setTimer(newTimer)
    }





    return (
        <div className="flex flex-col gap-1">
            <p className="text-sm ">Student exiting country</p>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild className="w-full">
                    <Button
                        variant="outline"
                        className="justify-start rounded-xl h-[42px] m-0 bg-default-100"
                    >
                        <FlagIcon />
                        {selectedCountry && (
                            <>
                                {selectedCountry}
                            </>
                        )}


                        {defaultValue && !selectedCountry && (
                            <>
                                {defaultValue}
                            </>
                        )}
                        
                        
                        {!selectedCountry && !defaultValue && (
                            <>Select country</>
                        )}

                        <div className="ml-auto">
                            {
                                isLoading && <Spinner size="sm" />
                            }
                        </div>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 rounded-xl overflow-hidden" side="bottom" align="start">
                    <Command>
                        <HtmlInput
                            type="text"
                            placeholder={{ text: "", placeholder: "Type country...", icon: '' }}
                            onChange={handleGetCountries}
                            className="border-1"
                        />
                        <CommandList>
                            <CommandGroup className="flex flex-col w-full">
                                {countries &&

                                    countries.map((country) => (
                                        <Button
                                            key={country.id}
                                            onClick={() => {
                                                setselectedCountry(country.text)
                                                setOpen(false)
                                                setCountryAndCity({ ...countryAndCity, country: country.text })
                                            }}
                                            className="flex items-center justify-start gap-1 w-full hover:bg-gray-300"
                                            variant="light"
                                        >
                                            <Avatar name="Junior" size="sm" src={country.flag} />
                                            <span>{country.text}</span>

                                        </Button>
                                    ))
                                }
                                {
                                    isNoCountryFound && <p className="bg-red-300 text-red-600 p-2 rounded-xl w-full flex items-center justify-center text-center text-sm">No countries found.</p>
                                }
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}
