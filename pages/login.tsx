import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import TertiaryButton from "../components/Buttons/TertiaryButton";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { createClient } from "@supabase/supabase-js";

const Login: NextPage = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const [email, setEmail] = useState("");
  const [submitted, hasSubmitted] = useState(false);

  const signIn = (email: string) => {
    hasSubmitted(true);
    supabase.auth.signInWithOtp({ email });
  };

  return (
    <div className="flex flex-col bg-slate-50 p-5 rounded-lg max-w-sm mx-auto">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container">
        {!submitted ? (
          <>
            <div className="flex flex-col">
              <label htmlFor="name">
                <h2 className="text-xl font-medium">Name</h2>
              </label>
              <input
                name="name"
                id="url"
                type="text"
                onChange={(e) => setEmail(e.currentTarget.value)}
                className="mt-2 border-slate-600 border-2 border-b-3 p-2 pb-3 rounded-lg shadow-sm text-slate-600 font-bold bg-slate-200 hover:bg-slate-100 focus:outline-offset-2 focus:outline-slate-600"
                style={{
                  boxShadow:
                    "rgb(100 116 139) 0px -6px 0px inset, rgb(239, 246, 255) 0px -7px 0px 0px inset, rgb(239, 246, 255) 0px 1px 0px 1px inset",
                }}
              />
            </div>
            <div className="mt-5 flex justify-end">
              <div onClick={() => signIn(email)}>
                <TertiaryButton>Sign In</TertiaryButton>
              </div>
            </div>
          </>
        ) : (
          "check email"
        )}
        {/* {!session ? (
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            theme="dark"
          />
        ) : (
          <p>Account page will go here.</p>
        )} */}
      </div>
    </div>
  );
};

export default Login;
