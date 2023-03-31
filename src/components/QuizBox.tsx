import { Text, VStack } from '@chakra-ui/react';
import { LifelinesButtons } from './LifelinesButtons';
import { ProgressBar } from '@/components/ProgressBar';
import { QuestionAndOptions } from '@/components/QuestionAndOptions';
import { useFiftyFifty } from '@/hooks/useFiftyFifty';
import { Question } from '@/types';
import { useQuiz } from 'src/hooks/useQuiz';

type QuizBoxProps = {
  questions: Question[];
};

export const QuizBox = ({ questions }: QuizBoxProps) => {
  // クイズの状態を取得する
  const {
    currentQuestion,
    quizStatus,
    checkAnswer,
    nextQuestionOrResult,
    currentQuestionIndex,
    timeLeft,
  } = useQuiz(questions);
  // 50:50で隠す選択肢とコールバック関数を取得する
  const { hiddenOptions, handleFiftyFifty } = useFiftyFifty(currentQuestion);

  const progressValue = (currentQuestionIndex / questions.length) * 100;

  return (
    <>
      <VStack spacing={4}>
        <Text>Time left: {timeLeft}</Text>
        <ProgressBar progressValue={progressValue} />
        <LifelinesButtons
          currentQuestion={currentQuestion}
          quizStatus={quizStatus}
          handleFiftyFifty={handleFiftyFifty}
        />
        <QuestionAndOptions
          question={currentQuestion}
          quizStatus={quizStatus}
          checkAnswer={checkAnswer}
          nextQuestionOrResult={nextQuestionOrResult}
          hiddenOptions={hiddenOptions}
        />
      </VStack>
    </>
  );
};
