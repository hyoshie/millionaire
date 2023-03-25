import { Box, Button, Center, Heading, VStack } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function ResultPage() {
  const router = useRouter();

  const goToHomePage = () => {
    router.push('/');
  };

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
          <Button colorScheme='blue' onClick={goToHomePage}>
            Go to Home Page
          </Button>
        </VStack>
      </Center>
    </div>
  );
}
