"use client";

import { useState } from "react";
import CopyButton from "./CopyButton";
import { components, invoices, items, tabs } from "@/constants";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Component } from "@/types";
import Link from "next/link";

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

      <div className="flex gap-4">
        <ul className="-ml-4 flex flex-col gap-2 w-64">
          {components.map((item) => (
            <li
              key={item.name}
              className={`text-[--accents-6] px-4 py-2 rounded-lg cursor-pointer whitespace-nowrap ${
                activeItem === item.name
                  ? "text-[--foreground] bg-[--hover]"
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
            ) : activeTab === "Preview" && activeItem === "Input" ? (
              <div className="max-w-sm">
                <Input />
              </div>
            ) : activeTab === "Preview" && activeItem === "Navigation Menu" ? (
              <div className="relative bottom-32">
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>
                        Getting started
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                          <li className="row-span-3">
                            <NavigationMenuLink asChild>
                              <a
                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-[--color-200] to-[--color-300] p-6 no-underline outline-none focus:shadow-md"
                                href="/"
                              >
                                <div className="mb-2 mt-4 text-lg font-medium">
                                  shadcn/ui
                                </div>
                                <p className="text-sm leading-tight text-muted-foreground">
                                  Beautifully designed components that you can
                                  copy and paste into your apps. Accessible.
                                  Customizable. Open Source.
                                </p>
                              </a>
                            </NavigationMenuLink>
                          </li>
                          <Link
                            href="/docs"
                            title="Introduction"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[--color-200] hover:text-[--color-1000] focus:bg-[--color-500] focus:text-[--color-1000]"
                          >
                            Re-usable components built using Radix UI and
                            Tailwind CSS.
                          </Link>
                          <Link
                            href="/docs/installation"
                            title="Installation"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[--color-200] hover:text-[--color-1000] focus:bg-[--color-500] focus:text-[--color-1000]"
                          >
                            How to install dependencies and structure your app.
                          </Link>
                          <Link
                            href="/docs/primitives/typography"
                            title="Typography"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[--color-200] hover:text-[--color-1000] focus:bg-[--color-500] focus:text-[--color-1000]"
                          >
                            Styles for headings, paragraphs, lists...etc
                          </Link>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                          {items.map((item) => (
                            <Link
                              key={item.title}
                              title={item.title}
                              href={item.href}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-[--color-200] hover:text-[--color-1000] focus:bg-[--color-500] focus:text-[--color-1000]"
                            >
                              {item.description}
                            </Link>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <Link href="/docs" legacyBehavior passHref>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          Documentation
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            ) : activeTab === "Preview" && activeItem === "Pagination" ? (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            ) : activeTab === "Preview" && activeItem === "Table" ? (
              <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.invoice}>
                      <TableCell className="font-medium">
                        {invoice.invoice}
                      </TableCell>
                      <TableCell>{invoice.paymentStatus}</TableCell>
                      <TableCell>{invoice.paymentMethod}</TableCell>
                      <TableCell className="text-right">
                        {invoice.totalAmount}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">$2,500.00</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            ) : null}
            {activeTab === "Code" && (
              <div className="flex flex-col w-full h-full rounded-lg border border-[--accents-2]">
                <div className="flex justify-between items-center px-4 h-12 border-b border-[--accents-2] text-sm">
                  <span>{component?.path}</span>
                  <CopyButton text={component?.code} />
                </div>

                <pre className="p-4 overflow-x-auto bg-[--background]">
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
