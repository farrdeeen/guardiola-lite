import React, { useEffect, useState } from "react";

type Tool = "select" | "draw" | "arrow" | "erase";

interface Player {
  id: number;
  label: string;
  color: string;
}

interface ToolbarProps {
  activeTool: Tool;
  onToolChange: (tool: Tool) => void;
  isOpen: boolean;
  toggleOpen: () => void;
  onAddPlayer: () => void;
  selectedPlayerId: number | null;
  onDeletePlayer: (id: number) => void;
  onChangeColor: (id: number, color: string) => void;
  onChangeLabel: (id: number, label: string) => void;
  players: Player[];
}

const tools: { label: string; value: Tool }[] = [
  { label: "Select", value: "select" },
  { label: "Draw", value: "draw" },
  { label: "Arrow", value: "arrow" },
  { label: "Erase", value: "erase" },
];

const Toolbar: React.FC<ToolbarProps> = ({
  activeTool,
  onToolChange,
  isOpen,
  toggleOpen,
  onAddPlayer,
  selectedPlayerId,
  onDeletePlayer,
  onChangeColor,
  onChangeLabel,
  players,
}) => {
  const [color, setColor] = useState<string>("");
  const [label, setLabel] = useState<string>("");

  useEffect(() => {
    if (selectedPlayerId !== null) {
      const player = players.find((p) => p.id === selectedPlayerId);
      if (player) {
        setColor(player.color);
        setLabel(player.label);
      } else {
        setColor("");
        setLabel("");
      }
    } else {
      setColor("");
      setLabel("");
    }
  }, [selectedPlayerId, players]);

  return (
    <>
      {/* Toggle button */}
      <button
        className="fixed top-1/2 transform -translate-y-1/2 p-0 bg-transparent z-50"
        onClick={toggleOpen}
        aria-label="Toggle toolbar"
        style={{
          left: isOpen ? "155px" : "0px",
          width: 0,
          height: 0,
          borderTop: "20px solid transparent",
          borderBottom: "20px solid transparent",
          borderLeft: isOpen ? "20px solid #1F2937" : "none",
          borderRight: isOpen ? "none" : "20px solid #1F2937",
          cursor: "pointer",
        }}
      ></button>

      {/* Toolbar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white p-4 space-y-4 transition-transform duration-300 ease-in-out w-40 flex flex-col items-center ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {tools.map(({ label, value }) => (
          <button
            key={value}
            className={`w-12 h-12 rounded ${activeTool === value ? "bg-blue-600" : "bg-gray-700 hover:bg-gray-600"}`}
            onClick={() => onToolChange(value)}
            title={label}
          >
            {label[0]}
          </button>
        ))}

        <button
          onClick={onAddPlayer}
          className="w-full bg-green-600 hover:bg-green-700 py-2 rounded text-white"
          title="Add Player"
        >
          + Player
        </button>

        {selectedPlayerId !== null && (
          <div className="mt-4 w-full">
            <p className="mb-2 font-semibold">Selected Player</p>
            <button
              className="w-full mb-2 bg-red-600 hover:bg-red-700 py-1 rounded text-white"
              onClick={() => onDeletePlayer(selectedPlayerId)}
            >
              Delete Player
            </button>

            <label className="block mb-1">Change Color:</label>
            <input
              type="color"
              value={color}
              onChange={(e) => {
                const newColor = e.target.value;
                setColor(newColor);
                onChangeColor(selectedPlayerId, newColor);
              }}
              className="w-full h-8 cursor-pointer rounded border-none mb-3"
            />

            <label className="block mb-1">Change Label:</label>
            <input
              type="text"
              value={label}
              onChange={(e) => {
                const newLabel = e.target.value;
                setLabel(newLabel);
                onChangeLabel(selectedPlayerId, newLabel);
              }}
              className="w-full p-1 rounded text-black text-center"
              placeholder="Enter label"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Toolbar;
