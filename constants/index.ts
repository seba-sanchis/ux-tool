export const components = [
  {
    name: "Button",
    path: "components/ui/button.tsx",
    code: `import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-[--background] bg-[--color-500] hover:bg-[--color-600] active:bg-[--color-700] disabled:text-[--color-700] disabled:bg-[--color-200]",
  {
    variants: {
      variant: {
        default:
          "text-[--background] bg-[--color-500] hover:bg-[--color-600] active:bg-[--color-700] disabled:text-[--color-700] disabled:bg-[--color-200]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2 rounded-lg",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
    `,
  },
  {
    name: "Calendar",
    path: "components/ui/calendar.tsx",
    code: `import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: "h-9 w-9 p-0 font-normal rounded-lg hover:bg-[--color-100]",
        day_range_end: "day-range-end",
        day_selected:
          "focus:bg-[--color-500] focus:text-[--background]",
        day_today: "bg-[--color-100] text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
    `,
  },
  {
    name: "Input",
    path: "components/ui/input.tsx",
    code: `import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-500] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-[--foreground] caret-[--color-700]",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
    `,
  },
  {
    name: "Navigation Menu",
    path: "components/ui/navigation-menu.tsx",
    code: `import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn(
      "relative z-10 flex max-w-max flex-1 items-center justify-center",
      className
    )}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      "group flex flex-1 list-none items-center justify-center space-x-1",
      className
    )}
    {...props}
  />
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-[--background] px-4 py-2 text-sm font-medium transition-colors hover:bg-[--color-600] hover:text-[--color-100] focus:bg-[--color-600] focus:text-[--color-100] focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-[--color-500] data-[state=open]:bg-[--color-500]"
);

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), "group", className)}
    {...props}
  >
    {children}{" "}
    <ChevronDown
      className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
));
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      "left-0 top-0 w-full transform-gpu data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto ",
      className
    )}
    {...props}
  />
));
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const NavigationMenuLink = NavigationMenuPrimitive.Link;

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className={cn("absolute left-0 top-full flex justify-center")}>
    <NavigationMenuPrimitive.Viewport
      className={cn(
        "origin-top-center relative mt-1.5 h-[--radix-navigation-menu-viewport-height] w-full overflow-hidden rounded-md border bg-[--background] text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[--radix-navigation-menu-viewport-width]",
        className
      )}
      ref={ref}
      {...props}
    />
  </div>
));
NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName;

const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
      className
    )}
    {...props}
  >
    <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
  </NavigationMenuPrimitive.Indicator>
));
NavigationMenuIndicator.displayName =
  NavigationMenuPrimitive.Indicator.displayName;

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
};
    `,
  },
  {
    name: "Pagination",
    path: "components/ui/pagination.tsx",
    code: `import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "@/components/ui/button";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">;

const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      className
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn("gap-1 pl-2.5", className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn("gap-1 pr-2.5", className)}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
    `,
  },
  {
    name: "Table",
    path: "components/ui/table.tsx",
    code: `import * as React from "react";
import { cn } from "@/lib/utils";

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
));
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t border-[--color-700] bg-[--color-100] font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b border-[--color-500] transition-colors hover:bg-[--color-200] data-[state=selected]:bg-[--color-100]",
      className
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-[--color-700] [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
));
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-[--color-700]", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
    `,
  },
];

export const features = [
  { name: "Design", url: "/" },
  { name: "Accessibility", url: "/accessibility" },
  { name: "Palette", url: "/palette" },
];

export const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
];

export const items: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "#",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "#",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "#",
    description:
      "Displays an indicator showing the completion progress of a task.",
  },
  {
    title: "Scroll-area",
    href: "#",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "#",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "#",
    description: "A popup that displays information related to an element.",
  },
];

export const options = ["hex"];

