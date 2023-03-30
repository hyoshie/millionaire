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

    // カテゴリ名からカテゴリIDを取得
    const { data: categoriesData, error: categoriesError } = await supabase
      .from('categories')
      .select('id')
      .eq('name', categoryName)
      .single();

    if (categoriesError || !categoriesData) {
      // エラーハンドリング（カテゴリが見つからない場合など）
      console.error('Error fetching category ID:', categoriesError);
      // 必要に応じて適切なエラーレスポンスを返します。
      return;
    }

    const categoryId = categoriesData.id;

    // カテゴリIDに基づいてランダムな問題を取得
    const { data: questionsData, error: questionsError } = await supabase
      .from('random_questions')
      .select('*')
      .eq('category_id', categoryId)
      .limit(QUIZ_QUESTION_COUNT);

    if (questionsError) {
      // エラーハンドリング（問題の取得に失敗した場合）
      console.error('Error fetching questions:', questionsError);
      // 必要に応じて適切なエラーレスポンスを返します。
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
