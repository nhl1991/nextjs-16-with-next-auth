import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation";
import ClientProvider from "@/components/ClientProvider";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Laslark1991's Next-Auth",
  openGraph: {
    type: "website",
    url: "https://example.com",
    title: "My Website",
    description: "My Website Description",
    siteName: "My Website",
    images: [{ url: "https://example.com/og.png" }],
  },
  description: "To study next-auth with next.js 16.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientProvider session={session}>
          <header className="w-screen p-4 flex items-center justify-end">
            <Navigation />
          </header>
          <main className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            {children}
          </main>
        </ClientProvider>
      </body>
    </html>
  );
}
