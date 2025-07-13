// import Sidebar2 from '@/app/(admin)/assets/components/SideBar2'
import Header from '../../../assets/components/Header/Header'
import SideBar from '../../../assets/components/SideBar'
import { CountryAndCityWrapper } from './add/customer/context/CountryAndCityContext'




export default function AdminLayout({ children }) {
  return (
    <main className="flex relative h-[100vh]">

      {/* This is the side bar  */}
      <SideBar />
      {/* <Sidebar2 /> */}

      <div className="page-content w-full flex flex-col h-full overflow-hidden">
        {/* This is the header  */}
        <Header />


        <main className="p-5 bg-light-2 dark:bg-dark-2 overflow-y-auto h-full flex-1">
          <CountryAndCityWrapper>
            {children}
          </CountryAndCityWrapper>

        </main>
      </div>

    </main>
  )
}