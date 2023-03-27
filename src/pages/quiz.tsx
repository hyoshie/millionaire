import { Center, Heading, Progress, Spinner, Text, VStack } from '@chakra-ui/react';
import Head from 'next/head';
import { Quiz } from 'src/components/Quiz';
import { useFetchQuestions } from 'src/hooks/useFetchQuestions';
import { useQuiz } from 'src/hooks/useQuiz';

export default function QuizPage() {
  const { questions, isLoading, error } = useFetchQuestions();
  const {
    currentQuestion,
    selectedOption,
    isCorrect,
    checkAnswer,
    nextQuestionOrResult,
    currentQuestionIndex,
  } = useQuiz(questions);

  const progressValue = ((currentQuestionIndex + 1) / questions.length) * 100;

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
    <>
      <Head>
        <title>Quiz Page</title>
      </Head>
      <Center h='100vh' bg='gray.100'>
        <VStack spacing={8}>
          <Heading as='h1' size='2xl'>
            Quiz
          </Heading>
          <Progress
            width='100%'
            value={progressValue}
            colorScheme='blue'
            size='sm'
            borderRadius='md'
          />
          <Quiz
            question={currentQuestion}
            selectedOption={selectedOption}
            isCorrect={isCorrect}
            checkAnswer={checkAnswer}
            nextQuestionOrResult={nextQuestionOrResult}
          />
        </VStack>
      </Center>
    </>
  );
}
