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
  const [toggleState, SetToggleState] = useState(0);
  const options = [answers.correct, ...answers.incorrect];

  const handleClick = (value: string, index: number) => {
    if (correctPercentage === 100) return;
    SetToggleState(index);
    setSelectedValue(value);
    const isCorrect = value === answers.correct;
    onSelect(value, isCorrect);
  };

  const getTranslateXClass = () => {
    switch (toggleState) {
      case 0:
        return "translate-x-0";
      case 1:
        return "translate-x-full";
      case 2:
        return "translate-x-[200%]";
      default:
        return "";
    }
  };
  return (
    <div className="flex items-center rounded-full bg-transparent border m-2 w-fit shadow-lg">
      <div
        className={`relative w-[600px] h-12 flex items-center rounded-full transition-colors duration-300
        `}
      >
        <div
          className={`absolute h-12 w-[200px] rounded-full transition-transform duration-300 bg-white bg-opacity-40 ${getTranslateXClass()}`}
        />
        {options.map((option, index) => (
          <span
            onClick={() => {
              handleClick(option, index);
            }}
            key={index}
            className={`relative z-10 flex-1 text-center py-2 transition-colors duration-300 ${
              correctPercentage !== 100 ? "cursor-pointer" : ""
            }
                    ${
                      selectedValue !== option
                        ? "text-white hover:text-gray-100"
                        : "text-[#9f938b]"
                    } `}
          >
            {option}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Switch;
