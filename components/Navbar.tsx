"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { features } from "@/constants";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex justify-center sticky top-0 bg-[hsla(0,0%,100%,.8)] dark:bg-[rgba(0,0,0,.8)] shadow-[inset_0_-1px_0_0_var(--accents-2)] saturate-200 backdrop-blur-sm z-50">
      <div className="flex items-center gap-8 max-w-screen-xl w-full h-16 px-14">
        <div>UX Tools</div>
        <ul className="flex gap-4">
          {features.map((feature) => (
            <li
              key={feature.name}
              className={`text-sm hover:text-[--foreground] ${
                pathname === feature.url
                  ? "text-[--foreground]"
                  : "text-[--accents-5]"
              }`}
            >
              <Link href={feature.url}>{feature.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
