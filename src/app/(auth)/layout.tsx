import { ReactNode, FC } from "react";

interface FormLayoutProps {
  children: ReactNode;
}

const FormLayout: FC<FormLayoutProps> = ({ children }) => {
  return <div className="p-10 rounded-lg">{children}</div>;
};

export default FormLayout;
