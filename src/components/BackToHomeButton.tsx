import { Button, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

type BackToHomeButtonProps = {
  colorScheme?: string;
};

export const BackToHomeButton = ({ colorScheme = 'gray' }: BackToHomeButtonProps) => {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <>
      <Text fontSize='2xl'>Game Over!!</Text>
      <Button colorScheme={colorScheme} onClick={handleBackToHome}>
        Home
      </Button>
    </>
  );
};
