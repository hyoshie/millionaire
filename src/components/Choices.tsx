import { Button, SimpleGrid } from '@chakra-ui/react';

type ChoicesProps = {
  choices: string[];
  selectedChoiceIndex: number | null;
  isCorrect: boolean | null;
  onChoiceClick: (index: number) => void;
};

export default function Choices({
  choices,
  selectedChoiceIndex,
  isCorrect,
  onChoiceClick,
}: ChoicesProps) {
  return (
    <SimpleGrid columns={2} spacing={4} w='100%'>
      {choices.map((choice, index) => (
        <Button
          key={index}
          onClick={() => onChoiceClick(index)}
          colorScheme={index === selectedChoiceIndex ? (isCorrect ? 'green' : 'red') : 'blue'}
          w='100%'
          isDisabled={selectedChoiceIndex !== null}
        >
          {choice}
        </Button>
      ))}
    </SimpleGrid>
  );
}
