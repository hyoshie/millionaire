import axios from 'axios';
import { useState } from 'react';
import { Question } from '../types';

export const useLifelines = (currentQuestion: Question) => {
  const [usedPhone, setUsedPhone] = useState(false);
  const [usedAudience, setUsedAudience] = useState(false);

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

  const fetchAnswerFromAudience = async () => {
    try {
      setUsedAudience(true);
      const response = await axios.post('/api/lifelines/askTheAudience', { currentQuestion });

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
    usedPhone,
    fetchAnswerFromGPT,
    usedAudience,
    fetchAnswerFromAudience,
  };
};
