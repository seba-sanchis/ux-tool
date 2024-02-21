"use client";

import { useState } from "react";
import tinycolor from "tinycolor2";

import { palette } from "@/constants";
import Input from "./Input";
import { FaCode } from "react-icons/fa";

type Props = {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  setToggleAlert: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ColorConverter({
  color,
  setColor,
  setToggleAlert,
}: Props) {
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

    setColor(value);
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

  return (
    <form className="flex flex-col items-center gap-2">
      <h1 className="title">Make your color</h1>
      <p className="subtitle">
        Enter any type of{" "}
        <strong className="text-[--accents-8] font-normal">
          CSS or Tailwind CSS
        </strong>{" "}
        color to create a custom color palette.
      </p>

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
          onClick={() => setToggleAlert(true)}
        >
          <FaCode />
        </button>
      </div>
    </form>
  );
}
