"use client";

import { useEffect, useState } from "react";
import { FaAngleDown, FaCheck } from "react-icons/fa";

import { options } from "@/constants";
import CopyButton from "./CopyButton";

type Props = {
  code: { base: string; hex: string; hsl: string; oklch: string; rgb: string };
  setToggleAlert: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Alert({ code, setToggleAlert }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] =
    useState<keyof Props["code"]>("base");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setToggleAlert(false);
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleOptions = (option: string) => {
    if (Object.keys(code).includes(option)) {
      setSelectedOption(option as keyof Props["code"]);
      setIsOpen(false);
    }
  };

  function handleToggle(
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>
  ) {
    if (e.currentTarget === e.target) {
      setToggleAlert(false);
      setIsOpen(false);
    }
  }

  return (
    <div
      onClick={(e) => handleToggle(e)}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <div className="flex flex-col items-end gap-2 bg-[--background] px-6 pt-2 pb-6 w-full max-w-screen-md rounded-lg shadow-lg">
        <button
          onClick={(e) => handleToggle(e)}
          className="px-2 py-1 text-sm rounded-lg border border-[--accents-2] text-[--gray-900] hover:bg-[--gray-200]"
        >
          Esc
        </button>
        <div className="flex flex-col w-full h-full rounded-lg border border-[--accents-2]">
          <div className="flex justify-between items-center px-4 h-12 border-b border-[--accents-2] text-sm">
            <span>app/globals.css</span>
            <div className="flex gap-2">
              <div className="relative">
                <button
                  className="flex items-center gap-2 px-4 h-full text-[--gray-900] hover:bg-[--gray-200] rounded-lg"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {selectedOption}
                  <FaAngleDown />
                </button>
                {isOpen && (
                  <ul className="absolute -right-2 px-2 py-2 rounded-lg bg-[--background] shadow-lg">
                    {options.map((option) => (
                      <li
                        key={option}
                        onClick={() => handleOptions(option)}
                        className="flex items-center gap-4 px-4 py-1 text-[--gray-900] hover:bg-[--gray-200] rounded cursor-pointer"
                      >
                        <div className="w-3">
                          {selectedOption === option && <FaCheck size={12} />}
                        </div>
                        {option}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <CopyButton text={code[selectedOption]} />
            </div>
          </div>

          <pre className="p-4 overflow-x-auto bg-[--background]">
            <code className="flex max-w-lg text-sm">
              {code[selectedOption]}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}
