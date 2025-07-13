'use client'

import HtmlActionHandlerButton from "@/app/assets/smallComponents/HtmlActionHandlerButton";
import { Button, ButtonGroup } from "@nextui-org/button";
import { RiCloseLine, RiSave2Line, RiSearch2Line, RiUserLine } from "@remixicon/react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HtmlInput from "@/app/assets/smallComponents/HtmlInput";
import SideHeader from "../components/SideHeader";
import { PasswordIcon, SaveIcon } from "@/constants/Icons";
import { Switch } from "@nextui-org/switch";

export default function Settings() {
  function handleLogin() {
    console.log('clicked from login pagze')
    return true
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="p-5 pt-5 pb-5 h-fit flex flex-col gap-4 bg-light-2 dark:bg-dark-2 w-full rounded-md">
        <p className="text-base font-semibold">Security</p>
        <div className="flex w-full flex-col">

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-7">
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">

                  <HtmlInput
                    type="password"
                    placeholder="Current Password"
                  />

                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">

                <HtmlInput
                  type="password"
                  placeholder="New Password"
                />
                <HtmlInput
                  type="password"
                  placeholder="Confirm Password"
                />

              </div>

            </div>

            <HtmlActionHandlerButton
              text="Save changes"
              icon={<SaveIcon />}
              onClick={handleLogin}
            />

          </div>

        </div>



      </div>





      {/* Multi factor authentication  */}
      <div className="p-5 pt-5 pb-5 h-fit flex flex-col gap-4 bg-light-2 dark:bg-dark-2 w-full rounded-md">
        <p className="text-base font-semibold">Multi Factor Authentication</p>
        {/* <div className="flex w-full flex-col"> */}
        <div className="flex flex-col gap-4">

          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm">Email:</p>
              <p className="text-sm text-gray-500 text-[12px]">Receive 2FA codes through your Email.</p>
            </div>

            <div>
              <Switch color="success" defaultSelected aria-label="Automatic updates" />
            </div>
          </div>


        </div>

        {/* </div> */}



      </div>
    </div>

  )
}
