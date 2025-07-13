export default function PageName({ pageName, beside, children }) {

    return (
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-2xl font-semibold">
                <p>{pageName}</p>
                {beside}
            </div>
            {children}
        </div>
    )
}
