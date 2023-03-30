import axios from 'axios';
import { useState, useEffect } from 'react';
import { Question } from 'src/types/index';

// クイズの質問を取得するためのカスタムフック
export const useFetchQuestions = () => {
  // 質問の配列、ローディング中かどうか、エラーが発生したかどうかをuseStateで管理する
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  // 質問を取得するためのAPIを呼び出すuseEffect
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('/api/questions/random');
        setQuestions(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  // 質問、ローディング中かどうか、エラーが発生したかどうかを返す
  return { questions, isLoading, error };
};
