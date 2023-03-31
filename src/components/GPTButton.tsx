import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Text,
  Spinner,
  Center,
  IconButton,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaRobot } from 'react-icons/fa';
import { MAIN_COLOR } from '@/constants';
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
    <Popover placement='auto'>
      <PopoverTrigger>
        <IconButton
          size='md'
          aria-label='GPT'
          variant='outline'
          icon={<FaRobot />}
          colorScheme={MAIN_COLOR}
          onClick={handleOnClick}
          isDisabled={gptAnswer !== '' || quizStatus !== 'ongoing'}
        />
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
