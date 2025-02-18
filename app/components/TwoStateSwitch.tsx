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
    console.log(containerRef, spanRef);
    if (containerRef.current && spanRef.current) {
      const container = containerRef.current;
      const span = spanRef.current;
      setIsOverflowing(container.clientHeight < span.clientHeight);
      console.log(container.clientHeight, span.clientHeight);
      console.log(
        "overflow",
        isOverflowing,
        container.clientHeight > span.clientHeight
      );
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
    if (correctPercentage === 100) return;
    setIsOn(!isOn);
    setSelectedValue(value);
    const isCorrect = value === answers.correct;
    onSelect(value, isCorrect);
  };

  return (
    <div
      key={index}
      className="flex items-center rounded-full bg-transparent border w-2/3 m-4 shadow-lg max-w-full"
    >
      <div
        className={`relative w-full  h-12 flex items-center rounded-full transition-colors duration-300
         ${isOverflowing ? "flex-col" : ""}`}
      >
        <div
          className={`absolute h-12 w-1/2 rounded-full transition-transform duration-300 bg-white bg-opacity-40 
          ${!isOverflowing && isOn ? "translate-x-full" : "translate-x-0"} 
          ${isOverflowing ? "w-full" : "translate-y-0"}
          ${isOverflowing && isOn ? "translate-y-full" : ""}
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
