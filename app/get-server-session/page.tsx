import ClientSession from "@/components/get-server-session/ClientSession";
import ServerSession from "@/components/get-server-session/ServerSession";

export default function Page() {
  return (
    <main className="w-screen h-screen flex items-center-safe justify-center">
      <section className="">
        <ClientSession />
        <ServerSession />
      </section>
    </main>
  );
}
