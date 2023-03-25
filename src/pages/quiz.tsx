import { Box, Center, Heading, Text, VStack } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Actions from '@/components/Actions';
import Choices from 'src/components/Choices';
import useQuizItems from 'src/hooks/useQuizItems';

export default function QuizPage() {
  const router = useRouter();
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedChoiceIndex, setSelectedChoiceIndex] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const { quizItems, isLoading } = useQuizItems();
  const currentQuizItem = quizItems[currentQuizIndex];

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
          <Choices
            choices={currentQuizItem.choices}
            selectedChoiceIndex={selectedChoiceIndex}
            isCorrect={isCorrect}
            onChoiceClick={checkAnswer}
          />
          {selectedChoiceIndex !== null && (
            <Actions
              isCorrect={isCorrect}
              correctChoice={currentQuizItem.choices[currentQuizItem.correctChoiceIndex]}
              onNextQuestion={nextQuestion}
              onGoToHomePage={goToHomePage}
            />
          )}
        </VStack>
      </Center>
    </div>
  );
}
