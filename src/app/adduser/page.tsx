import AddUserForm from "@/components/forms/user/AddUserForm";
export default function Home() {
  return (
    <div className="w-full">
      <p className="text-xl font-medium capitalize text-center">
        <br className="lg:flex hidden font-bold" /> Add New User
      </p>
      <AddUserForm />
    </div>
  );
}
