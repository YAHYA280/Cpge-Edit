import PageName from "@/app/(admin)/assets/components/PageName";
import AddAdminForm from "./components/AddAdminForm";

export default function AddAdmin() {
  return (
    <div className="flex flex-col gap-4">
      <PageName pageName='Add admin' />

      <div className="bg-light-1 dark:bg-dark-2 border-1 p-4 rounded-large">
        <AddAdminForm />
      </div>
    </div>
  )
}
