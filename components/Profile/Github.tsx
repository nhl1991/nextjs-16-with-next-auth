"use client";
import { Session } from "next-auth";
import Image from "next/image";
import ProfileContainer from "./ui/container";

export default function GithubProfile({ session }: { session: Session }) {
  return (
    <ProfileContainer>
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
            {session.user?.email ?? session.user?.name}
          </b>
        </p>
      </div>
    </ProfileContainer>
  );
}
