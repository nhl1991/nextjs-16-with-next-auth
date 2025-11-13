'use client'

import { useSession } from "next-auth/react"

export default function ClientSession(){
    const { data: session } = useSession();



    return(
        <div>
            <h2 className="text-xl font-bold">useSession()</h2>
            <p className="px-2">{JSON.stringify(session, null, 2)}</p>
        </div>
    )

}