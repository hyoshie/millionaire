import { renderHook, act } from '@testing-library/react-hooks';
import { useTimer } from '../useTimer';
import { advanceTimers } from './utils';
import { QUIZ_QUESTION_TIME } from '@/constants';

// timerのモックを使用するための設定
jest.useFakeTimers();

describe('useTimer', () => {
  let result: any;
  const initialTime = 10;
  const onTimeOut: jest.Mock = jest.fn();

  beforeEach(() => {
    onTimeOut.mockReset();
    result = renderHook(() => useTimer(initialTime, onTimeOut)).result;
  });

  it('タイマーが正しくカウントダウンされること', () => {
    act(() => {
      result.current.startTimer();
    });

    const passTime = 2;
    advanceTimers(passTime);

    expect(result.current.timeLeft).toBe(initialTime - passTime);
  });

  it('タイマーがストップされること', () => {
    act(() => {
      result.current.startTimer();
    });

    const passTime = 2;
    advanceTimers(passTime);
    act(() => {
      result.current.stopTimer();
    });
    advanceTimers(passTime);

    expect(result.current.timeLeft).toBe(initialTime - passTime);
  });

  it('タイマーがリセットされること', () => {
    act(() => {
      result.current.startTimer();
    });

    advanceTimers(1);

    act(() => {
      result.current.resetTimer();
    });

    expect(onTimeOut).toHaveBeenCalledTimes(0);
    expect(result.current.timeLeft).toBe(initialTime);
  });

  it('タイムアウトが正しく呼び出されること', async () => {
    act(() => {
      result.current.startTimer();
    });

    advanceTimers(QUIZ_QUESTION_TIME);

    expect(onTimeOut).toHaveBeenCalledTimes(1);
  });
});
