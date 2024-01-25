"use client";

import { useState } from "react";
import tinycolor from "tinycolor2";

import { InputColor, InputText } from ".";

export default function ColorPicker() {
  const [hex, setHex] = useState<string>("");
  const [hsl, setHsl] = useState<string>("");
  const [hsv, setHsv] = useState<string>("");
  const [rgb, setRgb] = useState<string>("");

  const handleHex = (value: string) => {
    const color = tinycolor(value);
    setHex(value);
    setHsl(color.toHslString());
    setHsv(color.toHsvString());
    setRgb(color.toRgbString());
  };

  const handleHsl = (value: string) => {
    const color = tinycolor(value);
    setHex(color.toHexString());
    setHsl(value);
    setHsv(color.toHsvString());
    setRgb(color.toRgbString());
  };

  const handleHsv = (value: string) => {
    const color = tinycolor(value);
    setHex(color.toHexString());
    setHsl(color.toHslString());
    setHsv(value);
    setRgb(color.toRgbString());
  };

  const handleRgb = (value: string) => {
    const color = tinycolor(value);
    setHex(color.toHexString());
    setHsl(color.toHslString());
    setHsv(color.toHsvString());
    setRgb(value);
  };

  return (
    <form className="card">
      <h2 className="title">Color converter</h2>

      <InputColor id="picker" color={hex} handleColor={handleHex} />

      <InputText id="hex" color={hex} handleColor={handleHex} />

      <InputText id="rgb" color={rgb} handleColor={handleRgb} />

      <InputText id="hsv" color={hsv} handleColor={handleHsv} />

      <InputText id="hsl" color={hsl} handleColor={handleHsl} />
    </form>
  );
}
