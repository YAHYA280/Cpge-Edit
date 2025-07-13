import { DocumentsIcon } from "@/constants/Icons";

export default function NoDocumentsToDisplay() {
    return (
        <div className="flex flex-col gap-2 justify-center items-center">
            <DocumentsIcon special_size={50} />
            <p className="text-base font-semibold text-light-1 dark:bg-dark-1">No documents to display</p>
            <p className="text-text_color-1 text-sm">There is not document for you to show</p>
        </div>
    )
}
