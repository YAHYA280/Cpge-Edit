import { getLanguageDetails } from "@/constants/functions";
import Header from "./assets/components/Header";
import { useLocale } from "next-intl";

export default function UserAccountProvider({ children }) {
    const currentLanguage = getLanguageDetails(useLocale())
    const active_language = currentLanguage.key
    const active_dir = currentLanguage.direction

    return (
        <main className="flex relative h-[100dvh] bg-red-800" dir={active_dir}>
            <div className="page-content w-full flex flex-col h-full overflow-hidden">
                <Header />
                <main className="p-5 bg-light-2 dark:bg-dark-2 overflow-y-auto h-full flex-1 ">
                    <div className="flex justify-center items-center mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </main>
    )
}
