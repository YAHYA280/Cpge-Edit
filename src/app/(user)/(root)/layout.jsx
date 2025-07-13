import PageLoading from "../components/PageLoading"
const global_key = process.env.NEXT_PUBLIC_GLOBAL_KEY


export const metadata = {
  title: `Welcome to ${global_key}`,
  description: '',
}




export default function UserLayout({ children }) {

  return (
    <div>
      <PageLoading />
      {children}
    </div>
  )
}