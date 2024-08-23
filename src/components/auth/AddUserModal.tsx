import React from "react";
import { MdOutlineCheckCircle } from "react-icons/md";
import { Button } from "../ui/button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const AddUserModal: React.FC<ModalProps> = ({ isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-message"
    >
      <div className="bg-white rounded-lg p-6 max-w-md w-full flex flex-col items-center">
        <h2 id="modal-title" className="text-xl font-bold mb-4 text-center">
          {title}
        </h2>
        <MdOutlineCheckCircle className="text-green text-4xl mb-4" />
      </div>
      <Button onClick={onClose} className="bg-red text-white">
        Close
      </Button>
    </div>
  );
};

export default AddUserModal;
