import { Button, Container, Text } from '@chakra-ui/react';

type ActionsProps = {
  isCorrect: boolean | null;
  correctChoice: string;
  onNextQuestion: () => void;
  onGoToHomePage: () => void;
};

export default function Actions({
  isCorrect,
  correctChoice,
  onNextQuestion,
  onGoToHomePage,
}: ActionsProps) {
  return (
    <Container>
      {isCorrect ? (
        <Button colorScheme='green' onClick={onNextQuestion}>
          Next Question
        </Button>
      ) : (
        <>
          <Text fontSize='xl' color='red.500'>
            Incorrect! The correct answer is {correctChoice}.
          </Text>
          <Button colorScheme='blue' onClick={onGoToHomePage}>
            Go to Home Page
          </Button>
        </>
      )}
    </Container>
  );
}
