import { Progress } from '@chakra-ui/react';
import { MAIN_COLOR } from '@/constants';

type TimeProgressProps = {
  progressValue: number;
};

export const TimeProgress = ({ progressValue }: TimeProgressProps) => (
  <Progress
    width='100%'
    value={progressValue}
    colorScheme={MAIN_COLOR}
    size='xs'
    borderRadius='md'
  />
);
