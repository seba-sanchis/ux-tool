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
  const [code, setCode] = useState({ base: "", hex: "", hsl: "", oklch: "", rgb: "" });
  const [hex, setHex] = useState<string>("#000000");
  const [palette, setPalette] = useState<Palette[]>([]);
  const [toggleAlert, setToggleAlert] = useState(false);

  useEffect(() => {
    handlePalette(color);
  }, []);

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

    // Generate the palette
    const palette = generatePalette(convertedColor);

    // Generate CSS variables with the generated palette
    generateCss(palette);

    const baseCode = generateBaseCssCode(convertedColor);

    // Generate CSS code strings representing the palettes
    const cssCode = generateCssCode(palette);

    // Update React state with the selected color, hex value, palette, and code string
    setColor(value);
    setHex(convertedColor.toHexString());
    setPalette(palette);
    setCode({
      base: baseCode,
      hex: cssCode.hex,
      hsl: cssCode.hsl,
      oklch: cssCode.oklch,
      rgb: cssCode.rgb,
    });
  }

  // Function to generate an array of colors for the palette
  function generatePalette(convertedColor: tinycolor.Instance) {
    const palette = [];

    // Get HSL values of the color
    const hsl = convertedColor.toHsl();
    const hue = hsl.h;
    const saturation = hsl.s;

    // Calculate the step size for generating 10 colors
    const step = 80 / NUM_COLORS;

    // Generate colors with varying lightness
    for (let i = 0; i < NUM_COLORS; i++) {
      const lightness = MAX_LIGHTNESS - i * step;
      const color = tinycolor(`hsl(${hue}, ${saturation}, ${lightness}%)`);

      const hex = color.toHexString();
      const rgb = color.toRgbString();
      const hsl = color.toHslString();
      const oklch = convertToOklch(hex);

      palette.push({
        hex,
        rgb,
        hsl,
        oklch,
        tone: `var(--color-${100 + i * 100})`,
      });
    }

    return palette;
  }

  // Generate CSS variables based on the generated palette
  function generateCss(palette: Palette[]) {
    palette.forEach((color, index) => {
      const propertyName = `--color-${100 + index * 100}`;
      document.documentElement.style.setProperty(propertyName, color.hex);
    });
  }

  // Generate CSS code strings for each color format
  function generateCssCode(palette: Palette[]) {
    const cssCode = { hex: "", hsl: "", oklch: "", rgb: "" };
    // Generate CSS code strings for each color format
    palette?.forEach((color, index) => {
      cssCode.hex += `--color-${100 + index * 100}: ${color.hex};\n`;
      cssCode.hsl += `--color-${100 + index * 100}: ${color.hsl};\n`;
      cssCode.oklch += `--color-${100 + index * 100}: ${color.oklch};\n`;
      cssCode.rgb += `--color-${100 + index * 100}: ${color.rgb};\n`;
    });

    return cssCode;
  }

  // Generate CSS code string for the base color
  function generateBaseCssCode(convertedColor: tinycolor.Instance) {
    return `--color-hex: ${convertedColor.toHexString()};\n--color-hsl: ${convertedColor.toHslString()};\n--color-oklch: ${convertToOklch(convertedColor.toHexString())};\n--color-rgb: ${convertedColor.toRgbString()};\n`;
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
