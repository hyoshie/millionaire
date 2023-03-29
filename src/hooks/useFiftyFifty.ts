import { useEffect, useMemo } from 'react';
import { Option, Question } from '@/types';

const options: Option[] = ['a', 'b', 'c', 'd'];

export const useFiftyFifty = (currentQuestion: Question) => {
  const hiddenQuestions = useMemo(() => {
    const incorrectOptions = options.filter((option) => option !== currentQuestion.correct_option);
    const randomOptionIndex = Math.floor(Math.random() * incorrectOptions.length);
    return incorrectOptions.filter((option, index) => index !== randomOptionIndex);
  }, [currentQuestion]);

  // hiddenQuestionsの長さが2でない場合は警告を出す
  useEffect(() => {
    if (hiddenQuestions.length !== 2) {
      console.warn(`useFiftyFifty: hiddenQuestions must be 2, but got ${hiddenQuestions.length}`);
    }
  }, [hiddenQuestions]);

  return {
    hiddenQuestions,
  };
};
