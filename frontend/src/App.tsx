import { useState, useEffect } from "react";
import Toolbar from "./Toolbar";
import "./index.css";
import Pitch from "./Pitch";

interface Player {
  id: number;
  x: number;
  y: number;
  color: string;
  label: string;
}



function App() {
  const [activeTool, setActiveTool] = useState<
    "select" | "draw" | "arrow" | "erase"
  >("select");
  const [isToolbarOpen, setIsToolbarOpen] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);

  // Fetch players
  useEffect(() => {
    fetch("http://localhost:8000/api/players")
      .then((res) => res.json())
      .then((data) => setPlayers(data))
      .catch(console.error);
  }, []);

  // Add new player
  const addPlayer = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/players/new", {
        method: "POST",
      });
      if (!response.ok) throw new Error("Failed to add player");
      const newPlayer = await response.json();
      setPlayers((prev) => [...prev, newPlayer]);
      setSelectedPlayerId(newPlayer.id); // select new player by default
    } catch (error) {
      console.error("Add player error:", error);
    }
  };

  // Update player position
  const setPlayerPosition = (id: number, x: number, y: number) => {
    setPlayers((players) =>
      players.map((p) => (p.id === id ? { ...p, x, y } : p))
    );
    fetch(`http://localhost:8000/api/players/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ x, y }),
    }).catch((e) => console.error("Update player error:", e));
  };

  // Delete player
  const onDeletePlayer = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:8000/api/players/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      setPlayers((prev) => prev.filter((p) => p.id !== id));
      if (selectedPlayerId === id) setSelectedPlayerId(null);
    } catch (error) {
      console.error(error);
    }
  };

  // Change player color
  const onChangeColor = async (id: number, color: string) => {
  try {
    const res = await fetch(`http://localhost:8000/api/players/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ color }),
    });
    if (!res.ok) throw new Error("Color update failed");
    const updatedPlayer = await res.json();
    console.log("Updated player:", updatedPlayer);
    setPlayers((prev) =>
      prev.map((p) => (p.id === id ? updatedPlayer : p))
    );
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div>
      <Toolbar
        activeTool={activeTool}
        onToolChange={setActiveTool}
        isOpen={isToolbarOpen}
        toggleOpen={() => setIsToolbarOpen(!isToolbarOpen)}
        onAddPlayer={addPlayer}
        selectedPlayerId={selectedPlayerId}
        onDeletePlayer={onDeletePlayer}
        onChangeColor={onChangeColor}
        players={players}
      />
      <main
        className={`transition-margin duration-300 ${
          isToolbarOpen ? "ml-40" : "ml-0"
        } p-4`}
      >
        <p>Selected tool: {activeTool}</p>
        
        
        <Pitch
          players={players}
          setPlayers={setPlayerPosition}
          activeTool={activeTool}
          selectedPlayerId={selectedPlayerId}
          onSelectPlayer={setSelectedPlayerId}
        />
      </main>
    </div>
  );
}

export default App;
