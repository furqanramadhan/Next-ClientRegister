import AddUserForm from "@/components/forms/AddUserForm";
export default function Home() {
  return (
    <div className="w-full">
      <p className="text-xl font-medium capitalize">
        <br className="lg:flex hidden font-bold" /> Add New User
      </p>
      <AddUserForm />
    </div>
  );
}
