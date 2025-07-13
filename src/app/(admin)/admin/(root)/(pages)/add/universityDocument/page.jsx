import PageName from "@/app/(admin)/assets/components/PageName";
import AddUniversityDocumentForm from "./components/AddUniversityDocumentForm";

export default function AddUniversityDocumentPage() {
    return (

        <div className="flex flex-col gap-4">
            <PageName pageName='Add university document' />

            <div className="bg-light-1 dark:bg-dark-2 border-1 p-4 rounded-large">
                <AddUniversityDocumentForm />
            </div>
        </div>
    )
}
