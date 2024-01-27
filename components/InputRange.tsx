type Props = {
  id: string;
  lightness: number;
  handleLightness: (value: number) => void;
  rgb: string;
};

export default function InputRange({
  id,
  lightness,
  handleLightness,
  rgb,
}: Props) {
  return (
    <div className="input-container">
      <label htmlFor="lightness" className="subtitle">
        {id}
      </label>
      <span className="relative">
        <input
          type="range"
          id={id}
          min="0"
          max="100"
          value={lightness}
          onChange={(e) => handleLightness(Number(e.target.value))}
          className="relative w-full bg-transparent appearance-none z-30"
        />
        <div
          className={`inline-block absolute top-2 left-0 w-full h-1`}
          style={{
            backgroundImage: `linear-gradient(90deg,rgb(0,0,0),${rgb},rgb(255,255,255))`,
          }}
        ></div>
      </span>
    </div>
  );
}
