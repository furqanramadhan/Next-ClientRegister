import { ReactNode, FC } from "react";

interface FormLayoutProps {
  children: ReactNode;
}

const FormLayout: FC<FormLayoutProps> = ({ children }) => {
  return <div className="bg-whiteform p-10 rounded-lg">{children}</div>;
};

export default FormLayout;
