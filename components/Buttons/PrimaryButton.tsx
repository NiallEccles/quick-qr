import type { NextPage } from "next";
import { ReactNode } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  children?: ReactNode;
}

const PrimaryButton: NextPage<ButtonProps> = ({ children }) => {
  return (
    <button
      className={`mt-2 ml-3 border-blue-600 border-2 border-b-3 p-2 pb-3 rounded-lg shadow-sm text-blue-600 font-bold bg-blue-200 hover:bg-blue-100 focus:outline-offset-2 focus:outline-blue-600 ${
        styles[`variant-blue`]
      }`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
