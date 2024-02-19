type Props = {
  id: string;
  color?: string;
  handleColor?: (value: string) => void;
  containerStyle: string;
  inputStyle: string;
  type: string;
  lightness?: number;
  handleLightness?: (lightness: number) => void;
  rgb?: string;
};

export default function Input({
  id,
  color,
  handleColor,
  containerStyle,
  inputStyle,
  type,
  lightness,
  handleLightness,
  rgb,
}: Props) {
  return (
    <>
      {type === "range" && handleLightness && (
        <div className={containerStyle}>
          <label htmlFor="lightness" className="subtitle">
            {id}
          </label>
          <span className="relative">
            <input
              id={id}
              type={type}
              min="0"
              max="100"
              value={lightness}
              onChange={(e) => handleLightness(Number(e.target.value))}
              className={inputStyle}
            />
            <div
              className={`inline-block absolute top-2 left-0 w-full h-1`}
              style={{
                backgroundImage: `linear-gradient(90deg,rgb(0,0,0),${rgb},rgb(255,255,255))`,
              }}
            ></div>
          </span>
        </div>
      )}
      {(type === "text" || type === "color") && handleColor && (
        <div className={containerStyle}>
          <label htmlFor={id} className="subtitle sr-only">
            {id}
          </label>
          <input
            id={id}
            type={type}
            value={color}
            onChange={(e) => handleColor(e.target.value)}
            className={inputStyle}
          />
        </div>
      )}
    </>
  );
}
