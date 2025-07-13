import { HideIcon } from '@/constants/Icons';
import { cn } from '@/lib/utils';
import { toast } from 'sonner'




export default function createToast(content, isCustom = false) {

    if (isCustom) {

        const title = content[0]
        const description = content[1]

        const direction = document.body.dir || 'ltr'

        toast.custom((t) => (
            <div className='bg-light-2 shadow-lg w-[350px] p-2 rounded-lg flex flex-col relative' dir={direction}>
                <div className={cn('flex flex-col gap-[1px]')}>
                    <p className="font-semibold text-sm w-fit">{title}</p>
                    <p className='text-xs w-fit'>{description}</p>
                </div>

                <button className={cn('absolute top-2 cursor-pointer text-gray-800', {
                    'left-2': direction == 'rtl',
                    'right-2': direction != 'rtl'
                })} onClick={() => toast.dismiss(t)}><HideIcon special_size={13} /></button>
            </div>
        ));
    }
    else {

        if (content?.status == 'success') {
            toast.success(content.msg)
        } else if (content?.status == 'error') {
            toast.error(content.msg)
        } else if (content?.status == 'warning') {
            toast.warning(content.msg)
        }

        else {
            toast.message(content)
        }
    }


}
