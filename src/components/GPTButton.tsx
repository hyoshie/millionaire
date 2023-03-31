import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Text,
  Spinner,
  Center,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useFetchAnswerFromGPT } from '@/hooks/useFetchAnswerFromGPT';
import { Question, QuizStatus } from '@/types';

type GPTButtonProps = {
  currentQuestion: Question;
  quizStatus: QuizStatus;
};

export const GPTButton = ({ currentQuestion, quizStatus }: GPTButtonProps) => {
  const [gptAnswer, setGPTAnswer] = useState<string>('');
  const { fetchAnswerFromGPT, isLoading, error } = useFetchAnswerFromGPT();

  // エラーがある場合はエラーメッセージを表示する
  if (error) {
    return <p>Error</p>;
  }

  const handleOnClick = async () => {
    // 電話ボタンを押したら、GPT-3から回答を取得する
    const answer = await fetchAnswerFromGPT(currentQuestion.question);
    setGPTAnswer(answer);
  };

  return (
    <Popover placement='top'>
      <PopoverTrigger>
        <Button
          colorScheme='teal'
          onClick={handleOnClick}
          isDisabled={gptAnswer !== '' || quizStatus !== 'ongoing'}
        >
          {gptAnswer !== '' ? 'Used' : 'Phone a Friend'}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <Center>
            {isLoading ? <Spinner size='md' color='teal.500' /> : <Text>{gptAnswer}</Text>}
          </Center>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};