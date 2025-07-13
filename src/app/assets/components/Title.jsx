import { cn } from "@/lib/utils"

const Title = ({ icon, title, text, titleColor = '' }) => {
    return (
        <div className="flex gap-2">
            <div className="mt-1">
                {icon}
            </div>

            <div className="flex flex-col text-start ">
                <p className={cn('text-lg sm:text-xl font-semibold flex items-center gap-2', titleColor)}>{title}</p>
                <p className="text-sm text-text_color-1">{text}</p>
            </div>
        </div>
    )
}
export default Title