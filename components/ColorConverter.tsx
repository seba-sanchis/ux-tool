"use client";

import { useState } from "react";
import tinycolor from "tinycolor2";

import { InputColor, InputText } from ".";
import { palette } from "@/constants";

export default function ColorConverter() {
  const [hex, setHex] = useState<string>("");
  const [hsl, setHsl] = useState<string>("");
  const [hsv, setHsv] = useState<string>("");
  const [rgb, setRgb] = useState<string>("");
  const [tailwind, setTailwind] = useState<string>("");

  const handleHex = (value: string) => {
    const color = tinycolor(value);

    const hsl = color.toHslString();
    const hsv = color.toHsvString();
    const rgb = color.toRgbString();

    setHex(value);
    setHsl(hsl);
    setHsv(hsv);
    setRgb(rgb);

    const tailwindColor = palette.find((color) => color.hex === value)?.tone;

    if (tailwindColor) {
      setTailwind(tailwindColor);
    } else {
      setTailwind("");
    }
  };

  const handleHsl = (value: string) => {
    const color = tinycolor(value);

    const hex = color.toHexString();
    const hsv = color.toHsvString();
    const rgb = color.toRgbString();

    setHex(hex);
    setHsl(value);
    setHsv(hsv);
    setRgb(rgb);

    const tailwindColor = palette.find((color) => color.hex === hex)?.tone;

    if (tailwindColor) {
      setTailwind(tailwindColor);
    } else {
      setTailwind("");
    }
  };

  const handleHsv = (value: string) => {
    const color = tinycolor(value);

    const hex = color.toHexString();
    const hsl = color.toHslString();
    const rgb = color.toRgbString();

    setHex(hex);
    setHsl(hsl);
    setHsv(value);
    setRgb(rgb);

    const tailwindColor = palette.find((color) => color.hex === hex)?.tone;

    if (tailwindColor) {
      setTailwind(tailwindColor);
    } else {
      setTailwind("");
    }
  };

  const handleRgb = (value: string) => {
    const color = tinycolor(value);

    const hex = color.toHexString();
    const hsl = color.toHslString();
    const hsv = color.toHsvString();

    setHex(hex);
    setHsl(hsl);
    setHsv(hsv);
    setRgb(value);

    const tailwindColor = palette.find((color) => color.hex === hex)?.tone;

    if (tailwindColor) {
      setTailwind(tailwindColor);
    } else {
      setTailwind("");
    }
  };

  const handleTailwind = (value: string) => {
    const tailwindToHex = palette.find((color) => color.tone === value)?.hex;

    const color = tinycolor(tailwindToHex);
    setTailwind(value);
    setHex(color.toHexString());
    setHsl(color.toHslString());
    setHsv(color.toHsvString());
    setRgb(color.toRgbString());
  };

  return (
    <form className="card">
      <h2 className="title">Color Converter</h2>

      <InputColor id="picker" color={hex} handleColor={handleHex} />

      <InputText id="hex" color={hex} handleColor={handleHex} />

      <InputText id="rgb" color={rgb} handleColor={handleRgb} />

      <InputText id="hsv" color={hsv} handleColor={handleHsv} />

      <InputText id="hsl" color={hsl} handleColor={handleHsl} />

      <InputText id="tailwind" color={tailwind} handleColor={handleTailwind} />
    </form>
  );
}
