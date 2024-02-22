"use client";

import { useEffect, useState } from "react";
import tinycolor from "tinycolor2";
import { FaCheck } from "react-icons/fa";

import { tones } from "@/constants";
import { Tone } from "@/types";

type Palette = {
  name: any;
  tones: {
    hex: string;
    tone: number;
    variable: string;
  }[];
};

export default function ChromaticPalette() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [palette, setPalette] = useState<Palette[]>();

  useEffect(() => {
    // Compute the palette data once when the component mounts
    const computedPalette = tones.map((tone) => computePalette(tone));
    setPalette(computedPalette);
  }, []);

  function computePalette(tone: Tone) {
    const foundTone = tones.find((t) => t.name === tone.name);

    const convertedColor = tinycolor(foundTone?.hex);

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

    return { name: tone.name, tones: palette };
  }

  const handleCopy = (tone: string) => {
    navigator.clipboard.writeText(tone);
    setCopiedColor(tone);
    setTimeout(() => setCopiedColor(null), 1000);
  };

  return (
    <section className="section">
      <h2 className="section-title">Chromatic Palette</h2>

      {palette?.map((palette) => (
        <div className="flex flex-col gap-4 my-4">
          <h3 className="section-subtitle">{palette.name}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {palette.tones.map((color) => (
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
                  }}
                ></div>
                <div className="flex flex-col items-start whitespace-nowrap">
                  <div className="text-sm text-[--gray-1000]">
                    {color.variable}
                  </div>
                  <div className="flex gap-1 items-center text-sm text-[--gray-900]">
                    <span>{color.hex}</span>
                    {copiedColor === color.hex && <FaCheck />}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
