import { Skeleton } from "@nextui-org/skeleton";

export default function TableSkeleten() {
    return (
        <div className="w-full flex items-center flex-col gap-3">
            <div className="flex items-end gap-2 w-full">
                <div className="flex w-full gap-1 flex-col">
                    <Skeleton className="h-2 w-[90px] rounded-lg" />
                    <Skeleton className="h-7 w-full rounded-lg" />
                </div>
                <Skeleton className="h-7 w-[90px] rounded-lg" />
            </div>

            <div className="flex items-center gap-2 w-full">
                <Skeleton className="h-3 w-4/5 rounded-lg" />
                <Skeleton className="h-3 w-4/5 rounded-lg" />
                <Skeleton className="h-3 w-4/5 rounded-lg" />
                <Skeleton className="h-3 w-4/5 rounded-lg" />
                <Skeleton className="h-3 w-4/5 rounded-lg" />
            </div>

            <div className="flex flex-col gap-3 w-full">
                <div className="flex items-center gap-2 w-full">
                    <Skeleton className="h-6 w-4/5 rounded-lg" />
                    <Skeleton className="h-6 w-4/5 rounded-lg" />
                    <Skeleton className="h-6 w-4/5 rounded-lg" />
                    <Skeleton className="h-6 w-4/5 rounded-lg" />
                    <Skeleton className="h-6 w-4/5 rounded-lg" />
                </div>
                <div className="flex items-center gap-2 w-full">
                    <Skeleton className="h-6 w-4/5 rounded-lg" />
                    <Skeleton className="h-6 w-4/5 rounded-lg" />
                    <Skeleton className="h-6 w-4/5 rounded-lg" />
                    <Skeleton className="h-6 w-4/5 rounded-lg" />
                    <Skeleton className="h-6 w-4/5 rounded-lg" />
                </div>
                <div className="flex items-center gap-2 w-full">
                    <Skeleton className="h-6 w-4/5 rounded-lg" />
                    <Skeleton className="h-6 w-4/5 rounded-lg" />
                    <Skeleton className="h-6 w-4/5 rounded-lg" />
                    <Skeleton className="h-6 w-4/5 rounded-lg" />
                    <Skeleton className="h-6 w-4/5 rounded-lg" />
                </div>
            </div>
        </div>
    )
}
