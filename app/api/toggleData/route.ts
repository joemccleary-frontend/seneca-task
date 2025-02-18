// app/api/toggleData/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const questionData = [
    {
      questionNumber: 1,
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
          incorrect: ["Partially permeable membrane"],
          correct: "Permeable membrane",
        },
        {
          incorrect: ["Mitochondria"],
          correct: "Cellulose",
        },
      ],
    },
    {
      questionNumber: 2,
      question: "Who is the best football team",
      answers: [
        {
          incorrect: ["Man United", "Liverpool"],
          correct: "Chester",
        },
        {
          incorrect: ["Arsenal", "Chelsea"],
          correct: "Chestera",
        },
        {
          incorrect: ["n", "he"],
          correct: "ASd",
        },
        {
          incorrect: ["da", "ajs"],
          correct: "dadsnajk",
        },
      ],
    },
  ];

  return NextResponse.json(questionData);
}
