"use client";
import React, { useState, useEffect } from "react";

interface Answer {
  incorrect: string[];
  correct: string;
}

interface SwitchProps {
  answers: Answer;
  onSelect: (selected: string, isCorrect: boolean) => void;
  defaultSelected: string;
  correctPercentage: number;
}

const TwoStateSwitch = ({
  answers,
  onSelect,
  defaultSelected,
  correctPercentage,
}: SwitchProps) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const options = [answers.correct, ...answers.incorrect];

  useEffect(() => {
    if (defaultSelected) {
      setSelectedValue(defaultSelected);
      console.log(answers.correct);
      if (answers.correct !== defaultSelected) setIsOn(true);
      onSelect(defaultSelected, answers.correct == defaultSelected);
    }
  }, [defaultSelected]);

  const handleClick = (value: string) => {
    if (correctPercentage === 100) return;
    setIsOn(!isOn);
    setSelectedValue(value);
    const isCorrect = value === answers.correct;
    onSelect(value, isCorrect);
  };
  const [isOn, setIsOn] = useState(false);

  return (
    <div className="flex items-center rounded-full bg-transparent border w-fit m-2 shadow-lg">
      <div
        className={`relative w-[600px] h-12 flex items-center rounded-full transition-colors duration-300
        `}
      >
        <div
          className={`absolute h-12 w-[300px] rounded-full transition-transform duration-300 bg-white bg-opacity-40 
          ${isOn ? "translate-x-full" : "translate-x-0"}`}
        />
        {options.map((option, index) => (
          <span
            onClick={() => {
              handleClick(option);
            }}
            key={index}
            className={`relative z-10 flex-1 text-center transition-colors duration-300 ${
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

export default TwoStateSwitch;
