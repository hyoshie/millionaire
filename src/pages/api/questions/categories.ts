import type { NextApiRequest, NextApiResponse } from 'next';
import { Category } from '@/types';
import { supabase } from 'lib/supabaseClient';

type Data = Category[] | { error: string };

// カテゴリーを取得する
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const { data: categoriesData, error: error } = await supabase.from('categories').select('*');

    if (error) throw new Error(error.message);

    res.status(200).json(categoriesData as Category[]);
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
