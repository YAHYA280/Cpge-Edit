import { Spinner } from "@nextui-org/spinner";

export default function LoadingSteps({full_name}) {
    return (
        <div className='flex items-center gap-3'>
            <Spinner size="sm" /> Loading steps of ${full_name}...
        </div>
    )
}
