import { useState } from "react";
import tinycolor from "tinycolor2";
import { InputText } from ".";

export default function MonochromaticPalette() {
  const [hex, setHex] = useState("");
  const [palette, setPalette] = useState<{ hex: string; tone: number }[]>();

  function handleHex(value: string) {
    setHex(value);

    const base = tinycolor(value);

    const hsl = base.toHsl();

    const hue = hsl.h;

    const paletteHsl = [
      `hsl(${hue}, 100%, 97%)`,
      `hsl(${hue}, 100%, 95%)`,
      `hsl(${hue}, 96%, 90%)`,
      `hsl(${hue}, 96%, 82%)`,
      `hsl(${hue}, 95%, 71%)`,
      `hsl(${hue}, 89%, 60%)`,
      `hsl(${hue}, 77%, 50%)`,
      `hsl(${hue}, 83%, 41%)`,
      `hsl(${hue}, 80%, 35%)`,
      `hsl(${hue}, 75%, 30%)`,
      `hsl(${hue}, 100%, 16%)`,
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

  return (
    <form className="card">
      <h2 className="title">Monochromatic palette</h2>

      <InputText id="hex" color={hex} handleColor={handleHex} />

      <div className="grid grid-cols-11 gap-2">
        {palette?.map((color) => (
          <div
            key={color.tone}
            className="flex flex-col justify-end items-center w-full h-20 p-2 text-sm rounded-lg"
            style={{
              backgroundColor: color.hex,
              color: `${
                tinycolor.isReadable(color.hex, palette[9].hex)
                  ? palette[9].hex
                  : palette[1].hex
              }`,
            }}
          >
            <span className="font-semibold">{color.tone}</span>
            <span>{color.hex.slice(1)}</span>
          </div>
        ))}
      </div>
    </form>
  );
}
