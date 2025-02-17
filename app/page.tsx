"use client";
import { useState } from "react";
import Switch from "./components/Toggle";

export default function Home() {
  const [correctPercentage, setCorrectPercentage] = useState(0);

  const questionData = {
    question: "An animal cell contains",
    answers: [
      {
        incorrect: ["Cell wall"],
        correct: "Ribosomes",
      },
      {
        incorrect: ["Cytoplasm"],
        correct: "Chloroplast",
      },
      {
        incorrect: ["Mitochondria"],
        correct: "Cellulose",
      },
      {
        incorrect: ["Mitochondria"],
        correct: "Cellulose",
      },
    ],
  };
  const [correctAnswers, setCorrectAnswers] = useState(
    Array(questionData.answers.length).fill(false)
  );

  const handleAnswerSelect = (
    index: number,
    selected: string,
    isCorrect: boolean
  ) => {
    const updatedCorrectAnswers = [...correctAnswers];
    updatedCorrectAnswers[index] = isCorrect;

    setCorrectAnswers(updatedCorrectAnswers);
    console.log(updatedCorrectAnswers);

    const totalCorrect = updatedCorrectAnswers.filter(
      (isCorrect) => isCorrect
    ).length;
    const percentage = Math.round(
      (totalCorrect / questionData.answers.length) * 100
    );
    setCorrectPercentage(percentage);
  };

  const calculateBackgroundColour = () => {
    if (correctPercentage === 0) {
      return "bg-gradient-to-b from-[#f6b868] to-[#ee6c2e]"; // Darkest
    } else if (correctPercentage <= 33) {
      return "bg-gradient-to-b from-[#fecc61] to-[#ff8300]"; // Dark
    } else if (correctPercentage <= 50) {
      return "bg-gradient-to-b from-[#fed954] to-[#ff9700]"; // Orange-yellow transition
    } else if (correctPercentage < 100) {
      return "bg-gradient-to-b from-[#ffe34b] to-[#ffab00]"; // Lightest yellow
    } else {
      return "bg-gradient-to-b from-[#75dfc2] to-[#59cada]"; // Success turquoise
    }
  };
  return (
    <div
      className={`h-screen w-screen flex flex-col justify-center items-center ${calculateBackgroundColour()}`}
    >
      <div className="text-white text-2xl m-6">{questionData.question}</div>

      {questionData.answers.map((answer, index) => (
        <Switch
          key={index}
          answers={answer}
          onSelect={(selected, isCorrect) =>
            handleAnswerSelect(index, selected, isCorrect)
          }
          correctPercentage={correctPercentage}
        />
      ))}
      <div className="text-white text-2xl m-6">
        The answer is {correctPercentage === 100 ? "correct" : "incorrect"}
      </div>
    </div>
  );
}
