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
      className={`relative block active:z-30 active:border-[--accents-3] active:bg-[--hover-color] cursor-grab active:cursor-grabbing ${
        disabled || isDragging ? "" : "jiggle"
      } ${id === "2" || id === "3" ? "col-span-2" : ""}`}
    >
      {children}
    </div>
  );
}
