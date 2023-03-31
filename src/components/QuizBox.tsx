import { Card, Text, VStack } from '@chakra-ui/react';
import { LifelinesButtons } from './LifelinesButtons';
import { NextOrBackButton } from './NextOrBackButton';
import { OptionButtons } from '@/components/OptionButtons';
import { ProgressBar } from '@/components/ProgressBar';
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
        <Card p={4} w='800px'>
          <VStack spacing={4}>
            <Text>Time left: {timeLeft}</Text>
            <ProgressBar progressValue={progressValue} />
            <Text fontSize='2xl'>{currentQuestion.question}</Text>
            <LifelinesButtons
              currentQuestion={currentQuestion}
              quizStatus={quizStatus}
              handleFiftyFifty={handleFiftyFifty}
            />
            <OptionButtons
              question={currentQuestion}
              quizStatus={quizStatus}
              checkAnswer={checkAnswer}
              hiddenOptions={hiddenOptions}
            />
          </VStack>
        </Card>
        <NextOrBackButton quizStatus={quizStatus} nextQuestionOrResult={nextQuestionOrResult} />
      </VStack>
    </>
  );
};
