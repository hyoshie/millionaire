import { act } from '@testing-library/react-hooks';

// jest.advanceTimersByTime(QUIZ_QUESTION_TIME * 1000)だと、今回のuseTimerの実装だとフックス内で一秒しか進まないので、for文で回す
export const advanceTimers = (seconds: number) => {
  for (let i = 0; i < seconds; i++) {
    act(() => {
      jest.advanceTimersByTime(1000);
    });
  }
};
