"use client";
import { Input } from "@/components/ui/input";
import { RiAdminFill } from "react-icons/ri";
import { IoIosLock } from "react-icons/io";
import { Button } from "@/components/ui/button"; // Ensure you have a Button component
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import LoginModal from "@/components/auth/LoginModal";

export default function Login() {
  const [info, setInfo] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [alreadyLoggedIn] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("userToken");

    if (token) {
      setModalOpen(true);
      setTimeout(() => {
        router.replace("/");
      }, 2000);
    }
  }, [router]);

  function handleInput(e: { target: { name: string; value: string } }) {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();

    if (!info.username || !info.password) {
      setError("Must provide all credentials.");
      return;
    }

    try {
      setPending(true);
      const res = await signIn("credentials", {
        username: info.username,
        password: info.password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid Credentials.");
        setPending(false);
        return;
      }
      if (res?.status === 200) {
        localStorage.setItem("userToken", JSON.stringify(res));
      }
      setModalOpen(true);
      setTimeout(() => {
        router.replace("/");
      }, 3500);
    } catch (error) {
      setPending(false);
      setError("Something went wrong");
    }
  }
  if (alreadyLoggedIn) {
    return (
      <LoginModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Already Logged In"
        message="You are already logged in. Redirecting to the home page..."
      />
    );
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
                  <Button
                    type="submit"
                    className="mt-5 bg-green text-white rounded-full px-6 py-2 hover:bg-orange-500 primary-btn change-btn"
                  >
                    {pending ? "Logging In.." : "Login"}
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
      <LoginModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Log In Successful"
        message="You will be redirected to the main page shortly."
      />
    </div>
  );
}
