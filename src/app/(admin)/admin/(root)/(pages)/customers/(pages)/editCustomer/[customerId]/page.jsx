
import { admins_api } from "@/constants/_api"
import EditCustomerForm from "./components/EditCustomerForm"


export async function generateMetadata({ params }, parent) {
    const customer_id = params.customerId

    var title = 'Edit student page'
    var description = 'This is edit student page'

    try {
        // fetch data
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

            title = `Edit ${first_name} ${last_name}`
        }

    } catch (error) {
        console.log(error)
    }

    return {
        title,
        description,
    }
}

export default function EditCustomerPage({ params }) {

    return (
        <div>
            <EditCustomerForm params={params} />
        </div>
    )
} 