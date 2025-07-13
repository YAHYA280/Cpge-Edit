export default function PageTitle({ title, description = '' }) {
    return (
        <div className='flex flex-col justify-center items-center text-center gap-1'>
            <p className="text-2xl font-semibold">{title}</p>
            <p className="text-text_color-1 text-base">{description}</p>
        </div>
    )
}
