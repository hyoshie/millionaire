import { Button, Center, Container, VStack, Image } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { CategorySelect } from '@/components/CategorySelect';
import { MAIN_COLOR } from '@/constants';

export default function Home() {
  const router = useRouter();
  const [category, setCategory] = useState('');

  // クイズを開始するための関数
  const onStartQuiz = () => {
    if (category) {
      router.push(`/quiz?category=${category}`);
    } else {
      alert('Please select a category.');
    }
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
          <Image src='/logo.png' alt='Millionaire Logo' boxSize='200px' />
          <Container centerContent>
            {/* カテゴリ選択リスト */}
            <CategorySelect category={category} setCategory={setCategory} />
            {/* スタートボタンを表示する */}
            <Button colorScheme={MAIN_COLOR} onClick={onStartQuiz}>
              Start Quiz
            </Button>
          </Container>
        </VStack>
      </Center>
    </>
  );
}
