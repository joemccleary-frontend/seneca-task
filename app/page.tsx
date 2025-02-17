"use client";
import Switch from "./components/Toggle";

export default function Home() {
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
    ],
  };
  const handleAnswerSelect = (
    index: number,
    selected: string,
    isCorrect: boolean
  ) => {
    console.log("blah", index, selected, isCorrect);
  };

  return (
    <div className="">
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
    </div>
  );
}
