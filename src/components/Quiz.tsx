import { Button, SimpleGrid, Text } from '@chakra-ui/react';
import { BackToHomeButton } from './BackToHomeButton';
import { CorrectOption, Question } from 'src/types/index';

type OptionButtonProps = {
  label: string;
  optionText: string;
  isDisabled: boolean;
  colorScheme: string;
  onClick: () => void;
};

const OptionButton = ({
  label,
  optionText,
  isDisabled,
  colorScheme,
  onClick,
}: OptionButtonProps) => (
  <Button key={label} onClick={onClick} colorScheme={colorScheme} w='100%' isDisabled={isDisabled}>
    {`${label}: ${optionText}`}
  </Button>
);

type OptionButtonsProps = {
  question: Question;
  selectedOption: CorrectOption | null;
  isCorrect: boolean | null;
  checkAnswer: (option: CorrectOption) => void;
};

const OptionButtons = ({
  question,
  selectedOption,
  isCorrect,
  checkAnswer,
}: OptionButtonsProps) => {
  const optionLabels = ['A', 'B', 'C', 'D'];

  return (
    <SimpleGrid columns={2} spacing={4} w='100%'>
      {optionLabels.map((label) => {
        const option = label.toLowerCase() as CorrectOption;
        const isSelected = selectedOption === option;
        const isDisabled = selectedOption !== null;
        const colorScheme = isSelected ? (isCorrect ? 'green' : 'red') : 'blue';
        const optionText = String(question[`option_${option}` as keyof Question]);

        return (
          <OptionButton
            key={label}
            label={label}
            optionText={optionText}
            isDisabled={isDisabled}
            colorScheme={colorScheme}
            onClick={() => checkAnswer(option)}
          />
        );
      })}
    </SimpleGrid>
  );
};

type NextOrBackButtonProps = {
  selectedOption: CorrectOption | null;
  isCorrect: boolean | null;
  nextQuestion: () => void;
};

const NextOrBackButton = ({ selectedOption, isCorrect, nextQuestion }: NextOrBackButtonProps) => {
  if (selectedOption === null || isCorrect === null) return null;

  return isCorrect ? (
    <Button colorScheme='blue' onClick={nextQuestion}>
      Next Question
    </Button>
  ) : (
    <BackToHomeButton />
  );
};

type QuizProps = {
  question: Question;
  selectedOption: CorrectOption | null;
  isCorrect: boolean | null;
  checkAnswer: (option: CorrectOption) => void;
  nextQuestion: () => void;
};

export const Quiz = ({
  question,
  selectedOption,
  isCorrect,
  checkAnswer,
  nextQuestion,
}: QuizProps) => {
  return (
    <>
      <Text fontSize='2xl'>{question.question}</Text>
      <OptionButtons
        question={question}
        selectedOption={selectedOption}
        isCorrect={isCorrect}
        checkAnswer={checkAnswer}
      />
      <NextOrBackButton
        selectedOption={selectedOption}
        isCorrect={isCorrect}
        nextQuestion={nextQuestion}
      />
    </>
  );
};
