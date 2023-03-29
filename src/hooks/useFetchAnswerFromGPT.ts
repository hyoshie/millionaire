import axios from 'axios';
import { useState } from 'react';

export const useFetchAnswerFromGPT = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const fetchAnswerFromGPT = async (userInput: string) => {
    try {
      setIsLoading(true);
      const response = await axios.post('/api/lifelines/phoneAFriend', { userInput });
      return response.data.message;
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // クイズ状態を返す
  return {
    fetchAnswerFromGPT,
    isLoading,
    error,
  };
};
