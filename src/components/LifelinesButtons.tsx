import { HStack } from '@chakra-ui/react';
import { AudienceButton } from './AudienceButton';
import { FiftyFiftyButton } from './FiftyFiftyButton';
import { GPTButton } from './GPTButton';
import { Question, QuizStatus } from '@/types';

type LifelinesButtonsProps = {
  currentQuestion: Question;
  quizStatus: QuizStatus;
  handleFiftyFifty: () => void;
};

export const LifelinesButtons = ({
  currentQuestion,
  quizStatus,
  handleFiftyFifty,
}: LifelinesButtonsProps) => {
  return (
    <>
      <HStack spacing={4}>
        <GPTButton currentQuestion={currentQuestion} quizStatus={quizStatus} />
        <AudienceButton currentQuestion={currentQuestion} quizStatus={quizStatus} />
        <FiftyFiftyButton quizStatus={quizStatus} handleFiftyFifty={handleFiftyFifty} />
      </HStack>
    </>
  );
};
