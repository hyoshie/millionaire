import type { NextApiRequest, NextApiResponse } from 'next';
import { Question } from '@/types';
import { fetchQuestions } from 'lib/fetchQuestions';

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
    if (!categoryName) throw new Error('category is required');
    const questionsData = await fetchQuestions(categoryName);

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
