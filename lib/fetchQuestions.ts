import { supabase } from './supabaseClient';
import { QUIZ_QUESTION_COUNT } from '@/constants';
import { Question } from '@/types';

export const fetchQuestions = async (categoryName: string): Promise<Question[]> => {
  // ここを参考にした(https://www.sukerou.com/2022/11/supabase-javascirpt.html)
  const { data: questionsData, error: error } = await supabase
    .from('random_questions')
    .select('*, categories!inner(name)')
    .eq('categories.name', categoryName)
    .limit(QUIZ_QUESTION_COUNT);

  if (error) {
    throw new Error(error.message);
  }

  return questionsData as Question[];
};
