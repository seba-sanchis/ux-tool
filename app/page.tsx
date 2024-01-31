"use client";

import { DndContext, DragEndEvent } from "@dnd-kit/core";

import {
  ChromaticPalette,
  ColorContrast,
  ColorConverter,
  MonochromaticPalette,
  Navbar,
  SortableItem,
  UiKit,
} from "@/components";
import {
  SortableContext,
  arrayMove,
  rectSwappingStrategy,
} from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function Home() {
  const [items, setItems] = useState(["1", "2", "3", "4", "5"]);
  const [isDragDisabled, setDragDisabled] = useState(true);
  const [palette, setPalette] = useState<{ hex: string; tone: number }[]>([
    { hex: "#F7F7F7", tone: 50 },
    { hex: "#F2F2F2", tone: 100 },
    { hex: "#E6E6E6", tone: 200 },
    { hex: "#D1D1D1", tone: 300 },
    { hex: "#B5B5B5", tone: 400 },
    { hex: "#999999", tone: 500 },
    { hex: "#808080", tone: 600 },
    { hex: "#696969", tone: 700 },
    { hex: "#595959", tone: 800 },
    { hex: "#4D4D4D", tone: 900 },
    { hex: "#292929", tone: 950 },
  ]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      const isDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(isDark);
    };

    // Run the check initially
    checkDarkMode();

    // Subscribe to changes in the dark mode preference
    const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQueryList.addEventListener("change", checkDarkMode);

    // Cleanup the event listener on component unmount
    return () => {
      mediaQueryList.removeEventListener("change", checkDarkMode);
    };
  }, []);

  function draggableComponents(item: string) {
    switch (item) {
      case "1":
        return <ColorConverter />;
      case "2":
        return <ColorContrast />;
      case "3":
        return (
          <MonochromaticPalette palette={palette} setPalette={setPalette} />
        );
      case "4":
        return <UiKit palette={palette} isDarkMode={isDarkMode} />;
      case "5":
        return <ChromaticPalette />;
      default:
        return null;
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id.toString());
        const newIndex = items.indexOf(over?.id.toString() ?? "");

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  const toggleDrag = () => {
    setDragDisabled((prev) => !prev);
  };

  const removeItem = (itemId: string) => {
    setItems((items) => items.filter((item) => item !== itemId));
  };

  return (
    <>
      <Navbar isDragDisabled={isDragDisabled} toggleDrag={toggleDrag} />
      <main className="max-w-screen-xl w-full min-h-full mt-20 mx-auto px-14 overflow-hidden">
        <DndContext onDragEnd={handleDragEnd}>
          <SortableContext items={items} strategy={rectSwappingStrategy}>
            <div className="grid grid-cols-3 gap-4">
              {items.map((item) => (
                <SortableItem key={item} id={item} disabled={isDragDisabled}>
                  {draggableComponents(item)}
                  <button
                    className={`absolute top-4 right-4 p-3.5 rounded-full button-outlined ${
                      isDragDisabled ? "hidden" : "inline-block"
                    }`}
                    onClick={() => removeItem(item)}
                  >
                    <FaTimes size={16} />
                  </button>
                </SortableItem>
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </main>
    </>
  );
}
