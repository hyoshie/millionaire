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
import { Question } from '@/types';

interface AskTheAudienceProps {
  usedAudience: boolean;
  fetchAnswerFromAudience: (query: string) => Promise<string>;
  input: Question;
}

type OptionPercentage = {
  option: string;
  percentage: number;
};

const data = [
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

export const AskTheAudience = ({
  usedAudience,
  fetchAnswerFromAudience,
  input,
}: AskTheAudienceProps) => {
  const [audienceAnswer, setAudienceAnswer] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const handleOnClick = async () => {
    try {
      setIsLoading(true);
      const answer = await fetchAnswerFromAudience(input.question);
      setAudienceAnswer(answer);
      const json = JSON.parse(answer);
      alert(json);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
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
