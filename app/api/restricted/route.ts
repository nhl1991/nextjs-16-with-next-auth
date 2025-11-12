import { authOptions } from "@/auth"
import { getServerSession } from "next-auth/next"
import { NextRequest, NextResponse } from "next/server";


export async function GET() {
  const session = await getServerSession(authOptions)

  // if (!session) {
  //   return NextResponse.json(
  //     { error: "You must be signed in to view the protected content on this page." },
  //     { status: 401 }
  //   )
  // }

  return NextResponse.json(session);
}

export async function POST(req: NextRequest) {
  return NextResponse.json({ message: "POST request received" })
}