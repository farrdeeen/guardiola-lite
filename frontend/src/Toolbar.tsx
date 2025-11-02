import React, { useEffect, useState } from "react";
import { getHexColor } from "./colorUtils";  // Import utility

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
  players,
}) => {
  const [color, setColor] = useState<string>("");

  useEffect(() => {
    if (selectedPlayerId !== null) {
      const player = players.find((p) => p.id === selectedPlayerId);
      if (player) setColor(player.color);
      else setColor("");
    } else {
      setColor("");
    }
  }, [selectedPlayerId, players]);

  return (
    <>
      <button
        className={`fixed top-1/2 left-0 transform -translate-y-1/2 p-0 bg-transparent rounded-none transition-all duration-300 z-50 ${
          isOpen ? "left-20" : "left-0"
        }`}
        onClick={toggleOpen}
        aria-label="Toggle toolbar"
        style={{
          width: 0,
          height: 0,
          borderTop: "20px solid transparent",
          borderBottom: "20px solid transparent",
          borderRight: isOpen ? "20px solid #1F2937" : "none",
          borderLeft: isOpen ? "none" : "20px solid #1F2937",
        }}
      ></button>

      <div
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white p-4 space-y-4 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-40 flex flex-col items-center`}
      >
        {tools.map(({ label, value }) => (
          <button
            key={value}
            className={`w-12 h-12 rounded ${
              activeTool === value
                ? "bg-blue-600"
                : "bg-gray-700 hover:bg-gray-600"
            } focus:outline-none`}
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
                console.log("Current color input value:", newColor);
              }}
              className="w-full h-8 cursor-pointer rounded border-none"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Toolbar;
