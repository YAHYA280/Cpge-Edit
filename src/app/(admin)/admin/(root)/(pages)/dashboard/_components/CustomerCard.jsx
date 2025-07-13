import { Badge } from '@/components/ui/badge'
import { Button } from '@nextui-org/button'
import { Avatar } from '@nextui-org/react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@radix-ui/react-hover-card'
import Link from 'next/link'

export default function CustomerCard({ customer_name, customer_email, customer_id, avatar_url, joined_at}) {
    return (
        <HoverCard>
            <HoverCardTrigger asChild className='p-0 px-0'>
                <Button variant="link">
                    <Link href={`/admin/customers/customer/${customer_id}`}>
                        <Badge>{customer_name}</Badge>
                    </Link>
                </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 bg-light-1 dark:bg-dark-1 border-1 rounded-2xl p-3 shadow-2xl">
                <div className="flex justify-between flex-col gap-4">

                    <div className='flex items-center gap-2'>
                        <Avatar isBordered src={avatar_url} size="md" />
                        <div className='flex flex-col gap-1'>
                            <p>{customer_name}</p>
                            <p className='text-xs text-gray-400'>{customer_email}</p>
                        </div>
                    </div>

                    <span className="text-xs text-muted-foreground">{joined_at}</span>
                   
                </div>
            </HoverCardContent>
        </HoverCard>
    )
}
