import { Button, SimpleGrid, Text } from '@chakra-ui/react';
import { BackToHomeButton } from './BackToHomeButton';
import { CorrectOption, Question } from 'src/types/index';

// 回答ボタンをレンダリングするためのコンポーネント
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

// 回答ボタンをレンダリングするためのコンポーネント
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

// 次の質問に進むボタンをレンダリングするためのコンポーネント
type NextOrBackButtonProps = {
  selectedOption: CorrectOption | null;
  isCorrect: boolean | null;
  nextQuestionOrResult: () => void;
};

const NextOrBackButton = ({
  selectedOption,
  isCorrect,
  nextQuestionOrResult,
}: NextOrBackButtonProps) => {
  if (selectedOption === null || isCorrect === null) return null;

  return isCorrect ? (
    <Button colorScheme='blue' onClick={nextQuestionOrResult}>
      Next Question
    </Button>
  ) : (
    <BackToHomeButton />
  );
};

// クイズの表示をレンダリングするためのコンポーネント
type QuizProps = {
  question: Question;
  selectedOption: CorrectOption | null;
  isCorrect: boolean | null;
  checkAnswer: (option: CorrectOption) => void;
  nextQuestionOrResult: () => void;
};

export const Quiz = ({
  question,
  selectedOption,
  isCorrect,
  checkAnswer,
  nextQuestionOrResult,
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
        nextQuestionOrResult={nextQuestionOrResult}
      />
    </>
  );
};
