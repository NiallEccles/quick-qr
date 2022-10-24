import type { NextPage } from "next";
import { useQRCode } from "next-qrcode";
import Qr from "./Qr";

const Row: NextPage = () => {
  return (
    <div className="flex items-center justify-between card card-side shadow-xl p-5 mb-5">
      <div className="flex flex-row">
        <div>
          <h2 className="text-xl font-medium mb-1">QR Code Name</h2>
          <h3 className="flex flex-row">
            <img className="w-5 mr-2" src="/icons/date.svg" alt="" />
            Oct 24, 2022
          </h3>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-medium mb-1">&#x200B;</h2>
        <h3>google.com</h3>
      </div>
      <div className="flex flex-row items-center">
        <div className="flex flex-col items-center mr-4">
          <h2 className="text-xl font-medium mb-1">22</h2>
          <h3>Scans</h3>
        </div>
        <Qr />
        <button className="btn btn-primary ml-4">Download</button>
      </div>
    </div>
  );
};

export default Row;
