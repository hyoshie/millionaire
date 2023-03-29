import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Question, Option, QuizStatus } from '../types';

// クイズ状態を管理するためのカスタムフック
export const useQuiz = (questions: Question[]) => {
  // 現在の質問番号、クイズの進行状況をuseStateで管理する
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizStatus, setQuizStatus] = useState<QuizStatus>('ongoing');
  const [usedPhone, setUsedPhone] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const router = useRouter();

  // 回答をチェックするための関数
  const checkAnswer = (option: Option) => {
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

  const fetchAnswerFromGPT = async (userInput: string) => {
    try {
      setUsedPhone(true);
      const response = await axios.post('/api/lifelines/phoneAFriend', { userInput });

      if (response.status !== 200) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      return response.data.message;
    } catch (error) {
      console.error(error);
    }
  };

  // クイズ状態を返す
  return {
    currentQuestion,
    currentQuestionIndex,
    quizStatus,
    checkAnswer,
    nextQuestionOrResult,
    usedPhone,
    fetchAnswerFromGPT,
  };
};
