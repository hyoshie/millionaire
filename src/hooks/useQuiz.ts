import { useRouter } from 'next/router';
import { useState } from 'react';
import { Question, CorrectOption } from '../types';

// クイズ状態を管理するためのカスタムフック
export const useQuiz = (questions: Question[]) => {
  // 現在の質問番号、選択した回答、回答の正否をuseStateで管理する
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<CorrectOption | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const currentQuestion = questions[currentQuestionIndex];
  const router = useRouter();

  // 回答をチェックするための関数
  const checkAnswer = (option: CorrectOption) => {
    setSelectedOption(option);
    setIsCorrect(option === currentQuestion.correct_option);
  };

  // 次の質問に進むか、結果ページに遷移するかを決定する関数
  const nextQuestionOrResult = () => {
    if (currentQuestionIndex < questions.length - 1) {
      goToNextQuestion();
    } else {
      router.push('/result');
    }
  };

  // 次の質問に進むための関数
  const goToNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelectedOption(null);
    setIsCorrect(null);
  };

  // クイズ状態を返す
  return {
    currentQuestion,
    currentQuestionIndex,
    selectedOption,
    isCorrect,
    checkAnswer,
    nextQuestionOrResult,
  };
};
