"use client";

import { useEffect, useState } from "react";
import tinycolor from "tinycolor2";
import ColorCard from "./ColorCard";
import { FaRegStar, FaStar } from "react-icons/fa";

export default function ColorContrast() {
  const [foreground, setForeground] = useState("");
  const [background, setBackground] = useState("");
  const [contrastRatio, setContrastRatio] = useState<number>(1);

  useEffect(() => {
    handleReadability();
  }, [foreground, background]);

  const handleReadability = () => {
    const readability = tinycolor.readability(foreground, background);

    const roundedReadability = parseFloat(readability.toFixed(2));

    setContrastRatio(roundedReadability);
  };

  return (
    <form className="section">
      <h2 className="section-title">Color Contrast</h2>

      <div className="items-center rounded-lg border border-[--accents-2]">
        <div
          style={{ color: foreground, backgroundColor: background }}
          className="flex flex-col justify-center items-center gap-4 flex-1 p-6 rounded-t-lg"
        >
          <div className="text-3xl">How does it work?</div>
          <p>
            This tool follows the Web Content Accessibility Guidelines (WCAG),
            which are a series of recommendations for making the web more
            accessible. Regarding colors, the standard defines two levels of
            contrast ratio: AA (minimum contrast) and AAA (enhanced contrast).
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 flex-1 p-6">
          <div className="flex flex-col items-center gap-4">
            <div
              className={`flex flex-col justify-between items-center w-full  ${
                contrastRatio >= 7
                  ? "text-[--green]"
                  : contrastRatio >= 4.5
                  ? "text-[--orange]"
                  : "text-[--red]"
              }`}
            >
              <div className="text-3xl semibold">{contrastRatio}</div>
              <div className="flex items-center gap-2">
                <div>
                  {contrastRatio >= 7
                    ? "Very good"
                    : contrastRatio >= 4.5
                    ? "Good"
                    : contrastRatio >= 3
                    ? "Poor"
                    : "Very poor"}
                </div>
                <div className="flex gap-2">
                  {contrastRatio >= 7 ? (
                    <>
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </>
                  ) : contrastRatio >= 4.5 ? (
                    <>
                      <FaStar />
                      <FaStar />
                      <FaRegStar />
                    </>
                  ) : contrastRatio >= 3 ? (
                    <>
                      <FaStar />
                      <FaRegStar />
                      <FaRegStar />
                    </>
                  ) : (
                    <>
                      <FaRegStar />
                      <FaRegStar />
                      <FaRegStar />
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-6">
              <div
                className={`flex items-center flex-1 gap-4 ${
                  contrastRatio >= 7
                    ? "text-[--green]"
                    : contrastRatio >= 4.5
                    ? "text-[--orange]"
                    : "text-[--red]"
                }`}
              >
                <div>Small text</div>
                <div className="flex gap-2">
                  {contrastRatio >= 7 ? (
                    <>
                      <FaStar />
                      <FaStar />
                    </>
                  ) : contrastRatio >= 4.5 ? (
                    <>
                      <FaStar />
                      <FaRegStar />
                    </>
                  ) : (
                    <>
                      <FaRegStar />
                      <FaRegStar />
                    </>
                  )}
                </div>
              </div>
              <div
                className={`flex items-center gap-4 ${
                  contrastRatio >= 4.5
                    ? "text-[--green]"
                    : contrastRatio >= 3
                    ? "text-[--orange]"
                    : "text-[--red]"
                }`}
              >
                <div>Large text</div>
                <div className="flex gap-2">
                  {contrastRatio >= 4.5 ? (
                    <>
                      <FaStar />
                      <FaStar />
                    </>
                  ) : contrastRatio >= 3 ? (
                    <>
                      <FaStar />
                      <FaRegStar />
                    </>
                  ) : (
                    <>
                      <FaRegStar />
                      <FaRegStar />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-6 w-fit">
            <ColorCard name="Foreground" setForeground={setForeground} />
            <ColorCard name="Background" setBackground={setBackground} />
          </div>
        </div>
      </div>
    </form>
  );
}
