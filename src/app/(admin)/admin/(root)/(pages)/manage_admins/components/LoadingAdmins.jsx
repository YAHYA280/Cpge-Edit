import { Spinner } from "@nextui-org/spinner";

export default function LoadingAdmins() {
    return (
        <div className='flex items-center gap-3'>
            <Spinner size="sm" /> Loading customers...
        </div>
    )
}
