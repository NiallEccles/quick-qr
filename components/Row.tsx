import type { NextPage } from "next";
import { useQRCode } from "next-qrcode";
import PrimaryButton from "./Buttons/PrimaryButton";
import SecondaryButton from "./Buttons/SecondaryButton";
import Qr from "./Qr";
import TimeIcon from "./Icons/TimeIcon";
import LinkIcon from "./Icons/LinkIcon";

const Row: NextPage = () => {
  return (
    <div className="flex items-center justify-between card card-side p-5 mb-5 bg-slate-50">
      <div className="flex flex-col md:flex-row justify-between flex-1">
        <div className="flex flex-row">
          <div>
            <h2 className="text-xl mb-1 text-blue-600 font-bold">
              QR Code Name
            </h2>
            <h3 className="flex flex-row items-center font-bold text-slate-500">
              {/* <img className="w-5 mr-2" src="/icons/date.svg" alt="" /> */}
              <TimeIcon />
              Oct 24, 2022
            </h3>
          </div>
        </div>
        <div className="flex col items-center">
          <div className="text-slate-500 mr-3">
            <LinkIcon />
          </div>
          <div className="mt-2 md:mt-0">
            <h2 className="md:text-xl md:mb-1 font-medium">google.com</h2>
            <h3 className="text-slate-500">google.com</h3>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-end flex-1">
        <div className="flex flex-col items-center mr-4">
          <h2 className="text-xl font-bold mb-1">22</h2>
          <h3>Scans</h3>
        </div>
        <Qr />
        <div className="flex flex-col lg:block">
          <SecondaryButton>Download</SecondaryButton>
          <PrimaryButton>Edit</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default Row;
