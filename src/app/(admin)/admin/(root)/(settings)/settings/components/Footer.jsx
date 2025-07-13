'use client'

import { Button } from "@nextui-org/button";
import HtmlActionHandlerButton from "@/app/assets/smallComponents/HtmlActionHandlerButton";
import { RiSave2Line } from "@remixicon/react";
import { useRouter } from "next/navigation";

export default function Footer() {
    const router = useRouter()

    return (
        <div className="btns flex justify-end gap-2 p-10">
            <Button
                color="primary"
                variant="faded"
                onClick={() => router.push('/admin/dashboard')}
            >
                Cancel
            </Button>

            <HtmlActionHandlerButton
                text="Save changes"
                icon={<RiSave2Line
                    size={16}
                />}
            />
        </div>
    )
}
