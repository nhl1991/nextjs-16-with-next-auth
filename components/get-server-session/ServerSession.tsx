import { getServerSession } from "next-auth";

export default async function ServerSession() {
  const session = await getServerSession();

  return (
    <div>
        <h2 className="text-xl">getServerSession()</h2>
      <p className="px-2">{JSON.stringify(session)}</p>
    </div>
  );
}
