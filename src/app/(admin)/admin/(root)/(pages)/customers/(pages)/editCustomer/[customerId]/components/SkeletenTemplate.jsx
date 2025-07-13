import { Skeleton } from '@nextui-org/skeleton'

export default function SkeletenTemplate() {
    return (
        <div className='flex flex-col gap-4'>
            {
                [1, 2, 3].map(template => (
                    <div key={template} className="flex flex-col gap-5 bg-dark-1 p-3 rounded-lg w-full">
                        <Skeleton className="h-4 w-[90px] rounded-lg" />

                        <div className="grid grid-cols-2 gap-4 flex-1">
                            <Skeleton className="h-10 w-full rounded-2xl" />
                            <Skeleton className="h-10 w-full rounded-2xl" />
                            <Skeleton className="h-10 w-full rounded-2xl" />
                            <Skeleton className="h-10 w-full rounded-2xl" />
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
