export type Question = {
  id: number;
  question_text: string;
  difficulty_level: number;
  category_id: number;
  created_at: Date;
  updated_at: Date;
};

export type QuizItem = {
  question: string;
  choices: string[];
  correctChoiceIndex: number;
};
