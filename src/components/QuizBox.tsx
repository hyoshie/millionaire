import { Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { AskTheAudienceButton } from '@/components/AskTheAudienceButton';
import { FiftyFiftyButton } from '@/components/FiftyFiftyButton';
import { PhoneAFriendButton } from '@/components/PhoneAFriendButton';
import { ProgressBar } from '@/components/ProgressBar';
import { QuestionAndOptions } from '@/components/QuestionAndOptions';
import { useFiftyFifty } from '@/hooks/useFiftyFifty';
import { Question } from '@/types';
import { useQuiz } from 'src/hooks/useQuiz';

type QuizBoxProps = {
  questions: Question[];
};

export const QuizBox = ({ questions }: QuizBoxProps) => {
  console.log('hello');
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
      <VStack spacing={8}>
        <Heading as='h1' size='2xl'>
          Quiz
        </Heading>
        <Text>Time left: {timeLeft}</Text>
        <ProgressBar progressValue={progressValue} />
        {/* Lifelinesを表示する */}
        <HStack spacing={4}>
          <PhoneAFriendButton currentQuestion={currentQuestion} quizStatus={quizStatus} />
          <AskTheAudienceButton currentQuestion={currentQuestion} quizStatus={quizStatus} />
          <FiftyFiftyButton quizStatus={quizStatus} handleFiftyFifty={handleFiftyFifty} />
        </HStack>
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
