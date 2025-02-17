"use client";
import React, { useState } from "react";

interface Answer {
  incorrect: string[];
  correct: string;
}

interface SwitchProps {
  answers: Answer;
  onSelect: (selected: string, isCorrect: boolean) => void;
  correctPercentage: number;
}

const Switch = ({ answers, onSelect, correctPercentage }: SwitchProps) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const options = [answers.correct, ...answers.incorrect];

  const handleClick = (value: string) => {
    if (correctPercentage === 100) return;
    setSelectedValue(value);
    const isCorrect = value === answers.correct;
    onSelect(value, isCorrect);
  };

  return (
    <div className="flex items-center rounded-full bg-transparent border p-1 w-fit m-2 shadow-lg">
      {options.map((option) => (
        <div
          key={option}
          className={`px-4 py-2 rounded-lg cursor-pointer transition-colors
            ${
              selectedValue === option
                ? "bg-gray-200 text-grey-600 font-bold"
                : "text-white hover:text-gray-200"
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
