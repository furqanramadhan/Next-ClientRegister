import React from "react";

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: FormData | null;
}

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

const DetailModal: React.FC<DetailModalProps> = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-CA");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl font-bold mb-4 text-left">
          Informasi Detail Request Client
        </h2>
        <div className="space-y-3">
          {Object.entries(data).map(([key, value]) => {
            if (key === "companyImage") return null;

            let displayValue = value;
            if (key === "startDate" || key === "endDate") {
              displayValue = formatDate(value as string);
            } else if (key === "requestDate") {
              displayValue = (value as string).slice(0, 16).replace("T", " ");
            }

            return (
              <div key={key} className="flex items-center mb-2">
                <span className="font-semibold w-1/3 text-left">
                  {formatLabel(key)}
                </span>
                <span className=" text-center">:</span>
                <span className="w-2/3 text-left pl-2">{displayValue}</span>
              </div>
            );
          })}
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="text-white ml-5 bg-red rounded-md px-4 py-2 hover:bg-yellow items-start"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const formatLabel = (key: string) => {
  // Convert camelCase or other formats to readable label
  const formatted = key.replace(/([A-Z])/g, " $1").trim();
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

export default DetailModal;
