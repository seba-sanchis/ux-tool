import ColorConverter from "@/components/ColorConverter";
import MonochromaticPalette from "@/components/MonochromaticPalette";
import DesignSystem from "@/components/DesignSystem";
import { getCookie } from "@/lib/actions";

export default async function Home() {
  const alert = await getCookie("alert");

  const color = await getCookie("color");

  const component = await getCookie("component");

  return (
    <main className="flex flex-col items-center gap-2 max-w-screen-xl w-full min-h-full mt-20 mx-auto px-14 overflow-hidden">
      <h1 className="title">Make your color</h1>
      <p className="subtitle">
        Enter any type of{" "}
        <strong className="text-[--accents-8] font-normal">
          CSS or Tailwind CSS
        </strong>{" "}
        color to create a custom color palette.
      </p>

      <ColorConverter color={color?.value} />

      <MonochromaticPalette alert={alert?.value} color={color?.value} />

      <DesignSystem component={component?.value} />
    </main>
  );
}
