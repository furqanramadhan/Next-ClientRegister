"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { FaUserPlus, FaUsers, FaSignOutAlt } from "react-icons/fa";
import { AiOutlineForm } from "react-icons/ai";

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  const { data: session } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (session?.user?.role === "admin") {
      setIsAdmin(true);
    }
  }, [session]);

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      localStorage.removeItem("userToken");
      window.location.href = "/login";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transition-transform transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      style={{ zIndex: 1000 }}
    >
      <div className="flex items-center justify-center p-4">
        <Image
          src="/logo.png"
          alt="App Logo"
          width={40}
          height={40}
          className="rounded-full"
        />
        <h1 className="ml-2 text-xl font-bold">App Title</h1>
      </div>
      <nav className="flex-1">
        <ul className="py-4">
          <li>
            <Link
              href="/request"
              className="flex items-center px-4 py-2 hover:bg-gray-700"
            >
              <AiOutlineForm className="mr-2" />
              Add Request
            </Link>
          </li>
          {isAdmin && (
            <>
              <li>
                <Link
                  href="/adduser"
                  className="flex items-center px-4 py-2 hover:bg-gray-700"
                >
                  <FaUserPlus className="mr-2" />
                  Add New User
                </Link>
              </li>
              <li>
                <Link
                  href="/listusers"
                  className="flex items-center px-4 py-2 hover:bg-gray-700"
                >
                  <FaUsers className="mr-2" />
                  List Users
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <button
        onClick={handleLogout}
        className="flex items-center px-4 py-2 mt-auto mb-4 hover:bg-gray-700"
      >
        <FaSignOutAlt className="mr-2" />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
