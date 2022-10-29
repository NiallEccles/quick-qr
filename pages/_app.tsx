import "../styles/globals.css";
import type { AppProps } from "next/app";
import Nav from "../components/Nav";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { NextComponentType, NextPageContext } from "next";

function MyApp({
  Component,
  pageProps,
}: {
  Component: NextComponentType<NextPageContext, any, any>;
  pageProps: { initialSession: any };
}) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <main className="max-w-6xl mx-auto">
        <Nav />
        <Component {...pageProps} />
      </main>
    </SessionContextProvider>
  );
}

export default MyApp;
