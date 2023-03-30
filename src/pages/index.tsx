import { Button, Center, Container, Image, VStack } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  // クイズを開始するための関数
  const onStartQuiz = () => {
    router.push('/quiz');
  };

  return (
    <>
      <Head>
        <title>Millionaire</title>
      </Head>
      {/* ロゴとスタートボタンを中央に表示する */}
      <Center h='100vh' bg='gray.100'>
        <VStack spacing={8}>
          {/* ロゴを表示する */}
          <Image src='/logo.png' alt='Millionaire Logo' boxSize='300px' />
          <Container centerContent>
            {/* スタートボタンを表示する */}
            <Button colorScheme='blue' onClick={onStartQuiz} size='lg'>
              Start Quiz
            </Button>
          </Container>
        </VStack>
      </Center>
    </>
  );
}
