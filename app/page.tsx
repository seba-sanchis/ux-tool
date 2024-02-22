import ColorConverter from "@/components/ColorConverter";
import DesignSystem from "@/components/DesignSystem";
import { getCookie } from "@/lib/actions";


export default async function Home() {
  const component = await getCookie("component");

  return (
    <main className="flex justify-center w-full min-h-full px-4 overflow-hidden">
      <div className="flex flex-col items-center gap-2 max-w-screen-lg mt-16">
        <h1 className="title">Make your color</h1>
        <p className="subtitle">
          Enter any type of{" "}
          <strong className="text-[--accents-8] font-normal">
            CSS or Tailwind CSS
          </strong>{" "}
          color to create a custom color palette.
        </p>

        <ColorConverter />

        <DesignSystem component={component?.value} />
      </div>
    </main>
  );
}
