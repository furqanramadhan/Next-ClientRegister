import Link from "next/link";
import { Briefcase, KeyRound } from "lucide-react";
import { buttonVariants } from "./ui/button";

const Navbar = () => {
  return (
    <div className="bg-black py-2 border-b border-s-zinc-200 fixed top-0 w-full z-10">
      <div className="container mx-auto flex items-center justify-between px-4">
        <KeyRound className="text-2xl text-white" />
        <div className="flex-1 flex justify-center space-x-4">
          <Link
            className="block py-2 px-3 text-white rounded hover:bg-yellow hover:text-gray-900 dark:text-white dark:hover:bg-yellow-500"
            href="/"
          >
            Home
          </Link>
          <Link
            className="block py-2 px-3 text-white rounded hover:bg-yellow hover:text-gray-900 dark:text-white dark:hover:bg-yellow-500"
            href="/dashboard"
          >
            Dashboard
          </Link>
        </div>
        <Link
          className={`${buttonVariants()} text-white bg-teal hover:bg-yellow`}
          href="/login"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
