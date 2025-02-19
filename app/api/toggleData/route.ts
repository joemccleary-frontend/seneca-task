// app/api/toggleData/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const questionData = [
    {
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
      question: "Who is the best football team",
      answers: [
        {
          incorrect: ["Man United", "Liverpool"],
          correct: "Chester",
        },
        {
          incorrect: ["Arsenal"],
          correct: "Plymouth",
        },
        {
          incorrect: ["Barcelona"],
          correct: "Grimsby",
        },
        {
          incorrect: ["Bayern Munich", "PSG"],
          correct: "Rochdale",
        },
      ],
    },
  ];

  return NextResponse.json(questionData);
}
