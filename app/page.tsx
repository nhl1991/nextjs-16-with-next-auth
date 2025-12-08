"use client";

import GithubProfile from "@/components/Profile/Github";
import Profile from "@/components/Profile/Spotify";
import SpotifyUserTopItem from "@/components/Profile/SpotifyTopItem";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Home() {
  const { data: session } = useSession();

  useEffect(() => {}, [session]);

  if (!session) return <p>You need to Sign In...</p>;

  if (session?.account.provider === "github" && session.account.access_token)
    return <GithubProfile session={session} />;
  else if (session.account.provider === "spotify"  && session.account.access_token)
    return (
      <section className="flex">
        <Profile session={session} />
        <SpotifyUserTopItem session={session} />
      </section>
    );
}
