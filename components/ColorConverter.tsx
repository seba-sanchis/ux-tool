"use client";

import { useEffect, useState } from "react";
import tinycolor from "tinycolor2";
import { FaCode } from "react-icons/fa";

import { tailwindPalette } from "@/constants";
import { Palette } from "@/types";
import MonochromaticPalette from "./MonochromaticPalette";
import Input from "./Input";
import Alert from "./Alert";
import { convertToOklch } from "@/lib/actions/color.actions";

export default function ColorConverter() {
  const [color, setColor] = useState<string>("#000000");
  const [code, setCode] = useState({ hex: "", oklch: "" });
  const [hex, setHex] = useState<string>("#000000");
  const [palette, setPalette] = useState<Palette[]>([]);
  const [toggleAlert, setToggleAlert] = useState(false);

  useEffect(() => {
    handlePalette(color);
  }, []);

  // Constants defining the number of colors in the palette and the maximum lightness value
  const NUM_COLORS = 10; // Number of colors in the palette
  const MAX_LIGHTNESS = 90; // Maximum lightness value for generating colors

  // Function to handle palette updates
  function handlePalette(value: string) {
    // Convert the color value to a tinycolor object
    let convertedColor = tinycolor(value);

    // Check if the color format is supported, if not, try to find a match in the tailwindPalette
    const format = convertedColor.getFormat();
    if (!format) {
      const tailwindToHex = tailwindPalette.find((c) => c.tone === value)?.hex;
      convertedColor = tinycolor(tailwindToHex);
    }

    // Get hex value of the color
    const hex = convertedColor.toHexString();

    // Generate the palette
    const hexPalette = generateHexPalette(convertedColor);

    // Generate CSS variables with the generated palette
    generateHexCss(hexPalette);

    // Generate CSS code string representing the hex palette
    const hexCss =
      `--color-base: ${hex};\n\n` +
      hexPalette
        .map((color, index) => `--color-${100 + index * 100}: ${color.hex};`)
        .join("\n");

    // Generate CSS code string representing the oklch palette
    const oklchCss =
      `--color-base: ${convertToOklch(hex)};\n\n` +
      hexPalette
        .map(
          (color, index) =>
            `--color-${100 + index * 100}: ${convertToOklch(color.hex)};`
        )
        .join("\n");

    // Update React state with the selected color, hex value, palette, and code string
    setColor(value);
    setHex(hex);
    setPalette(hexPalette);
    setCode({ hex: hexCss, oklch: oklchCss });
  }

  // Function to generate an array of hex colors for the palette
  function generateHexPalette(convertedColor: tinycolor.Instance) {
    const hexPalette = [];

    // Get HSL values of the color
    const hsl = convertedColor.toHsl();
    const hue = hsl.h;
    const saturation = hsl.s;

    // Calculate the step size for generating 10 colors
    const step = 80 / NUM_COLORS;

    // Generate colors with varying lightness
    for (let i = 0; i < NUM_COLORS; i++) {
      const lightness = MAX_LIGHTNESS - i * step;
      const color = tinycolor(
        `hsl(${hue}, ${saturation}, ${lightness}%)`
      ).toHexString();
      hexPalette.push({ hex: color, tone: `var(--color-${100 + i * 100})` });
    }

    return hexPalette;
  }

  // generate CSS variables based on the generated palette
  function generateHexCss(hexPalette: Palette[]) {
    hexPalette.forEach((color, index) => {
      const propertyName = `--color-${100 + index * 100}`;
      document.documentElement.style.setProperty(propertyName, color.hex);
    });
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
      {toggleAlert && <Alert code={code} setToggleAlert={setToggleAlert} />}
      <MonochromaticPalette palette={palette} />
    </>
  );
}
