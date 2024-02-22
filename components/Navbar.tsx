"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { components, features } from "@/constants";
import { addCookie } from "@/lib/actions";
import { FaBars } from "react-icons/fa";

type Props = {
  menu: string | undefined;
};

export default function Navbar({ menu }: Props) {
  const pathname = usePathname();

  function handleAlert(value: string) {
    addCookie("menu", value);
  }

  function handleCookie(value: string) {
    addCookie("component", value);
    addCookie("menu", "false");
  }

  return (
    <>
      <nav className="flex justify-center sticky top-0 bg-[hsla(0,0%,100%,.8)] dark:bg-[rgba(0,0,0,.8)] shadow-[inset_0_-1px_0_0_var(--accents-2)] saturate-200 backdrop-blur-sm z-50">
        <div className="flex items-center gap-8 max-w-screen-xl w-full h-16 px-14">
          <div>UX Tools</div>
          <ul className="flex gap-4 flex-1">
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

          <button
            className="block md:hidden p-2 -mr-2"
            onClick={() => handleAlert(menu === "true" ? "false" : "true")}
          >
            <FaBars />
          </button>
        </div>
      </nav>
      {menu === "true" && (
        <div className="sticky top-16 z-50">
          <div className="absolute inset-0 w-screen h-screen bg-[--background]">
            <div className="flex px-4 mt-4 text-lg">
              Which component would you like?
            </div>
            <ul className="flex flex-col">
              {components.map((item) => (
                <li
                  key={item.name}
                  onClick={() => handleCookie(item.name)}
                  className="flex items-center gap-4 p-4 text-[--gray-900] hover:bg-[--gray-200] cursor-pointer"
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
