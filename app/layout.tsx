import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import Navbar from "@/components/Navbar";
import { getCookie } from "@/lib/actions/cookie.actions";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UX Tools",
  description: "A minimalist UX tool for color design and accessibility.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const menu = await getCookie("menu");

  return (
    <html lang="en">
      <body
        className={`${inter.className} ${
          menu?.value === "true" && "overflow-hidden"
        }`}
      >
        <Navbar menu={menu?.value} />
        {children}
      </body>
    </html>
  );
}
