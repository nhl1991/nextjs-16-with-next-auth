"use client";

import { authOptions } from "@/auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface AlbumArt {
  url: string;
  height: number;
  width: number;
}

interface Track {
  title: string;
  artist: string;
  image: AlbumArt;
  href: string;
}

export default function Page() {
  const [track, setTrack] = useState<Track>();
  const { data: session } = useSession();

  const getTrack = async () => {
    if (!session) return;
    try {
      //https://open.spotify.com/track/65cv0OI9HmwR4EmN6CWucM?si=7471229895c443ed
      const response = await fetch(
        "https://api.spotify.com/v1/tracks/65cv0OI9HmwR4EmN6CWucM",
        {
          method: "GET",
          headers: {
            Authorization: `\Bearer ${session.account.access_token}`,
          },
        }
      );
      const {
        album: { name, images, artists },
        external_urls: { spotify },
      } = await response.json();

      const obj = {
        title: name,
        artist: artists[0].name,
        image: images[0],
        href: spotify,
      };

      setTrack(obj);
    } catch (e) {
      console.log(e);
    } finally {
      console.log(track);
    }
  };

  useEffect(() => {
    getTrack();
  }, []);

  return (
    <main className="w-screen h-screen flex items-center justify-center">
      {track ? (
        <article className="p-4 flex flex-col items-center justify-center bg-amber-200 rounded-xl">
          <figure className="w-96 h-96 relative">
            <Image
              src={track.image.url}
              alt="album image"
              fill
              sizes="(max-width: 768px) 33vw, 50vw"
            />
          </figure>
          <div className="flex flex-col items-center gap-y-0.5">
            <p className="font-bold">{track.title}</p>
            <p>{track.artist}</p>
            <Link className="flex gap-x-2 rounded-xl hover:bg-emerald-500 px-4 py-1 hover:text-white" href={track.href}>
              Listen on <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="emerald"
                className="w-4 bi bi-spotify"
                viewBox="0 0 16 16"
              >
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.669 11.538a.5.5 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686m.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858m.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288" />
              </svg>
              
            </Link>
          </div>
        </article>
      ) : null}
    </main>
  );
}
