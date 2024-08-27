"use client";
import * as XLSX from "xlsx";
import { useEffect, useState } from "react";
import DetailModal from "@/components/forms/DetailModal";
import { useSession } from "next-auth/react";
import { buttonVariants } from "@/components/ui/button";
import ConfirmationModal from "@/components/forms/ConfirmationModal";

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
  status: string;
}

const Dashboard = () => {
  const { data: session } = useSession();
  const [data, setData] = useState<FormData[]>([]);
  const [acceptedData, setAcceptedData] = useState<FormData[]>([]);
  const [rejectedData, setRejectedData] = useState<FormData[]>([]);
  const [entriesToShow, setEntriesToShow] = useState<number>(5);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedData, setIsSelectedData] = useState<FormData | null>(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
    useState<boolean>(false);
  const [confirmationAction, setConfirmationAction] = useState<string | null>(
    null
  );
  const [currentItem, setCurrentItem] = useState<FormData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/dashboard/default");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchAcceptedData = async () => {
      try {
        const response = await fetch("/api/dashboard/accepted");
        const result = await response.json();
        setAcceptedData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAcceptedData();
    const intervalId = setInterval(fetchAcceptedData, 5000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchRejectedData = async () => {
      try {
        const response = await fetch("/api/dashboard/rejected");
        const result = await response.json();
        setRejectedData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchRejectedData();
    const intervalId = setInterval(fetchRejectedData, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const handleExportToExcel = () => {
    const workSheet = XLSX.utils.json_to_sheet(data);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "Data Member Visitor");
    XLSX.writeFile(workBook, "Data Member Visitor.xlsx");
  };

  const openDetailModal = (item: FormData) => {
    setIsSelectedData(item);
    setIsModalOpen(true);
  };

  const openConfirmationModal = (item: FormData, action: string) => {
    setCurrentItem(item);
    setConfirmationAction(action);
    setIsConfirmationModalOpen(true);
  };

  const handleConfirmAction = async () => {
    if (confirmationAction && currentItem) {
      try {
        await fetch("/api/dashboard/" + currentItem.id, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: currentItem.id,
            action: confirmationAction,
          }),
        });
        setData((prevData) =>
          prevData.filter((item) => item.id !== currentItem?.id)
        );
        setConfirmationAction(null);
        setCurrentItem(null);
        setIsConfirmationModalOpen(false);
      } catch (error) {
        console.error("Error confirming action:", error);
      }
    }
  };

  const handleCancelAction = () => {
    setIsConfirmationModalOpen(false);
    setConfirmationAction(null);
    setCurrentItem(null);
  };
  return (
    <div className="p-4 mt-10 relative min-h-3 flex flex-col">
      <DetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={selectedData}
      />
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onConfirm={handleConfirmAction}
        onCancel={handleCancelAction}
        action={confirmationAction || ""}
      />
      {session ? (
        <>
          <p className="text-sm">
            Logged in as: {session.user?.email || "Email not available"}
          </p>
          {session.user?.role !== "admin" && session.user?.companyName && (
            <p className="text-sm">Company: {session.user.companyName}</p>
          )}
        </>
      ) : (
        <p className="text-sm text-red">You are not logged in.</p>
      )}
      <h1 className="text-2xl font-extrabold mb-8 text-center">
        Data Member Visitor
      </h1>
      <div className="relative overflow-x-auto shadow-lg bg-white rounded-lg p-4">
        <div className="max-w-full overflow-x-scroll">
          <table className="w-full table-auto text-left divide-y divide-gray-200">
            <thead className="bg-gray-300">
              <tr>
                <th className="px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider w-1/12">
                  ID
                </th>
                <th className="px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider w-2/12">
                  Company Name
                </th>
                <th className="px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider w-2/12">
                  Client Name
                </th>
                <th className="px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider w-2/12">
                  Description
                </th>
                <th className="px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider w-1/12">
                  Position
                </th>
                <th className="px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider w-1/12">
                  Contract Number
                </th>
                <th className="px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider w-1/12">
                  Start Work
                </th>
                <th className="px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider w-1/12">
                  End Work
                </th>
                <th className="px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider w-1/12">
                  Insurance Number
                </th>
                <th className="px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider w-1/12">
                  Request Date
                </th>
                <th className="px-4 py-2 text-center text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider w-2/12">
                  Status Penerimaan
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.slice(0, entriesToShow).map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-2 break-words text-sm font-medium text-gray-900">
                    {item.id}
                  </td>
                  <td
                    className="px-4 py-2 break-words text-sm text-gray-500 underline cursor-pointer"
                    onClick={() => openDetailModal(item)}
                  >
                    {item.companyName}
                  </td>
                  <td className="px-4 py-2 break-words text-sm text-gray-500">
                    {item.clientName}
                  </td>
                  <td className="px-4 py-2 break-words text-sm text-gray-500">
                    {item.description}
                  </td>
                  <td className="px-4 py-2 break-words text-sm text-gray-500">
                    {item.position}
                  </td>
                  <td className="px-4 py-2 break-words text-sm text-gray-500">
                    {item.contractNumber}
                  </td>
                  <td className="px-4 py-2 break-words text-sm text-gray-500">
                    {new Date(item.startDate).toLocaleDateString("en-CA")}
                  </td>
                  <td className="px-4 py-2 break-words text-sm text-gray-500">
                    {new Date(item.endDate).toLocaleDateString("en-CA")}
                  </td>
                  <td className="px-4 py-2 break-words text-sm text-gray-500">
                    {item.insuranceNumber}
                  </td>
                  <td className="px-4 py-2 break-words text-sm text-gray-500">
                    {item.requestDate.slice(0, 16).replace("T", " ")}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-500">
                    <div className="flex flex-col sm:flex-row justify-center gap-2">
                      <button
                        onClick={() => openConfirmationModal(item, "accept")}
                        className={`${buttonVariants()} text-white bg-tosca hover:bg-yellow w-full sm:w-auto`}
                      >
                        Terima
                      </button>
                      <button
                        onClick={() => openConfirmationModal(item, "reject")}
                        className={`${buttonVariants()} text-white bg-red hover:bg-yellow w-full sm:w-auto`}
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
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-between space-y-8 lg:space-y-0 lg:space-x-8 mt-10">
        <div className="w-full lg:w-1/2 relative overflow-x-auto shadow-lg bg-white rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4">Data Diterima</h2>
          <div className="max-w-full overflow-x-scroll">
            <table className="w-full table-auto text-left divide-y divide-gray-200">
              <thead className="bg-gray-300">
                <tr>
                  <th className="px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider w-1/12">
                    ID
                  </th>
                  <th className="px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider w-2/12">
                    Company Name
                  </th>
                  <th className="px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider w-2/12">
                    Client Name
                  </th>
                  <th className="px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider w-1/12">
                    Position
                  </th>
                  <th className="px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider w-1/12">
                    Contract Number
                  </th>
                  <th className="px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider w-1/12">
                    Start Work
                  </th>
                  <th className="px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider w-1/12">
                    End Work
                  </th>
                  <th className="px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider w-1/12">
                    Insurance Number
                  </th>
                  <th className="px-4 py-2 text-center text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider w-2/12">
                    Status Penerimaan
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {acceptedData.slice(0, entriesToShow).map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-2 break-words text-sm font-medium text-gray-900">
                      {item.id}
                    </td>
                    <td
                      className="px-4 py-2 break-words text-sm text-gray-500 underline cursor-pointer"
                      onClick={() => openDetailModal(item)}
                    >
                      {item.companyName}
                    </td>
                    <td className="px-4 py-2 break-words text-sm text-gray-500">
                      {item.clientName}
                    </td>
                    <td className="px-4 py-2 break-words text-sm text-gray-500">
                      {item.position}
                    </td>
                    <td className="px-4 py-2 break-words text-sm text-gray-500">
                      {item.contractNumber}
                    </td>
                    <td className="px-4 py-2 break-words text-sm text-gray-500">
                      {new Date(item.startDate).toLocaleDateString("en-CA")}
                    </td>
                    <td className="px-4 py-2 break-words text-sm text-gray-500">
                      {new Date(item.endDate).toLocaleDateString("en-CA")}
                    </td>
                    <td className="px-4 py-2 break-words text-sm text-gray-500">
                      {item.insuranceNumber}
                    </td>
                    <td className="px-4 py-2 break-words text-sm text-gray-500">
                      {item.status}
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
              <option value={acceptedData.length}>Show all</option>
            </select>
            <button
              onClick={handleExportToExcel}
              className="text-white ml-5 bg-red rounded-md px-4 py-2 hover:bg-yellow items-start"
            >
              Excel
            </button>
          </div>
        </div>

        <div className="w-full lg:w-1/2 relative overflow-x-auto shadow-lg bg-white rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4">Data Ditolak</h2>
          <div className="max-w-full overflow-x-scroll">
            <table className="w-full table-auto text-left divide-y divide-gray-200">
              <thead className="bg-gray-300">
                <tr>
                  <th className="px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider w-1/12">
                    ID
                  </th>
                  <th className="px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider w-2/12">
                    Company Name
                  </th>
                  <th className="px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider w-2/12">
                    Client Name
                  </th>
                  <th className="px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider w-1/12">
                    Position
                  </th>
                  <th className="px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider w-1/12">
                    Contract Number
                  </th>
                  <th className="px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider w-1/12">
                    Start Work
                  </th>
                  <th className="px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider w-1/12">
                    End Work
                  </th>
                  <th className="px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider w-1/12">
                    Insurance Number
                  </th>
                  <th className="px-4 py-2 text-center text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider w-2/12">
                    Status Penerimaan
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {rejectedData.slice(0, entriesToShow).map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-2 break-words text-sm font-medium text-gray-900">
                      {item.id}
                    </td>
                    <td
                      className="px-4 py-2 break-words text-sm text-gray-500 underline cursor-pointer"
                      onClick={() => openDetailModal(item)}
                    >
                      {item.companyName}
                    </td>
                    <td className="px-4 py-2 break-words text-sm text-gray-500">
                      {item.clientName}
                    </td>
                    <td className="px-4 py-2 break-words text-sm text-gray-500">
                      {item.position}
                    </td>
                    <td className="px-4 py-2 break-words text-sm text-gray-500">
                      {item.contractNumber}
                    </td>
                    <td className="px-4 py-2 break-words text-sm text-gray-500">
                      {new Date(item.startDate).toLocaleDateString("en-CA")}
                    </td>
                    <td className="px-4 py-2 break-words text-sm text-gray-500">
                      {new Date(item.endDate).toLocaleDateString("en-CA")}
                    </td>
                    <td className="px-4 py-2 break-words text-sm text-gray-500">
                      {item.insuranceNumber}
                    </td>
                    <td className="px-4 py-2 break-words text-sm text-gray-500">
                      {item.status}
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
              <option value={rejectedData.length}>Show all</option>
            </select>
            <button
              onClick={handleExportToExcel}
              className="text-white ml-5 bg-red rounded-md px-4 py-2 hover:bg-yellow items-start"
            >
              Excel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
