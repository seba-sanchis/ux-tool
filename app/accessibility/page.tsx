import ColorContrast from "@/components/ColorContrast";

export default function Page() {
  return (
    <div className="flex justify-center w-full min-h-full px-4 overflow-hidden">
      <div className="flex flex-col items-center gap-2 max-w-screen-lg mt-16">
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
    </div>
  );
}
