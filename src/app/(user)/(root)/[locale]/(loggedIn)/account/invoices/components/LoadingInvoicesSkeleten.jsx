import { Skeleton } from "@nextui-org/skeleton";


export default function LoadingInvoicesSkeleten() {
    return (
        <div className="flex flex-col border-1 rounded-xl overflow-hidden">
            <Skeleton className="h-[60px] w-full border-b-1" />
            <Skeleton className="h-[60px] w-full border-b-1" />
            <Skeleton className="h-[60px] w-full" />
        </div>
    )
}
