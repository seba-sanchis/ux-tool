import { useState } from "react";
import tinycolor from "tinycolor2";
import { InputText } from ".";

type Props = {
  palette: { hex: string; tone: number }[];
  setPalette: React.Dispatch<
    React.SetStateAction<{ hex: string; tone: number }[]>
  >;
};

export default function MonochromaticPalette({ palette, setPalette }: Props) {
  const [hex, setHex] = useState("");

  function handleHex(value: string) {
    setHex(value);

    const base = tinycolor(value);

    const hsl = base.toHsl();

    const hue = hsl.h;

    const saturation = hsl.s;

    const paletteHsl = [
      `hsl(${hue}, ${saturation}, 97%)`,
      `hsl(${hue}, ${saturation}, 95%)`,
      `hsl(${hue}, ${saturation}, 90%)`,
      `hsl(${hue}, ${saturation}, 82%)`,
      `hsl(${hue}, ${saturation}, 71%)`,
      `hsl(${hue}, ${saturation}, 60%)`,
      `hsl(${hue}, ${saturation}, 50%)`,
      `hsl(${hue}, ${saturation}, 41%)`,
      `hsl(${hue}, ${saturation}, 35%)`,
      `hsl(${hue}, ${saturation}, 30%)`,
      `hsl(${hue}, ${saturation}, 16%)`,
    ];

    const paletteHex = paletteHsl.map((color, index) => {
      const hexValue = tinycolor(color).toHexString().toUpperCase();

      return {
        hex: hexValue,
        tone: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950][index],
      };
    });

    setPalette(paletteHex);
  }

  const handleCopy = (tone: string) => {
    navigator.clipboard.writeText(tone);
  };

  return (
    <form className="card">
      <h2 className="title">Monochromatic Palette</h2>

      <InputText id="hex" color={hex} handleColor={handleHex} />

      <div className="grid grid-cols-11 gap-1 place-items-center">
        {palette?.map((color) => (
          <button
            key={color.tone}
            className="flex flex-col justify-end items-center w-full h-40 p-2 text-sm rounded-lg active:h-[156px]"
            onClick={() => handleCopy(color.hex)}
            type="button"
            style={{
              backgroundColor: color.hex,
              color: `${
                tinycolor.isReadable(color.hex, palette[9]?.hex)
                  ? palette[9]?.hex
                  : palette[1]?.hex
              }`,
            }}
          >
            <span className="font-semibold">{color.tone}</span>
            <span>{color.hex.slice(1)}</span>
          </button>
        ))}
      </div>
    </form>
  );
}
