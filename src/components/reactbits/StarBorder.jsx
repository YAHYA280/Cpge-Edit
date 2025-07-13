import { cn } from "@/lib/utils";

const StarBorder = ({
    as: Component = "button",
    className = "",
    color = "white",
    speed = "6s",
    children,
    boxBackground = 'bg-dark-1',
    ...rest
}) => {
    return (
        <Component className={`relative inline-block py-[2px] overflow-hidden rounded-[20px] ${className}`} {...rest}>
            <div
                className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0"
                style={{
                    background: `radial-gradient(circle, ${color}, transparent 10%)`,
                    animationDuration: speed,
                }}
            ></div>
            <div
                className="absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0"
                style={{
                    background: `radial-gradient(circle, ${color}, transparent 10%)`,
                    animationDuration: speed,
                }}
            ></div>
            
            <div className={cn(`relative z-1 bg-gradient-to-b border border-gray-800 text-white text-center text-[16px] py-[16px] px-[26px] rounded-[20px] ${boxBackground}`)}>
                {children}
            </div>
        </Component>
    );
};

export default StarBorder;
