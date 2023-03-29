import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Spinner,
  Center,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { useFetchAnswerFromAudience } from '@/hooks/useFetchAnswerFromAudience';
import { OptionPercentage, Question } from '@/types';

type AskTheAudienceProps = {
  currentQuestion: Question;
};

export const AskTheAudience = ({ currentQuestion }: AskTheAudienceProps) => {
  const [audienceAnswer, setAudienceAnswer] = useState<OptionPercentage[]>();
  const { fetchAnswerFromAudience, isLoading, error } = useFetchAnswerFromAudience();

  // エラーがある場合はエラーメッセージを表示する
  if (error) {
    return <p>Error</p>;
  }

  const handleOnClick = async () => {
    const answer = await fetchAnswerFromAudience(currentQuestion);
    setAudienceAnswer(JSON.parse(answer));
  };

  return (
    <>
      <Popover placement='top'>
        <PopoverTrigger>
          <Button
            colorScheme='teal'
            onClick={handleOnClick}
            isDisabled={audienceAnswer !== undefined}
          >
            {audienceAnswer !== undefined ? 'Used' : 'Ask the Audience'}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverBody>
            <Center>
              {isLoading ? (
                <Spinner size='md' color='teal.500' />
              ) : (
                <BarChart width={300} height={150} data={audienceAnswer}>
                  <XAxis dataKey='option' stroke='#8884d8' />
                  <YAxis />
                  <Tooltip />
                  <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
                  <Bar dataKey='percentage' fill='#8884d8' barSize={20} />
                </BarChart>
              )}
            </Center>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};
