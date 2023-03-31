import { Button } from '@chakra-ui/react';
import { BackToHomeButton } from './BackToHomeButton';
import { MAIN_COLOR } from '@/constants';
import { QuizStatus } from '@/types';

// 次の質問に進むボタンをレンダリングするためのコンポーネント
type NextOrBackButtonProps = {
  quizStatus: QuizStatus;
  nextQuestionOrResult: () => void;
};

export const NextOrBackButton = ({ quizStatus, nextQuestionOrResult }: NextOrBackButtonProps) => {
  if (quizStatus === 'ongoing') return null;

  return quizStatus === 'correct' ? (
    <Button colorScheme={MAIN_COLOR} onClick={nextQuestionOrResult}>
      Next Question
    </Button>
  ) : (
    <BackToHomeButton />
  );
};
