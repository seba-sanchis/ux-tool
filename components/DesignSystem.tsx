"use client";

import { useState } from "react";
import CopyButton from "./CopyButton";
import { components, tabs } from "@/constants";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Component } from "@/types";

type Props = {
  palette: { hex: string; tone: number }[];
  isDarkMode: boolean;
};

export default function DesignSystem({ palette, isDarkMode }: Props) {
  const [activeItem, setActiveItem] = useState("Button");
  const [activeTab, setActiveTab] = useState("Preview");
  const [date, setDate] = useState<Date | undefined>(new Date());

  const handleItem = (item: string) => {
    setActiveItem(item);
  };

  const handleTab = (tab: string) => {
    setActiveTab(tab);
  };

  const component: Component | undefined = components.find(
    (component) => component.name === activeItem
  );

  return (
    <section className="section">
      <h2 className="section-title">Design System</h2>

      <div className="flex">
        <ul className="relative -left-4 flex flex-col">
          {components.map((item) => (
            <li
              key={item.name}
              className={`text-[--accents-6] px-4 py-2 rounded-lg cursor-pointer whitespace-nowrap ${
                activeItem === item.name
                  ? "text-[--foreground] bg-[--accents-2]"
                  : "hover:text-[--foreground] hover:bg-[--accents-1]"
              }`}
              onClick={() => handleItem(item.name)}
            >
              {item.name}
            </li>
          ))}
        </ul>

        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between pb-3">
            <div className="inline-flex items-center w-full border-b border-[--accents-2] bg-transparent">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  type="button"
                  className={`inline-flex items-center justify-center whitespace-nowrap py-1 text-sm relative border-b-2 px-4 pb-3 pt-2 ${
                    activeTab === tab.name
                      ? "border-b-[--foreground]"
                      : "text-[--accents-6] hover:text-[--foreground] border-b-transparent"
                  }`}
                  onClick={() => handleTab(tab.name)}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-center items-center p-10 w-full h-96 mt-2 rounded-lg border border-[--accents-2]">
            {activeTab === "Preview" && activeItem === "Button" ? (
              <Button>{component?.name}</Button>
            ) : activeTab === "Preview" && activeItem === "Calendar" ? (
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            ) : null}
            {activeTab === "Code" && (
              <div className="flex flex-col w-full h-full">
                <div className="flex justify-between items-center px-4 py-3 rounded-t-lg border border-[--accents-2] text-sm">
                  <span>{component?.path}</span>
                  <CopyButton text={component?.code} />
                </div>

                <pre className="p-4 overflow-x-auto rounded-b-lg border border-[--accents-2] bg-[--accents-2]">
                  <code className="flex max-w-lg text-sm">
                    {component?.code}
                  </code>
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

{
  /* <div className="flex justify-center gap-6">
            <div className="flex flex-col gap-2">
              <span className="section-subtitle text-center">Default</span>
              <button
                className="px-4 h-12 rounded-lg"
                style={{
                  backgroundColor: `${
                    palette && isDarkMode
                      ? palette[4]?.hex
                      : palette
                      ? palette[5]?.hex
                      : ""
                  }`,
                  color: `${
                    palette && isDarkMode ? palette[10]?.hex : "white"
                  }`,
                }}
              >
                Button
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <span className="section-subtitle text-center">Hover</span>
              <button
                className="px-4 h-12 rounded-lg"
                style={{
                  backgroundColor: `${
                    palette && isDarkMode
                      ? palette[3]?.hex
                      : palette
                      ? palette[6]?.hex
                      : ""
                  }`,
                  color: `${
                    palette && isDarkMode ? palette[10]?.hex : "white"
                  }`,
                }}
              >
                Button
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <span className="section-subtitle text-center">Active</span>
              <button
                className="px-4 h-12 rounded-lg"
                style={{
                  backgroundColor: `${
                    palette && isDarkMode
                      ? palette[5]?.hex
                      : palette
                      ? palette[7]?.hex
                      : ""
                  }`,
                  color: `${
                    palette && isDarkMode ? palette[10]?.hex : "white"
                  }`,
                }}
              >
                Button
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <span className="section-subtitle text-center">Disable</span>
              <button
                className="px-4 h-12 rounded-lg"
                style={{
                  backgroundColor: `${
                    palette && isDarkMode
                      ? palette[8]?.hex
                      : palette
                      ? palette[2]?.hex
                      : ""
                  }`,
                  color: `${
                    palette && isDarkMode
                      ? palette[1]?.hex
                      : palette
                      ? palette[7]?.hex
                      : ""
                  }`,
                }}
              >
                Button
              </button>
            </div>
          </div> */
}
