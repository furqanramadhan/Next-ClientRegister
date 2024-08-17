"use client";
import { Input } from "@/components/ui/input";
import { RiAdminFill } from "react-icons/ri";
import { IoIosLock } from "react-icons/io";
import { HiOutlineMail } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import RegisterModal from "@/components/auth/RegisterModal";

export default function Register() {
  const [info, setInfo] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  function handleInput(e: { target: { name: string; value: string } }) {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: {
    [x: string]: any;
    preventDefault: () => void;
  }) {
    e.preventDefault();

    if (!info.username || !info.email || !info.password) {
      setError("Must provide all credentials.");
      return;
    }

    try {
      setPending(true);
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      });
      if (res.ok) {
        setPending(false);
        const form = e.target;
        form.reset();
        setModalOpen(true); // Open the modal on successful registration
        setTimeout(() => {
          router.push("/login");
        }, 3500);
      } else {
        const errorData = await res.json();
        setError(errorData.message);
        setPending(false);
      }
    } catch (error) {
      setPending(false);
      setError("Something went wrong");
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
                Sign Up
              </h2>
              <div className="border-2 w-10 border-black inline-block mb-3"></div>
              <p className="text-gray-500 my-2 mb-5">
                Masukkan username, email, dan password
              </p>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center"
              >
                <div className="bg-gray-100 w-64 p-2 rounded-md flex items-center mb-3">
                  <RiAdminFill className="text-gray-400 mr-2 text-xl" />
                  <Input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={handleInput}
                    className="bg-gray-100 text-sm flex-auto border border-transparent rounded-md"
                  />
                </div>
                <div className="bg-gray-100 w-64 p-2 rounded-md flex items-center mb-3">
                  <HiOutlineMail className="text-gray-400 mr-2 text-xl" />
                  <Input
                    type="text"
                    name="email"
                    placeholder="Email"
                    onChange={handleInput}
                    className="bg-gray-100 text-sm flex-auto border border-transparent rounded-md"
                  />
                </div>
                <div className="bg-gray-100 w-64 p-2 rounded-md flex items-center mb-3">
                  <IoIosLock className="text-gray-400 mr-2 text-xl" />
                  <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleInput}
                    className="bg-gray-100 text-sm flex-auto border border-transparent rounded-md"
                  />
                </div>
                {error && <span className="message">{error}</span>}
                <Button
                  type="submit"
                  className="mt-5 bg-green text-white rounded-full px-6 py-2 hover:bg-orange-500 primary-btn change-btn"
                >
                  {pending ? "Signing Up" : "Sign Up"}
                </Button>
              </form>
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

      {/* RegisterModal component usage */}
      <RegisterModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Registration Successful"
        message="You have successfully registered. You will be redirected to the login page shortly."
      />
    </div>
  );
}
