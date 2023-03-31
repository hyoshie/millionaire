import axios from 'axios';
import { useState, useEffect } from 'react';
import { Question } from 'src/types/index';

type UseFetchQuestionsProps = {
  category?: string;
};

// クイズの質問を取得するためのカスタムフック
export const useFetchQuestions = ({ category }: UseFetchQuestionsProps = {}) => {
  // 質問の配列、ローディング中かどうか、エラーが発生したかどうかをuseStateで管理する
  const [questions, setQuestions] = useState<Question[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // 毎回状態をリセットすることで、前回の状態が残らないようにする
        setError(null);
        setQuestions([]);

        if (category) {
          const response = await axios.get(`/api/questions/random/?category=${category}`);
          setQuestions(response.data);
        } else {
          setQuestions(undefined);
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuestions();
  }, [category]);

  // 質問、ローディング中かどうか、エラーが発生したかどうかを返す
  return { questions, isLoading, error };
};
