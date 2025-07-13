import DetailsInputs from "./components/DetailsInputs";


export const metadata = {
  title: 'My account',

  description: '',
}

export default function DetailsPage() {

  return (
    <div className="flex flex-col w-full">
      <DetailsInputs />
    </div>
  )
}
