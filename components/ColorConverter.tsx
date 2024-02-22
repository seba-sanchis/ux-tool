"use client";

import { useState } from "react";
import tinycolor from "tinycolor2";

import { palette } from "@/constants";
import Input from "./Input";
import { FaCode } from "react-icons/fa";
import { addCookie } from "@/lib/actions";

type Props = {
  color: string | undefined;
};

export default function ColorConverter({ color }: Props) {
  const [hex, setHex] = useState<string>("#000000");
  // const [hsl, setHsl] = useState<string>("");
  // const [hsv, setHsv] = useState<string>("");
  // const [rgb, setRgb] = useState<string>("");
  // const [tailwind, setTailwind] = useState<string>("");

  const handleColor = (value: string) => {
    let convertedColor = tinycolor(value);

    const format = convertedColor.getFormat();

    if (!format) {
      const tailwindToHex = palette.find((c) => c.tone === value)?.hex;

      convertedColor = tinycolor(tailwindToHex);
    }

    const hex = convertedColor.toHexString();
    // const hsl = color.toHslString();
    // const hsv = color.toHsvString();
    // const rgb = color.toRgbString();

    addCookie("color", value);
    setHex(hex);
    // setHsl(hsl);
    // setHsv(hsv);
    // setRgb(rgb);

    // const tailwindColor = palette.find((color) => color.hex === hex)?.tone;

    // if (tailwindColor) {
    //   setTailwind(tailwindColor);
    // } else {
    //   setTailwind("");
    // }
  };

  function handleAlert(value: string) {
    addCookie("alert", value);
  }

  return (
    <form className="flex flex-col items-center gap-2">
      <div className="input-container mt-2">
        <Input
          id="picker"
          color={hex}
          handleColor={handleColor}
          containerStyle="picker-container"
          inputStyle="picker"
          type="color"
        />

        <Input
          id="color"
          color={color}
          handleColor={handleColor}
          containerStyle="flex flex-1"
          inputStyle="input"
          type="text"
        />

        <button
          type="button"
          className="p-2"
          onClick={() => handleAlert("true")}
        >
          <FaCode />
        </button>
      </div>
    </form>
  );
}
