import type { NextApiRequest, NextApiResponse } from 'next';
import { QUIZ_QUESTION_COUNT } from '@/constants';
import { Question } from '@/types';
import { supabase } from 'lib/supabaseClient';

type Data = Question[] | { error: string };

type RandomQuestionRequest = NextApiRequest & {
  query: {
    category?: string;
  };
};

// クイズをランダムに取得する
export default async function handler(req: RandomQuestionRequest, res: NextApiResponse<Data>) {
  try {
    const categoryName = req.query.category;

    // カテゴリ名に基づいてランダムな問題を取得
    const { data: questionsData, error: questionsError } = await supabase
      .from('random_questions')
      // ここを参考にした(https://www.sukerou.com/2022/11/supabase-javascirpt.html)
      .select('*, categories!inner(name)')
      .eq('categories.name', categoryName)
      .limit(QUIZ_QUESTION_COUNT);

    if (questionsError) {
      console.error('Error fetching questions:', questionsError);
      return;
    }

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
