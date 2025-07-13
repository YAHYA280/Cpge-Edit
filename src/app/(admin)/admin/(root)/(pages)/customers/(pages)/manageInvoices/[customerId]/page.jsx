import { admins_api } from "@/constants/_api"
import ManageInvoicesForm from "./components/ManageInvoicesForm"

export async function generateMetadata({ params }, parent) {
    const customer_id = params.customerId


    var title = 'Manage invoices page'
    var description = 'This is manage invoices page'

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
            title = `Manage ${first_name} ${last_name}'s invoices`
        }

    } catch (error) {
        console.log(error)
    }



    return {
        title,
        description,
    }
}


export default function ManageInvoicesPage({ params }) {

    return (
        <ManageInvoicesForm params={params} />

    )
}
