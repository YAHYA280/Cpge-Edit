import { RiSearch2Line } from "@remixicon/react";

export default function NoSchoolsFound() {
    return (
        <div className="flex flex-col gap-1 items-center justify-center">
            <RiSearch2Line className="text-bg-own_primary-1" />
            <p className="mt-5 text-medium font-semibold text-dark-1">No schools found</p>
            <p>Clear your filters and try again</p>
        </div>
    )
}
