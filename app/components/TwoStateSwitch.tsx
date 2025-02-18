"use client";
import React, { useState, useEffect, useRef } from "react";

interface Answer {
  incorrect: string[];
  correct: string;
}

interface SwitchProps {
  answers: Answer;
  onSelect: (selected: string, isCorrect: boolean) => void;
  defaultSelected: string;
  correctPercentage: number;
  index: number;
}

const TwoStateSwitch = ({
  answers,
  onSelect,
  defaultSelected,
  correctPercentage,
  index,
}: SwitchProps) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const options = [answers.correct, ...answers.incorrect];
  const [isOn, setIsOn] = useState(false);
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
      if (answers.correct !== defaultSelected) setIsOn(true);
      onSelect(defaultSelected, answers.correct == defaultSelected);
    }
  }, [defaultSelected]);

  const handleClick = (value: string) => {
    if (correctPercentage === 100 || value === selectedValue) return;
    setIsOn(!isOn);
    setSelectedValue(value);
    const isCorrect = value === answers.correct;
    onSelect(value, isCorrect);
  };

  return (
    <div
      key={index}
      className={`flex items-center bg-transparent border w-5/6 sm:w-2/3 m-4 shadow-lg max-w-full ${
        isOverflowing ? "rounded-[35px]" : "rounded-full"
      }`}
    >
      <div
        className={`relative w-full  flex items-center rounded-full transition-colors duration-300
         ${isOverflowing ? "flex-col h-32" : " h-16"}`}
      >
        <div
          className={`absolute h-16 w-1/2 transition-transform duration-200 bg-white bg-opacity-40 
          ${!isOverflowing && isOn ? "translate-x-full" : "translate-x-0"} 
          ${isOverflowing ? "w-full h-16 rounded-b-[35px]" : "rounded-full"}
          ${isOverflowing && !isOn ? "rounded-t-[35px] rounded-b-none" : ""}
          ${isOverflowing && isOn ? "translate-y-full" : "translate-y-0"}
          `}
          ref={containerRef}
        />
        {options.map((option, index) => (
          <span
            onClick={() => {
              handleClick(option);
            }}
            key={index}
            ref={spanRef}
            className={`relative z-10 flex-1 text-center transition-colors duration-300 flex justify-center items-center 
              ${correctPercentage !== 100 ? "cursor-pointer" : ""}
              ${
                selectedValue !== option
                  ? "text-white hover:text-gray-100"
                  : "text-[#9f938b]"
              } 
              ${!isOverflowing ? "min-h-full " : ""}`}
          >
            {option}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TwoStateSwitch;
