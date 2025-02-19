export interface Answer {
  incorrect: string[];
  correct: string;
  randomizedOptions: string[];
}
export interface Question {
  questionNumber: number;
  question: string;
  answers: Answer[];
}
