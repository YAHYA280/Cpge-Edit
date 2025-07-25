import PageName from "@/app/(admin)/assets/components/PageName";
import UpdateVisaDocumentForm from "./components/UpdateVisaDocumentForm";
import Link from "next/link";
import { AddNewFileIcon } from "@/constants/Icons";


export const metadata = {
    title: 'Visa documents',
    description: "Generated by create next app",
}


export default function UpdateUniversityDocumentPage() {
    return (

        <div className="flex flex-col gap-4">
            <PageName pageName='Update visa document'>
                <AddDocumentLink />
            </PageName>

            <UpdateVisaDocumentForm />
        </div>
    )
}




const AddDocumentLink = () => {

    return (
        <Link
            href={'/admin/add/visaDocument'}
            className="border-1 text-sm py-2 px-3 rounded-xl flex items-center justify-center gap-2"
        >
            Add new document
            <AddNewFileIcon />
        </Link>
    )
}