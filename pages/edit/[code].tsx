import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import SecondaryButton from "../../components/Buttons/SecondaryButton";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

const Edit: NextPage = () => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [canEdit, setCanEdit] = useState(false);
  const [disabled, setDisabled] = useState(false);
  // const [data, setData] = useState<{url: string; name: string}>();
  const supabase = useSupabaseClient();
  const router = useRouter();

  const { code } = router.query;

  const checkCanAccess = async () => {
    await supabase.auth.getSession().then(async (retrievedSession) => {
      const session = retrievedSession.data.session;

      const request = await fetch("/api/can-edit", {
        method: "POST",
        body: JSON.stringify({ session, code }),
      });

      request.json().then((data) => {
        if (data.status === "success") {
          console.log(data);
          data.row.map((row: any) => {
            if(row.short_code === code) {
              setName(data.row[0].name);
              setUrl(data.row[0].url);
            }
          })
        } else {
          router.push("/codes");
        }
        console.log(data);
        setDisabled(false);
      });
    });
  };

  const edit = async () => {
    await supabase.auth.getSession().then(async (retrievedSession) => {
      const session = retrievedSession.data.session;

      const request = await fetch("/api/edit", {
        method: "POST",
        body: JSON.stringify({ session, code, name, url }),
      });

      await request.json().then((data) => {
        if (data.status === "success") {
          router.push("/codes");
          return;
        } else {
          console.log(data.status);
        }
        console.log(data);
        setDisabled(false);
      });
    });
  };

  useEffect(() => {
    supabase.auth.getSession().then((retrievedSession) => {
      if (!retrievedSession.data.session) {
        router.push("/");
      }
      checkCanAccess();
    });
  }, []);

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
          defaultValue={name}
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
          defaultValue={url}
          className="mt-2 border-slate-600 border-2 border-b-3 p-2 pb-3 rounded-lg shadow-sm text-slate-600 font-bold bg-slate-200 hover:bg-slate-100 focus:outline-offset-2 focus:outline-slate-600"
          style={{
            boxShadow:
              "rgb(100 116 139) 0px -6px 0px inset, rgb(239, 246, 255) 0px -7px 0px 0px inset, rgb(239, 246, 255) 0px 1px 0px 1px inset",
          }}
        />
      </div>
      <div className="mt-5 flex justify-end">
        <div
          onClick={() => (disabled ? null : edit())}
          style={{ filter: disabled ? "grayscale(100%)" : "none" }}
        >
          <SecondaryButton>Submit</SecondaryButton>
        </div>
      </div>
    </div>
  );
};

export default Edit;
