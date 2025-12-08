"use client";

import LoginButtons from "@/components/signIn/buttonContainer";
import LoginTitle from "@/components/signIn/ui/title";

export default function Page() {
  return (
    <main className="w-screen h-screen flex items-center justify-center">
      <div className="w-80 h-96  rounded-xl flex flex-col items-center justify-center">
        <LoginTitle />
        <LoginButtons />
      </div>
    </main>
  );
}
