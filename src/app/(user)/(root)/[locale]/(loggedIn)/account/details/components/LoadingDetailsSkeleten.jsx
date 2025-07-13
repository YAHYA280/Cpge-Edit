import { Skeleton } from "@nextui-org/skeleton";


export default function LoadingDetailsSkeleten() {
    return (
        <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-5">
                {/* Title  */}
                <div className="flex flex-col gap-2 ">
                    <Skeleton className="h-[20px] w-1/3 rounded-xl" />
                    <Skeleton className="h-[10px] w-1/4 rounded-xl" />
                </div>
                {/* Inputs  */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    <Skeleton className="h-[40px] w-full rounded-xl" />
                    <Skeleton className="h-[40px] w-full rounded-xl" />
                    <Skeleton className="h-[40px] w-full rounded-xl" />
                    <Skeleton className="h-[40px] w-full rounded-xl" />
                </div>
            </div>
            <div className="flex flex-col gap-5">
                {/* Title  */}
                <div className="flex flex-col gap-2 ">
                    <Skeleton className="h-[20px] w-1/3 rounded-xl" />
                    <Skeleton className="h-[10px] w-1/4 rounded-xl" />
                </div>
                {/* Inputs  */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    <Skeleton className="h-[40px] w-full rounded-xl" />
                    <Skeleton className="h-[40px] w-full rounded-xl" />
                    <Skeleton className="h-[40px] w-full rounded-xl" />
                    <Skeleton className="h-[40px] w-full rounded-xl" />
                </div>
            </div>
            <div className="flex flex-col gap-5">
                {/* Title  */}
                <div className="flex flex-col gap-2 ">
                    <Skeleton className="h-[20px] w-1/3 rounded-xl" />
                    <Skeleton className="h-[10px] w-1/4 rounded-xl" />
                </div>
                {/* Inputs  */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    <Skeleton className="h-[40px] w-full rounded-xl" />
                    <Skeleton className="h-[40px] w-full rounded-xl" />
                    <Skeleton className="h-[40px] w-full rounded-xl" />
                    <Skeleton className="h-[40px] w-full rounded-xl" />
                </div>
            </div>
        </div>
    )
}
