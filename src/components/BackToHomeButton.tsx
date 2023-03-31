import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { MAIN_COLOR } from '@/constants';

type BackToHomeButtonProps = {
  colorScheme?: string;
};

export const BackToHomeButton = ({ colorScheme = MAIN_COLOR }: BackToHomeButtonProps) => {
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
