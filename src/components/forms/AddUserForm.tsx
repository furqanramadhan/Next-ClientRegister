"use client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { HiOutlineMail } from "react-icons/hi";
import { Input } from "../ui/input";
import { RiAdminFill } from "react-icons/ri";
import { IoIosLock } from "react-icons/io";
import { Button } from "../ui/button";
import { useState } from "react";
import AddUserModal from "../auth/AddUserModal";
import InvalidModal from "./InvalidModal";

const FormSchema = z.object({
  companyName: z.string(),
  fullName: z.string(),
  userName: z.string(),
  email: z.string().email("Invalid email address"), // Email validation
  password: z.string().min(6, "Password must be at least 6 characters long"), // Password validation
  position: z.string(),
});

const AddUserForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [pending, setPending] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { reset, handleSubmit, setValue } = form;

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setPending(true); // Start loading state
    try {
      const response = await fetch("/api/adduser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("User Added Successfully!");
        setPending(false); // End loading state
        reset(); // Clear the form after successful submission
      } else {
        console.error("Failed to submit new user");
        setPending(false); // End loading state
      }
    } catch (error) {
      console.error("Error submitting new user:", error);
      setPending(false); // End loading state
    }
  };

  const handleClearAll = () => {
    reset({
      companyName: "",
      fullName: "",
      position: "",
      userName: "",
      email: "",
      password: "",
    });
  };

  return (
    <div>
      <InvalidModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Tipe file invalid"
        message="Only PNG and JPG files are allowed."
      />
      <AddUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="User Berhasil ditambahkan"
      />
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative w-full flex flex-col"
        >
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Perusahaan</FormLabel>
                <FormControl>
                  <Input
                    className="bg-white text-black"
                    placeholder="Nama perusahaan"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama</FormLabel>
                <FormControl>
                  <Input
                    className="bg-white text-black"
                    placeholder="Masukkan nama User"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Posisi</FormLabel>
                <FormControl>
                  <Input
                    className="bg-white text-black"
                    placeholder="Masukkan posisi"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <div className="relative">
                    <RiAdminFill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
                    <Input
                      className="bg-white text-black pl-10 w-full"
                      placeholder="Masukkan username"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <HiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
                    <Input
                      className="bg-white text-black pl-10 w-full"
                      placeholder="Masukkan email"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <IoIosLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
                    <Input
                      type="password" // Set the input type to password to hide the characters
                      className="bg-white text-black pl-10 w-full"
                      placeholder="Masukkan password"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem>
            <FormControl>
              <div className="flex justify-end mt-10">
                <Button
                  type="button"
                  className="mt-5 mr-5 bg-red text-white rounded-full px-6 py-2 hover:bg-orange-500 primary-btn change-btn"
                  onClick={handleClearAll}
                >
                  Clear
                </Button>
                <Button
                  type="submit"
                  className="mt-5 bg-green text-white rounded-full px-6 py-2 hover:bg-orange-500 primary-btn change-btn"
                >
                  {pending ? "Submitting, please wait.." : "Submit"}
                </Button>
              </div>
            </FormControl>
          </FormItem>
        </form>
      </Form>
    </div>
  );
};

export default AddUserForm;
