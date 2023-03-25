import { Button, Center, Container, Flex, Image, VStack } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { supabase } from 'lib/supabaseClient';
import { Question } from 'src/types/index';

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await supabase.from('questions').select();
  if (!data) {
    throw new Error();
  }

  return {
    props: {
      questions: data,
    },
  };
};

type Props = {
  questions: Question[];
};

export default function Home({ questions }: Props) {
  const router = useRouter();
  const onStartQuiz = () => {
    router.push('/quiz');
  };

  return (
    <div>
      <Head>
        <title>Millionaire</title>
      </Head>
      <Center h='100vh' bg='gray.100'>
        <VStack spacing={8}>
          <Image src='/logo.png' alt='Millionaire Logo' boxSize='300px' />
          <Container centerContent>
            <Button colorScheme='blue' onClick={onStartQuiz} size='lg'>
              Start Quiz
            </Button>
          </Container>
        </VStack>
      </Center>
    </div>
  );
}
