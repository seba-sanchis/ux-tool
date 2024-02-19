"use client";

import { useEffect, useState } from "react";
import tinycolor from "tinycolor2";
import Foreground from "./Foreground";
import Background from "./Background";

export default function ColorContrast() {
  const [foreground, setForeground] = useState("");
  const [background, setBackground] = useState("");
  const [contrastRatio, setContrastRatio] = useState<number | null>(null);

  useEffect(() => {
    handleReadability();
  }, [foreground, background]);

  const handleReadability = () => {
    const readability = tinycolor.readability(foreground, background);

    const roundedReadability = parseFloat(readability.toFixed(2));

    setContrastRatio(roundedReadability);
  };

  return (
    <form className="card col-span-2">
      <h2 className="title">Color Contrast</h2>

      <div className="grid grid-cols-4 gap-6">
        <div
          className="card-child col-span-2"
          style={{ color: foreground, backgroundColor: background }}
        >
          <span className="text-3xl">Large sample text.</span>
          <span>Small sample text.</span>
        </div>

        <div className="card-child justify-center">
          {contrastRatio && (
            <div className="flex flex-1">
              <div className="flex flex-col w-full">
                <h3>Contrast Ratio</h3>
                <div className="flex justify-center items-center flex-1">
                  <span
                    className={`text-xl ${
                      contrastRatio >= 4.5
                        ? "text-[--wv-green]"
                        : contrastRatio >= 3
                        ? "text-[--wv-orange]"
                        : "text-[--wv-red]"
                    }`}
                  >
                    {contrastRatio}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="card-child justify-center">
          {contrastRatio && (
            <div className="flex flex-col flex-1">
              <h3>Level</h3>
              <ul className="flex flex-col justify-center items-center flex-1">
                <li
                  className={`${
                    contrastRatio >= 4.5
                      ? "text-[--wv-green]"
                      : "text-[--wv-red]"
                  }`}
                >
                  AAA
                </li>
                <li
                  className={`${
                    contrastRatio >= 3 ? "text-[--wv-green]" : "text-[--wv-red]"
                  }`}
                >
                  AA
                </li>
              </ul>
            </div>
          )}
        </div>

        <Foreground setForeground={setForeground} />
        <Background setBackground={setBackground} />
      </div>
    </form>
  );
}
