"use client";
import Link from "next/link";
import { KeyRound } from "lucide-react";
import { buttonVariants } from "./ui/button";
import { PiUserCircleGearDuotone } from "react-icons/pi";
import { useState, useEffect, useRef } from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const Navbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const { data: session } = useSession();
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("userToken");

    if (token) {
      try {
        const userData = JSON.parse(token);
        setUser(userData);
      } catch (error) {
        console.error("Error parsing user token:", error);
        setUser(null);
      }
    }
  }, []);

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      localStorage.removeItem("userToken");
      window.location.href = "/login";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleMouseEnter = () => {
    if (timeoutId !== null) clearTimeout(timeoutId);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    const id = window.setTimeout(() => {
      setDropdownOpen(false);
    }, 300);
    setTimeoutId(id);
  };

  return (
    <div className="bg-army py-2 border-b border-s-zinc-200 fixed top-0 w-full z-10">
      <div className="container mx-auto flex items-center justify-between px-4">
        <KeyRound
          className={`text-2xl ${
            session
              ? "text-white cursor-pointer"
              : "text-gray-500 cursor-not-allowed"
          }`}
          onClick={() => session && toggleSidebar()}
        />
        <div className="flex-1 flex justify-center space-x-4">
          <Link
            className="block py-2 px-3 text-white rounded hover:bg-yellow hover:text-gray-900 dark:text-white dark:hover:bg-yellow-500"
            href="/"
          >
            Home
          </Link>
          <Link
            className="block py-2 px-3 text-white rounded hover:bg-yellow hover:text-gray-900 dark:text-white dark:hover:bg-yellow-500"
            href="/request"
          >
            Request
          </Link>
        </div>
        {user ? (
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={dropdownRef}
          >
            <Link href="/">
              <PiUserCircleGearDuotone className="text-2xl text-white hover:text-yellow cursor-pointer" />
            </Link>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
                <ul className="py-1">
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 w-full text-left text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <Link
            className={`${buttonVariants()} text-white bg-teal hover:bg-yellow`}
            href="/login"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
