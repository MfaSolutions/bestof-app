export interface QuizAnswer {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  answers: QuizAnswer[];
  theme: string;
  explanation?: string;
}

export interface QuizTheme {
  id: string;
  name: string;
  description: string;
  questions: QuizQuestion[];
}

export interface QuizResult {
  theme: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  answers: {
    questionId: string;
    selectedAnswerId: string;
    isCorrect: boolean;
  }[];
}
