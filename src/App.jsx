import React, { useState } from "react";
import GameBoard from "./components/GameBoard";
import ConfigPanel from "./components/ConfigPanel";

const App = () => {
  const [config, setConfig] = useState({
    groupSize: 2,
    itemCount: 8,
    columns: 4,
  });
  const [reset, setReset] = useState(false);

  const handleConfigChange = (newConfig) => setConfig(newConfig);
  const handleReset = () => {
    setReset(true);
    setTimeout(() => setReset(false), 0);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center">Word Connect Game</h1>
      <ConfigPanel config={config} setConfig={setConfig} resetGame={handleReset} />
      <GameBoard config={config} reset={reset} />
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
        onClick={handleReset}
      >
        Reset Game
      </button>
    </div>
  );
};

export default App;
