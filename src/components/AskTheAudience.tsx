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
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { useFetchAnswerFromAudience } from '@/hooks/useFetchAnswerFromAudience';
import { Question } from '@/types';

type AskTheAudienceProps = {
  currentQuestion: Question;
};

type OptionPercentage = {
  option: string;
  percentage: number;
};

const data: OptionPercentage[] = [
  {
    option: 'A',
    percentage: 40,
  },
  {
    option: 'B',
    percentage: 30,
  },
  {
    option: 'C',
    percentage: 20,
  },
  {
    option: 'D',
    percentage: 27,
  },
];

export const AskTheAudience = ({ currentQuestion }: AskTheAudienceProps) => {
  const [audienceAnswer, setAudienceAnswer] = useState<string>('');
  const { fetchAnswerFromAudience, isLoading, error } = useFetchAnswerFromAudience();

  // エラーがある場合はエラーメッセージを表示する
  if (error) {
    return <p>Error</p>;
  }

  const handleOnClick = async () => {
    const answer = await fetchAnswerFromAudience(currentQuestion);
    setAudienceAnswer(answer);
    // const json = JSON.parse(answer);
    // alert(json);
  };

  return (
    <>
      <Popover placement='top'>
        <PopoverTrigger>
          <Button colorScheme='teal' onClick={handleOnClick} isDisabled={audienceAnswer !== ''}>
            {audienceAnswer !== '' ? 'Used' : 'Ask the Audience'}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverBody>
            <Center>
              {isLoading ? <Spinner size='md' color='teal.500' /> : <Text>{audienceAnswer}</Text>}
            </Center>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <BarChart width={300} height={150} data={data}>
        <XAxis dataKey='option' stroke='#8884d8' />
        <YAxis />
        <Tooltip />
        <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
        <Bar dataKey='percentage' fill='#8884d8' barSize={20} />
      </BarChart>
    </>
  );
};
