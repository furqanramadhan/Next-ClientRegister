import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <div className="container mx-auto my-10">
      <div className="bg-[#FCDC94] px-6 lg:px-16 py-10 shadow-2xl rounded-3xl">
        <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center gap-5">
          <div className="flex flex-col gap-5 lg:gap-10">
            <p className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-medium capitalize">
              <br className="lg:flex hidden" /> Integration Access
              <br className="lg:flex hidden" /> Client System
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-gray-500">
              Solution for approval <br className="lg:flex hidden" /> access on
              mobile and desktop
            </p>
            <div className="flex gap-4">
              <Link
                href="/request"
                className="flex items-center btn btn-sm lg:btn-lg bg-green justify-center text-white rounded-md border-none lg:w-44 capitalize"
              >
                Request here
              </Link>
              <Link
                href="/dashboard"
                className="flex items-center btn btn-sm lg:btn-lg bg-black justify-center text-white rounded-md border-none lg:w-44 capitalize"
              >
                Dashboard
              </Link>
            </div>
          </div>
          <div className="relative w-48 h-48 rounded-full overflow-hidden">
            <Image src="/logo.png" alt="Logo" layout="fill" objectFit="cover" />
            <div className="absolute inset-0 bg-[#FCDC94] opacity-50"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
