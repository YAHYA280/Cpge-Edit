import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { EditIcon, InvoiceIcon, ManageFileIcon } from "@/constants/Icons";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

import Link from "next/link"

export function CustomersBreadcrumb({ customer_id, current_page_key }) {

    const links = [
        {
            key: 'editCustomer',
            name: 'Edit student',
            href: 'editCustomer',
            icon: <EditIcon />
        },
        {
            key: 'manageSteps',
            name: 'Manage steps',
            href: 'manageSteps',
            icon: <ManageFileIcon />
        },
        {
            key: 'manageInvoices',
            name: 'Managa invoices',
            href: 'manageInvoices',
            icon: <InvoiceIcon />
        },
    ]


    // Get current page name 
    var current_page = ''
    var other_pages = []
    for (let i = 0; i < links.length; i++) {
        if (current_page_key == links[i].key) {
            current_page = links[i].name
        }


        // Remove this page from displaying in the breadcrumb
        if (current_page_key != links[i].key) {
            other_pages.push(links[i])
        }
    }




    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <Link href="/admin/customers">Customers</Link>
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                <BreadcrumbItem>
                    <Dropdown
                        showArrow
                    >
                        <DropdownTrigger>
                            <span className="cursor-pointer">...</span>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions">

                            {
                                other_pages.map(({ key, name, href, icon }) => {

                                    return (
                                        <DropdownItem textValue={key} key={key} className="p-0">
                                            <Link className="h-full flex items-center gap-2 w-full p-1.5" href={`/admin/customers/${href}/${customer_id}`}>
                                                {icon}
                                                {name}
                                            </Link>
                                        </DropdownItem>
                                    )
                                })
                            }
                        </DropdownMenu>
                    </Dropdown>
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                <BreadcrumbItem>
                    <BreadcrumbPage>{current_page}</BreadcrumbPage>
                </BreadcrumbItem>


            </BreadcrumbList>
        </Breadcrumb>
    )
}
