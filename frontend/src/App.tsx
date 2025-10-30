import { useState } from "react";
import Toolbar from "./Toolbar";
import "./index.css";
import Pitch from "./Pitch";

function App() {
  const [activeTool, setActiveTool] = useState<
    "select" | "draw" | "arrow" | "erase"
  >("select");
  const [isToolbarOpen, setIsToolbarOpen] = useState(false);

  const [players, setPlayers] = useState([
    { id: 1, x: 200, y: 300, color: "red", label: "1" },
    { id: 2, x: 400, y: 200, color: "red", label: "2" },
  ]);

  // Generate unique IDs for new players
  const generateUniqueId = () => {
    if (players.length === 0) return 1;
    return Math.max(...players.map((p) => p.id)) + 1;
  };

  // Add player handler
  const addPlayer = () => {
    const newId = generateUniqueId();
    const newPlayer = {
      id: newId,
      x: 300,
      y: 300,
      color: "red",
      label: newId.toString(),
    };
    setPlayers([...players, newPlayer]);
  };

  return (
    <div>
      <Toolbar
        activeTool={activeTool}
        onToolChange={setActiveTool}
        isOpen={isToolbarOpen}
        toggleOpen={() => setIsToolbarOpen(!isToolbarOpen)}
        onAddPlayer={addPlayer}
      />
      <main
        className={`transition-margin duration-300 ${
          isToolbarOpen ? "ml-20" : "ml-0"
        } p-4`}
      >
        <p>Selected tool: {activeTool}</p>
        <Pitch players={players} setPlayers={setPlayers} activeTool={activeTool} />
      </main>
    </div>
  );
}

export default App;
