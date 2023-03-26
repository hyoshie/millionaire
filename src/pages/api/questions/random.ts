import type { NextApiRequest, NextApiResponse } from 'next';
import { QUIZ_QUESTION_COUNT } from '@/constants';
import { Question } from '@/types';
import { supabase } from 'lib/supabaseClient';

type Data = Question[] | { error: string };

// クイズをランダムに取得する
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const { data: questionsData, error: questionsError } = await supabase
      .from('random_questions')
      .select('*')
      .limit(QUIZ_QUESTION_COUNT);

    if (questionsError) throw new Error(questionsError.message);

    res.status(200).json(questionsData as Question[]);
  } catch (error) {
    const errorMessage =
      typeof error === 'string'
        ? error
        : error instanceof Error
        ? error.message
        : 'Unexpected error';
    res.status(500).json({ error: errorMessage });
  }
}
