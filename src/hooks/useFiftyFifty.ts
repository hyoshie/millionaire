import { useState, useCallback, useEffect } from 'react';
import { QUIZ_OPTIONS } from '@/constants';
import { Question, Option } from '@/types';

export const useFiftyFifty = (question: Question) => {
  const [hiddenOptions, setHiddenOptions] = useState<Option[]>([]);

  useEffect(() => {
    setHiddenOptions([]);
  }, [question]);

  const handleFiftyFifty = useCallback(() => {
    const correctOption = question.correct_option;
    const incorrectOptions = QUIZ_OPTIONS.filter((option) => option !== correctOption);

    const hiddenOptions: Option[] = [];
    while (hiddenOptions.length < 2) {
      const randomIndex = Math.floor(Math.random() * incorrectOptions.length);
      const randomOption = incorrectOptions[randomIndex];
      if (!hiddenOptions.includes(randomOption)) {
        hiddenOptions.push(randomOption);
      }
    }

    setHiddenOptions(hiddenOptions);
  }, [question]);

  return { hiddenOptions, handleFiftyFifty };
};
