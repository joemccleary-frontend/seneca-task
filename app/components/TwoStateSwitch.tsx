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

const TwoStateSwitch = ({
  answers,
  onSelect,
  correctPercentage,
}: SwitchProps) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const options = [answers.correct, ...answers.incorrect];

  const handleClick = (value: string) => {
    if (correctPercentage === 100) return;
    setSelectedValue(value);
    const isCorrect = value === answers.correct;
    onSelect(value, isCorrect);
  };
  const [isOn, setIsOn] = useState(false);

  return (
    <div className="flex items-center rounded-full bg-transparent border p-1 w-fit m-2 shadow-lg">
      <button
        className={`relative w-48 h-12 flex items-center rounded-full p-1 transition-colors duration-300
        `}
      >
        <div
          className={`absolute left-1 top-1 h-10 w-24 rounded-full transition-transform duration-300 bg-orange-100 
          ${isOn ? "translate-x-full" : "translate-x-0"}`}
        />
        {options.map((option, index) => (
          <span
            onClick={() => {
              setIsOn(!isOn);
              handleClick(option);
            }}
            key={index}
            className={`relative z-10 flex-1 text-center transition-colors duration-300 
                    ${
                      selectedValue !== option
                        ? "text-white hover:text-gray-100"
                        : "text-[#9f938b]"
                    } `}
          >
            {option}
          </span>
        ))}
      </button>
    </div>
  );
};

export default TwoStateSwitch;
