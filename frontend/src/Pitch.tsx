import React, { useEffect, useState } from "react";
import { Stage, Layer, Line, Circle, Rect } from "react-konva";

const Pitch: React.FC = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { width, height } = size;

  // Slight margin so it fits exactly inside screen
  const margin = 20;
  const pitchWidth = width - margin * 2;
  const pitchHeight = height - margin * 5;

  const startX = margin;
  const startY = margin;

  // Goal box dimensions relative to pitch
  const goalWidth = pitchWidth * 0.08;
  const goalHeight = pitchHeight * 0.3;

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        margin: 0,
        padding: 0,
        background: "white",
      }}
    >
      <Stage
        width={width}
        height={height}
        style={{
          display: "block",
        }}
      >
        <Layer>
          {/* Outer boundary */}
          <Rect
            x={startX}
            y={startY}
            width={pitchWidth}
            height={pitchHeight}
            stroke="white"
            strokeWidth={3}
            fill="#228B22"
          />

          {/* Halfway line */}
          <Line
            points={[
              startX + pitchWidth / 2,
              startY,
              startX + pitchWidth / 2,
              startY + pitchHeight,
            ]}
            stroke="white"
            strokeWidth={2}
          />

          {/* Center circle */}
          <Circle
            x={startX + pitchWidth / 2}
            y={startY + pitchHeight / 2}
            radius={pitchHeight / 6}
            stroke="white"
            strokeWidth={2}
          />

          {/* Center point */}
          <Circle
            x={startX + pitchWidth / 2}
            y={startY + pitchHeight / 2}
            radius={5}
            fill="white"
          />

          {/* Left goal box */}
          <Rect
            x={startX}
            y={startY + (pitchHeight - goalHeight) / 2}
            width={goalWidth}
            height={goalHeight}
            stroke="white"
            strokeWidth={2}
          />

          {/* Right goal box */}
          <Rect
            x={startX + pitchWidth - goalWidth}
            y={startY + (pitchHeight - goalHeight) / 2}
            width={goalWidth}
            height={goalHeight}
            stroke="white"
            strokeWidth={2}
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default Pitch;
