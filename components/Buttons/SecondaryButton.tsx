import type { NextPage } from "next";
import { ReactNode } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  children?: ReactNode;
}

const SecondaryButton: NextPage<ButtonProps> = ({ children }) => {
  return (
    <button
      className={`mt-2 ml-3 border-green-600 border-2 border-b-3 p-2 pb-3 rounded-lg shadow-sm text-green-600 font-bold bg-green-200 hover:bg-green-100 focus:outline-offset-2 focus:outline-green-600 ${
        styles[`variant-green`]
      }`}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
