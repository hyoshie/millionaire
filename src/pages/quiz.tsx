import { Center, Heading, Progress, Spinner, VStack } from '@chakra-ui/react';
import Head from 'next/head';
import { Quiz } from 'src/components/Quiz';
import { useFetchQuestions } from 'src/hooks/useFetchQuestions';
import { useQuiz } from 'src/hooks/useQuiz';

export default function QuizPage() {
  // データのフェッチとクイズ状態を取得する
  const { questions, isLoading, error } = useFetchQuestions();
  const {
    currentQuestion,
    selectedOption,
    isCorrect,
    checkAnswer,
    nextQuestionOrResult,
    currentQuestionIndex,
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

  // クイズを表示する
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
          {/* プログレスバーを表示する */}
          <Progress
            width='100%'
            value={progressValue}
            colorScheme='blue'
            size='sm'
            borderRadius='md'
          />
          {/* Quizコンポーネントに必要なプロップスを渡す */}
          <Quiz
            question={currentQuestion}
            selectedOption={selectedOption}
            isCorrect={isCorrect}
            checkAnswer={checkAnswer}
            nextQuestionOrResult={nextQuestionOrResult}
          />
        </VStack>
      </Center>
    </>
  );
}
