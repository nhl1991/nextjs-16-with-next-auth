"use client";
import { SpotifyItem } from "@/types/spotify";
import { Session } from "next-auth";
import { MouseEvent, useEffect, useState } from "react";
import Item from "./components/spotifyItem";

const TYPE = ["artists", "tracks"];
const TIME_RANGE = ["short_term", "medium_term", "long_term"];

export default function SpotifyUserTopItem({ session }: { session: Session }) {
  const [type, setType] = useState("track");
  const [timeRange, setTimeRange] = useState("medium_term");
  const [items, setItems] = useState<SpotifyItem[]>();

  const getUserTopItem = async () => {
    const response = await fetch(
      `https://api.spotify.com/v1/me/top/${type}?time_range=${timeRange}&limit=5`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.account.access_token}`,
        },
      }
    );
    const result = await response.json();
    const { items } = result;
    setItems(items);
  };

  useEffect(() => {
    getUserTopItem();
  }, [type, timeRange]);

  return (
    <article className="max-w-[40rem]">
      <div className="p-2 h-min flex flex-col gap-2 rounded-xl bg-slate-400">
        <ul className="flex gap-x-4">
          {TYPE.map((item, idx) => (
            <li key={idx}>
              <button onClick={() => setType(item)}>{item}</button>
            </li>
          ))}
        </ul>
        <ul className="flex gap-x-4">
          {TIME_RANGE.map((item, idx) => (
            <li key={idx}>
              <button onClick={() => setTimeRange(item)}>{item}</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex overflow-scroll gap-x-2">
        {
          items?.map((item, idx) => {
            return <Item key={idx} {...item} />
          })
        }
      </div>
    </article>
  );
}
