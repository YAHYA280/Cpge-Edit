import Footer from "./settings/components/Footer";
import Header from "./settings/components/Header";
import SideHeader from "./settings/components/SideHeader";





export default function AdminLayout({ children }) {
  return (
    <div className="flex flex-col h-[100vh]">

      <Header />


      <div className="flex">
        <SideHeader />

        <div className="w-full h-full p-10 bg-light-1 dark:bg-dark-1 overflow-auto">

          {children}
        </div>
        {/* <div className="w-full p-10 bg-light-2">
          <div className="p-5 pt-5 pb-5 h-full flex flex-col gap-4 bg-light-1 w-full rounded-md">
            <p className="text-base font-semibold">General settings</p>
            <div className="flex w-full flex-col">

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-7">
                  <div className="flex flex-col gap-2">
                    <p className="text-sm">Full name</p>
                    <div className="flex gap-2 items-center">
                      <HtmlInput
                        type="without_top_placeholder"
                        placeholder={{ icon: < RiUserLine size={16} />, text: 'First name' }}

                      />
                      <HtmlInput
                        type="without_top_placeholder"
                        placeholder={{ icon: < RiUserLine size={16} />, text: 'Last name' }}

                      />
                    </div>

                  </div>

                  <HtmlInput
                    type="email"
                    placeholder='Work email'

                  />
                  <HtmlInput
                    type="name"
                    placeholder='Your username'

                  />
                </div>

                <div className="w-full">
                  <HtmlInput
                    type="customized_file"
                  // placeholder='First name'

                  />
                </div>

              </div>

            </div>



          </div>
        </div> */}


      </div>




      {/* <Footer /> */}


    </div>
  )
}