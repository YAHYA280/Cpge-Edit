"use client"

import { createContext, useContext, useState } from "react"

export const CountryAndCityContext = createContext(null)

export function CountryAndCityWrapper({ children }) {
    const [countryAndCity, setCountryAndCity] = useState({
        city: '',
        country: '',
    });

    const values = {
        countryAndCity,
        setCountryAndCity
    }

    return (
        <CountryAndCityContext.Provider value={values}>
            {children}
        </CountryAndCityContext.Provider>
    )
}

export function useCountryAndCityContext() {
    return useContext(CountryAndCityContext)
}