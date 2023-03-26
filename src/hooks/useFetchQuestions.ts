import axios from 'axios';
import { useState, useEffect } from 'react';
import { Question } from 'src/types/index';

export const useFetchQuestions = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('/api/questions/random');
        setQuestions(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  return { questions, isLoading, error };
};
