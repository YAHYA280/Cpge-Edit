import { admins_api, steps_api } from "@/constants/_api"
import ManageSpecialStepForm from "./components/ManageSpecialStepForm"


export async function generateMetadata({ params }, parent) {
    const customer_id = params.customerId

    var title = 'Manage special step page'
    var description = 'This is manage special step page'

    // fetch data
    try {
        const response = await fetch(`${admins_api}/getSpecialcustomers`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ customer_id }),
            cache: 'no-cache',
            credentials: 'include'
        })

        const result = await response.json()
        console.log(result)
        if (!result.err) {
            const { first_name, last_name } = result.customer
            title = `Manage ${first_name} ${last_name}'s step`
        }

    } catch (error) {
        console.log(error)
    }

    return {
        title,
        description,
    }
}


export default async function ManageSpecificStepPage({ params }) {



    return (
        <div>
            <ManageSpecialStepForm parameters={params} />
        </div>
    )
}
