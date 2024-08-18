"use client";
import * as XLSX from "xlsx";
import { useEffect, useState } from "react";

interface FormData {
  id: number;
  companyName: string;
  clientName: string;
  description: string;
  companyImage?: string;
  position: string;
  contractNumber: string;
  workPeriod: number;
  insuranceNumber: string;
  requestDate: string;
}

const Dashboard = () => {
  const [data, setData] = useState<FormData[]>([]);
  const [entriesToShow, setEntriesToShow] = useState<number>(5);

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

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="overflow-x-auto">
        <table className="table table-auto min-w-full divide-y divide-gray-200">
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
                Work Period
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Insurance Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Request Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.slice(0, entriesToShow).map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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
                  {item.workPeriod}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.insuranceNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.requestDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <label htmlFor="entries" className="mr-2">
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
          className="bg-red-500 text-white ml-5 bg-red rounded-md px-4 py-2 hover:bg-yellow"
        >
          Excel
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
