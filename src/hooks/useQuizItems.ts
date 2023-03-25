import axios from 'axios';
import { useState, useEffect } from 'react';
import { QuizItem } from 'src/types/index';

export default function useQuizItems() {
  const [quizItems, setQuizItems] = useState<QuizItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchQuizItems = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('/api/quiz/random');
        setQuizItems(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch quiz data:', error);
      }
    };
    fetchQuizItems();
  }, []);

  return { quizItems, isLoading };
}
