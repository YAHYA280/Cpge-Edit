import PageName from "@/app/(admin)/assets/components/PageName";
import AddCustomerForm from "./components/AddCustomerForm";
export default function AddCustomer() {
  return (
    <div className="flex flex-col gap-4">
      <PageName pageName='Add student' />

      <div className="bg-light-1 dark:bg-dark-2 border-1 p-4 rounded-large">
        <AddCustomerForm />
      </div>
    </div>
  )
}
