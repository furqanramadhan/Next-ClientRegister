import React from "react";
import { FaClipboardCheck } from "react-icons/fa6";
import { ImCross } from "react-icons/im";

interface ConfirmationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  action: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  action,
}) => {
  if (!isOpen) return null;

  const iconClass =
    action === "accept" ? "text-confirm_yes" : "text-confirm_no";

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-message"
    >
      <div className="bg-white rounded-lg p-6 max-w-md w-full flex flex-col items-center">
        <h2 id="modal-title" className="text-xl font-bold mb-4 text-center">
          {action === "accept"
            ? "Konfirmasi Penerimaan"
            : "Konfirmasi Penolakan"}
        </h2>
        <div className="flex items-center justify-center mb-4 text-6xl">
          {action === "accept" ? (
            <FaClipboardCheck className={iconClass} />
          ) : (
            <ImCross className={iconClass} />
          )}
        </div>
        <p id="modal-message" className="text-center text-gray-700 mb-6">
          Apakah Anda yakin ingin {action === "accept" ? "menerima" : "menolak"}{" "}
          akses client?
        </p>
        <div className="flex gap-4">
          <button
            onClick={onConfirm}
            className={`flex items-center justify-center rounded-md px-4 py-2 ${
              action === "accept"
                ? "text-white bg-green hover:bg-yellow"
                : "text-white bg-red hover:bg-yellow"
            }`}
          >
            {action === "accept" ? "Terima" : "Tolak"}
          </button>
          <button
            onClick={onCancel}
            className="flex items-center justify-center text-white bg-black hover:bg-yellow rounded-md px-4 py-2"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
