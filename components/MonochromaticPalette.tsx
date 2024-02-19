"use client";

import { useEffect } from "react";
import tinycolor from "tinycolor2";

import { palette as p } from "@/constants";

type Props = {
  color: string;
  palette: { hex: string; tone: number }[];
  setPalette: React.Dispatch<
    React.SetStateAction<{ hex: string; tone: number }[]>
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

    const step = 80 / 10; // Calculate the step size

    const paletteHsl = [];

    for (let i = 0; i <= 10; i++) {
      const lightness = 90 - i * step; // Calculate the lightness value
      paletteHsl.push(`hsl(${hue}, ${saturation}, ${lightness}%)`);
    }

    const palette = paletteHsl.map((color, index) => {
      const value = tinycolor(color).toHexString();

      return {
        hex: value,
        tone: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950][index],
      };
    });

    document.documentElement.style.setProperty("--color-50", palette[0].hex);
    document.documentElement.style.setProperty("--color-100", palette[1].hex);
    document.documentElement.style.setProperty("--color-200", palette[2].hex);
    document.documentElement.style.setProperty("--color-300", palette[3].hex);
    document.documentElement.style.setProperty("--color-400", palette[4].hex);
    document.documentElement.style.setProperty("--color-500", palette[5].hex);
    document.documentElement.style.setProperty("--color-600", palette[6].hex);
    document.documentElement.style.setProperty("--color-700", palette[7].hex);
    document.documentElement.style.setProperty("--color-800", palette[8].hex);
    document.documentElement.style.setProperty("--color-900", palette[9].hex);
    document.documentElement.style.setProperty("--color-950", palette[10].hex);

    setPalette(palette);
  }

  const handleCopy = (tone: string) => {
    navigator.clipboard.writeText(tone);
  };

  return (
    <form className="section">
      <h2 className="section-title">Monochromatic Palette</h2>

      <div className="flex gap-2 w-1/8">
        {palette?.map((color) => (
          <button
            key={color.tone}
            className="flex justify-end items-center w-full px-4 py-2 text-sm rounded-full"
            onClick={() => handleCopy(color.hex)}
            type="button"
            style={{
              backgroundColor: color.hex,
              color: `${
                tinycolor.isReadable(color.hex, palette[9]?.hex)
                  ? palette[9]?.hex
                  : palette[1]?.hex
              }`,
            }}
          >
            <span className="font-semibold">{color.tone}</span>
          </button>
        ))}
      </div>
    </form>
  );
}
