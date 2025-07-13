import { UserIcon } from "@/constants/Icons";
import Link from "next/link";

export default function NoCustomersToDisplay() {
    return (
        <div className="flex flex-col gap-2 justify-center items-center">
            <UserIcon special_size={70} />
            <p className="text-xl font-semibold text-light-1 dark:bg-dark-1">No customers to display</p>
            <p>There is not customer for you to show</p>
        </div>
    )
}
