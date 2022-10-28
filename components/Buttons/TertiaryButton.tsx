import type { NextPage } from "next";
import { ReactNode } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  children?: ReactNode;
}

const TertiaryButton: NextPage<ButtonProps> = ({ children }) => {
  return (
    <button
      className={`mt-2 border-amber-600 border-2 border-b-3 p-2 pb-3 rounded-lg shadow-sm text-amber-600 font-bold bg-amber-200 hover:bg-amber-100 focus:outline-offset-2 focus:outline-amber-600 ${
        styles[`variant-amber`]
      }`}
    >
      {children}
    </button>
  );
};

export default TertiaryButton;
