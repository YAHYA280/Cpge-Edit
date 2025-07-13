import Image from 'next/image'

export default function CheckBadge({ className = '', size = 15 }) {
    return (
        <div>
            <Image
                src={'/icons/check-badge.svg'}
                height={size}
                width={size}
                alt="Check badge icon"
                className={className}
            />
        </div>
    )
}
