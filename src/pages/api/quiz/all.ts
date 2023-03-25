import type { NextApiRequest, NextApiResponse } from 'next';
import { QuizItem } from '@/types';
import { supabase } from 'lib/supabaseClient';

type Data = QuizItem[] | { error: string };

// すべてのクイズを取得する
// デバッグのために作成
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const { data: questionsData, error: questionsError } = await supabase
      .from('questions')
      .select('*');

    if (questionsError) throw new Error(questionsError.message);

    const quizItems: QuizItem[] = [];

    for (const question of questionsData) {
      const { data: choicesData, error: choicesError } = await supabase
        .from('choices')
        .select('*')
        .eq('question_id', question.id);

      if (choicesError) throw new Error(choicesError.message);

      const choices = choicesData.map((choice) => choice.choice_text);
      const correctChoiceIndex = choicesData.findIndex((choice) => choice.is_correct);

      quizItems.push({
        question: question.question_text,
        choices,
        correctChoiceIndex,
      });
    }

    res.status(200).json(quizItems);
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
