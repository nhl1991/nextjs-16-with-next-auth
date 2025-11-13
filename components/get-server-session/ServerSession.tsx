import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";

export default async function ServerSession() {
  const session = await getServerSession(authOptions);

  return (
    <div>
        <h2 className="text-xl font-bold">getServerSession()</h2>
      <p className="px-2">{JSON.stringify(session, null, 2)}</p>
    </div>
  );
}
