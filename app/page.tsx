"use client";

import { useEffect, useState } from "react";

import ColorConverter from "@/components/ColorConverter";
import MonochromaticPalette from "@/components/MonochromaticPalette";
import DesignSystem from "@/components/DesignSystem";

export default function Home() {
  const [toggleAlert, setToggleAlert] = useState<boolean>(false);
  const [color, setColor] = useState<string>("#000000");
  const [palette, setPalette] = useState<
    { hex: string; tone: number; variable: string }[]
  >([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      const isDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(isDark);
    };

    // Run the check initially
    checkDarkMode();

    // Subscribe to changes in the dark mode preference
    const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQueryList.addEventListener("change", checkDarkMode);

    // Cleanup the event listener on component unmount
    return () => {
      mediaQueryList.removeEventListener("change", checkDarkMode);
    };
  }, []);

  return (
    <main className="flex flex-col items-center gap-2 max-w-screen-xl w-full min-h-full mt-20 mx-auto px-14 overflow-hidden">
      <h1 className="title">Make your color</h1>
      <p className="subtitle">
        Enter any type of{" "}
        <strong className="text-[--accents-8] font-normal">
          CSS or Tailwind CSS
        </strong>{" "}
        color to create a custom color palette.
      </p>

      <ColorConverter
        color={color}
        setColor={setColor}
        setToggleAlert={setToggleAlert}
      />

      <MonochromaticPalette
        color={color}
        palette={palette}
        setPalette={setPalette}
        toggleAlert={toggleAlert}
        setToggleAlert={setToggleAlert}
      />

      <DesignSystem palette={palette} isDarkMode={isDarkMode} />
    </main>
  );
}
