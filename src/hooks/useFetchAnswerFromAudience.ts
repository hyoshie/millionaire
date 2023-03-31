import axios from 'axios';
import { useState } from 'react';
import { Question } from '@/types';

export const useFetchAnswerFromAudience = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  const fetchAnswerFromAudience = async (currentQuestion: Question) => {
    try {
      const response = await axios.post('/api/lifelines/askTheAudience', { currentQuestion });
      return response.data.message;
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // クイズ状態を返す
  return {
    fetchAnswerFromAudience,
    isLoading,
    error,
  };
};
