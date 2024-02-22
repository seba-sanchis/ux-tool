"use client";

import { useEffect, useState } from "react";
import tinycolor from "tinycolor2";

import { options, tailwindPalette } from "@/constants";
import { FaAngleDown, FaCheck, FaCode } from "react-icons/fa";
import CopyButton from "./CopyButton";
import { addCookie } from "@/lib/actions";
import Input from "./Input";
import { Palette } from "@/types";
import MonochromaticPalette from "./MonochromaticPalette";

export default function ColorConverter() {
  const [color, setColor] = useState<string>("#000000");
  const [code, setCode] = useState<string>("");
  const [hex, setHex] = useState<string>("#000000");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [palette, setPalette] = useState<Palette[]>([]);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [toggleAlert, setToggleAlert] = useState(false);

  useEffect(() => {
    handlePalette(color);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        addCookie("alert", "false");
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function handlePalette(value: string) {
    let convertedColor = tinycolor(value);

    const format = convertedColor.getFormat();

    if (!format) {
      const tailwindToHex = tailwindPalette.find((c) => c.tone === value)?.hex;

      convertedColor = tinycolor(tailwindToHex);
    }

    const hex = convertedColor.toHexString();

    const hsl = convertedColor.toHsl();

    const hue = hsl.h;

    const saturation = hsl.s;

    const step = 80 / 9; // Calculate the step size for 10 colors

    const hslPalette = [];

    for (let i = 0; i < 10; i++) {
      const lightness = 90 - i * step; // Calculate the lightness value
      hslPalette.push(`hsl(${hue}, ${saturation}, ${lightness}%)`);
    }

    const hexPalette = hslPalette.map((color, index) => {
      const value = tinycolor(color).toHexString();

      return {
        hex: value,
        tone: [
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

    document.documentElement.style.setProperty(
      "--color-100",
      hexPalette[0].hex
    );
    document.documentElement.style.setProperty(
      "--color-200",
      hexPalette[1].hex
    );
    document.documentElement.style.setProperty(
      "--color-300",
      hexPalette[2].hex
    );
    document.documentElement.style.setProperty(
      "--color-400",
      hexPalette[3].hex
    );
    document.documentElement.style.setProperty(
      "--color-500",
      hexPalette[4].hex
    );
    document.documentElement.style.setProperty(
      "--color-600",
      hexPalette[5].hex
    );
    document.documentElement.style.setProperty(
      "--color-700",
      hexPalette[6].hex
    );
    document.documentElement.style.setProperty(
      "--color-800",
      hexPalette[7].hex
    );
    document.documentElement.style.setProperty(
      "--color-900",
      hexPalette[8].hex
    );
    document.documentElement.style.setProperty(
      "--color-1000",
      hexPalette[9].hex
    );

    setColor(value);

    setHex(hex);

    setPalette(hexPalette);

    setCode(`--color-100: ${hexPalette[0].hex};
--color-200: ${hexPalette[0].hex};
--color-300: ${hexPalette[1].hex};
--color-400: ${hexPalette[2].hex};
--color-500: ${hexPalette[3].hex};
--color-600: ${hexPalette[4].hex};
--color-700: ${hexPalette[5].hex};
--color-800: ${hexPalette[6].hex};
--color-900: ${hexPalette[7].hex};
--color-1000: ${hexPalette[8].hex};`);
  }

  const handleOptions = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  function handleToggle(
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>
  ) {
    if (e.currentTarget === e.target) {
      setToggleAlert(false);
      setIsOpen(false);
    }
  }

  return (
    <>
      <div className="flex flex-col items-center">
        <form className="input-container mt-2">
          <Input
            id="picker"
            color={hex}
            handleColor={handlePalette}
            containerStyle="picker-container"
            inputStyle="picker"
            type="color"
          />

          <Input
            id="color"
            color={color}
            handleColor={handlePalette}
            containerStyle="flex flex-1"
            inputStyle="input"
            type="text"
          />

          <button
            type="button"
            className="p-2"
            onClick={() => setToggleAlert(true)}
          >
            <FaCode />
          </button>
        </form>
      </div>
      {toggleAlert && (
        <div
          onClick={(e) => handleToggle(e)}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
          <div className="flex flex-col items-end gap-2 bg-[--background] px-6 pt-2 pb-6 w-full max-w-screen-md rounded-lg shadow-lg">
            <button
              onClick={(e) => handleToggle(e)}
              className="px-2 py-1 text-sm rounded-lg border border-[--accents-2] text-[--gray-900] hover:bg-[--gray-200]"
            >
              Esc
            </button>
            <div className="flex flex-col w-full h-full rounded-lg border border-[--accents-2]">
              <div className="flex justify-between items-center px-4 h-12 border-b border-[--accents-2] text-sm">
                <span>app/globals.css</span>
                <div className="flex gap-2">
                  <div className="relative">
                    <button
                      className="flex items-center gap-2 px-4 h-full text-[--gray-900] hover:bg-[--gray-200] rounded-lg"
                      onClick={() => setIsOpen(!isOpen)}
                    >
                      {selectedOption}
                      <FaAngleDown />
                    </button>
                    {isOpen && (
                      <ul className="absolute -right-2 px-2 py-2 rounded-lg bg-[--background] shadow-lg">
                        {options.map((option) => (
                          <li
                            key={option}
                            onClick={() => handleOptions(option)}
                            className="flex items-center gap-4 px-4 py-1 text-[--gray-900] hover:bg-[--gray-200] rounded cursor-pointer"
                          >
                            {selectedOption === option && <FaCheck size={12} />}
                            {option}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <CopyButton text={code} />
                </div>
              </div>

              <pre className="p-4 overflow-x-auto bg-[--background]">
                <code className="flex max-w-lg text-sm">{code}</code>
              </pre>
            </div>
          </div>
        </div>
      )}
      <MonochromaticPalette palette={palette} />
    </>
  );
}
