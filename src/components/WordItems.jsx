import React from "react";

const WordItem = ({ word, isSelected, isMatched, onClick }) => {
  if (word === null) return null;

  return (
    <div
      onClick={onClick}
      className={`p-4 text-center border rounded cursor-pointer transition-all duration-300 ease-in-out
        ${isMatched ? "bg-green-500 text-white opacity-50 cursor-not-allowed" : 
        isSelected ? "bg-red-500" : "bg-white"}`}
    >
      {word}
    </div>
  );
};

export default WordItem;
