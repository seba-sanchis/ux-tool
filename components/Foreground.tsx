"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import tinycolor from "tinycolor2";

import { InputColor, InputRange, InputText } from ".";

export default function Foreground({
  setForeground,
}: {
  setForeground: Dispatch<SetStateAction<string>>;
}) {
  const [hex, setHex] = useState<string>("");
  const [rgb, setRgb] = useState<string>("");
  const [lightness, setLightness] = useState(0);

  useEffect(() => {
    setForeground(hex);
  }, [hex]);

  const handleHex = (value: string) => {
    const color = tinycolor(value);

    const hsl = color.toHsl();

    setHex(value);
    setRgb(color.toRgbString());
    setLightness(hsl.l * 100);
  };

  const handleRgb = (value: string) => {
    const color = tinycolor(value);

    const hsl = color.toHsl();

    setHex(color.toHexString());
    setRgb(value);
    setLightness(hsl.l * 100);
  };

  const handleLightness = (lightness: number) => {
    const color = tinycolor(hex);

    const hsl = color.toHsl();

    hsl.l = lightness;

    const newColor = tinycolor(hsl);

    setHex(newColor.toHexString());
    setRgb(newColor.toRgbString());
    setLightness(lightness);
  };

  return (
    <div className="card-child">
      <h3>Foreground</h3>

      <InputColor id="picker" color={hex} handleColor={handleHex} />

      <InputText id="hex" color={hex} handleColor={handleHex} />

      <InputText id="rgb" color={rgb} handleColor={handleRgb} />

      <InputRange
        id="lightness"
        lightness={lightness}
        handleLightness={handleLightness}
        rgb={rgb}
      />
    </div>
  );
}
