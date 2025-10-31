import { useState, useEffect } from "react";
import Toolbar from "./Toolbar";
import "./index.css";
import Pitch from "./Pitch";

function App() {
  const [activeTool, setActiveTool] = useState<
    "select" | "draw" | "arrow" | "erase"
  >("select");
  const [isToolbarOpen, setIsToolbarOpen] = useState(false);

  const [players, setPlayers] = useState<Player[]>([]);

  // Fetch all players from backend on mount
  useEffect(() => {
    fetch("http://localhost:8000/api/players")
      .then((res) => res.json())
      .then((data) => setPlayers(data))
      .catch(console.error);
  }, []);

  // Add new player on backend and update frontend
  interface Player {
  id: number;
  x: number;
  y: number;
  color: string;
  label: string;
}
 


  const addPlayer = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/players/new", {
        method: "POST",
      });
      if (!response.ok) throw new Error("Failed to add player");
      const newPlayer = await response.json();
      setPlayers((prev) => [...prev, newPlayer]);
    } catch (error) {
      console.error("Add player error:", error);
    }
  };

  // Update player position locally and sync with backend
  const setPlayerPosition = (id: number, x: number, y: number) =>{
    setPlayers((players) =>
      players.map((p) => (p.id === id ? { ...p, x, y } : p))
    );

    fetch(`http://localhost:8000/api/players/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ x, y }),
    }).catch((e) => console.error("Update player error:", e));
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
        <Pitch
          players={players}
          setPlayers={setPlayerPosition}
          activeTool={activeTool}
        />
      </main>
    </div>
  );
}

export default App;
