import { Button } from '@chakra-ui/react';
import { BackToHomeButton } from './BackToHomeButton';
import { QuizStatus } from '@/types';

// 次の質問に進むボタンをレンダリングするためのコンポーネント
type NextOrBackButtonProps = {
  quizStatus: QuizStatus;
  nextQuestionOrResult: () => void;
};

export const NextOrBackButton = ({ quizStatus, nextQuestionOrResult }: NextOrBackButtonProps) => {
  if (quizStatus === 'ongoing') return null;

  return quizStatus === 'correct' ? (
    <Button colorScheme='blue' onClick={nextQuestionOrResult}>
      Next Question
    </Button>
  ) : (
    <BackToHomeButton />
  );
};
