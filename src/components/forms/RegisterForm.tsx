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
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import RegisterModal from "./RegisterModal"; // Import the Modal component

const FormSchema = z.object({
  companyName: z.string(),
  clientName: z.string(),
  description: z.string(),
  companyImage: z
    .instanceof(FileList)
    .optional()
    .refine(
      (fileList) => {
        if (!fileList) return true;
        const allowedTypes = ["image/png", "image/jpeg"];
        return Array.from(fileList).every((file) =>
          allowedTypes.includes(file.type)
        );
      },
      {
        message: "Only PNG and JPG files are allowed",
      }
    ),
  position: z.string(),
  contractNumber: z.string(),
  workPeriod: z.number(),
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

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log("Form Submitted!", data);
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

      setFileNames(validFiles.map((file) => file.name)); // Update state with file names
      setValue("companyImage", files); // Update form value with the selected files

      // Set preview image
      const previewURL = URL.createObjectURL(validFiles[0]);
      setPreviewImage(previewURL);
    }
  };

  const handleDeleteImage = () => {
    setFileNames([]); // Clear file names state
    setPreviewImage(null); // Clear preview image state
    setValue("companyImage", undefined); // Clear the file input in the form
    const fileInput = document.getElementById(
      "companyImage"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ""; // Clear the file input element
    }
  };

  const handleClearAll = () => {
    // Reset form values to defaults
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

    // Clear file names and preview image
    setFileNames([]);
    setPreviewImage(null);

    // Reset file input
    const fileInput = document.getElementById(
      "companyImage"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ""; // Clear the file input element
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
              <div className="flex gap-5">
                <FormItem className="flex-1">
                  <FormLabel>Tanggal Permintaan</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      className="bg-white text-black w-3/2 border border-gray-300 rounded-md"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
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
