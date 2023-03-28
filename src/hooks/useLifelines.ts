import axios from 'axios';
import { useState } from 'react';

export const useLifelines = () => {
  const [usedPhone, setUsedPhone] = useState(false);

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

  return {
    usedPhone,
    fetchAnswerFromGPT,
  };
};
