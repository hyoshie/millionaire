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
    <Button
      position='absolute'
      top={{ base: '900px', md: '850px' }}
      colorScheme={colorScheme}
      onClick={handleBackToHome}
    >
      Home
    </Button>
  );
};
