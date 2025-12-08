'use client'

import { signIn } from "next-auth/react";

export default function LoginButtons(){


    return(
        <ul className="flex flex-col gap-2 p-2">
          <li>
            <button
              onClick={() =>
                signIn("spotify", {
                  callbackUrl: "/spotify",
                })
              }
            >
              Spotify
            </button>
          </li>
          <li>
            <button
              onClick={() =>
                signIn("github", {
                  callbackUrl: "/details",
                })
              }
            >
              Github
            </button>
          </li>
        </ul>
    )
}