"use client";

import { useEffect, useState } from "react";
import TwoStateSwitch from "./TwoStateSwitch";
import ThreeStateSwitch from "./ThreeStateSwitch";

interface Answer {
  incorrect: string[];
  correct: string;
}
interface Question {
  questionNumber: number;
  question: string;
  answers: Answer[];
}

export default function ToggleQuestion() {
  const [questionData, setQuestionData] = useState<Question[] | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<boolean[]>([]);
  const [correctPercentage, setCorrectPercentage] = useState(0);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching...");
      try {
        const res = await fetch("/api/toggleData");
        const data = await res.json();
        console.log(data);
        setQuestionData(data);
        // Initialize selections when data loads
        const initialCorrectIndex = Math.floor(
          Math.random() * data[0].answers.length
        );
        setSelectedAnswers(
          data[0].answers.map((answer: Answer, index: number) =>
            index === initialCorrectIndex
              ? answer.correct
              : answer.incorrect[
                  Math.floor(Math.random() * answer.incorrect.length)
                ]
          )
        );
        setCorrectAnswers(
          data[0].answers.map(
            (_: Answer, index: number) => index === initialCorrectIndex
          )
        );
      } catch (error) {
        console.error("Error fetching question data:", error);
      }
    };

    fetchData();
  }, []);

  const nextQuestion = () => {
    setCurrentQuestionNumber(1);
  };

  const handleAnswerSelect = (
    index: number,
    selected: string,
    isCorrect: boolean
  ) => {
    const updatedCorrectAnswers = [...correctAnswers];
    updatedCorrectAnswers[index] = isCorrect;

    setCorrectAnswers(updatedCorrectAnswers);
    setSelectedAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[index] = selected;
      return newAnswers;
    });

    const totalCorrect = updatedCorrectAnswers.filter(Boolean).length;
    const percentage = Math.round(
      (totalCorrect /
        (questionData[currentQuestionNumber]?.answers.length || 1)) *
        100
    );
    setCorrectPercentage(percentage);
    if (percentage === 100) nextQuestion();
  };

  const calculateBackgroundColour = () => {
    if (correctPercentage === 0)
      return "bg-gradient-to-b from-[#f6b868] to-[#ee6c2e]";
    if (correctPercentage <= 33)
      return "bg-gradient-to-b from-[#fecc61] to-[#ff8300]";
    if (correctPercentage <= 50)
      return "bg-gradient-to-b from-[#fed954] to-[#ff9700]";
    if (correctPercentage < 100)
      return "bg-gradient-to-b from-[#ffe34b] to-[#ffab00]";
    return "bg-gradient-to-b from-[#75dfc2] to-[#59cada]";
  };

  if (!questionData) {
    return (
      <div className="text-white text-2xl m-6 text-center">Loading...</div>
    );
  }

  return (
    <div
      className={`min-h-screen w-screen flex flex-col justify-start sm:pt-10 items-center ${calculateBackgroundColour()}`}
    >
      <div className="text-white text-2xl m-6 text-center sm:text-4xl">
        {questionData[currentQuestionNumber].question}
      </div>
      <div className="w-full">
        {questionData[currentQuestionNumber].answers.map((answer, index) => (
          <div className="w-full place-items-center text-lg" key={index}>
            {answer.incorrect.length === 1 ? (
              <TwoStateSwitch
                answers={answer}
                defaultSelected={selectedAnswers[index]}
                onSelect={(selected, isCorrect) =>
                  handleAnswerSelect(index, selected, isCorrect)
                }
                correctPercentage={correctPercentage}
                index={index}
              />
            ) : (
              <ThreeStateSwitch
                answers={answer}
                defaultSelected={selectedAnswers[index]}
                onSelect={(selected, isCorrect) =>
                  handleAnswerSelect(index, selected, isCorrect)
                }
                correctPercentage={correctPercentage}
              />
            )}
          </div>
        ))}
      </div>
      <div className="text-white text-xl sm:text-3xl m-6">
        The answer is {correctPercentage === 100 ? "correct" : "incorrect"}
      </div>
    </div>
  );
}
