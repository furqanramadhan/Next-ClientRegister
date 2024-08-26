import RequestForm from "@/components/forms/RequestForm";
export default function Home() {
  return (
    <div className="w-full">
      <p className="text-xl font-medium capitalize text-center p-5">
        <br className="lg:flex hidden" /> Request Visitor Access
      </p>
      <RequestForm />
    </div>
  );
}
