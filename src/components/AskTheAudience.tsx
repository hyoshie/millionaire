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
import { Question } from '@/types';

interface AskTheAudienceProps {
  usedAudience: boolean;
  fetchAnswerFromAudience: (query: string) => Promise<string>;
  input: Question;
}

export const AskTheAudience = ({
  usedAudience,
  fetchAnswerFromAudience,
  input,
}: AskTheAudienceProps) => {
  const [gptAnswer, setGPTAnswer] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const handleOnClick = async () => {
    try {
      setIsLoading(true);
      // 電話ボタンを押したら、GPT-3から回答を取得する
      const answer = await fetchAnswerFromAudience(input.question);
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
        <Button colorScheme='teal' onClick={handleOnClick} isDisabled={usedAudience}>
          {usedAudience ? 'Used' : 'Ask the Audience'}
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
