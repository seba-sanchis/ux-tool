"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import tinycolor from "tinycolor2";
import Input from "./Input";

type Props = {
  name: string;
  setBackground?: Dispatch<SetStateAction<string>>;
  setForeground?: Dispatch<SetStateAction<string>>;
};

export default function ColorCard({
  name,
  setBackground,
  setForeground,
}: Props) {
  const [hex, setHex] = useState<string>("");
  const [rgb, setRgb] = useState<string>("");
  const [lightness, setLightness] = useState(0);

  useEffect(() => {
    if (setBackground) {
      if (hex) {
        setBackground(hex);
      } else {
        setHex("#ffffff");
        setRgb("rgb(255,255,255)");
        setLightness(100);
      }
    }

    if (setForeground) {
      if (hex) {
        setForeground(hex);
      } else {
        setHex("#000000");
        setRgb("rgb(0,0,0)");
        setLightness(0);
      }
    }
  }, [hex]);

  const handleHex = (value: string) => {
    const color = tinycolor(value);

    const hsl = color.toHsl();

    setHex(value);
    setRgb(color.toRgbString());
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
    <div className="flex flex-col gap-4">
      <h3 className="text-sm text-[var(--accents-6)]">{name}</h3>
      <div className="input-container">
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
          containerStyle="flex flex-1"
          inputStyle="input"
          type="text"
        />
      </div>

      <Input
        id="lightness"
        lightness={lightness}
        handleLightness={handleLightness}
        rgb={rgb}
        containerStyle=""
        inputStyle="relative w-full bg-transparent appearance-none z-30"
        type="range"
      />
    </div>
  );
}
