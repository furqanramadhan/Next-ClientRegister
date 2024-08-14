import { Input } from "@/components/ui/input";
import { RiAdminFill } from "react-icons/ri";
import { IoIosLock } from "react-icons/io";
import { HiOutlineMail } from "react-icons/hi";
import { Button } from "@/components/ui/button"; // Ensure you have a Button component
import { useState } from "react";

export const metadata = {
  title: "Register",
};

export default function Register() {
  const [info, setInfo] = useState({ username: "", email: "", password: "" });

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen py-2">
      <main className="relative flex flex-col items-center justify-center w-full flex-1 px-4 text-center">
        <div className="relative bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row w-full max-w-4xl overflow-hidden">
          <div className="relative w-full md:w-3/5 p-5">
            <div className="text-left font-bold">
              <span className="text-green-600">Company</span>Name
            </div>
            <div className="py-10">
              <h2 className="text-2xl mb-3 font-semibold font-sans text-black">
                Sign Up
              </h2>
              <div className="border-2 w-10 border-black inline-block mb-3"></div>
              <p className="text-gray-500 my-2 mb-5">
                Masukkan username, email, dan password
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
                <div className="bg-gray-100 w-64 p-2 rounded-md flex items-center mb-3">
                  <HiOutlineMail className="text-gray-400 mr-2 text-xl" />
                  <Input
                    type="text"
                    name="email"
                    placeholder="Email"
                    className="bg-gray-100 text-sm flex-auto border border-transparent rounded-md"
                  />
                </div>
                <div className="bg-gray-100 w-64 p-2 rounded-md flex items-center mb-3">
                  <IoIosLock className="text-gray-400 mr-2 text-xl" />
                  <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="bg-gray-100 text-sm flex-auto border border-transparent rounded-md"
                  />
                </div>
                <Button className="mt-5 bg-green text-white rounded-full px-6 py-2 hover:bg-orange-500">
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
          <div className="relative w-full md:w-2/5 bg-teal text-white rounded-tr-2xl rounded-br-2xl py-20 px-10 flex flex-col items-center justify-center">
            <h2 className="text-3xl font-semibold font-sans mb-3">
              Hello, Admin!
            </h2>
            <div className="border-2 w-10 border-white inline-block mb-3"></div>
            <p className="mb-5 text-center">
              Silahkan mendaftar dan mengisi kredensial anda.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
