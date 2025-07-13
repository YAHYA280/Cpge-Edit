import { Spinner } from "@nextui-org/spinner";

export default function LoadingDocuments() {
    return (
        <div className='flex items-center gap-3'>
            <Spinner size="sm" /> Loading documents...
        </div>
    )
}
