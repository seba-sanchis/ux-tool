"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import tinycolor from "tinycolor2";

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
      <div className="input-container">
        <label htmlFor="picker" className="subtitle sr-only">
          Picker
        </label>
        <input
          id="picker"
          type="color"
          value={hex}
          onChange={(e) => handleHex(e.target.value)}
          className="picker"
        />
      </div>

      <div className="input-container">
        <label htmlFor="hex" className="subtitle">
          HEX
        </label>
        <input
          id="hex"
          type="text"
          value={hex}
          onChange={(e) => handleHex(e.target.value)}
          className="input"
        />
      </div>

      <div className="input-container">
        <label htmlFor="rgb" className="subtitle">
          RGB
        </label>
        <input
          id="rgb"
          type="text"
          value={rgb}
          onChange={(e) => handleRgb(e.target.value)}
          className="input"
        />
      </div>

      <div className="input-container">
        <label htmlFor="lightness" className="subtitle">
          Lightness
        </label>
        <span>
          <input
            type="range"
            id="lightness"
            min="0"
            max="100"
            value={lightness}
            onChange={(e) => handleLightness(Number(e.target.value))}
          />
          {/* <span
          className={`block w-20 h-20 [background-image:linear-gradient(90deg,rgb(0,0,0),rgb(128,128,128),rgb(255,255,255))]`}
        ></span> */}
        </span>
      </div>
    </div>
  );
}
