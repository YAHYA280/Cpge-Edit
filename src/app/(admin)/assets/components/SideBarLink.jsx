import { cn } from "@/lib/utils";
import Link from "next/link";

export default function SideBarLink({ id, href, isActive, name, icon, className = '' }) {
    return (
        <Link
            key={id}
            href={`/admin${href}`}
            className={cn(`text-sm  flex items-center gap-3 p-2 pl-4 text-light-1 hover:bg-dark-4 dark:hover:bg-dark-2 hover:text-dark-1 dark:hover:text-light-1 relative before:h-full before:w-[2px] before:bg-transparent before:left-[0] before:t-0 before:absolute  ${className}`, { 'bg-light-2 text-dark-1 dark:bg-dark-2 dark:text-light-1 before:bg-own_primary-1': isActive })
            }>

            {/* <span className={isActive ? 'text-dark-1 dark:text-light-1' : ''}> */}
            <span className={isActive ? 'text-own_primary-1' : ''}>
                {icon}
            </span>

            <p className={isActive ? 'text-own_primary-1' : ''}>

                {name}
            </p>
        </Link>
    )
}