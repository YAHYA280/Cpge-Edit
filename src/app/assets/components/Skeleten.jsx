import { cn } from '@/lib/utils'
import { Skeleton } from '@nextui-org/skeleton'
import React from 'react'

export default function NormalSkeleten({ height = '7', width = '[90px]' }) {
  return (
    <Skeleton className={cn(`rounded-lg h-${height} w-${width}`)} />
  )
}
