import { Center, Spinner } from '@chakra-ui/react';
import Head from 'next/head';
import { QuizBox } from '@/components/QuizBox';
import { useFetchQuestions } from 'src/hooks/useFetchQuestions';

export default function QuizPage() {
  const { questions, isLoading, error } = useFetchQuestions();

  if (isLoading) {
    return (
      <Center h='100vh' bg='gray.100'>
        <Spinner size='xl' />;
      </Center>
    );
  }

  if (error) {
    return (
      <Center h='100vh' bg='gray.100'>
        <p>Error</p>;
      </Center>
    );
  }

  return (
    <>
      <Head>
        <title>Quiz Page</title>
      </Head>
      <Center h='100vh' bg='gray.100'>
        <QuizBox questions={questions} />
      </Center>
    </>
  );
}
