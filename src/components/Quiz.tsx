import { Box, Button, SimpleGrid, Text } from '@chakra-ui/react';
import { CorrectOption, Question } from 'src/types/index';

type QuizProps = {
  question: Question;
  selectedOption: CorrectOption | null;
  isCorrect: boolean | null;
  checkAnswer: (option: CorrectOption) => void;
  nextQuestion: () => void;
};

export function Quiz({
  question,
  selectedOption,
  isCorrect,
  checkAnswer,
  nextQuestion,
}: QuizProps) {
  const optionLabels = ['A', 'B', 'C', 'D'];

  return (
    <>
      <Box>
        <Text fontSize='2xl'>{question.question}</Text>
      </Box>
      <SimpleGrid columns={2} spacing={4} w='100%'>
        {optionLabels.map((label) => {
          const option = label.toLowerCase() as CorrectOption;
          const isSelected = selectedOption === option;
          const isDisabled = selectedOption !== null;
          const colorScheme = isSelected ? (isCorrect ? 'green' : 'red') : 'blue';

          return (
            <Button
              key={label}
              onClick={() => checkAnswer(option)}
              colorScheme={colorScheme}
              w='100%'
              isDisabled={isDisabled}
            >
              <>
                {label}: {question[`option_${option}` as keyof Question]}
              </>
            </Button>
          );
        })}
        {selectedOption !== null && (
          <Button colorScheme='blue' onClick={nextQuestion}>
            Next Question
          </Button>
        )}
      </SimpleGrid>
    </>
  );
}
