import { CopyButton } from ".";

type Props = {
  id: string;
  color: string;
  handleColor: (value: string) => void;
};

export default function InputText({ id, color, handleColor }: Props) {
  return (
    <div className="input-container">
      <label htmlFor={id} className="subtitle">
        {id}
      </label>
      <input
        id={id}
        type="text"
        value={color}
        onChange={(e) => handleColor(e.target.value)}
        className="input"
      />
      <CopyButton text={color} />
    </div>
  );
}
