"use client";

import { useEffect, useState } from "react";

import ColorConverter from "@/components/ColorConverter";
import MonochromaticPalette from "@/components/MonochromaticPalette";
import DesignSystem from "@/components/DesignSystem";

export default function Home() {
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
    <main className="max-w-screen-xl w-full min-h-full mt-20 mx-auto px-14 overflow-hidden">
      <ColorConverter color={color} setColor={setColor} />

      <MonochromaticPalette
        color={color}
        palette={palette}
        setPalette={setPalette}
      />

      <DesignSystem palette={palette} isDarkMode={isDarkMode} />
    </main>
  );
}
