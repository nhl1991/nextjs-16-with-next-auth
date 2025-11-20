"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
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

const TRACK_ID = [
  "52Zr0sinhWTCRrQhRRY4EP",
  "07rKpPL0tdveGnU90hjEm8",
  "2ylpbsHqGUAv3za4JkyMgz",
  "4YRTsmrGk2Y8uVkTuGbdJj",
  // "5uYnVpwOGOaiXTJmhNd62P",
  // "0Bg100ruK1ZD7H96rNo6fR",
  // "2wBnZdVWa5jVpvYRfGU7rP",
  // "0tS0QcV7V4vxoq2jUXMRI1",
];

export default function Page() {
  const [track, setTrack] = useState<Track[]>([]);
  const { data: session } = useSession();

  if (!session)
    return (
      <div>
        <h1>You should sign in..</h1>
      </div>
    );

  const getTrack = async () => {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/tracks?ids=${TRACK_ID.join(',')}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session.account.access_token}`,
          },
        }
      );

      const { tracks } = await response.json();
      const result = tracks.map((item: any) => {
        const {
          album: { images, artists },
          external_urls: { spotify },
          name,
        } = item;

        return {
          title: name,
          artist: artists[0].name,
          image: images[0],
          href: spotify,
        };
      });

      setTrack(result);
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
    <main className="px-12 overflow-scroll">
      <h1 className="text-2xl bold">노동요 / 勞動謠(作業用BGM)</h1>
      <section className="flex gap-4 overflow-scroll px-16 py-12">
        {track
          ? track.map((item, idx) => (
              <article
                key={idx}
                className="p-4 flex flex-col gap-y-4 items-center justify-center nth-of-type-[4n+1]:bg-amber-200 nth-of-type-[4n+2]:bg-emerald-200 nth-of-type-[4n+3]:bg-sky-200 nth-of-type-[4n+4]:bg-fuchsia-200  rounded-xl hover:scale-105 duration-200 cursor-pointer"
              >
                <AlbumArt src={item.image.url} />
                <TrackInfo
                  title={item.title}
                  artist={item.artist}
                  href={item.href}
                />
              </article>
            ))
          : null}
      </section>
    </main>
  );
}

function AlbumArt({ src }: { src: string }) {
  return (
    <figure className="w-64 h-64 relative">
      <Image
        src={src}
        alt="album image"
        fill
        sizes="(max-width: 768px) 33vw, 50vw"
      />
    </figure>
  );
}

function TrackInfo({
  title,
  artist,
  href,
}: {
  title: string;
  artist: string;
  href: string;
}) {
  return (
    <div className="flex flex-col items-center gap-y-0.5">
      <p className="font-bold">{title}</p>
      <p>{artist}</p>
      <Link
        className="flex gap-x-2 rounded-xl hover:bg-[#191414] px-4 py-1 hover:text-white"
        href={href}
      >
        Listen on{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#1DB954"
          className="w-4 bi bi-spotify"
          viewBox="0 0 16 16"
        >
          <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.669 11.538a.5.5 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686m.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858m.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288" />
        </svg>
      </Link>
    </div>
  );
}
