"use client"

import customers_steps from "@/constants/customers_steps"
import { Skeleton } from "@nextui-org/skeleton"





export default function StepsSkeleten() {
    return (
        <div className="flex flex-col gap-[20px]">
            {
                customers_steps.map((item) => {
                    return (
                        <div key={item.key} className="flex gap-5">
                            <Skeleton className="rounded-full h-[30px] w-[30px] mt-2" />
                            <Skeleton className="rounded-xl h-[45px] w-full flex-1" />
                        </div>
                    )
                })
            }
        </div>
    )
}
