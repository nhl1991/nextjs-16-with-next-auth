"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  const { data: session } = useSession();
  console.log(session?.user?.image);

  useEffect(() => {}, [session]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      {session ? (
        <div className="flex flex-col gap-8 items-center justify-center">
          <div className="w-48 h-48 relative rounded-full overflow-clip">
            {session.user && session.user.image ? (
              <Image
                src={session.user?.image}
                alt="user image"
                fill
                sizes="(max-width: 768px) 33vw, 50vw"
              />
            ) : null}
          </div>
          <div className="flex flex-col gap-2 ">
            <p>
              Signed in as{" "}
              <b className="px-2 py-1 bg-sky-400 text-white rounded-xl">
                {session.user?.email}
              </b>
            </p>
          </div>
        </div>
      ) : (
        <p>You need to Sign In...</p>
      )}
    </div>
  );
}
