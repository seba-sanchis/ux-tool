"use client";

import { useState } from "react";
import tinycolor from "tinycolor2";
import { CopyButton } from ".";

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
        <CopyButton text={hex} />
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
        <CopyButton text={rgb} />
      </div>

      <div className="input-container">
        <label htmlFor="hsv" className="subtitle">
          HSV
        </label>
        <input
          id="hsv"
          type="text"
          value={hsv}
          onChange={(e) => handleHsv(e.target.value)}
          className="input"
        />
        <CopyButton text={hsv} />
      </div>

      <div className="input-container">
        <label htmlFor="hsl" className="subtitle">
          HSL
        </label>
        <input
          id="hsl"
          type="text"
          value={hsl}
          onChange={(e) => handleHsl(e.target.value)}
          className="input"
        />
        <CopyButton text={hsl} />
      </div>
    </form>
  );
}
