import axios from 'axios';
import { useState, useEffect } from 'react';
import { Category } from 'src/types/index';

export const useFetchCategories = () => {
  // カテゴリーの配列、ローディング中かどうか、エラーが発生したかどうかをuseStateで管理する
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  // カテゴリーを取得するためのAPIを呼び出すuseEffect
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('/api/questions/categories');
        setCategories(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  // 質問、ローディング中かどうか、エラーが発生したかどうかを返す
  return { categories, isLoading, error };
};
