import React from "react";

type Tool = "select" | "draw" | "arrow" | "erase";

interface ToolbarProps {
  activeTool: Tool;
  onToolChange: (tool: Tool) => void;
  isOpen: boolean;
  toggleOpen: () => void;
}

const tools: { label: string; value: Tool }[] = [
  { label: "Select", value: "select" },
  { label: "Draw", value: "draw" },
  { label: "Arrow", value: "arrow" },
  { label: "Erase", value: "erase" },
];

const Toolbar: React.FC<ToolbarProps> = ({ activeTool, onToolChange, isOpen, toggleOpen }) => {
    return (
        <>
            {/* Toggle button */}
          <button
  className={`fixed top-1/2 left-0 transform -translate-y-1/2 p-0 bg-transparent rounded-none transition-all duration-300 z-50 ${
    isOpen ? "left-20" : "left-0"
  }`}
  onClick={toggleOpen}
  aria-label="Toggle toolbar"
  style={{
    width: 0,
    height: 0,
    borderTop: "20px solid transparent",    // doubled size (10px -> 20px)
    borderBottom: "20px solid transparent",
    borderRight: isOpen ? "20px solid #1F2937" : "none",  // invert triangles here
    borderLeft: isOpen ? "none" : "20px solid #1F2937",
  }}
></button>



      {/* Sidebar drawer */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white p-4 space-y-4 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-20 flex flex-col items-center`}
      >
        {tools.map(({ label, value }) => (
          <button
            key={value}
            className={`w-12 h-12 rounded ${
              activeTool === value ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"
            } focus:outline-none`}
            onClick={() => onToolChange(value)}
            title={label}
          >
            {label[0]}
          </button>
        ))}
      </div>
    </>
  );
};

export default Toolbar;
