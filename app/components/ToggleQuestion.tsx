"use client";

import { useEffect, useState } from "react";
import TwoStateSwitch from "./TwoStateSwitch";
import ThreeStateSwitch from "./ThreeStateSwitch";
import confetti from "canvas-confetti";
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
  const [selectedAnswers, setSelectedAnswers] = useState<string[][]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<boolean[][]>([]);
  const [correctPercentages, setCorrectPercentages] = useState<number[]>([]); // Store percentages per question
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching...");
      try {
        const res = await fetch("/api/toggleData");
        const data = await res.json();
        console.log(data);
        setQuestionData(data);

        // Initialize selections for the first question
        initializeQuestion(data[0]);
      } catch (error) {
        console.error("Error fetching question data:", error);
      }
    };

    fetchData();
  }, []);

  const initializeQuestion = (question: Question) => {
    const initialCorrectIndex = Math.floor(
      Math.random() * question.answers.length
    );

    setSelectedAnswers((prev) => [
      ...prev,
      question.answers.map((answer, i) =>
        i === initialCorrectIndex
          ? answer.correct
          : answer.incorrect[
              Math.floor(Math.random() * answer.incorrect.length)
            ]
      ),
    ]);

    setCorrectAnswers((prev) => [
      ...prev,
      question.answers.map((_, i) => i === initialCorrectIndex),
    ]);

    // Initialize percentage for the current question as 0
    setCorrectPercentages((prev) => [...prev, 0]);
  };

  const handleAnswerSelect = (
    index: number,
    selected: string,
    isCorrect: boolean
  ) => {
    if (isLocked) return; // Prevent changes if locked

    const updatedCorrectAnswers = [...correctAnswers];
    updatedCorrectAnswers[currentQuestionNumber][index] = isCorrect;

    setCorrectAnswers(updatedCorrectAnswers);
    setSelectedAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[currentQuestionNumber][index] = selected;
      return newAnswers;
    });

    const totalCorrect =
      updatedCorrectAnswers[currentQuestionNumber].filter(Boolean).length;
    const percentage = Math.round(
      (totalCorrect /
        (questionData?.[currentQuestionNumber]?.answers.length || 1)) *
        100
    );

    if (!isLocked) {
      const updatedPercentages = [...correctPercentages];
      updatedPercentages[currentQuestionNumber] = percentage;
      setCorrectPercentages(updatedPercentages);
    }

    if (percentage === 100) {
      setIsLocked(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      setTimeout(() => {
        moveToNextQuestion();
      }, 1500);
    }
  };

  const moveToNextQuestion = () => {
    if (!questionData || currentQuestionNumber >= questionData.length - 1)
      return;

    const nextQuestionIndex = currentQuestionNumber + 1;
    initializeQuestion(questionData[nextQuestionIndex]);
    setCurrentQuestionNumber(nextQuestionIndex);

    setTimeout(() => {
      window.scrollTo({
        top:
          document.getElementById(`question-${nextQuestionIndex}`)?.offsetTop ||
          0,
        behavior: "smooth",
      });
    }, 300);
  };

  const calculateBackgroundColour = (qIndex: number) => {
    if (isLocked && correctPercentages[qIndex] === 100) {
      return "bg-gradient-to-b from-[#75dfc2] to-[#59cada]";
    }
    const percentage = correctPercentages[qIndex];

    if (percentage === 0) return "bg-gradient-to-b from-[#f6b868] to-[#ee6c2e]";
    if (percentage <= 33) return "bg-gradient-to-b from-[#fecc61] to-[#ff8300]";
    if (percentage <= 50) return "bg-gradient-to-b from-[#fed954] to-[#ff9700]";
    if (percentage < 100) return "bg-gradient-to-b from-[#ffe34b] to-[#ffab00]";
    return "bg-gradient-to-b from-[#75dfc2] to-[#59cada]";
  };

  if (!questionData) {
    return (
      <div className="text-white text-2xl m-6 text-center">Loading...</div>
    );
  }

  return (
    <div
      className={`min-h-screen w-full flex flex-col justify-start items-center `}
    >
      {questionData
        .slice(0, currentQuestionNumber + 1)
        .map((question, qIndex) => (
          <div
            key={qIndex}
            id={`question-${qIndex}`}
            className={`w-full h-screen ${calculateBackgroundColour(qIndex)}`}
          >
            <div className="text-white text-2xl m-6 text-center sm:text-4xl">
              {question.question}
            </div>
            <div className="w-full">
              {question.answers.map((answer, index) => (
                <div className="w-full place-items-center text-lg" key={index}>
                  {answer.incorrect.length === 1 ? (
                    <TwoStateSwitch
                      answers={answer}
                      defaultSelected={selectedAnswers[qIndex]?.[index] || ""}
                      onSelect={(selected, isCorrect) =>
                        handleAnswerSelect(index, selected, isCorrect)
                      }
                      correctPercentage={correctPercentages[qIndex]}
                      index={index}
                    />
                  ) : (
                    <ThreeStateSwitch
                      answers={answer}
                      defaultSelected={selectedAnswers[qIndex]?.[index] || ""}
                      onSelect={(selected, isCorrect) =>
                        handleAnswerSelect(index, selected, isCorrect)
                      }
                      correctPercentage={correctPercentages[qIndex]}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="text-white text-xl sm:text-3xl m-6 text-center">
              The answer is{" "}
              {correctPercentages[qIndex] === 100 ? "correct" : "incorrect"}
            </div>
          </div>
        ))}
    </div>
  );
}
