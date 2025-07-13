"use client"

import HtmlActionHandlerButton from "@/app/assets/smallComponents/HtmlActionHandlerButton";
import { frequent_issues_from_customer } from "@/constants/frequent_issues_from_customer";
import { ArrowWithoutLineIcon, SendMessageIcon } from "@/constants/Icons";
import { cn } from "@/lib/utils";
import { Button } from "@nextui-org/button";
import { RadioGroup, Radio } from "@nextui-org/radio";
import { useState } from "react";



export default function IssuesContainer() {

    const [selectedValue, setSelectedValue] = useState(null)



    return (
        <div className=" w-full mx-auto max-width flex flex-col gap-3">

            <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">Please describe your issue ({selectedValue})</h3>
            <ul className="grid w-full gap-6 md:grid-cols-2">
                {
                    frequent_issues_from_customer.map(({ key, name, description, icon }) => (
                        <li key={key}>
                            <input type="radio" id={key} value={key} onChange={(e) => setSelectedValue(e.target.value)} className="hidden peer" required />
                            <label htmlFor={key} className="inline-flex items-center justify-between w-full p-5 border rounded-2xl cursor-pointer dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 ">
                                <div className="flex flex-col">
                                    <p className="text-xl font-semibold">{name.en}</p>
                                    <p className="text-sm text-text_color-1">{description.en}</p>
                                </div>

                                <div className="rotate-180">
                                    <ArrowWithoutLineIcon />
                                </div>


                            </label>
                        </li>
                    ))
                }

            </ul>

           
            
            {/* <Button>Submit my issue</Button> */}
            {/* This is the submit button  */}
            <HtmlActionHandlerButton
                icon={<SendMessageIcon />}
                text={'Submit my issue'}
                isActive={selectedValue != null}
            // onClick={() => handleSubmitStep(step_id, customer_id)}
            // isLoaderVisible={isButtonLoading}
            />


        </div>
    )
}



export const CustomRadio = (props) => {
    const { children, ...otherProps } = props

    return (
        <Radio
            {...otherProps}
            classNames={{
                base: cn(
                    "inline-flex m-0 max-w-none w-full bg-content1 hover:bg-content2 items-center justify-between",
                    "flex-row-reverse cursor-pointer rounded-xl gap-4 p-4 border-1",
                    "data-[selected=true]:border-own_primary-1"
                ),
            }}
        >
            {children}
        </Radio>
    );
};
