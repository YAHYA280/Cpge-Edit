'use client'

import { LoginIcon, MenuListIcon, SupportIcon, WebIcon } from "@/constants/Icons";
import { cn } from "@/lib/utils";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cpe } from "@/constants/_api";
import HtmlLink from "@/app/assets/smallComponents/HtmlLink";




export default function MainHeader() {


  const [isScrolled, setIsScrolled] = useState(false)
  const [isSideBarOpened, setIsSideBarOpened] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Add or remove class based on scroll position
      setIsScrolled(window.scrollY > 50);
    }

    // Attach scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [])



  return (
    <header className={cn('flex sticky top-0 z-20 transition-all', {
      'bg-dark-1 shadow-lg': isScrolled
    })}>
      <div className="flex justify-between items-center x-white-space py-3 max-width w-full mx-auto">
        <Image
          src={'/icons/cpe.svg'}
          width={120}
          height={120}
          alt="logo"
        />




        <ul className="hidden items-center gap-5 text-sm md:flex">
          <li>
            <Link href={cpe} target="_blank" className="flex items-center gap-2">
              <WebIcon />
              Our website
            </Link>
          </li>
          <li>
            <Link href={'/login'} className="flex items-center gap-2">
              <SupportIcon />
              Support
            </Link>
          </li>
          <li>

            <HtmlLink
              href={'/login'}
              text={"Login Now"}
              icon={<LoginIcon />}
              className="py-1.5 px-3 rounded-xl bg-own_primary-1 text-dark-1 "
            />
          </li>
        </ul>






        {/* Button that opens the sidebar  */}
        <Button className="min-w-0 p-0 h-8 w-8 flex items-center justify-center md:hidden " onClick={() => setIsSideBarOpened(prev => !prev)}><MenuListIcon /></Button>

        {/* The side bar  */}
        <Sheet open={isSideBarOpened} onOpenChange={setIsSideBarOpened} className="bg-red-500">

          <SheetContent>
            <SheetHeader>
              <Image
                src={'/icons/cpe.svg'}
                width={120}
                height={120}
                alt="logo"
              />

            </SheetHeader>


            <ul className="flex flex-col gap-5 text-sm ">
              <li>
                <Link href={'/login'} className="flex items-center gap-1 py-1" >
                  <WebIcon />
                  Our website
                </Link>
              </li>
              <li>
                <Link href={'/login'} className="flex items-center gap-2 py-1">
                  <SupportIcon />
                  Support
                </Link>
              </li>
              <li>
                <Link href={'/login'} className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl border-1 hover:border-own_primary-1 transition-all">
                  <LoginIcon />
                  Login Now
                </Link>
              </li>
            </ul>

          </SheetContent>
        </Sheet>
      </div>

    </header>
  )
}
