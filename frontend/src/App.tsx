import { useState } from "react";
import Toolbar from "./Toolbar";
import "./index.css";
import Pitch from "./Pitch";

function App() {
  const [activeTool, setActiveTool] = useState<"select" | "draw" | "arrow" | "erase">("select");
  const [isToolbarOpen, setIsToolbarOpen] = useState(false);

  return (
    <div>
      <Toolbar
        activeTool={activeTool}
        onToolChange={setActiveTool}
        isOpen={isToolbarOpen}
        toggleOpen={() => setIsToolbarOpen(!isToolbarOpen)}
      />
      {/* Main content area including pitch */}
      <main className={`transition-margin duration-300 ${isToolbarOpen ? "ml-20" : "ml-0"} p-4`}>
        <p>Selected tool: {activeTool}</p>
        <Pitch />
      </main>
    </div>
  );
}

export default App;
