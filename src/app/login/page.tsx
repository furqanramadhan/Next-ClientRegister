"use client";
import { Input } from "@/components/ui/input";
import { RiAdminFill } from "react-icons/ri";
import { IoIosLock } from "react-icons/io";
import { Button } from "@/components/ui/button"; // Ensure you have a Button component
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function Login() {
  const [info, setInfo] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const router = useRouter();

  function handleInput(e: { target: { name: string; value: string } }) {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: {
    [x: string]: any;
    preventDefault: () => void;
  }) {
    e.preventDefault();

    if (!info.username || !info.password) {
      setError("Must provide all credentials.");
      return;
    }

    try {
      setPending(true);
      const result = await signIn("credentials", {
        redirect: false,
        credentials: {
          username: info.username,
          password: info.password,
        },
      });

      if (result?.error) {
        setError("Invalid Credentials.");
        setPending(false);
        return;
      }
      router.replace("/");
    } catch (error) {
      setPending(false);
      setError("Something went wrong");
    } finally {
      setPending(false);
    }
  }

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
                Login to account
              </h2>
              <div className="border-2 w-10 border-black inline-block mb-3"></div>
              <p className="text-gray-500 my-2">
                Use your username and password
              </p>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center"
              >
                <div className="flex flex-col items-center">
                  <div className="bg-gray-100 w-full max-w-xs p-2 rounded-md flex items-center mb-3">
                    <RiAdminFill className="text-gray-400 mr-2 text-xl" />
                    <Input
                      type="text"
                      name="username"
                      placeholder="Username"
                      onChange={handleInput}
                      className="bg-gray-100 text-sm flex-auto border border-transparent rounded-md"
                    />
                  </div>
                  <div className="bg-gray-100 w-full max-w-xs p-2 rounded-md flex items-center mb-3">
                    <IoIosLock className="text-gray-400 mr-2 text-xl" />
                    <Input
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={handleInput}
                      className="bg-gray-100 text-sm flex-auto border border-transparent rounded-md"
                    />
                  </div>
                  <Button className="mt-5 bg-green text-white rounded-full px-6 py-2 hover:bg-orange-500">
                    Login
                  </Button>
                </div>
              </form>
            </div>
          </div>
          <div className="relative w-full md:w-2/5 bg-teal text-white rounded-tr-2xl rounded-br-2xl py-20 px-10 flex flex-col items-center justify-center">
            <h2 className="text-3xl font-semibold font-sans mb-3">
              Hello, Admin!
            </h2>
            <div className="border-2 w-10 border-white inline-block mb-3"></div>
            <p className="text-center mb-5">
              Silahkan mengisi kredensial anda dan berikan akses klien.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
