import { Button } from "@/components/ui/button"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"

export function CustomizedHoverCard({children, explaining_content}) {
    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <Button variant="link">{children}</Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-fit p-2 text-sm rounded-xl">
                {explaining_content}
            </HoverCardContent>
        </HoverCard>
    )
}
