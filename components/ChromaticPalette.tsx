"use client";

import { palette } from "@/constants";
import tinycolor from "tinycolor2";

export default function ChromaticPalette() {
  const handleCopy = (tone: string) => {
    navigator.clipboard.writeText(tone);
  };
  return (
    <div className="card">
      <h2 className="title">Chromatic Palette</h2>

      <div className="grid grid-cols-11 place-items-center gap-2">
        {palette.map((color, index) => (
          <button
            key={color.tone}
            className="w-full h-[94px] -top-[17px] left-0 rounded-lg active:w-[90px] active:h-[90px]"
            style={{
              backgroundColor: color.hex,
              color: `${
                tinycolor.isReadable(
                  color.hex,
                  palette[Math.floor(index / 11) * 11 + (index === 9 ? 1 : 9)]
                    ?.hex
                )
                  ? palette[Math.floor(index / 11) * 11 + (index === 9 ? 1 : 9)]
                      ?.hex
                  : palette[Math.floor(index / 11) * 11 + (index === 9 ? 9 : 1)]
                      ?.hex
              }`,
            }}
            onClick={() => handleCopy(color.tone)}
          >
            <div className="font-semibold">{color.tone.match(/\d+/)?.[0]}</div>
            <div>{color.hex.slice(1)}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
