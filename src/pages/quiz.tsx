import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { QuizItem } from 'src/types/index';

export default function QuizPage() {
  const router = useRouter();
  const [quizItems, setQuizItems] = useState<QuizItem[]>([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedChoiceIndex, setSelectedChoiceIndex] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const currentQuizItem = quizItems[currentQuizIndex];

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

  const checkAnswer = (selectedChoiceIndex: number) => {
    setSelectedChoiceIndex(selectedChoiceIndex);
    setIsCorrect(selectedChoiceIndex === currentQuizItem.correctChoiceIndex);
  };

  const nextQuestion = () => {
    if (currentQuizIndex < quizItems.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
      setSelectedChoiceIndex(null);
      setIsCorrect(null);
    } else {
      // 全ての問題が終わった場合、リザルトページに遷移
      router.push('/result');
    }
  };

  const goToHomePage = () => {
    router.push('/');
  };

  if (isLoading || !currentQuizItem) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Head>
        <title>Quiz Page</title>
      </Head>
      <Center h='100vh' bg='gray.100'>
        <VStack spacing={8}>
          <Heading as='h1' size='2xl'>
            Quiz
          </Heading>
          <Box>
            <Text fontSize='2xl'>{currentQuizItem.question}</Text>
          </Box>
          <SimpleGrid columns={2} spacing={4} w='100%'>
            {currentQuizItem.choices.map((choice, index) => (
              <Button
                key={index}
                onClick={() => checkAnswer(index)}
                colorScheme={index === selectedChoiceIndex ? (isCorrect ? 'green' : 'red') : 'blue'}
                w='100%'
                isDisabled={selectedChoiceIndex !== null}
              >
                {choice}
              </Button>
            ))}
          </SimpleGrid>
          {selectedChoiceIndex !== null && (
            <Container>
              {isCorrect ? (
                <Button colorScheme='green' onClick={nextQuestion}>
                  Next Question
                </Button>
              ) : (
                <>
                  <Text fontSize='xl' color='red.500'>
                    Incorrect! The correct answer is{' '}
                    {currentQuizItem.choices[currentQuizItem.correctChoiceIndex]}.
                  </Text>
                  <Button colorScheme='blue' onClick={goToHomePage}>
                    Go to Home Page
                  </Button>
                </>
              )}
            </Container>
          )}
        </VStack>
      </Center>
    </div>
  );
}
