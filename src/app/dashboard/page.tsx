"use client";
import * as XLSX from "xlsx";
import { useEffect, useState } from "react";
import DetailModal from "@/components/forms/DetailModal";
import { useSession } from "next-auth/react";
import { buttonVariants } from "@/components/ui/button";

interface FormData {
  id: number;
  companyName: string;
  clientName: string;
  description: string;
  clientImage?: string;
  position: string;
  contractNumber: string;
  startDate: string;
  endDate: string;
  insuranceNumber: string;
  requestDate: string;
}

const Dashboard = () => {
  const { data: session } = useSession();
  const [data, setData] = useState<FormData[]>([]);
  const [entriesToShow, setEntriesToShow] = useState<number>(5);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedData, setIsSelectedData] = useState<FormData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/dashboard");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleExportToExcel = () => {
    const workSheet = XLSX.utils.json_to_sheet(data);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Data Member Visitor");
    XLSX.writeFile(workBook, "Data Member Visitor.xlsx");
  };

  const openModal = (item: FormData) => {
    setIsSelectedData(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsSelectedData(null);
  };

  return (
    <div className="p-4 relative min-h-3 flex flex-col">
      {session ? (
        <div className="text-right mb-4">
          <p className="text-sm">
            Logged in as: <strong>{session.user?.email}</strong>
          </p>
        </div>
      ) : (
        <p className="text-sm text-red-500">You are not logged in.</p>
      )}
      <h1 className="text-2xl font-extrabold mb-8 text-center">
        Data Member Visitor
      </h1>
      <div className="relative overflow-x-auto w-full shadow-lg bg-white rounded-lg p-4">
        <table className="relative table table-auto text-left min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-300">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Position
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contract Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Start Work
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                End Work
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Insurance Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Request Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status Penerimaan
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.slice(0, entriesToShow).map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.id}
                </td>
                <td
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 underline cursor-pointer"
                  onClick={() => openModal(item)}
                >
                  {item.companyName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.clientName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.position}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.contractNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(item.startDate).toLocaleDateString("en-CA")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(item.endDate).toLocaleDateString("en-CA")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.insuranceNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.requestDate.slice(0, 16).replace("T", " ")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      className={`${buttonVariants()} text-white bg-tosca hover:bg-yellow w-full`}
                    >
                      Terima
                    </button>
                    <button
                      className={`${buttonVariants()} text-white bg-red hover:bg-yellow w-full`}
                    >
                      Tolak
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 relative items-start justify-between w-full max-w-xl">
        <label htmlFor="entries" className="mr-2 text-sm font-medium">
          Show
        </label>
        <select
          id="entries"
          value={entriesToShow}
          onChange={(e) => setEntriesToShow(Number(e.target.value))}
          className="border border-white rounded p-1"
        >
          <option value={5}>5 entries</option>
          <option value={10}>10 entries</option>
          <option value={15}>15 entries</option>
          <option value={data.length}>Show all</option>
        </select>
        <button
          onClick={handleExportToExcel}
          className="text-white ml-5 bg-red rounded-md px-4 py-2 hover:bg-yellow items-start"
        >
          Excel
        </button>
      </div>
      <DetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={selectedData}
      />
    </div>
  );
};

export default Dashboard;
