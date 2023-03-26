import { Box, Center, Heading, VStack } from '@chakra-ui/react';
import Head from 'next/head';
import { BackToHomeButton } from '@/components/BackToHomeButton';

export default function ResultPage() {
  return (
    <div>
      <Head>
        <title>Result Page</title>
      </Head>
      <Center h='100vh' bg='gray.100'>
        <VStack spacing={8}>
          <Heading as='h1' size='2xl'>
            Congratulations!
          </Heading>
          <Box>
            <Heading as='h2' size='lg'>
              You completed the quiz!
            </Heading>
          </Box>
          <BackToHomeButton />
        </VStack>
      </Center>
    </div>
  );
}
