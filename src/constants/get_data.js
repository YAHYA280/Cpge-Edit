// "use server"

const { documents_api } = require("./_api")

// import axios from 'axios';

// // Fetching countries 
// export async function getCountries() {
//     try {
//         const response = await axios.get(`${cpe_api}/countries`);
//         const countries = response.data
//         return countries
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
// }





export async function getUniversityDocuments() {
    var documents = []
    try {
        const response = await fetch(`${documents_api}/getUniversityDocuments`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
            cache: 'no-cache',
            credentials: 'include'
        })

        const result = await response.json()


        documents = result

    } catch (error) {
        console.log('error', error)
    }



    return documents
}




export async function getVisaDocuments() {
    var documents = []
    try {
        const response = await fetch(`${documents_api}/getVisaDocuments`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
            cache: 'no-cache',
            credentials: 'include'
        })

        const result = await response.json()


        documents = result

    } catch (error) {
        console.log('error', error)
    }



    return documents
}
