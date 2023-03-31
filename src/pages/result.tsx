import { Box, Center, Heading, VStack } from '@chakra-ui/react';
import Head from 'next/head';
import { BackToHomeButton } from '@/components/BackToHomeButton';

export default function ResultPage() {
  return (
    <>
      <Head>
        <title>Result Page</title>
      </Head>
      {/* ページコンテンツを中央に表示する */}
      <Center h='100vh' bg='gray.100'>
        <VStack spacing={8}>
          {/* クイズ完了のメッセージを表示する */}
          <Heading as='h1' size='2xl'>
            Congratulations!
          </Heading>
          <Box>
            <Heading as='h2' size='lg'>
              You completed the quiz!
            </Heading>
          </Box>
          {/* ホームボタンを表示する */}
          <BackToHomeButton />
        </VStack>
      </Center>
    </>
  );
}
