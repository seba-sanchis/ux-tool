export default function InputRange({
  id,
  lightness,
  handleLightness,
  rgb,
}: {
  id: string;
  lightness: number;
  handleLightness: (value: number) => void;
  rgb: string;
}) {
  return (
    <div className="input-container">
      <label htmlFor="lightness" className="subtitle">
        {id}
      </label>
      <span>
        <input
          type="range"
          id={id}
          min="0"
          max="100"
          value={lightness}
          onChange={(e) => handleLightness(Number(e.target.value))}
          className="relative w-full bg-transparent appearance-none z-30"
        />
        <span
          className={`inline-block relative bottom-[31px] w-full h-1`}
          style={{
            backgroundImage: `linear-gradient(90deg,rgb(0,0,0),${rgb},rgb(255,255,255))`,
          }}
        ></span>
      </span>
    </div>
  );
}
