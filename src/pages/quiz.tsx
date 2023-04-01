import { Box, Center, Spinner } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { QuizBox } from '@/components/QuizBox';
import { useFetchQuestions } from 'src/hooks/useFetchQuestions';

export default function QuizPage() {
  const router = useRouter();
  const queryCategory = router.query.category;
  const category = typeof queryCategory === 'string' ? queryCategory : undefined;
  const { questions, isLoading, error } = useFetchQuestions({ category });

  useEffect(() => {
    if (!category) {
      router.push('/');
    }
  }, [category, router]);

  if (isLoading || !questions) {
    return (
      <Center minH='100%' bg='gray.100'>
        <Spinner size='xl' />
      </Center>
    );
  }

  if (error) {
    return (
      <Center minH='100%' bg='gray.100'>
        <p>Error</p>
      </Center>
    );
  }

  return (
    <>
      <Head>
        <title>Quiz Page</title>
      </Head>
      <Box minHeight='100vh' backgroundColor='gray.100'>
        <Center h='100%'>
          <QuizBox questions={questions} />
        </Center>
      </Box>
    </>
  );
}
