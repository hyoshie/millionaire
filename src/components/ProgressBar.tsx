import { Progress } from '@chakra-ui/react';

interface ProgressBarProps {
  progressValue: number;
}

const ProgressBar = ({ progressValue }: ProgressBarProps) => (
  <Progress width='100%' value={progressValue} colorScheme='blue' size='sm' borderRadius='md' />
);

export default ProgressBar;
