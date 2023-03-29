import { renderHook, act } from '@testing-library/react-hooks';
import { useTimer } from '../useTimer';
import { QUIZ_QUESTION_TIME } from '@/constants';

// timerのモックを使用するための設定
jest.useFakeTimers();

describe('useTimer', () => {
  it('タイマーが正しくカウントダウンされること', () => {
    const initialTime = 10;
    const passTime = 2;
    const onTimeOut = jest.fn();
    const { result } = renderHook(() => useTimer(initialTime, onTimeOut));

    expect(result.current.timeLeft).toBe(initialTime);

    act(() => {
      result.current.startTimer();
    });

    for (let i = 0; i < passTime; i++) {
      act(() => {
        jest.advanceTimersByTime(1000);
      });
    }

    expect(result.current.timeLeft).toBe(initialTime - passTime);
  });

  it('タイマーがストップされること', () => {
    const initialTime = 10;
    const passTime = 2;
    const onTimeOut = jest.fn();
    const { result } = renderHook(() => useTimer(initialTime, onTimeOut));

    act(() => {
      result.current.startTimer();
    });

    for (let i = 0; i < passTime; i++) {
      act(() => {
        jest.advanceTimersByTime(1000);
      });
      // 1秒でストップ
      if (i == 0) {
        act(() => {
          result.current.stopTimer();
        });
      }
    }

    expect(result.current.timeLeft).toBe(initialTime - 1);
  });

  it('タイマーがリセットされること', () => {
    const initialTime = 10;
    const onTimeOut = jest.fn();
    const { result } = renderHook(() => useTimer(initialTime, onTimeOut));

    act(() => {
      result.current.startTimer();
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    act(() => {
      result.current.resetTimer();
    });

    expect(result.current.timeLeft).toBe(initialTime);
  });

  it('タイムアウトが正しく呼び出されること', async () => {
    const onTimeOut = jest.fn();
    const { result } = renderHook(() => useTimer(QUIZ_QUESTION_TIME, onTimeOut));

    act(() => {
      result.current.startTimer();
    });

    // jest.advanceTimersByTime(QUIZ_QUESTION_TIME * 1000)だと、なぜか一秒しか進まないので、for文で回す
    for (let i = 0; i < QUIZ_QUESTION_TIME; i++) {
      act(() => {
        jest.advanceTimersByTime(1000);
      });
    }

    expect(onTimeOut).toHaveBeenCalledTimes(1);
  });
});
