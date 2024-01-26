"use client";

import { palette } from "@/constants";

export default function ColorPalette() {
  const handleCopy = (tone: string) => {
    navigator.clipboard.writeText(tone);
  };
  return (
    <div className="card col-span-2">
      <h2 className="title">Color Palette</h2>

      <div className="grid grid-cols-11 place-items-center gap-1">
        {palette.map((color) => (
          <button
            key={color.tone}
            className="w-16 h-3.5 -top-[17px] left-0 rounded-lg active:w-14 "
            style={{ backgroundColor: color.hex }}
            onClick={() => handleCopy(color.tone)}
          ></button>
        ))}
      </div>
    </div>
  );
}
