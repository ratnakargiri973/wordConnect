import React, { useState } from "react";
import Modal from "react-modal";

const ConfigPanel = ({ config, setConfig, resetGame }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleGroupSizeChange = (delta) => {
    const newGroupSize = Math.max(2, Math.min(4, config.groupSize + delta));
    const maxItemCount = newGroupSize * Math.floor(16 / newGroupSize);
    setConfig((prev) => ({
      ...prev,
      groupSize: newGroupSize,
      itemCount: Math.min(prev.itemCount, maxItemCount),
    }));
  };

  const handleItemCountChange = (delta) => {
    let newItemCount = config.itemCount + delta;
    if (newItemCount % config.groupSize === 0 && newItemCount >= 4 && newItemCount <= 16) {
      setConfig((prev) => ({ ...prev, itemCount: newItemCount }));
    }
  };

  const handleColumnChange = (delta) => {
    const newColumns = Math.max(2, Math.min(4, config.columns + delta));
    setConfig((prev) => ({ ...prev, columns: newColumns }));
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const progressBarWidth = (min, max, value) => (value - min) / (max - min) * 100;

  return (
    <div>
      <button
        onClick={openModal}
        className="p-2 bg-slate-700 text-white rounded-lg hover:bg-red-900 transition duration-300 ml-auto"
      >
        config
      </button>

      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        className="bg-white p-6 rounded-lg shadow-xl max-w-md mx-auto mt-10 bg-sky-200"
        overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-50"
      >
        <h3 className="text-2xl font-semibold mb-4">Game Configuration</h3>

        <div className="flex items-center mb-4">
          <label className="mr-4 text-lg w-1/4">Group Size:</label>
          <div className="flex-1">
            <div className="relative flex items-center">
              <button
                onClick={() => handleGroupSizeChange(-1)}
                className="absolute left-0 p-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition duration-300"
              >
                -
              </button>
              <div className="w-full bg-gray-300 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${progressBarWidth(2, 4, config.groupSize)}%` }}
                />
              </div>
              <button
                onClick={() => handleGroupSizeChange(1)}
                className="absolute right-0 p-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition duration-300"
              >
                +
              </button>
            </div>
            <span className="block text-center mt-2">{config.groupSize}</span>
          </div>
        </div>

        <div className="flex items-center mb-4">
          <label className="mr-4 text-lg w-1/4">Item Count:</label>
          <div className="flex-1">
            <div className="relative flex items-center">
              <button
                onClick={() => handleItemCountChange(-config.groupSize)}
                className="absolute left-0 p-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition duration-300"
              >
                -
              </button>
              <div className="w-full bg-gray-300 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{
                    width: `${progressBarWidth(4, 16, config.itemCount)}%`,
                  }}
                />
              </div>
              <button
                onClick={() => handleItemCountChange(config.groupSize)}
                className="absolute right-0 p-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition duration-300"
              >
                +
              </button>
            </div>
            <span className="block text-center mt-2">{config.itemCount}</span>
          </div>
        </div>

        <div className="flex items-center mb-4">
          <label className="mr-4 text-lg w-1/4">Columns:</label>
          <div className="flex-1">
            <div className="relative flex items-center">
              <button
                onClick={() => handleColumnChange(-1)}
                className="absolute left-0 p-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition duration-300"
              >
                -
              </button>
              <div className="w-full bg-gray-300 rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full"
                  style={{
                    width: `${progressBarWidth(2, 4, config.columns)}%`,
                  }}
                />
              </div>
              <button
                onClick={() => handleColumnChange(1)}
                className="absolute right-0 p-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition duration-300"
              >
                +
              </button>
            </div>
            <span className="block text-center mt-2">{config.columns}</span>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ConfigPanel;
