"use client";

import { FaCopy } from "react-icons/fa";

export default function CopyButton({ text }: { text: string }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
  };
  return (
    <button type="button" onClick={handleCopy} className="absolute right-4 bottom-4 text-[--accents-5]">
      <FaCopy size={16} />
    </button>
  );
}
