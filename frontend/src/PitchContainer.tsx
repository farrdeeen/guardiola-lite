import React, { useState } from "react";
import Pitch from "./Pitch";

interface Player {
  id: number;
  x: number;
  y: number;
  color: string;
  label: string;
}

interface PitchContainerProps {
  setPlayers: (id: number, x: number, y: number) => void;
  players?: Player[];
  activeTool: "select" | "draw" | "arrow" | "erase";
  selectedPlayerId: number | null;
  onSelectPlayer: (id: number) => void;
}

const PitchContainer: React.FC<PitchContainerProps> = ({
  setPlayers,
  players: externalPlayers,
  activeTool,
  selectedPlayerId,
  onSelectPlayer,
}) => {
  const [players, setLocalPlayers] = useState<Player[]>(() => {
    if (externalPlayers && externalPlayers.length > 0) return externalPlayers;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const margin = 20;
    const pitchWidth = width - margin * 2;
    const pitchHeight = height - margin * 5;

    const leftTeamColor = "#b91c1c"; // red
    const rightTeamColor = "#1d4ed8"; // blue

    const leftSideX = (fraction: number) => margin + pitchWidth * fraction;
    const rightSideX = (fraction: number) => margin + pitchWidth * (1 - fraction);

    const makePlayer = (id: number, x: number, y: number, color: string, label: string) => ({
      id,
      x,
      y,
      color,
      label,
    });

    // Left team 4-3-3 formation
     const leftTeam: Player[] = [
      // GK
      makePlayer(1, leftSideX(0.05), pitchHeight / 2, leftTeamColor, "1"),
      // DEF (4)
      makePlayer(2, leftSideX(0.2), pitchHeight * 0.15, leftTeamColor, "2"),
      makePlayer(3, leftSideX(0.2), pitchHeight * 0.35, leftTeamColor, "3"),
      makePlayer(4, leftSideX(0.2), pitchHeight * 0.65, leftTeamColor, "44"),
      makePlayer(5, leftSideX(0.2), pitchHeight * 0.85, leftTeamColor, "5"),
      // MID (3)
      makePlayer(6, leftSideX(0.45), pitchHeight * 0.3, leftTeamColor, "6"),
      makePlayer(7, leftSideX(0.45), pitchHeight * 0.5, leftTeamColor, "7"),
      makePlayer(8, leftSideX(0.45), pitchHeight * 0.7, leftTeamColor, "8"),
      // FWD (3)
      makePlayer(9, leftSideX(0.7), pitchHeight * 0.25, leftTeamColor, "9"),
      makePlayer(10, leftSideX(0.), pitchHeight * 0.5, leftTeamColor, "10"),
      makePlayer(11, leftSideX(0.7), pitchHeight * 0.75, leftTeamColor, "11"),
    ];

    // True 4-3-3 formation - Right team
    const rightTeam: Player[] = [
      // GK
      makePlayer(12, rightSideX(0.05), pitchHeight / 2, rightTeamColor, "1"),
      // DEF (4)
      makePlayer(13, rightSideX(0.2), pitchHeight * 0.2, rightTeamColor, "2"),
      makePlayer(14, rightSideX(0.2), pitchHeight * 0.35, rightTeamColor, "3"),
      makePlayer(15, rightSideX(0.2), pitchHeight * 0.65, rightTeamColor, "4"),
      makePlayer(16, rightSideX(0.2), pitchHeight * 0.85, rightTeamColor, "5"),
      // MID (3)
      makePlayer(17, rightSideX(0.45), pitchHeight * 0.3, rightTeamColor, "6"),
      makePlayer(18, rightSideX(0.45), pitchHeight * 0.5, rightTeamColor, "7"),
      makePlayer(19, rightSideX(0.45), pitchHeight * 0.7, rightTeamColor, "8"),
      // FWD (3)
      makePlayer(20, rightSideX(0.7), pitchHeight * 0.25, rightTeamColor, "9"),
      makePlayer(21, rightSideX(0.7), pitchHeight * 0.5, rightTeamColor, "10"),
      makePlayer(22, rightSideX(0.7), pitchHeight * 0.75, rightTeamColor, "11"),
    ];


    return [...leftTeam, ...rightTeam];
  });

  const handleSetPlayers = (id: number, x: number, y: number) => {
    if (setPlayers) {
      setPlayers(id, x, y);
    } else {
      setLocalPlayers((prev) => prev.map((p) => (p.id === id ? { ...p, x, y } : p)));
    }
  };

  return (
    <div className="relative flex w-full h-screen overflow-hidden bg-green-900">
      <div className="flex-1 flex justify-center items-center">
        <Pitch
          players={externalPlayers || players}
          setPlayers={handleSetPlayers}
          activeTool={activeTool}
          selectedPlayerId={selectedPlayerId}
          onSelectPlayer={onSelectPlayer}
        />
      </div>
    </div>
  );
};

export default PitchContainer;
