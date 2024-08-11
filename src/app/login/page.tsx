import { Input } from "@/components/ui/input";
import Head from "next/head";
import { RiAdminFill } from "react-icons/ri";
import { IoIosLock } from "react-icons/io";
import { Button } from "@/components/ui/button"; // Ensure you have a Button component

export const metadata = {
  title: "Login",
};

export default function Login() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next Login Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="relative flex flex-col items-center justify-center w-full flex-1 px-4 text-center">
        <div className="relative bg-white rounded-2xl shadow-2xl flex w-full max-w-4xl overflow-hidden">
          <div className="relative w-3/5 p-5">
            <div className="text-left font-bold">
              <span className="text-green-600">Company</span>Name
            </div>
            <div className="py-10">
              <h2 className="text-2xl mb-3 font-semibold font-sans text-black">
                Login to account
              </h2>
              <div className="border-2 w-10 border-black inline-block mb-3"></div>
              <p className="text-gray-500 my-2">
                Use your username and password
              </p>
              <div className="flex flex-col items-center">
                <div className="bg-gray-100 w-64 p-2 rounded-md flex items-center mb-3">
                  <RiAdminFill className="text-gray-400 mr-2 text-xl" />
                  <Input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="bg-gray-100 text-sm flex-auto border border-transparent rounded-md"
                  />
                </div>
                <div className="bg-gray-100 w-64 p-2 rounded-md flex items-center">
                  <IoIosLock className="text-gray-400 mr-2 text-xl" />
                  <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="bg-gray-100 text-sm flex-auto border border-transparent rounded-md"
                  />
                </div>
                <Button className="mt-5 bg-green text-white rounded-full px-6 py-2 hover:bg-orange-500">
                  Login
                </Button>
              </div>
            </div>
          </div>
          <div className="relative w-2/5 bg-teal text-white rounded-tr-2xl rounded-br-2xl py-20 px-10">
            <h2 className="text-3xl font-semibold font-sans mb-3">
              Hello, Admin!
            </h2>
            <div className="border-2 w-10 border-white inline-block mb-3"></div>
            <p className="mb-5">
              Silahkan mengisi kredensial anda dan berikan akses klien.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
