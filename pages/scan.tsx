import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import TertiaryButton from "../components/Buttons/TertiaryButton";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

const Scan: NextPage = () => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [disabled, setDisabled] = useState(false);
  const supabase = useSupabaseClient();
  const router = useRouter();

  const createQr = async (name: string, url: string) => {
    setDisabled(true);

    await supabase.auth.getSession().then(async (session) => {
      const token = session.data.session?.access_token
        ? session.data.session?.access_token
        : null;

      const request = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({ name, url, token }),
      });

      setTimeout(() => {
        request.json().then((data) => {
          setDisabled(false);
        });
      }, 100);
    });
  };

  useEffect(() => {
    supabase.auth.getSession().then((retrievedSession) => {
      if (!retrievedSession.data.session) {
        router.push("/");
      }
    });
  }, [null]);

  return (
    <div className="flex flex-col bg-slate-50 p-5 rounded-lg max-w-sm mx-auto">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col">
        <label htmlFor="name">
          <h2 className="text-xl font-medium">Name</h2>
        </label>
        <input
          name="name"
          id="url"
          type="text"
          onChange={(e) => setName(e.currentTarget.value)}
          className="mt-2 border-slate-600 border-2 border-b-3 p-2 pb-3 rounded-lg shadow-sm text-slate-600 font-bold bg-slate-200 hover:bg-slate-100 focus:outline-offset-2 focus:outline-slate-600"
          style={{
            boxShadow:
              "rgb(100 116 139) 0px -6px 0px inset, rgb(239, 246, 255) 0px -7px 0px 0px inset, rgb(239, 246, 255) 0px 1px 0px 1px inset",
          }}
        />
      </div>
      <div className="flex flex-col mt-5">
        <label htmlFor="url">
          <h2 className="text-xl font-medium">URL</h2>
        </label>
        <input
          name="url"
          id="url"
          type="text"
          onChange={(e) => setUrl(e.currentTarget.value)}
          className="mt-2 border-slate-600 border-2 border-b-3 p-2 pb-3 rounded-lg shadow-sm text-slate-600 font-bold bg-slate-200 hover:bg-slate-100 focus:outline-offset-2 focus:outline-slate-600"
          style={{
            boxShadow:
              "rgb(100 116 139) 0px -6px 0px inset, rgb(239, 246, 255) 0px -7px 0px 0px inset, rgb(239, 246, 255) 0px 1px 0px 1px inset",
          }}
        />
      </div>
      <div className="mt-5 flex justify-end">
        <div
          onClick={() => (disabled ? null : createQr(name, url))}
          style={{ filter: disabled ? "grayscale(100%)" : "none" }}
        >
          <TertiaryButton>Create QR</TertiaryButton>
        </div>
      </div>
    </div>
  );
};

export default Scan;