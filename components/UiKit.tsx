type Props = {
  palette: { hex: string; tone: number }[];
  isDarkMode: boolean;
};

export default function UiKit({ palette, isDarkMode }: Props) {
  return (
    <div className="card">
      <h2 className="title">UI Kit</h2>
      <div className="flex flex-col gap-2">
        <h3 className="subtitle">Buttons - Solid</h3>
        <div className="grid grid-cols-4 gap-2">
          <span className="subtitle text-center">Default</span>
          <span className="subtitle text-center">Hover</span>
          <span className="subtitle text-center">Active</span>
          <span className="subtitle text-center">Disable</span>
          <button
            className="px-2 h-12 rounded-lg"
            style={{
              backgroundColor: `${
                palette && isDarkMode
                  ? palette[4]?.hex
                  : palette
                  ? palette[5]?.hex
                  : ""
              }`,
              color: `${palette && isDarkMode ? palette[10]?.hex : "white"}`,
            }}
          >
            Button
          </button>
          <button
            className="px-2 h-12 rounded-lg"
            style={{
              backgroundColor: `${
                palette && isDarkMode
                  ? palette[3]?.hex
                  : palette
                  ? palette[6]?.hex
                  : ""
              }`,
              color: `${palette && isDarkMode ? palette[10]?.hex : "white"}`,
            }}
          >
            Button
          </button>
          <button
            className="px-2 h-12 rounded-lg"
            style={{
              backgroundColor: `${
                palette && isDarkMode
                  ? palette[5]?.hex
                  : palette
                  ? palette[7]?.hex
                  : ""
              }`,
              color: `${palette && isDarkMode ? palette[10]?.hex : "white"}`,
            }}
          >
            Button
          </button>
          <button
            className="px-2 h-12 rounded-lg"
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

        <h3 className="subtitle mt-3">Buttons - Outlined</h3>
        <div className="grid grid-cols-4 gap-2">
          <span className="subtitle text-center">Default</span>
          <span className="subtitle text-center">Hover</span>
          <span className="subtitle text-center">Active</span>
          <span className="subtitle text-center">Disable</span>
          <button
            className="px-2 h-12 rounded-lg border"
            style={{
              borderColor: `${
                palette && isDarkMode
                  ? palette[3]?.hex
                  : palette
                  ? palette[7]?.hex
                  : ""
              }`,
              color: `${
                palette && isDarkMode
                  ? palette[3]?.hex
                  : palette
                  ? palette[7]?.hex
                  : ""
              }`,
            }}
          >
            Button
          </button>
          <button
            className="px-2 h-12 rounded-lg border"
            style={{
              backgroundColor: `${
                palette && isDarkMode
                  ? palette[10]?.hex
                  : palette
                  ? palette[0]?.hex
                  : ""
              }`,
              borderColor: `${
                palette && isDarkMode
                  ? palette[3]?.hex
                  : palette
                  ? palette[7]?.hex
                  : ""
              }`,
              color: `${
                palette && isDarkMode
                  ? palette[3]?.hex
                  : palette
                  ? palette[7]?.hex
                  : ""
              }`,
            }}
          >
            Button
          </button>
          <button
            className="px-2 h-12 rounded-lg border"
            style={{
              backgroundColor: `${
                palette && isDarkMode
                  ? palette[9]?.hex
                  : palette
                  ? palette[1]?.hex
                  : ""
              }`,
              borderColor: `${
                palette && isDarkMode
                  ? palette[3]?.hex
                  : palette
                  ? palette[7]?.hex
                  : ""
              }`,
              color: `${
                palette && isDarkMode
                  ? palette[3]?.hex
                  : palette
                  ? palette[7]?.hex
                  : ""
              }`,
            }}
          >
            Button
          </button>
          <button
            className="px-2 h-12 rounded-lg border opacity-50"
            style={{
              borderColor: `${
                palette && isDarkMode
                  ? palette[3]?.hex
                  : palette
                  ? palette[7]?.hex
                  : ""
              }`,
              color: `${
                palette && isDarkMode
                  ? palette[3]?.hex
                  : palette
                  ? palette[7]?.hex
                  : ""
              }`,
            }}
          >
            Button
          </button>
        </div>
      </div>
    </div>
  );
}
