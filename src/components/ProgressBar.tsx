import { Progress } from '@chakra-ui/react';

type ProgressBarProps = {
  progressValue: number;
};

export const ProgressBar = ({ progressValue }: ProgressBarProps) => (
  <Progress width='100%' value={progressValue} colorScheme='blue' size='sm' borderRadius='md' />
);
