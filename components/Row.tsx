import type { NextPage } from "next";
import { useQRCode } from "next-qrcode";
import PrimaryButton from "./Buttons/PrimaryButton";
import SecondaryButton from "./Buttons/SecondaryButton";
import Qr from "./Qr";
import TimeIcon from "./Icons/TimeIcon";
import LinkIcon from "./Icons/LinkIcon";
import { Code } from "../interfaces/Code";
import { format } from 'date-fns'
import { useEffect, useRef, useState } from "react";
import exportAsImage from "../exportAsImage";

const Row: NextPage<{data: Code}> = ({data}) => {
  const [date, setDate] = useState("");
  let url = "";
  if(typeof window !== undefined) {
    url = `${window.location.origin}/c/${data.short_code}`;
  }
  const formatDate = (date: string) => {
    setDate(format(new Date(date), 'do LLL, yyyy'));
  }

  useEffect(() => {
    formatDate(data.created_at);
  }, [null]);

  const exportRef = useRef<any>();

  return (
    <div className="flex items-center justify-between card card-side flex-col sm:flex-row p-5 mb-5 bg-slate-50">
      <div className="flex flex-col md:flex-row justify-between flex-1">
        <div className="flex sm:flex-row flex-col">
          <div>
            <h2 className="text-xl mb-1 text-blue-600 font-bold">
              {data.name}
            </h2>
            <h3 className="flex flex-row items-center font-bold text-slate-500">
              {/* <img className="w-5 mr-2" src="/icons/date.svg" alt="" /> */}
              <TimeIcon />
              {date}
            </h3>
          </div>
        </div>
        <div className="flex col items-center">
          <div className="text-slate-500 mr-3">
            <LinkIcon />
          </div>
          <div className="mt-2 md:mt-0">
            <h2 className="md:text-xl md:mb-1 w-60 font-medium truncate">{data.url}</h2>
            <h3 className="text-slate-500">{data.short_code}</h3>
          </div>
        </div>
      </div>
      <div className="flex sm:flex-row flex-col items-center justify-end flex-1">
        <div className="flex flex-col items-center mr-4">
          <h2 className="text-xl font-bold mb-1">{data.num_scans}</h2>
          <h3>Scans</h3>
        </div>
        <div ref={exportRef}>
          <Qr url={url}/>
        </div>
        <div className="flex flex-col lg:block">
          <div onClick={()=>exportAsImage(exportRef.current, data.name)}>
            <SecondaryButton>Download</SecondaryButton>
          </div>
          <a href={`/edit/${data.short_code}`}>
            <PrimaryButton>Edit</PrimaryButton>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Row;
