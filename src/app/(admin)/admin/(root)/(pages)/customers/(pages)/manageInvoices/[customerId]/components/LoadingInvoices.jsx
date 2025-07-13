import { Spinner } from "@nextui-org/spinner";

export default function LoadingInvoices({full_name}) {
    return (
        <div className='flex items-center gap-3'>
            <Spinner size="sm" /> Loading invoices for ${full_name}...
        </div>
    )
}
