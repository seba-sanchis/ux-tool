"use client";

import { DndContext, DragEndEvent } from "@dnd-kit/core";

import {
  ApiFetch,
  ColorContrast,
  ColorPalette,
  ColorPicker,
  Navbar,
  SortableItem,
} from "@/components";
import {
  SortableContext,
  arrayMove,
  rectSwappingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function Home() {
  const [items, setItems] = useState(["1", "2", "3", "4"]);
  const [isDragDisabled, setDragDisabled] = useState(true);

  function draggableComponents(item: string) {
    switch (item) {
      case "1":
        return <ColorPicker />;
      case "2":
        return <ColorContrast />;
      case "3":
        return <ColorPalette />;
      case "4":
        return <ApiFetch />;
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
                      isDragDisabled ? "hidden" : "block"
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
