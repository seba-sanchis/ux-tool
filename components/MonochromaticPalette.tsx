"use client";

import { useState } from "react";
import tinycolor from "tinycolor2";
import { FaCheck } from "react-icons/fa";

import { Palette } from "@/types";

type Props = {
  palette: Palette[];
};

export default function MonochromaticPalette({ palette }: Props) {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const handleCopy = (tone: string) => {
    navigator.clipboard.writeText(tone);
    setCopiedColor(tone);
    setTimeout(() => setCopiedColor(null), 1000);
  };

  return (
    <section className="section">
      <h2 className="section-title">Monochromatic Palette</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
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
              <div className="text-sm text-[--gray-1000]">{color.tone}</div>
              <div className="flex gap-1 items-center text-sm text-[--gray-900]">
                <span>{color.hex}</span>
                {copiedColor === color.hex && <FaCheck />}
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
