export type Question = {
  id: number;
  category_id: number;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: CorrectOption;
  difficulty: Difficulty;
  created_at: Date;
  updated_at: Date;
};

export enum CorrectOption {
  A = 'a',
  B = 'b',
  C = 'c',
  D = 'd',
}

export enum Difficulty {
  Easy = 'easy',
  Hard = 'hard',
  Medium = 'medium',
}

export type QuizStatus = 'ongoing' | 'correct' | 'incorrect';
