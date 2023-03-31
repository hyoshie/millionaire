import { Center } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { QuizBox } from '@/components/QuizBox';
import { Question } from '@/types';
import { fetchQuestions } from 'lib/fetchQuestions';

type QuizPageProps = {
  questions: Question[];
  error?: string;
};

export default function QuizPage({ questions, error }: QuizPageProps) {
  if (error) {
    return <p>Error</p>;
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.query.category || Array.isArray(context.query.category)) {
    return {
      notFound: true,
    };
  }

  try {
    const category = context.query.category;
    const questions = await fetchQuestions(category);
    if (!questions.length) {
      throw new Error('No questions found');
    }
    return {
      props: { questions },
    };
  } catch (error) {
    console.error('Error fetching questions:', error);
    return {
      props: { questions: [], error: String(error) },
    };
  }
};
