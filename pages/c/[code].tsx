import type { NextPage } from "next";
import Head from "next/head";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Code: NextPage = () => {
  const router = useRouter();
  const { code } = router.query;

  if (code) {
    const request = fetch("/api/get-code", {
      method: "POST",
      body: JSON.stringify({ code }),
    });

    request.then((req) => {
        req.json().then(res => {
            if(typeof window !== undefined){
                window.location.href = res.url;
            }
        })
    });
  }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
};

export default Code;