import InvoicesTable from "./components/InvoicesTable"

const global_key = process.env.GLOBAL_KEY

export const metadata = {
    title: 'My invoices',
    description: '',
}


export default function InvoicesPage() {
    return (
        <InvoicesTable />
    )
}
