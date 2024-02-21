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
      className="flex justify-center items-center text-[--gray-900] hover:bg-[--gray-200] rounded-lg w-8 h-8"
    >
      <FaCopy size={16} />
    </button>
  );
}
