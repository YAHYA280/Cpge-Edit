"use client"
import TextReveal from "@/components/magicui/text-reveal";
import Image from "next/image";

export default function SuspensText() {
    return (
        <div className="w-full ">
            <div className="z-10 flex min-h-[16rem] items-center justify-center">
                <TextReveal text="CPE, that will change the way your think..." />
            </div>
        </div>
    )
}
