import React from "react";
import { Button } from "../ui/button";

interface ModalProps {
  isOpen: Boolean;
  onClose: () => void;
  title: string;
  message: string;
}

const RequestModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p>{message}</p>
        <div className="mt-4 flex justify-end">
          <Button onClick={onClose} className="bg-red text-white">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RequestModal;
