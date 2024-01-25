import { ApiFetch, ColorContrast, ColorPicker } from "@/components";

export default function Home() {
  return (
    <main className="max-w-screen-xl min-h-full w-full mt-20 mx-auto px-14 overflow-hidden">
      <div className="grid grid-cols-3 gap-4">
        <ColorPicker />

        <ColorContrast />
        <ApiFetch />
      </div>
    </main>
  );
}
