"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import tinycolor from "tinycolor2";
import Input from "./Input";

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

  // const handleRgb = (value: string) => {
  //   const color = tinycolor(value);

  //   const hsl = color.toHsl();

  //   setHex(color.toHexString());
  //   setRgb(value);
  //   setLightness(hsl.l * 100);
  // };

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
    <div className="card-child col-span-2">
      <h3>Foreground</h3>

      <Input
        id="picker"
        color={hex}
        handleColor={handleHex}
        containerStyle="picker-container"
        inputStyle="picker"
        type="color"
      />

      <Input
        id="color"
        color={hex}
        handleColor={handleHex}
        containerStyle=""
        inputStyle="input"
        type="text"
      />

      <Input
        id="lightness"
        lightness={lightness}
        handleLightness={handleLightness}
        rgb={rgb}
        containerStyle="input-container"
        inputStyle="relative w-full bg-transparent appearance-none z-30"
        type="range"
      />
    </div>
  );
}
