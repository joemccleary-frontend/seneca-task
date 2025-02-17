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
    console.log("blah", index, selected, isCorrect);
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
      return "bg-red-200";
    } else if (correctPercentage === 100) {
      return "bg-blue-200";
    } else {
      const colorIntensity = Math.ceil((correctPercentage / 100) * 6) * 100;
      return `bg-blue-${colorIntensity}`;
    }
  };

  return (
    <div className={`${calculateBackgroundColour()}`}>
      {questionData.question}

      {questionData.answers.map((answer, index) => (
        <Switch
          key={index}
          answers={answer}
          onSelect={(selected, isCorrect) =>
            handleAnswerSelect(index, selected, isCorrect)
          }
        />
      ))}
      <div>
        The answer is {correctPercentage === 100 ? "correct" : "incorrect"}
      </div>
    </div>
  );
}
