"use client"

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
import { Spinner } from "@nextui-org/react"
import HtmlInput from "@/app/assets/smallComponents/HtmlInput"
import { FlagIcon } from "@/constants/Icons"
import { useCountryAndCityContext } from "../context/CountryAndCityContext"


export function CitiesSelector({ defaultValue, country = '' }) {
    const [open, setOpen] = useState(false)

    const [cities, setCities] = useState([])
    const [filteredCities, setFilteredCities] = useState([])
    const [selectedCity, setselectedCity] = useState('')

    const [isLoading, setisLoading] = useState(false)
    const [isNoCityFound, setIsNoCityFound] = useState(true)
    const [timer, setTimer] = useState(null)

    const { countryAndCity, setCountryAndCity } = useCountryAndCityContext()


    // Get world wide cities
    async function handleGetcities(country) {
        async function get() {
            setisLoading(true)

            try {
                const response = await fetch(`https://countriesnow.space/api/v0.1/countries/cities`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ country }),
                })

                var cities = await response.json()
                console.log('All cities: ', cities)
                var user_cities = []

                for (let i = 0; i < cities.data.length; i++) {
                    const name = cities.data[i]
                    const id = name.toLowerCase()

                    user_cities.push({
                        id,
                        text: name,
                    })
                }
                // console.log(user_cities)
                if (user_cities.length > 0) {
                    setCities(user_cities)
                    setIsNoCityFound(false)
                    // console.log(user_cities)
                } else {
                    setCities([])
                    setIsNoCityFound(true)
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

    }


    useEffect(() => {
        if (countryAndCity.country) {
            handleGetcities(countryAndCity.country)
        }
    }, [countryAndCity.country])





    function handleFiltercities(e) {
        clearTimeout(timer)
        const cityToFilter = e.target.value

        const newTimer = setTimeout(() => {

            console.log(cities)

            if (cities.length == 0) {
                createToast('Please choose student country before chosing the city')
                return
            }

            if (cityToFilter != '') {
                const filteredArray = []
                for (let i = 0; i < cities.length; i++) {
                    const city = cities[i]
                    const id = city.id
                    var name = city.text.toLowerCase()

                    if (name.includes(cityToFilter)) {
                        name = name[0].toUpperCase() + name.slice(1);
                        console.log(name, cityToFilter)
                        filteredArray.push({
                            id,
                            text: name,
                        })
                    }
                }

                setFilteredCities(filteredArray)

            } else {
                setFilteredCities([])
            }

        }, 300)
        setTimer(newTimer)
    }


    return (
        <div className="flex flex-col gap-1">
            <p className="text-sm ">Student exiting city</p>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild className="w-full">
                    <Button
                        variant="outline"
                        className="justify-start rounded-xl h-[42px] m-0 bg-default-100"
                    >
                        <FlagIcon />

                        {selectedCity && (
                            <>
                                {selectedCity}
                            </>
                        )}

                        {defaultValue && !selectedCity && (
                            <>
                                {defaultValue}
                            </>
                        )}


                        {!selectedCity && !defaultValue && (
                            <>Select city</>
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
                            placeholder={{ text: "", placeholder: "Type city...", icon: '' }}
                            onChange={handleFiltercities}
                            className="border-1"
                        />
                        <CommandList>
                            <CommandGroup className="flex flex-col w-full">
                                {filteredCities &&

                                    filteredCities.map((city) => (
                                        <Button
                                            key={city.id}
                                            onClick={() => {
                                                setselectedCity(city.text)
                                                setOpen(false)
                                                setFilteredCities([])
                                                setCountryAndCity({ ...countryAndCity, city: city.text })

                                            }}
                                            className="flex items-center justify-start gap-1 w-full hover:bg-gray-300"
                                            variant="light"
                                        >
                                            <span>{city.text}</span>
                                        </Button>
                                    ))
                                }
                                {
                                    isNoCityFound && <p className="bg-red-300 text-red-600 p-2 rounded-xl w-full flex items-center justify-center text-center text-sm">No cities found.</p>
                                }
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}
