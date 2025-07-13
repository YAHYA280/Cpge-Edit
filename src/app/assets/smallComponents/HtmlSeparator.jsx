import { cn } from '@/lib/utils'
import '../css/HtmlSeparator.css'

function HtmlSeparator({ height = '1px', width = '100%', className = '' }) {
  return (
    <div className={cn('html-separator', className)} style={{ height, width }}>
    </div>
  )
}

export default HtmlSeparator
