import EditInvoiceForm from "./components/EditInvoiceForm"


export async function generateMetadata({ params }) {
    const invoice_id = params.invoiceId

    var title = 'Edit invoice page'
    var description = 'This is edit customer page'

    return {
        title,
        description,
    }
}


export default function EditInvoicePage({ params }) {

    return (
        <div>
            <EditInvoiceForm invoiceId={params.invoiceId} />
        </div>
    )
} 