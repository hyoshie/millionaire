import { Button, SimpleGrid, Text } from '@chakra-ui/react';
import { BackToHomeButton } from './BackToHomeButton';
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
  checkAnswer: (option: Option) => void;
};

const OptionButtons = ({ question, quizStatus, checkAnswer }: OptionButtonsProps) => {
  const optionLabels = ['A', 'B', 'C', 'D'];
  const isDisabled = quizStatus !== 'ongoing';

  return (
    <SimpleGrid columns={2} spacing={4} w='100%'>
      {optionLabels.map((label) => {
        const option = label.toLowerCase() as Option;
        const isCorrectAnswer = question.correct_option === option;
        const colorScheme = isCorrectAnswer && isDisabled ? 'green' : 'blue';
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
  quizStatus: QuizStatus;
  nextQuestionOrResult: () => void;
};

const NextOrBackButton = ({ quizStatus, nextQuestionOrResult }: NextOrBackButtonProps) => {
  if (quizStatus === 'ongoing') return null;

  return quizStatus === 'correct' ? (
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
  quizStatus: QuizStatus;
  checkAnswer: (option: Option) => void;
  nextQuestionOrResult: () => void;
};

export const Quiz = ({ question, quizStatus, checkAnswer, nextQuestionOrResult }: QuizProps) => {
  return (
    <>
      <Text fontSize='2xl'>{question.question}</Text>
      <OptionButtons question={question} quizStatus={quizStatus} checkAnswer={checkAnswer} />
      <NextOrBackButton quizStatus={quizStatus} nextQuestionOrResult={nextQuestionOrResult} />
    </>
  );
};
