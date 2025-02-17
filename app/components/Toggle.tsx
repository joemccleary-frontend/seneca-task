"use client";
import React, { useState } from "react";

interface Answer {
  incorrect: string[];
  correct: string;
}

interface SwitchProps {
  answers: Answer;
  onSelect: (selected: string, isCorrect: boolean) => void;
}

const Switch = ({ answers, onSelect }: SwitchProps) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const options = [answers.correct, ...answers.incorrect];

  const handleClick = (value: string) => {
    setSelectedValue(value);
    const isCorrect = value === answers.correct;
    onSelect(value, isCorrect);
  };

  return (
    <div className="flex items-center rounded-lg bg-gray-100 p-1 w-fit m-2">
      {options.map((option) => (
        <div
          key={option}
          className={`px-4 py-2 rounded-lg cursor-pointer transition-colors 
            ${
              selectedValue === option
                ? "bg-gray-200 text-black font-bold"
                : "text-gray-500 hover:bg-gray-200"
            }`}
          onClick={() => handleClick(option)}
        >
          {option}
        </div>
      ))}
    </div>
  );
};

export default Switch;
