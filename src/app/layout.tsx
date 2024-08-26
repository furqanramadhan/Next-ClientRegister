"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { SessionProvider } from "next-auth/react"; // Import SessionProvider
import { useState } from "react";
import Sidebar from "@/components/sidebar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <main className="h-screen flex justify-center items-center">
            <Sidebar isOpen={isSidebarOpen} />
            <div
              className={`flex-1 ${
                isSidebarOpen ? "ml-64" : "ml-0"
              } transition-all duration-300`}
            >
              <Navbar toggleSidebar={toggleSidebar} />
              {children}
            </div>
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
