"use client";
import { useCookies } from "react-cookie";
// import Header from "./components/(withLoginTemplate)/Header"
// import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react";
import MainHeader from "./Header";
import Template from "./mainPage/Template";
import Meteors from "@/components/magicui/meteors";

export default function MainPageTemplate() {
  const [customerData, setCustomerData] = useCookies(["customer_data"]);
  const customer_data = customerData.customer_data;

  // const [isPageLoading, setisPageLoading] = useState(true)

  // useEffect(() => {
  //     setisPageLoading(false)
  // }, [])

  return (
    <>
      {/* {
                isPageLoading &&
                <div className="h-screen w-full bg-dark-1 flex items-center flex-col gap-5 justify-center">
                    <Image
                        src={'/icons/cpe.svg'}
                        width={120}
                        height={120}
                        alt="logo"
                    />

                    <Spinner />
                </div>
            } */}

      {/* When the page finish loading  */}
      {/* { */}
      <main
        className="flex relative min-h-screen"
        onScroll={() => console.log("scrolling...")}
      >
        <div className="page-content w-full flex flex-col relative">
          <div className="absolute top-0 left-0 flex h-[400px] w-full overflow-hidden">
            <Meteors number={40} />
          </div>

          <MainHeader />

          <Template />
        </div>
      </main>
      {/* } */}
    </>
  );
}
