import React, { useState, useEffect } from "react";
import WordItem from "./WordItems";
import { connectedWords } from "../data/data.jsx";

const GameBoard = ({ config, reset }) => {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState([]);
  const [matched, setMatched] = useState([]);
  const [attempts, setAttempts] = useState(0);

 
  useEffect(() => {
    initializeGame();
  }, [config, reset]);

  
  const initializeGame = () => {
    const groupWords = connectedWords.get(config.groupSize);
    const selectedGroups = shuffleArray(groupWords).slice(0, config.itemCount / config.groupSize);
    const flattenedWords = selectedGroups.flat();
    setItems(shuffleArray(flattenedWords));  
    setSelected([]);  
    setMatched([]);   
    setAttempts(0);  
  };

  
  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  
  const handleSelect = (index) => {
    if (selected.includes(index) || matched.includes(index)) return;  

    const newSelected = [...selected, index];
    setSelected(newSelected);

    if (newSelected.length === config.groupSize) {
      const isMatch = connectedWords.get(config.groupSize).some((group) =>
        newSelected.every((i) => group.includes(items[i]))
      );

      if (isMatch) {

        setMatched((prev) => [...prev, ...newSelected]);
        setTimeout(() => {
          setItems((prev) => prev.map((item, i) => (newSelected.includes(i) ? null : item)));
        }, 500);  
      }

      setTimeout(() => setSelected([]), 500);  
      setAttempts((prev) => prev + 1); 
    }
  };

  return (
    <div>
      <div
        className="grid gap-2 mt-4"
        style={{
          gridTemplateColumns: `repeat(${Math.max(2, Math.min(config.columns, 4))}, 1fr)`,
        }}
      >

        {items.map((item, index) => (
          item !== null && (
            <WordItem
              key={index}
              word={item}
              isSelected={selected.includes(index)}
              isMatched={matched.includes(index)}
              onClick={() => handleSelect(index)}
            />
          )
        ))}
      </div>
      <p><span className="font-bold">Attempts:</span> {attempts}</p>
    </div>
  );
};

export default GameBoard;
