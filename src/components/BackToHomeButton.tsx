import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';

type BackToHomeButtonProps = {
  colorScheme?: string;
};

export const BackToHomeButton = ({ colorScheme = 'blue' }: BackToHomeButtonProps) => {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <Button colorScheme={colorScheme} onClick={handleBackToHome}>
      Back to Home
    </Button>
  );
};
