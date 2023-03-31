import { Card, Text, VStack } from '@chakra-ui/react';
import { LifelinesButtons } from './LifelinesButtons';
import { NextOrBackButton } from './NextOrBackButton';
import { TimeProgress } from './TimeProgress';
import { OptionButtons } from '@/components/OptionButtons';
import { QUIZ_QUESTION_TIME } from '@/constants';
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

  const timeProgressValue = (timeLeft / QUIZ_QUESTION_TIME) * 100;

  return (
    <>
      <VStack spacing={4}>
        <Card p={4} w='800px'>
          <VStack spacing={4}>
            <TimeProgress progressValue={timeProgressValue} />
            <Text fontSize='md' p={2}>
              {currentQuestionIndex + 1} / {questions.length}
            </Text>
            <Text h='80px' fontSize='2xl' p={2}>
              {currentQuestion.question}
            </Text>
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
