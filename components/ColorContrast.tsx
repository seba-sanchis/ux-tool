"use client";

import { useEffect, useState } from "react";
import { Background, Foreground } from ".";

export default function ColorContrast() {
  const [foreground, setForeground] = useState("");
  const [background, setBackground] = useState("");
  const [contrastRatio, setContrastRatio] = useState<number | null>(null);

  useEffect(() => {
    handleAnalysis();
  }, [foreground, background]);

  const handleAnalysis = () => {
    const luminance1 = getRelativeLuminance(foreground);
    const luminance2 = getRelativeLuminance(background);

    const lightest = Math.max(luminance1, luminance2);
    const darkest = Math.min(luminance1, luminance2);

    const calculatedContrastRatio = (lightest + 0.05) / (darkest + 0.05);
    setContrastRatio(parseFloat(calculatedContrastRatio.toFixed(2)));
  };

  const getRelativeLuminance = (color: string) => {
    const rgba = hexToRgba(color);
    const srgb = rgba
      .map((val) => val / 255)
      .map((value) => {
        if (value <= 0.04045) {
          return value / 12.92;
        } else {
          return Math.pow((value + 0.055) / 1.055, 2.4);
        }
      });

    return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
  };

  const hexToRgba = (hex: string) => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b, 255];
  };

  return (
    <form className="card">
      <h2 className="title">Color contrast</h2>

      <div className="grid grid-cols-2 gap-6">
        <div
          className="card-child"
          style={{ color: foreground, backgroundColor: background }}
        >
          <span className="text-3xl">Large sample text.</span>
          <span>Small sample text.</span>
        </div>

        <div className="card-child justify-center">
          {contrastRatio && (
            <span
              className={`flex justify-center items-center text-xl ${
                contrastRatio >= 4.5 ? "text-[--wv-green]" : "text-[--wv-red]"
              }`}
            >
              {contrastRatio}
            </span>
          )}
        </div>

        <Foreground setForeground={setForeground} />
        <Background setBackground={setBackground} />
      </div>
    </form>
  );
}
