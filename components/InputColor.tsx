export default function InputColor({
  id,
  color,
  handleColor,
}: {
  id: string;
  color: string;
  handleColor: (value: string) => void;
}) {
  return (
    <div className="input-container">
      <label htmlFor="picker" className="subtitle sr-only">
        {id}
      </label>
      <input
        id={id}
        type="color"
        value={color}
        onChange={(e) => handleColor(e.target.value)}
        className="picker"
      />
    </div>
  );
}
