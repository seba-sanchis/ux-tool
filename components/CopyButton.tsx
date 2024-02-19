"use client";

import { FaCopy } from "react-icons/fa";

type Props = { text: string | undefined };

export default function CopyButton({ text }: Props) {
  const handleCopy = () => {
    if (text) {
      navigator.clipboard.writeText(text);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="text-[--accents-5] active:text-[--gray-1000]"
    >
      <FaCopy size={16} />
    </button>
  );
}
