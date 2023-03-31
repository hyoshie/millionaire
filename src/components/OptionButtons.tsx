import { Button, SimpleGrid } from '@chakra-ui/react';
import { QUIZ_OPTIONS } from '@/constants';
import { Option, Question, QuizStatus } from 'src/types/index';

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
  quizStatus: QuizStatus;
  checkAnswer: (_option: Option) => void;
  hiddenOptions: Option[];
};

export const OptionButtons = ({
  question,
  quizStatus,
  checkAnswer,
  hiddenOptions,
}: OptionButtonsProps) => {
  const isQuestionFinished = quizStatus !== 'ongoing';

  return (
    <SimpleGrid columns={2} spacing={4} w='100%'>
      {QUIZ_OPTIONS.map((option) => {
        const label = option.toUpperCase();
        const isCorrectAnswer = question.correct_option === option;
        const isDisabled = isQuestionFinished || hiddenOptions.includes(option);
        const colorScheme = isCorrectAnswer && isQuestionFinished ? 'green' : 'blue';
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
