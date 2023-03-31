import { IconButton } from '@chakra-ui/react';
import { useState } from 'react';
import { FaStarHalfAlt } from 'react-icons/fa';
import { MAIN_COLOR } from '@/constants';
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
      size='md'
      aria-label='FiftyFifty'
      variant='outline'
      icon={<FaStarHalfAlt />}
      colorScheme={MAIN_COLOR}
      onClick={handleOnClick}
      isDisabled={used || quizStatus !== 'ongoing'}
    />
  );
};
