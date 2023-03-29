import { Center, Heading, HStack, Spinner, Text, VStack } from '@chakra-ui/react';
import Head from 'next/head';
import { AskTheAudience } from '@/components/AskTheAudience';
import { PhoneAFriend } from '@/components/PhoneAFriend';
import { ProgressBar } from '@/components/ProgressBar';
import { Quiz } from 'src/components/Quiz';
import { useFetchQuestions } from 'src/hooks/useFetchQuestions';
import { useQuiz } from 'src/hooks/useQuiz';

export default function QuizPage() {
  // データのフェッチとクイズ状態を取得する
  const { questions, isLoading, error } = useFetchQuestions();
  const {
    currentQuestion,
    quizStatus,
    checkAnswer,
    nextQuestionOrResult,
    currentQuestionIndex,
    timeLeft,
  } = useQuiz(questions);

  // プログレスバーの値を計算する
  const progressValue = (currentQuestionIndex / questions.length) * 100;

  // ロード中またはクイズがまだ読み込まれていない場合は、スピナーを表示する
  if (isLoading || !currentQuestion) {
    return (
      <Center h='100vh' bg='gray.100'>
        <Spinner size='xl' />;
      </Center>
    );
  }

  // エラーがある場合はエラーメッセージを表示する
  if (error) {
    return <p>Error</p>;
  }

  return (
    <>
      <Head>
        <title>Quiz Page</title>
      </Head>
      <Center h='100vh' bg='gray.100'>
        <VStack spacing={8}>
          {/* クイズのタイトルを表示する */}
          <Heading as='h1' size='2xl'>
            Quiz
          </Heading>
          <Text>Time left: {timeLeft}</Text>
          {/* プログレスバーを表示する */}
          <ProgressBar progressValue={progressValue} />
          {/* Lifelinesを表示する */}
          <HStack spacing={4}>
            <PhoneAFriend currentQuestion={currentQuestion} quizStatus={quizStatus} />
            <AskTheAudience currentQuestion={currentQuestion} quizStatus={quizStatus} />
          </HStack>
          {/* 電話ボタンを追加する */}
          {/* Quizコンポーネントに必要なプロップスを渡す */}
          <Quiz
            question={currentQuestion}
            quizStatus={quizStatus}
            checkAnswer={checkAnswer}
            nextQuestionOrResult={nextQuestionOrResult}
          />
        </VStack>
      </Center>
    </>
  );
}