export const palette = [
  { tone: "slate-50", hex: "#f8fafc" },
  { tone: "slate-100", hex: "#f1f5f9" },
  { tone: "slate-200", hex: "#e2e8f0" },
  { tone: "slate-300", hex: "#cbd5e1" },
  { tone: "slate-400", hex: "#94a3b8" },
  { tone: "slate-500", hex: "#64748b" },
  { tone: "slate-600", hex: "#475569" },
  { tone: "slate-700", hex: "#334155" },
  { tone: "slate-800", hex: "#1e293b" },
  { tone: "slate-900", hex: "#0f172a" },
  { tone: "slate-950", hex: "#020617" },

  { tone: "gray-50", hex: "#f9fafb" },
  { tone: "gray-100", hex: "#f3f4f6" },
  { tone: "gray-200", hex: "#e5e7eb" },
  { tone: "gray-300", hex: "#d1d5db" },
  { tone: "gray-400", hex: "#9ca3af" },
  { tone: "gray-500", hex: "#6b7280" },
  { tone: "gray-600", hex: "#4b5563" },
  { tone: "gray-700", hex: "#374151" },
  { tone: "gray-800", hex: "#1f2937" },
  { tone: "gray-900", hex: "#111827" },
  { tone: "gray-950", hex: "#030712" },

  { tone: "zinc-50", hex: "#fafafa" },
  { tone: "zinc-100", hex: "#f4f4f5" },
  { tone: "zinc-200", hex: "#e4e4e7" },
  { tone: "zinc-300", hex: "#d4d4d8" },
  { tone: "zinc-400", hex: "#a1a1aa" },
  { tone: "zinc-500", hex: "#71717a" },
  { tone: "zinc-600", hex: "#52525b" },
  { tone: "zinc-700", hex: "#3f3f46" },
  { tone: "zinc-800", hex: "#27272a" },
  { tone: "zinc-900", hex: "#18181b" },
  { tone: "zinc-950", hex: "#09090b" },

  { tone: "neutral-50", hex: "#fafafa" },
  { tone: "neutral-100", hex: "#f5f5f5" },
  { tone: "neutral-200", hex: "#e5e5e5" },
  { tone: "neutral-300", hex: "#d4d4d4" },
  { tone: "neutral-400", hex: "#a3a3a3" },
  { tone: "neutral-500", hex: "#737373" },
  { tone: "neutral-600", hex: "#525252" },
  { tone: "neutral-700", hex: "#404040" },
  { tone: "neutral-800", hex: "#262626" },
  { tone: "neutral-900", hex: "#171717" },
  { tone: "neutral-950", hex: "#0a0a0a" },

  { tone: "stone-50", hex: "#fafaf9" },
  { tone: "stone-100", hex: "#f5f5f4" },
  { tone: "stone-200", hex: "#e7e5e4" },
  { tone: "stone-300", hex: "#d6d3d1" },
  { tone: "stone-400", hex: "#a8a29e" },
  { tone: "stone-500", hex: "#78716c" },
  { tone: "stone-600", hex: "#57534e" },
  { tone: "stone-700", hex: "#44403c" },
  { tone: "stone-800", hex: "#292524" },
  { tone: "stone-900", hex: "#1c1917" },
  { tone: "stone-950", hex: "#0c0a09" },

  { tone: "red-50", hex: "#fef2f2" },
  { tone: "red-100", hex: "#fee2e2" },
  { tone: "red-200", hex: "#fecaca" },
  { tone: "red-300", hex: "#fca5a5" },
  { tone: "red-400", hex: "#f87171" },
  { tone: "red-500", hex: "#ef4444" },
  { tone: "red-600", hex: "#dc2626" },
  { tone: "red-700", hex: "#b91c1c" },
  { tone: "red-800", hex: "#991b1b" },
  { tone: "red-900", hex: "#7f1d1d" },
  { tone: "red-950", hex: "#450a0a" },

  { tone: "orange-50", hex: "#fff7ed" },
  { tone: "orange-100", hex: "#ffedd5" },
  { tone: "orange-200", hex: "#fed7aa" },
  { tone: "orange-300", hex: "#fdba74" },
  { tone: "orange-400", hex: "#fb923c" },
  { tone: "orange-500", hex: "#f97316" },
  { tone: "orange-600", hex: "#ea580c" },
  { tone: "orange-700", hex: "#c2410c" },
  { tone: "orange-800", hex: "#9a3412" },
  { tone: "orange-900", hex: "#7c2d12" },
  { tone: "orange-950", hex: "#431407" },

  { tone: "amber-50", hex: "#fffbeb" },
  { tone: "amber-100", hex: "#fef3c7" },
  { tone: "amber-200", hex: "#fde68a" },
  { tone: "amber-300", hex: "#fcd34d" },
  { tone: "amber-400", hex: "#fbbf24" },
  { tone: "amber-500", hex: "#f59e0b" },
  { tone: "amber-600", hex: "#d97706" },
  { tone: "amber-700", hex: "#b45309" },
  { tone: "amber-800", hex: "#92400e" },
  { tone: "amber-900", hex: "#78350f" },
  { tone: "amber-950", hex: "#451a03" },

  { tone: "yellow-50", hex: "#fefce8" },
  { tone: "yellow-100", hex: "#fef9c3" },
  { tone: "yellow-200", hex: "#fef08a" },
  { tone: "yellow-300", hex: "#fde047" },
  { tone: "yellow-400", hex: "#facc15" },
  { tone: "yellow-500", hex: "#eab308" },
  { tone: "yellow-600", hex: "#ca8a04" },
  { tone: "yellow-700", hex: "#a16207" },
  { tone: "yellow-800", hex: "#854d0e" },
  { tone: "yellow-900", hex: "#713f12" },
  { tone: "yellow-950", hex: "#422006" },

  { tone: "lime-50", hex: "#f7fee7" },
  { tone: "lime-100", hex: "#ecfccb" },
  { tone: "lime-200", hex: "#d9f99d" },
  { tone: "lime-300", hex: "#bef264" },
  { tone: "lime-400", hex: "#a3e635" },
  { tone: "lime-500", hex: "#84cc16" },
  { tone: "lime-600", hex: "#65a30d" },
  { tone: "lime-700", hex: "#4d7c0f" },
  { tone: "lime-800", hex: "#3f6212" },
  { tone: "lime-900", hex: "#365314" },
  { tone: "lime-950", hex: "#1a2e05" },

  { tone: "green-50", hex: "#f0fdf4" },
  { tone: "green-100", hex: "#dcfce7" },
  { tone: "green-200", hex: "#bbf7d0" },
  { tone: "green-300", hex: "#86efac" },
  { tone: "green-400", hex: "#4ade80" },
  { tone: "green-500", hex: "#22c55e" },
  { tone: "green-600", hex: "#16a34a" },
  { tone: "green-700", hex: "#15803d" },
  { tone: "green-800", hex: "#166534" },
  { tone: "green-900", hex: "#14532d" },
  { tone: "green-950", hex: "#052e16" },

  { tone: "emerald-50", hex: "#ecfdf5" },
  { tone: "emerald-100", hex: "#d1fae5" },
  { tone: "emerald-200", hex: "#a7f3d0" },
  { tone: "emerald-300", hex: "#6ee7b7" },
  { tone: "emerald-400", hex: "#34d399" },
  { tone: "emerald-500", hex: "#10b981" },
  { tone: "emerald-600", hex: "#059669" },
  { tone: "emerald-700", hex: "#047857" },
  { tone: "emerald-800", hex: "#065f46" },
  { tone: "emerald-900", hex: "#064e3b" },
  { tone: "emerald-950", hex: "#022c22" },

  { tone: "teal-50", hex: "#f0fdfa" },
  { tone: "teal-100", hex: "#ccfbf1" },
  { tone: "teal-200", hex: "#99f6e4" },
  { tone: "teal-300", hex: "#5eead4" },
  { tone: "teal-400", hex: "#2dd4bf" },
  { tone: "teal-500", hex: "#14b8a6" },
  { tone: "teal-600", hex: "#0d9488" },
  { tone: "teal-700", hex: "#0f766e" },
  { tone: "teal-800", hex: "#115e59" },
  { tone: "teal-900", hex: "#134e4a" },
  { tone: "teal-950", hex: "#042f2e" },

  { tone: "cyan-50", hex: "#ecfeff" },
  { tone: "cyan-100", hex: "#cffafe" },
  { tone: "cyan-200", hex: "#a5f3fc" },
  { tone: "cyan-300", hex: "#67e8f9" },
  { tone: "cyan-400", hex: "#22d3ee" },
  { tone: "cyan-500", hex: "#06b6d4" },
  { tone: "cyan-600", hex: "#0891b2" },
  { tone: "cyan-700", hex: "#0e7490" },
  { tone: "cyan-800", hex: "#155e75" },
  { tone: "cyan-900", hex: "#164e63" },
  { tone: "cyan-950", hex: "#083344" },

  { tone: "sky-50", hex: "#f0f9ff" },
  { tone: "sky-100", hex: "#e0f2fe" },
  { tone: "sky-200", hex: "#bae6fd" },
  { tone: "sky-300", hex: "#7dd3fc" },
  { tone: "sky-400", hex: "#38bdf8" },
  { tone: "sky-500", hex: "#0ea5e9" },
  { tone: "sky-600", hex: "#0284c7" },
  { tone: "sky-700", hex: "#0369a1" },
  { tone: "sky-800", hex: "#075985" },
  { tone: "sky-900", hex: "#0c4a6e" },
  { tone: "sky-950", hex: "#082f49" },

  { tone: "blue-50", hex: "#eff6ff" },
  { tone: "blue-100", hex: "#dbeafe" },
  { tone: "blue-200", hex: "#bfdbfe" },
  { tone: "blue-300", hex: "#93c5fd" },
  { tone: "blue-400", hex: "#60a5fa" },
  { tone: "blue-500", hex: "#3b82f6" },
  { tone: "blue-600", hex: "#2563eb" },
  { tone: "blue-700", hex: "#1d4ed8" },
  { tone: "blue-800", hex: "#1e40af" },
  { tone: "blue-900", hex: "#1e3a8a" },
  { tone: "blue-950", hex: "#172554" },

  { tone: "indigo-50", hex: "#eef2ff" },
  { tone: "indigo-100", hex: "#e0e7ff" },
  { tone: "indigo-200", hex: "#c7d2fe" },
  { tone: "indigo-300", hex: "#a5b4fc" },
  { tone: "indigo-400", hex: "#818cf8" },
  { tone: "indigo-500", hex: "#6366f1" },
  { tone: "indigo-600", hex: "#4f46e5" },
  { tone: "indigo-700", hex: "#4338ca" },
  { tone: "indigo-800", hex: "#3730a3" },
  { tone: "indigo-900", hex: "#312e81" },
  { tone: "indigo-950", hex: "#1e1b4b" },

  { tone: "violet-50", hex: "#f5f3ff" },
  { tone: "violet-100", hex: "#ede9fe" },
  { tone: "violet-200", hex: "#ddd6fe" },
  { tone: "violet-300", hex: "#c4b5fd" },
  { tone: "violet-400", hex: "#a78bfa" },
  { tone: "violet-500", hex: "#8b5cf6" },
  { tone: "violet-600", hex: "#7c3aed" },
  { tone: "violet-700", hex: "#6d28d9" },
  { tone: "violet-800", hex: "#5b21b6" },
  { tone: "violet-900", hex: "#4c1d95" },
  { tone: "violet-950", hex: "#2e1065" },

  { tone: "purple-50", hex: "#faf5ff" },
  { tone: "purple-100", hex: "#f3e8ff" },
  { tone: "purple-200", hex: "#e9d5ff" },
  { tone: "purple-300", hex: "#d8b4fe" },
  { tone: "purple-400", hex: "#c084fc" },
  { tone: "purple-500", hex: "#a855f7" },
  { tone: "purple-600", hex: "#9333ea" },
  { tone: "purple-700", hex: "#7e22ce" },
  { tone: "purple-800", hex: "#6b21a8" },
  { tone: "purple-900", hex: "#581c87" },
  { tone: "purple-950", hex: "#3b0764" },

  { tone: "fuchsia-50", hex: "#fdf4ff" },
  { tone: "fuchsia-100", hex: "#fae8ff" },
  { tone: "fuchsia-200", hex: "#f5d0fe" },
  { tone: "fuchsia-300", hex: "#f0abfc" },
  { tone: "fuchsia-400", hex: "#e879f9" },
  { tone: "fuchsia-500", hex: "#d946ef" },
  { tone: "fuchsia-600", hex: "#c026d3" },
  { tone: "fuchsia-700", hex: "#a21caf" },
  { tone: "fuchsia-800", hex: "#86198f" },
  { tone: "fuchsia-900", hex: "#701a75" },
  { tone: "fuchsia-950", hex: "#4a044e" },

  { tone: "pink-50", hex: "#fdf2f8" },
  { tone: "pink-100", hex: "#fce7f3" },
  { tone: "pink-200", hex: "#fbcfe8" },
  { tone: "pink-300", hex: "#f9a8d4" },
  { tone: "pink-400", hex: "#f472b6" },
  { tone: "pink-500", hex: "#ec4899" },
  { tone: "pink-600", hex: "#db2777" },
  { tone: "pink-700", hex: "#be185d" },
  { tone: "pink-800", hex: "#9d174d" },
  { tone: "pink-900", hex: "#831843" },
  { tone: "pink-950", hex: "#500724" },

  { tone: "rose-50", hex: "#fff1f2" },
  { tone: "rose-100", hex: "#ffe4e6" },
  { tone: "rose-200", hex: "#fecdd3" },
  { tone: "rose-300", hex: "#fda4af" },
  { tone: "rose-400", hex: "#fb7185" },
  { tone: "rose-500", hex: "#f43f5e" },
  { tone: "rose-600", hex: "#e11d48" },
  { tone: "rose-700", hex: "#be123c" },
  { tone: "rose-800", hex: "#9f1239" },
  { tone: "rose-900", hex: "#881337" },
  { tone: "rose-950", hex: "#4c0519" },
];

export const tabs = [{ name: "Preview" }, { name: "Code" }];

export const tones = [
  { name: "Slate", hex: "#64748b" },
  { name: "Gray", hex: "#6b7280" },
  { name: "Zinc", hex: "#71717a" },
  { name: "Neutral", hex: "#737373" },
  { name: "Red", hex: "#ef4444" },
  { name: "Orange", hex: "#f97316" },
  { name: "Amber", hex: "#f59e0b" },
  { name: "Yellow", hex: "#eab308" },
  { name: "Lime", hex: "#84cc16" },
  { name: "Green", hex: "#22c55e" },
  { name: "Emerald", hex: "#10b981" },
  { name: "Teal", hex: "#14b8a6" },
  { name: "Cyan", hex: "#06b6d4" },
  { name: "Sky", hex: "#0ea5e9" },
  { name: "Blue", hex: "#3b82f6" },
  { name: "Indigo", hex: "#6366f1" },
  { name: "Violet", hex: "#8b5cf6" },
  { name: "Purple", hex: "#a855f7" },
  { name: "Fuchsia", hex: "#d946ef" },
  { name: "Pink", hex: "#ec4899" },
  { name: "Rose", hex: "#f43f5e" },
];
