// import StepsContainer from "./components/(withLoginTemplate)/StepsContainer";

import MainPageTemplate from "./components/MainPageTemplate";

// import { cookies } from 'next/headers';

// const allCookies = cookies()

// const customer_data = allCookies.get('customer_data')?.value

var title = 'Home page'
var description = 'This is the home page description'


export const metadata = {
    title,
    description,
}


export default function Home() {


    return (
        // <div className="flex flex-col gap-[20px] h-fit rounded-xl p-2 w-full mx-auto ">
            <MainPageTemplate />
        // </div>
    );
}
