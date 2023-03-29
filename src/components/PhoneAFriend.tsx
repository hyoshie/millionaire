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
import { Question, QuizStatus } from '@/types';

interface PhoneAFriendProps {
  usedPhone: boolean;
  fetchAnswerFromGPT: (query: string) => Promise<string>;
  input: Question;
  quizStatus: QuizStatus;
}

export const PhoneAFriend = ({
  usedPhone,
  fetchAnswerFromGPT,
  input,
  quizStatus,
}: PhoneAFriendProps) => {
  const [gptAnswer, setGPTAnswer] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const handleOnClick = async () => {
    try {
      setIsLoading(true);
      // 電話ボタンを押したら、GPT-3から回答を取得する
      const answer = await fetchAnswerFromGPT(input.question);
      setGPTAnswer(answer);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Popover placement='top'>
      <PopoverTrigger>
        <Button
          colorScheme='teal'
          onClick={handleOnClick}
          isDisabled={usedPhone || quizStatus !== 'ongoing'}
        >
          {usedPhone ? 'Phone Used' : 'Phone a Friend'}
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
