import type { NextApiRequest, NextApiResponse } from 'next';
import { Question } from '@/types';
import { supabase } from 'lib/supabaseClient';

type Data = Question[] | { error: string };

// すべてのクイズを取得する
// デバッグのために作成
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const { data: questionsData, error: questionsError } = await supabase
      .from('questions')
      .select('*');

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
