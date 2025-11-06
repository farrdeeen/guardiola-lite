import React, { useState, useEffect, useRef } from "react";
import { Stage, Layer, Line, Circle, Rect, Text } from "react-konva";

interface Player {
  id: number;
  x: number;
  y: number;
  color: string;
  label: string;
}

interface PitchProps {
  players: Player[];
  setPlayers: (id: number, x: number, y: number) => void;
  activeTool: "select" | "draw" | "arrow" | "erase";
  selectedPlayerId: number | null;
  onSelectPlayer: (id: number) => void;
}

const Pitch: React.FC<PitchProps> = ({ players, setPlayers, activeTool, selectedPlayerId, onSelectPlayer }) => {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [lines, setLines] = useState<{ points: number[] }[]>([]);
  const [drawing, setDrawing] = useState(false);
  const [cursor, setCursor] = useState("crosshair");
  const stageRef = useRef<any>(null);

  useEffect(() => {
    const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { width, height } = size;
  const margin = 20;
  const pitchWidth = width - margin * 2;
  const pitchHeight = height - margin * 5;
  const startX = margin;
  const startY = margin;
  const goalWidth = pitchWidth * 0.08;
  const goalHeight = pitchHeight * 0.3;

  const handleDragMove = (id: number, e: any) => {
    if (activeTool !== "select") return;
    const { x, y } = e.target.position();
    setPlayers(id, x, y);
  };

  const handleMouseDown = (e: any) => {
    if (cursor !== "crosshair" || activeTool !== "draw") return;
    setDrawing(true);
    const stage = e.target.getStage();
    if (!stage) return;
    const pointer = stage.getPointerPosition();
    if (pointer) setLines([...lines, { points: [pointer.x, pointer.y] }]);
  };

  const handleMouseMove = (e: any) => {
    const stage = e.target.getStage();
    if (!stage) return;
    const pointer = stage.getPointerPosition();
    if (!pointer) return;
    const isOverPlayer = players.some((p) => Math.hypot(pointer.x - p.x, pointer.y - p.y) < 28);

    setCursor(isOverPlayer ? "pointer" : activeTool === "draw" ? "crosshair" : "default");

    if (!drawing) return;

    setLines((prev) => {
      const last = prev[prev.length - 1];
      const updated = { ...last, points: [...last.points, pointer.x, pointer.y] };
      return [...prev.slice(0, -1), updated];
    });
  };

  const handleMouseUp = () => setDrawing(false);
  const eraseLines = () => setLines([]);

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden", margin: 0, padding: 0, background: "white", cursor }}>
      <button
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          zIndex: 100,
          padding: "10px 18px",
          background: "#b91c1c",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
        onClick={eraseLines}
      >
        Eraser
      </button>

      <Stage ref={stageRef} width={width} height={height} style={{ display: "block", cursor }} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
        <Layer>
          {/* Pitch */}
          <Rect x={startX} y={startY} width={pitchWidth} height={pitchHeight} stroke="white" strokeWidth={3} fill="#228B22" />
          <Line points={[startX + pitchWidth / 2, startY, startX + pitchWidth / 2, startY + pitchHeight]} stroke="white" strokeWidth={2} />
          <Circle x={startX + pitchWidth / 2} y={startY + pitchHeight / 2} radius={pitchHeight / 6} stroke="white" strokeWidth={2} />
          <Circle x={startX + pitchWidth / 2} y={startY + pitchHeight / 2} radius={5} fill="white" />
          <Rect x={startX} y={startY + (pitchHeight - goalHeight) / 2} width={goalWidth} height={goalHeight} stroke="white" strokeWidth={2} />
          <Rect x={startX + pitchWidth - goalWidth} y={startY + (pitchHeight - goalHeight) / 2} width={goalWidth} height={goalHeight} stroke="white" strokeWidth={2} />

          {/* Lines */}
          {lines.map((line, i) => (
            <Line key={i} points={line.points} stroke="yellow" strokeWidth={4} lineCap="round" lineJoin="round" />
          ))}

          {/* Players */}
          {players.map((player) => (
            <React.Fragment key={player.id}>
              <Circle
                x={player.x}
                y={player.y}
                radius={28}
                fill={player.color}
                stroke={player.id === selectedPlayerId ? "yellow" : "white"}
                strokeWidth={player.id === selectedPlayerId ? 5 : 3}
                draggable={activeTool === "select"}
                onDragMove={(e) => handleDragMove(player.id, e)}
                onClick={() => onSelectPlayer(player.id)}
                onMouseEnter={() => setCursor("pointer")}
                onMouseLeave={() => setCursor("default")}
              />
              <Text x={player.x - 10} y={player.y - 10} text={player.label} fontSize={24} fill="white" fontStyle="bold" listening={false} />
            </React.Fragment>
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default Pitch;
