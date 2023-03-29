import { Button } from '@chakra-ui/react';
import { useState } from 'react';
import { QuizStatus } from '@/types';

type FiftyFiftyButtonProps = {
  quizStatus: QuizStatus;
  handleFiftyFifty: () => void;
};

export const FiftyFiftyButton = ({ quizStatus, handleFiftyFifty }: FiftyFiftyButtonProps) => {
  const [used, setUsed] = useState<boolean>(false);
  const handleOnClick = async () => {
    setUsed(true);
    handleFiftyFifty();
    console.log('click');
  };

  return (
    <Button
      colorScheme='teal'
      onClick={handleOnClick}
      isDisabled={used || quizStatus !== 'ongoing'}
    >
      {used === true ? 'Fifty-Fifty Used' : 'Fifty-Fifty'}
    </Button>
  );
};
