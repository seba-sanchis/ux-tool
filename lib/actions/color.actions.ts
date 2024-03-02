import chroma from "chroma-js";

export function convertToOklch(color: string) {
  const oklch = chroma(color).oklch();

  // Extract individual values
  let l = oklch[0]; // lightness
  let c = oklch[1].toFixed(3); //chroma
  let h = oklch[2].toFixed(2); //hue

  // Check if h is NaN, if so, set it to 0
  if (isNaN(oklch[2])) h = "0";

  // Format as CSS variable string
  let oklchCSS = `oklch(${(l * 100).toFixed(2)}% ${c} ${h}deg)`;

  return oklchCSS;
}
