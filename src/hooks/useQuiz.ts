import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Question, Option, QuizStatus } from '../types';
import { useTimer } from './useTimer';
import { QUIZ_QUESTION_TIME } from '@/constants';

// クイズ状態を管理するためのカスタムフック
export const useQuiz = (questions: Question[]) => {
  // 現在の質問番号、クイズの進行状況をuseStateで管理する
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizStatus, setQuizStatus] = useState<QuizStatus>('ongoing');
  const currentQuestion = questions[currentQuestionIndex];
  const router = useRouter();

  // タイマーを管理するためのカスタムフックを呼び出す
  const onTimeOut = () => {
    setQuizStatus('incorrect');
  };
  const { timeLeft, startTimer, stopTimer, resetTimer } = useTimer(QUIZ_QUESTION_TIME, onTimeOut);

  // 質問データを取得するか質問が変わる度にタイマーをリセットして再開する
  useEffect(() => {
    if (currentQuestion) {
      resetTimer();
      startTimer();
    }
  }, [currentQuestion, startTimer, resetTimer]);

  // 回答をチェックするための関数
  const checkAnswer = (option: Option) => {
    stopTimer();
    setQuizStatus(option === currentQuestion.correct_option ? 'correct' : 'incorrect');
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
    setQuizStatus('ongoing');
  };

  // クイズ状態を返す
  return {
    currentQuestion,
    currentQuestionIndex,
    quizStatus,
    checkAnswer,
    nextQuestionOrResult,
    timeLeft,
  };
};
