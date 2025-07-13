import { InvoiceIcon } from "@/constants/Icons";

export default function NoInvoicesToDisplay({ full_name }) {
    return (
        <div className="flex flex-col gap-2 justify-center items-center">
            <InvoiceIcon special_size={70} />
            <p className="text-xl font-semibold text-light-1 dark:bg-dark-1">No invoices to display</p>
            <p>There is not invoices for {full_name} to show</p>
        </div>
    )
}
