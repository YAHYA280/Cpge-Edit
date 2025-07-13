'use client'


// // Admin settings list 
import { side_bar_links } from '../others/links'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import SideBarLink from './SideBarLink'
import { useCookies } from 'react-cookie'
import { useEffect, useState } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"


export default function SideBar() {

    const pathName = usePathname()

    var [adminData, setAdminData] = useCookies(['admin_data']); // You can specify cookies you want to access
    var [admin_Data, setAdmin_Data] = useState();

    useEffect(() => {
        setAdmin_Data(adminData.admin_data)
    }, [])

    return (
        <ScrollArea className="side-bar bg-light-1 dark:bg-dark-1 flex flex-col overflow-auto  gap-5 w-[300px] pt-4 relative h-full border-r-1 ">
            {/* <ScrollArea className="side-bar bg-light-1 dark:bg-dark-1 bg-red-700 flex flex-col overflow-auto  gap-5 w-[300px] p-2 pt-4 relative h-full border-r-1 "> */}
            <>
                <div className='flex items-center justify-center'>
                    <Image
                        src={'/icons/cpe.svg'}
                        width={120}
                        height={50}
                        alt='Logo'
                    />
                </div>

                <div className="flex flex-col gap-2 mt-5">
                    {admin_Data &&
                        side_bar_links.map((section, id) => {
                            return (
                                <div key={id} className="flex flex-col gap-2">
                                    <p className="text-xs pl-2 text-gray-1">{section.section_name}</p>
                                    <div className='links flex flex-col gap-1 '>
                                        {
                                            section.links.map(link => {

                                                var group_name = ''
                                                var link_name = ''
                                                var link_icon = ''
                                                var link_href = ''
                                                var deny_access_for = link.deny_access_for || []

                                                var show_path = true
                                                if (deny_access_for.includes(admin_Data.role)) {
                                                    show_path = false
                                                }

                                                if (typeof link.link == 'object') {

                                                    return (
                                                        show_path &&
                                                        <div key={link.id} className=' pl-2' >
                                                            <Accordion isCompact>
                                                                {
                                                                    <AccordionItem key={link.id} aria-label="Accordion 1" title={<p className="flex items-center gap-3 h-fit text-light-1 rounded text-sm   hover:text-dark-1 dark:hover:text-light-1">{link.icon} {link.name}</p>} >
                                                                        <div className="pl-2 relative">
                                                                            {

                                                                                link.link.map(other_link => {
                                                                                    var isActive = pathName === other_link.link || pathName.endsWith(other_link.link)

                                                                                    var deny_access_for = other_link.deny_access_for || []

                                                                                    var show_path = true
                                                                                    if (deny_access_for.includes(admin_Data.role)) {
                                                                                        show_path = false
                                                                                    }

                                                                                    return (
                                                                                        show_path &&
                                                                                        <div key={other_link.id}>
                                                                                            <SideBarLink className={cn(`hover:bg-light-2 text-[13px] hover:text-dark-1 relative before:h-full before:w-[2px] before:bg-gray-300 hover:before:bg-own_primary-1 dark:before:bg-dark-3 before:left-[0] before:t-0 before:absolute ${isActive ? "before:bg-own_primary-1 dark:before:bg-own_primary-1" : ''}`)} id={other_link.id} href={`${other_link.link}`} isActive={isActive} name={other_link.name} icon={other_link.icon} />
                                                                                        </div>
                                                                                    )

                                                                                })
                                                                            }
                                                                        </div>

                                                                    </AccordionItem>
                                                                }

                                                            </Accordion>
                                                        </div>


                                                    )
                                                }
                                                else {
                                                    var isActive = pathName === link.link || pathName.endsWith(link.link) || pathName.includes(link.link)

                                                    return (
                                                        show_path &&
                                                        <div key={link.id} >
                                                            <SideBarLink className='hover:bg-light-2 hover:text-dark-1' id={link.id} href={`${link.link}`} isActive={isActive} name={link.name} icon={link.icon} />
                                                        </div>

                                                    )
                                                }

                                            })
                                        }
                                    </div>
                                </div>
                            )

                        })
                    }

                </div>
            </>
        </ScrollArea>

    )
}




