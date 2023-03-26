import { Center, Heading, Spinner, VStack } from '@chakra-ui/react';
import Head from 'next/head';
import { Quiz } from 'src/components/Quiz';
import { useFetchQuestions } from 'src/hooks/useFetchQuestions';
import { useQuiz } from 'src/hooks/useQuiz';

export default function QuizPage() {
  const { questions, isLoading, error } = useFetchQuestions();
  const { currentQuestion, selectedOption, isCorrect, checkAnswer, nextQuestion } =
    useQuiz(questions);

  if (isLoading || !currentQuestion) {
    return (
      <Center h='100vh' bg='gray.100'>
        <Spinner size='xl' />;
      </Center>
    );
  }

  if (error) {
    return <p>Error</p>;
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
          <Quiz
            question={currentQuestion}
            selectedOption={selectedOption}
            isCorrect={isCorrect}
            checkAnswer={checkAnswer}
            nextQuestion={nextQuestion}
          />
        </VStack>
      </Center>
    </div>
  );
}
