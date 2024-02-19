import ColorContrast from "@/components/ColorContrast";

export default function Page() {
  return (
    <div className="flex flex-col items-center gap-2 max-w-screen-xl w-full min-h-full mt-20 mx-auto px-14 overflow-hidden">
      <h1 className="title">Check your contrast</h1>
      <p className="subtitle">
        Calculate the contrast ratio of{" "}
        <strong className="text-[--accents-8] font-normal">
          foreground and background
        </strong>{" "}
        colors.
      </p>
      <ColorContrast />
    </div>
  );
}
