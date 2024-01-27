"use client";

type Props = {
  isDragDisabled: boolean;
  toggleDrag: () => void;
};

export default function Navbar({ isDragDisabled, toggleDrag }: Props) {
  return (
    <nav className="flex justify-center sticky top-0 bg-[--nav-background] shadow-[inset_0_-1px_0_0_var(--accents-2)] z-50">
      <div className="flex justify-between items-center max-w-screen-xl w-full h-16 px-14">
        <div>UX Tools</div>
        <button onClick={toggleDrag} className="button max-h-8 text-sm">
          {isDragDisabled ? "Customise" : "Done"}
        </button>
      </div>
    </nav>
  );
}
