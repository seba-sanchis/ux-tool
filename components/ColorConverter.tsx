"use client";

import { useEffect, useState } from "react";
import chroma from "chroma-js";
import tinycolor from "tinycolor2";
import { FaCode } from "react-icons/fa";

import { colorNames, tailwindPalette } from "@/constants";
import { Palette } from "@/types";
import MonochromaticPalette from "./MonochromaticPalette";
import Input from "./Input";
import Alert from "./Alert";

export default function ColorConverter() {
  const [color, setColor] = useState<string>("#000000");
  const [code, setCode] = useState({
    base: "",
    hex: "",
    hsl: "",
    oklch: "",
    rgb: "",
  });
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

    // Generate color name
    const colorName = getColorName(value);

    // Generate palette
    const palette = generatePalette(convertedColor);

    // Generate CSS variables with the generated palette
    generateCss(palette);

    const baseCode = generateCssCodeBase(colorName, convertedColor);

    // Generate CSS code strings representing the palettes
    const cssCode = generateCssCode(colorName, palette);

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

  // Convert a color to oklch
  function convertToOklch(color: string) {
    const oklch = chroma(color).oklch();

    // Extract individual values
    let l = oklch[0]; // lightness
    let c = oklch[1].toFixed(3); //chroma
    let h = oklch[2].toFixed(2); //hue

    // Check if h is NaN, if so, set it to 0
    if (isNaN(oklch[2])) h = "0";

    // Format as CSS variable string
    let oklchCSS = `oklch(${(l * 100).toFixed(2)}% ${c} ${h}deg)`;

    return oklchCSS;
  }

  // Generate an array of colors for the palette
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
    palette?.forEach((color, index) => {
      const propertyName = `--color-${100 + index * 100}`;
      document.documentElement.style.setProperty(propertyName, color.hex);
    });
  }

  // Generate CSS code strings for each color format
  function generateCssCode(colorName: string, palette: Palette[]) {
    const cssCode = { hex: "", hsl: "", oklch: "", rgb: "" };
    // Generate CSS code strings for each color format
    palette?.forEach((color, index) => {
      cssCode.hex += `--${colorName}-${100 + index * 100}: ${color.hex};\n`;
      cssCode.hsl += `--${colorName}-${100 + index * 100}: ${color.hsl};\n`;
      cssCode.oklch += `--${colorName}-${100 + index * 100}: ${color.oklch};\n`;
      cssCode.rgb += `--${colorName}-${100 + index * 100}: ${color.rgb};\n`;
    });

    return cssCode;
  }

  // Generate CSS code string for the base color
  function generateCssCodeBase(
    colorName: string,
    convertedColor: tinycolor.Instance
  ) {
    return `--${colorName}-hex: ${convertedColor.toHexString()};\n--${colorName}-hsl: ${convertedColor.toHslString()};\n--${colorName}-oklch: ${convertToOklch(
      convertedColor.toHexString()
    )};\n--${colorName}-rgb: ${convertedColor.toRgbString()};\n`;
  }

  // Function to calculate the Euclidean distance between two colors represented as hexadecimal strings
  function colorDistance(hex1: string, hex2: string) {
    // Remove the '#' symbol from the hexadecimal strings
    hex1 = hex1.replace("#", "");
    hex2 = hex2.replace("#", "");

    // Extract RGB components from hex values
    const r1 = parseInt(hex1.substring(0, 2), 16);
    const g1 = parseInt(hex1.substring(2, 4), 16);
    const b1 = parseInt(hex1.substring(4, 6), 16);
    const r2 = parseInt(hex2.substring(0, 2), 16);
    const g2 = parseInt(hex2.substring(2, 4), 16);
    const b2 = parseInt(hex2.substring(4, 6), 16);

    // Calculate the Euclidean distance between the colors
    return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
  }

  // Function to get the name of the color based on its hexadecimal value
  function getColorName(value: string) {
    // Convert the input color's hexadecimal value to uppercase
    const hex = value.toUpperCase();

    let closestColor = "";
    let minDistance = Infinity;

    // Iterate over the colorNames object to find the closest match
    for (const [name, value] of Object.entries(colorNames)) {
      // Calculate the distance between the input color and the color in the list
      const distance = colorDistance(hex, value);

      // Update the closest color if a closer match is found
      if (distance < minDistance) {
        closestColor = name.toLowerCase().replace(/\s/g, "-"); // Convert to lowercase and replace spaces with hyphens;
        minDistance = distance;
      }
    }

    // Return the closest color name
    return closestColor;
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
