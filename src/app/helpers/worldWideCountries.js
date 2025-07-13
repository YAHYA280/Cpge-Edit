export default async function worldWideCountries(){

    const response = await fetch('https://restcountries.com/v3.1/all', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
        cache: 'no-cache',
        credentials: 'include'
    })

    const countries = await response.json()
    return countries
}