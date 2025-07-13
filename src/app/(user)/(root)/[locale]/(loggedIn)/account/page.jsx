import StepsContainer from "../assets/components/StepsContainer";


export const metadata = {
  title: 'My steps',
  description: '',
}

export default function UserStepsPage() {
  return (
    <div className="flex flex-col gap-3 w-full">
      <StepsContainer />
    </div>
  )
}
