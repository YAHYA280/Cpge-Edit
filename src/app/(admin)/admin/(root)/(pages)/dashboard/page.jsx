import Dashboard from "./_components/Dashboard";

const global_key = process.env.GLOBAL_KEY

export const metadata = {
    title: `Dashboard`,
}


export default function DashboardPage() {
    

    return (
        <>
            <Dashboard />
        </>
    );
}