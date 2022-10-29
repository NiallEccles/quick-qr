import type { NextPage } from "next";
import { ReactNode } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  children?: ReactNode;
}

const QuaternaryButton: NextPage<ButtonProps> = ({ children }) => {
  return (
    <button
      className={`mt-2 ml-3 border-red-600 border-2 border-b-3 p-2 pb-3 rounded-lg shadow-sm text-red-600 font-bold bg-red-200 hover:bg-red-100 focus:outline-offset-2 focus:outline-red-600 ${
        styles[`variant-red`]
      }`}
    >
      {children}
    </button>
  );
};

export default QuaternaryButton;
