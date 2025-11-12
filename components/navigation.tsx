"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navigation() {
  const { data: session, status } = useSession();
  const [username, setUsername] = useState<string>("");
  const classname = `px-4 py-2 text-xl text-white bg-sky-400 rounded-xl hover:bg-sky-700 cursor-pointer`;
  useEffect(() => {
    if (session) setUsername(session.user?.name as string);
  }, [status]);

  if (!session)
    return (
      <UL>
        <Default />
        <li>
          <button className={classname} onClick={() => signIn()}>
            Sign In
          </button>
        </li>
      </UL>
    );

  return (
    <UL>
      <Default />
      <li>
        <p>{username}</p>
      </li>
      <li>
        <button className={classname} onClick={() => signOut()}>
          Sign Out
        </button>
      </li>
    </UL>
  );
}

function UL({ children }: { children: React.ReactNode }) {
  return (
    <ul id="navigation" className="flex text-xl items-center justify-center gap-x-4">
      {children}
    </ul>
  );
}

function Default() {
  return (
    <>
      <li className="nav_default">
        <Link href={"/"}>HOME</Link>
      </li>
      <li className="nav_default">
        <Link href={"/get-server-session"}>DETAILS</Link>
      </li>
    </>
  );
}
