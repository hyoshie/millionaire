import { useRouter } from 'next/router';
import { useState } from 'react';
import { Question, CorrectOption } from '../types';

export const useQuiz = (questions: Question[]) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<CorrectOption | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const currentQuestion = questions[currentQuestionIndex];
  const router = useRouter();

  const checkAnswer = (option: CorrectOption) => {
    setSelectedOption(option);
    setIsCorrect(option === currentQuestion.correct_option);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsCorrect(null);
    } else {
      router.push('/result');
    }
  };

  return {
    currentQuestion,
    currentQuestionIndex,
    selectedOption,
    isCorrect,
    checkAnswer,
    nextQuestion,
  };
};
