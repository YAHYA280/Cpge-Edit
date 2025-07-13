import { AddUserIcon } from "@/constants/Icons";
import { Button } from "@nextui-org/button";
import Link from "next/link";

export default function AddCustomerLink() {
    return (
        <Button
            color="primary"
            className="border-1 border-own_primary-1 hover:border-own_primary-1 hover:bg-dark-2 transition-all bg-transparent text-dark-1 dark:text-light-1 h-[35px]"
            variant="solid"
        >
            <Link href={"/admin/add/customer"} className="flex items-center justify-center gap-2  h-full">
                <span className="text-own_primary-1">

                    <AddUserIcon />
                </span>
                Add student
            </Link>
        </Button>
    )
}
