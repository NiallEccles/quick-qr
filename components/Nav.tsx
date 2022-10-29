import type { NextPage } from "next";
import Link from "next/link";
import PrimaryButton from "./Buttons/PrimaryButton";
import SecondaryButton from "./Buttons/SecondaryButton";
import TertiaryButton from "./Buttons/TertiaryButton";
import QuaternaryButton from "./Buttons/QuaternaryButton";

import QrIcon from "./Icons/QrIcon";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

const Nav: NextPage = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if(!error){
      router.push('/');
    }
  }

  return (
    <div className="navbar bg-base-100 mb-5">
      {/* <div className="flex-none">
        <button className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-5 h-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div> */}
      <div className="flex-1">
        <Link href="/">
          <a className="btn btn-ghost normal-case text-xl">
            <QrIcon />
            <span className="ml-2">Quick QR</span>
          </a>
        </Link>
      </div>
      <div className="flex align-center">
        <Link href="/create">
          <a>
            <TertiaryButton>Create QR</TertiaryButton>
          </a>
        </Link>
        {!session ? (
          <Link href="/login">
            <a>
              <PrimaryButton>Login</PrimaryButton>
            </a>
          </Link>
        ) : (
          <a onClick={()=>signOut()}>
            <QuaternaryButton>Logout</QuaternaryButton>
          </a>
        )}
        <button className="btn btn-square btn-ghost ml-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-5 h-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Nav;
