"use client";

import { useEffect, useState } from "react";
import tinycolor from "tinycolor2";

import { palette as p } from "@/constants";
import { FaCheck } from "react-icons/fa";

type Props = {
  color: string;
  palette: { hex: string; tone: number; variable: string }[];
  setPalette: React.Dispatch<
    React.SetStateAction<{ hex: string; tone: number; variable: string }[]>
  >;
};

export default function MonochromaticPalette({
  color,
  palette,
  setPalette,
}: Props) {
  useEffect(() => {
    handlePalette();
  }, [color]);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  function handlePalette() {
    let convertedColor = tinycolor(color);

    const format = convertedColor.getFormat();

    if (!format) {
      const tailwindToHex = p.find((c) => c.tone === color)?.hex;

      convertedColor = tinycolor(tailwindToHex);
    }

    const hsl = convertedColor.toHsl();

    const hue = hsl.h;

    const saturation = hsl.s;

    const step = 80 / 9; // Calculate the step size for 10 colors

    const paletteHsl = [];

    for (let i = 0; i < 10; i++) {
      const lightness = 90 - i * step; // Calculate the lightness value
      paletteHsl.push(`hsl(${hue}, ${saturation}, ${lightness}%)`);
    }

    const palette = paletteHsl.map((color, index) => {
      const value = tinycolor(color).toHexString();

      return {
        hex: value,
        tone: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000][index],
        variable: [
          "var(--color-100)",
          "var(--color-200)",
          "var(--color-300)",
          "var(--color-400)",
          "var(--color-500)",
          "var(--color-600)",
          "var(--color-700)",
          "var(--color-800)",
          "var(--color-900)",
          "var(--color-1000)",
        ][index],
      };
    });

    document.documentElement.style.setProperty("--color-100", palette[0].hex);
    document.documentElement.style.setProperty("--color-200", palette[1].hex);
    document.documentElement.style.setProperty("--color-300", palette[2].hex);
    document.documentElement.style.setProperty("--color-400", palette[3].hex);
    document.documentElement.style.setProperty("--color-500", palette[4].hex);
    document.documentElement.style.setProperty("--color-600", palette[5].hex);
    document.documentElement.style.setProperty("--color-700", palette[6].hex);
    document.documentElement.style.setProperty("--color-800", palette[7].hex);
    document.documentElement.style.setProperty("--color-900", palette[8].hex);
    document.documentElement.style.setProperty("--color-1000", palette[9].hex);

    setPalette(palette);
  }

  const handleCopy = (tone: string) => {
    navigator.clipboard.writeText(tone);
    setCopiedColor(tone);
    setTimeout(() => setCopiedColor(null), 1000);
  };

  return (
    <form className="section">
      <h2 className="section-title">Monochromatic Palette</h2>

      <div className="grid grid-cols-5 gap-6">
        {palette?.map((color) => (
          <button
            key={color.tone}
            className="flex items-center p-2 -m-2 gap-4 rounded-lg hover:bg-[--hover]"
            onClick={() => handleCopy(color.hex)}
            type="button"
          >
            <div
              className="w-12 h-12 rounded-lg"
              style={{
                backgroundColor: color.hex,
                color: `${
                  tinycolor.isReadable(color.hex, palette[9]?.hex)
                    ? palette[9]?.hex
                    : palette[1]?.hex
                }`,
              }}
            ></div>
            <div className="flex flex-col items-start whitespace-nowrap">
              <div className="text-sm text-[--gray-1000]">{color.variable}</div>
              <div className="flex gap-1 items-center text-sm text-[--gray-900]">
                <span>{color.hex}</span>
                {copiedColor === color.hex && <FaCheck />}
              </div>
            </div>
          </button>
        ))}
      </div>
    </form>
  );
}
