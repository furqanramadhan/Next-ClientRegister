import React from "react";
import { TbLockCheck } from "react-icons/tb";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

const LoginModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
}) => {
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
        <TbLockCheck className="text-green text-4xl mb-4" />
        <p id="modal-message" className="text-center text-gray-700">
          {message}
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
      