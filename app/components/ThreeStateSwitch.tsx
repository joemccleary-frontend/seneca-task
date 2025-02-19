"use client";
import React, { useState, useEffect, useRef } from "react";

interface Answer {
  incorrect: string[];
  correct: string;
  randomizedOptions: string[];
}

interface SwitchProps {
  answers: Answer;
  onSelect: (selected: string, isCorrect: boolean) => void;
  defaultSelected: string;
  correctPercentage: number;
}

const ThreeStateSwitch = ({
  answers,
  onSelect,
  defaultSelected,
  correctPercentage,
}: SwitchProps) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [toggleState, SetToggleState] = useState(0);
  const options = answers.randomizedOptions;
  const [isOverflowing, setIsOverflowing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);

  // Function to check if text is overflowing
  const checkOverflow = () => {
    if (containerRef.current && spanRef.current) {
      const container = containerRef.current;
      const span = spanRef.current;
      setIsOverflowing(container.clientHeight < span.clientHeight);
    }
  };
  useEffect(() => {
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, []);

  useEffect(() => {
    if (defaultSelected) {
      setSelectedValue(defaultSelected);
      //get index of selected
      //find index of default selected in randomizedoptions array
      const indexInRandomizedOptions = answers.randomizedOptions.findIndex(
        (option) => option === defaultSelected
      );
      SetToggleState(indexInRandomizedOptions);

      onSelect(defaultSelected, answers.correct == defaultSelected);
    }
  }, [defaultSelected]);

  const handleClick = (value: string, index: number) => {
    if (correctPercentage === 100 || value === selectedValue) return;
    SetToggleState(index);
    setSelectedValue(value);
    const isCorrect = value === answers.correct;
    onSelect(value, isCorrect);
  };

  const getTranslateClass = () => {
    switch (toggleState) {
      case 0:
        if (!isOverflowing) return "translate-x-0";
        else return "translate-y-0";
      case 1:
        if (!isOverflowing) return "translate-x-full";
        else return "translate-y-full";
      case 2:
        if (!isOverflowing) return "translate-x-[200%]";
        else return "translate-y-[200%]";
      default:
        return "";
    }
  };
  return (
    <div className="flex items-center rounded-full bg-transparent border w-5/6 sm:w-2/3 m-4 shadow-lg">
      <div
        className={`relative w-full flex items-center rounded-full transition-colors duration-300
        ${isOverflowing ? "flex-col h-48" : "h-16"}
          `}
      >
        <div
          className={`absolute h-16 w-1/3 rounded-full transition-transform duration-300 bg-white bg-opacity-40 ${getTranslateClass()}`}
        />
        {options.map((option, index) => (
          <span
            onClick={() => {
              handleClick(option, index);
            }}
            key={index}
            className={`relative z-10 flex-1 text-center transition-colors duration-300 flex justify-center items-center ${
              correctPercentage !== 100 ? "cursor-pointer" : ""
            }
            ${
              selectedValue !== option
                ? "text-white hover:text-gray-100"
                : "text-[#9f938b]"
            } 
            ${!isOverflowing ? "min-h-full " : ""}
            `}
          >
            {option}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ThreeStateSwitch;
