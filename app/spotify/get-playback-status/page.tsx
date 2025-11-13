"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Page() {


  const { data: session } = useSession();

  const getPlaybackStatus = async () => {
    if (!session) return;
    try {
      //https://open.spotify.com/track/65cv0OI9HmwR4EmN6CWucM?si=7471229895c443ed
      const response = await fetch(
        "https://api.spotify.com/v1/me/player",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session.user.access_token}`,
          },
        }
      );
      const result = await response.json();
      console.log(result)
    } catch (e) {
      console.log(e);
    } finally {
      console.log();
    }
  };

  useEffect(() => {
    getPlaybackStatus();
  }, []);



  return(
    <main>
        <h1>getPlaybackStatus</h1>
    </main>
  )
}
