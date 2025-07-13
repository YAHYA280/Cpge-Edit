const SquircleButton = ({ children, className = '', ...props }) => {
    return (
        <button
            className={`relative inline-flex items-center justify-center overflow-hidden text-sm font-medium text-white bg-own_primary-1 focus:z-10 focus:ring-2 transition-colors duration-200 ${className}`}
            style={{
                WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Cpath d='M38.5 20c0 7.84-1.1 12.265-3.668 14.832C32.265 37.4 27.841 38.5 20 38.5c-7.84 0-12.265-1.1-14.832-3.668C2.6 32.265 1.5 27.841 1.5 20c0-7.84 1.1-12.265 3.668-14.832C7.735 2.6 12.159 1.5 20 1.5c8.601 0 12.966 1.117 15.336 3.635 1.176 1.25 1.98 2.968 2.48 5.412.505 2.459.684 5.55.684 9.453Z'/%3E%3C/svg%3E")`,
                maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Cpath d='M38.5 20c0 7.84-1.1 12.265-3.668 14.832C32.265 37.4 27.841 38.5 20 38.5c-7.84 0-12.265-1.1-14.832-3.668C2.6 32.265 1.5 27.841 1.5 20c0-7.84 1.1-12.265 3.668-14.832C7.735 2.6 12.159 1.5 20 1.5c8.601 0 12.966 1.117 15.336 3.635 1.176 1.25 1.98 2.968 2.48 5.412.505 2.459.684 5.55.684 9.453Z'/%3E%3C/svg%3E")`,
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskPosition: 'center',
            }}
            {...props}
        >
            {children}
        </button>
    )
}

export default SquircleButton