import IssuesContainer from "./components/IssuesContainer";

const global_key = process.env.GLOBAL_KEY


export const metadata = {
  title:'Request help',

  description: '',
}

export default function HelpPage() {
  return (
    <div className="w-full">
      <IssuesContainer/>
    </div>
  )
}
