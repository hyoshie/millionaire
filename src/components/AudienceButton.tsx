import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Spinner,
  Center,
  IconButton,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaUsers } from 'react-icons/fa';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { MAIN_COLOR } from '@/constants';
import { useFetchAnswerFromAudience } from '@/hooks/useFetchAnswerFromAudience';
import { OptionPercentage, Question, QuizStatus } from '@/types';

type AudienceButtonProps = {
  currentQuestion: Question;
  quizStatus: QuizStatus;
};

export const AudienceButton = ({ currentQuestion, quizStatus }: AudienceButtonProps) => {
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
          <IconButton
            size='md'
            aria-label='Audience'
            variant='outline'
            icon={<FaUsers />}
            colorScheme={MAIN_COLOR}
            onClick={handleOnClick}
            isDisabled={audienceAnswer !== undefined || quizStatus !== 'ongoing'}
          />
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
