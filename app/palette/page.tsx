import ChromaticPalette from "@/components/ChromaticPalette";

export default function Page() {
  return (
    <div className="flex justify-center w-full min-h-full px-4 overflow-hidden">
      <div className="flex flex-col items-center gap-2 max-w-screen-lg mt-16">
        <h1 className="title">Chose your palette</h1>
        <p className="subtitle">
          Browse the colors that{" "}
          <strong className="text-[--accents-8] font-normal">best suit</strong>{" "}
          your project.
        </p>
        <ChromaticPalette />
      </div>
    </div>
  );
}
