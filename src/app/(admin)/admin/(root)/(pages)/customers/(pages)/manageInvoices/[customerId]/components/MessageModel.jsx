"use client"
import HtmlActionHandlerButton from "@/app/assets/smallComponents/HtmlActionHandlerButton";
import HtmlInput from "@/app/assets/smallComponents/HtmlInput";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { SendMessageIcon } from "@/constants/Icons";
import { Button } from "@nextui-org/button";
import { useState } from "react";
export default function MessageModel({ isOpen, onClose }) {

    const [comment, setComment] = useState('');



    return (

        <Drawer open={isOpen} className="outline-none" onOpenChange={onClose}>
            <DrawerContent >
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Refuse invoice with comment</DrawerTitle>
                        <DrawerDescription>Write the refuse reason to send it as a comment to your customer</DrawerDescription>
                    </DrawerHeader>

                    <div className="p-4 pb-0">
                        <HtmlInput
                            type="normal_textarea"
                            placeholder={'Enter your comment...'}
                            inputValue={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </div>
                    <DrawerFooter>
                        <HtmlActionHandlerButton
                            onClick={() => console.log('clicked')}
                            text={'Send comment'}
                            icon={<SendMessageIcon />}
                        />
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>


    )
}
