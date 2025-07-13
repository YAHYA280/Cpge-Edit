import PageName from "@/app/(admin)/assets/components/PageName";

import { Skeleton } from "@nextui-org/skeleton";
import ShareCustomerModel from "./ShareCustomerModel";
import { capitalize } from "../../utils";

export default function TopPage({ pageName, customer, admin, children = '' }) {
    return (
        <div className="flex justify-between items-center">
            <PageName pageName={pageName} beside={!customer ? <Skeleton className="h-7 w-[90px] rounded-lg" /> : <p className="text-own_primary-1">{capitalize(customer.first_name)} {capitalize(customer.last_name)}</p>} />




            <div className="flex items-center gap-3">
                <ShareCustomerModel customer={customer} admin={admin} />
                {children}
            </div>
        </div>
    )
}
