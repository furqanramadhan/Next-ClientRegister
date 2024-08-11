import Image from "next/image";
import RegisterForm from "@/components/forms/RegisterForm";

export default function Home() {
  return (
    <div className="w-full">
      <p className="text-xl font-medium capitalize">
        <br className="lg:flex hidden" /> Request Visitor Access
      </p>
      <RegisterForm />
    </div>
  );
}
