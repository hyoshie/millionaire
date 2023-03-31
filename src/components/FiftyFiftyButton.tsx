import { IconButton } from '@chakra-ui/react';
import { useState } from 'react';
import { FaStarHalfAlt } from 'react-icons/fa';
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
  };

  return (
    <IconButton
      size='lg'
      aria-label='FiftyFifty'
      icon={<FaStarHalfAlt />}
      colorScheme='blue'
      onClick={handleOnClick}
      isDisabled={used || quizStatus !== 'ongoing'}
    />
  );
};
