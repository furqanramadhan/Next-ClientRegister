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
import Head from "next/head";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import RegisterModal from "./RegisterModal"; // Import the Modal component

const FormSchema = z.object({
  companyName: z.string(),
  clientName: z.string(),
  description: z.string(),
  companyImage: z
    .string()
    .optional()
    .refine(
      (val) => {
        // Example of checking file type
        return val ? ["image/png", "image/jpeg"].includes(val) : true;
      },
      {
        message: "Only PNG and JPG files are allowed",
      }
    ),
  position: z.string(),
  contractNumber: z.string(),
  workPeriod: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => val >= 0, {
      message: "Periode kerja tidak boleh negatif",
    }),
  insuranceNumber: z.string(),
  requestDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
});

const RegisterForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { reset, handleSubmit, setValue } = form;
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("Form Submitted Successfully!");
      } else {
        console.error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleClick = () => {
    const fileInput = document.getElementById(
      "companyImage"
    ) as HTMLInputElement;
    fileInput.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const allowedTypes = ["image/png", "image/jpeg"];
      const validFiles = Array.from(files).filter((file) =>
        allowedTypes.includes(file.type)
      );

      if (validFiles.length === 0) {
        setIsModalOpen(true);
        return;
      }

      setFileNames(validFiles.map((file) => file.name));
      setValue("companyImage", validFiles[0].type); // Save file type or other identifier
      const previewURL = URL.createObjectURL(validFiles[0]);
      setPreviewImage(previewURL);
    }
  };

  const handleDeleteImage = () => {
    setFileNames([]);
    setPreviewImage(null);
    setValue("companyImage", undefined);
    const fileInput = document.getElementById(
      "companyImage"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleClearAll = () => {
    reset({
      companyName: "",
      clientName: "",
      description: "",
      companyImage: undefined,
      position: "",
      contractNumber: "",
      workPeriod: 0,
      insuranceNumber: "",
      requestDate: "",
    });

    setFileNames([]);
    setPreviewImage(null);

    const fileInput = document.getElementById(
      "companyImage"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  return (
    <div>
      <RegisterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Tipe file invalid"
        message="Only PNG and JPG files are allowed."
      />
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="relative w-full">
          <FormField
            control={form.control}
            name="companyImage"
            render={({ field }) => (
              <FormItem className="mt-6">
                <FormLabel>Logo Perusahaan</FormLabel>
                <FormControl>
                  <div className="flex flex-col items-start gap-2 w-full max-w-sm">
                    <input
                      id="companyImage"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      multiple
                    />
                    <div
                      className="bg-black text-white rounded text-center px-3 py-1 flex items-center justify-center cursor-pointer"
                      onClick={handleClick}
                    >
                      Upload
                    </div>
                    {previewImage && (
                      <div className="relative mt-2">
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="max-h-40 border rounded"
                        />
                        <Button
                          className="absolute top-0 right-0 w-8 h-8 hover:bg-yellow flex items-center justify-center bg-white text-black rounded-full"
                          onClick={handleDeleteImage}
                        >
                          x
                        </Button>
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Perusahaan</FormLabel>
                <FormControl>
                  <Input
                    className="bg-white text-black"
                    placeholder="Masukkan nama perusahaan"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="clientName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama</FormLabel>
                <FormControl>
                  <Input
                    className="bg-white text-black"
                    placeholder="Masukkan nama"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deskripsi Umum Pekerjaan</FormLabel>
                <FormControl>
                  <Input
                    className="bg-white text-black w-full h-20 p-2 border border-gray-300 rounded-md"
                    placeholder="Deskripsi"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contractNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>No. Kontrak/PO</FormLabel>
                <FormControl>
                  <Input
                    className="bg-white text-black"
                    placeholder="Masukkan no kontrak"
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
            name="workPeriod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Periode Kerja (bulan)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    className="bg-white text-black"
                    placeholder="Masukkan periode kerja"
                    {...field}
                    min="0" // Ensure input field does not accept negative numbers
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="insuranceNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nomor Asuransi</FormLabel>
                <FormControl>
                  <Input
                    className="bg-white text-black"
                    placeholder="Masukkan nomor asuransi"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="requestDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tanggal Permintaan</FormLabel>
                <FormControl>
                  <Input
                    type="datetime-local"
                    className="bg-white text-black w-3/2 border border-gray-300 rounded-md"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormItem>
            <FormControl>
              <div className="flex justify-end mt-10">
                <Button
                  className="bg-red"
                  type="button"
                  onClick={handleClearAll}
                >
                  Clear all
                </Button>
                <Button className="bg-green ml-5" type="submit">
                  Submit Changes
                </Button>
              </div>
            </FormControl>
          </FormItem>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
