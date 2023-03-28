export type Question = {
  id: number;
  category_id: number;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: Option;
  difficulty: Difficulty;
  created_at: Date;
  updated_at: Date;
};

export type Option = 'a' | 'b' | 'c' | 'd';

export type Difficulty = 'easy' | 'medium' | 'hard';

export type QuizStatus = 'ongoing' | 'correct' | 'incorrect';
