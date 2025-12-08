import { SpotifyProfile } from "@/types/spotify";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Session } from "next-auth";
import Link from "next/link";
import ProfileContainer from "./ui/container";

export default function Profile({ session }: { session: Session }) {
  const [profile, setProfile] = useState<SpotifyProfile>();

  const getProfile = async () => {
    const response = await fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.account.access_token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message ?? "Unknown Error");
    }
    const result = await response.json();

    setProfile(result);
  };

  useEffect(() => {
    getProfile();
  }, []);
  if (profile != undefined) {
    console.log(profile);
    return (
      <ProfileContainer>
        <div className="flex flex-col gap-1 items-center">
          <p className="text-4xl text-white font-bold">
            {profile.display_name}
          </p>
        </div>
        <figure className="w-48 h-48 rounded-full overflow-hidden relative">
          {profile.images ? (
            <Image
              className="object-cover"
              src={profile.images[0].url}
              fill
              sizes="(max-width: 768px) 33vw, 50vw"
              alt="profile image"
            />
          ) : null}
        </figure>
        <div className="flex flex-col gap-1 items-center">
          <Link
            className="hover:bg-sky-300 text-xl text-white px-4 py-1 rounded-xl"
            href={profile.external_urls.spotify}
          >
            View on Spotify
          </Link>
        </div>
      </ProfileContainer>
    );
  }

  return <p>Spotify profile not found..</p>;
}
