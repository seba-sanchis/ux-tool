export interface Component {
  name: string;
  path: string;
  code: string;
}

export interface Palette {
  hex: string;
  hsl: string;
  rgb: string;
  oklch: string;
  tone: string;
}

export interface Tone {
  name: string;
  hex: string;
}
