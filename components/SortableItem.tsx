import React, { ReactNode } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Props = {
  id: string;
  disabled: boolean;
  children: ReactNode;
};

export default function SortableItem({ id, disabled, children }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`relative block ${
        disabled
          ? "cursor-default"
          : isDragging
          ? "cursor-grabbing z-30 border-[--accents-3] bg-[--hover-color]"
          : "jiggle cursor-grab hover:border-[--accents-3] hover:bg-[--hover-color]"
      } ${id === "2" || id === "3" || id === "5" ? "col-span-2" : ""}`}
    >
      {children}
    </div>
  );
}
