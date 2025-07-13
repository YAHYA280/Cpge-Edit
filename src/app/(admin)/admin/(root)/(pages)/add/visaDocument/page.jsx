import PageName from "@/app/(admin)/assets/components/PageName";
import AddVisaDocumentForm from "./components/AddVisaDocumentForm";

export default function AddVisaDocumentPage() {
    return (
        <div className="flex flex-col gap-4">
            <PageName pageName='Add visa document' />

            <div className="bg-light-1 dark:bg-dark-2 border-1 p-4 rounded-large">
                <AddVisaDocumentForm />
            </div>
        </div>
    )
}
