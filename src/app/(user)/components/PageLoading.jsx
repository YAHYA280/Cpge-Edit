"use client"

import { Spinner } from "@nextui-org/spinner"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function PageLoading() {
    const [isPageLoading, setisPageLoading] = useState(true)


    useEffect(() => {
        setisPageLoading(false)
    }, [])


    return (
        <>

            {
                isPageLoading &&
                <div className="h-screen fixed top-0 left-0 w-full bg-dark-1 flex items-center flex-col gap-5 justify-center z-50">
                    <Image
                        src={'/icons/cpe.svg'}
                        width={120}
                        height={120}
                        alt="logo"
                    />

                    <Spinner />
                </div>
            }

        </>
    )
}
