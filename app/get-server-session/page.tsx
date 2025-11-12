
import ClientSession from "@/components/get-server-session/ClientSession";
import ServerSession from "@/components/get-server-session/ServerSession";

export default function Page() {
  return (
    <main className="w-screen h-screen flex flex-col gap-4 items-center-safe justify-center">
      <ClientSession />
      <ServerSession />
    </main>
  );
}
