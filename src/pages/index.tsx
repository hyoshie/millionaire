import { Button, Center, Container, Flex, Image, VStack } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const onStartQuiz = () => {
    router.push('/quiz');
  };

  return (
    <>
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
    </>
  );
}
