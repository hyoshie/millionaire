import { renderHook, act } from '@testing-library/react-hooks';
import { Question, Option } from '../../types';
import { useQuiz } from '../useQuiz';
import { QUIZ_QUESTION_TIME } from '@/constants';

// timerのモックを使用するための設定
jest.useFakeTimers();

// next/routerのモック
const pushMock = jest.fn();

jest.mock('next/router', () => {
  return {
    useRouter: () => ({
      push: pushMock,
    }),
  };
});

beforeEach(() => {
  pushMock.mockClear();
});

// テスト用の質問データ
const mockQuestions: Question[] = [
  {
    id: 1,
    category_id: 1,
    question: 'テスト質問1',
    correct_option: 'a',
    option_a: '選択肢1',
    option_b: '選択肢2',
    option_c: '選択肢3',
    option_d: '選択肢4',
    difficulty: 'easy',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 2,
    category_id: 2,
    question: 'テスト質問2',
    correct_option: 'b',
    option_a: '選択肢1',
    option_b: '選択肢2',
    option_c: '選択肢3',
    option_d: '選択肢4',
    difficulty: 'easy',
    created_at: new Date(),
    updated_at: new Date(),
  },
];

const getIncorrectOption = (correctOption: Option): Option => {
  const options: Option[] = ['a', 'b', 'c', 'd'];
  const incorrectOptions = options.filter((option) => option !== correctOption);
  const randomIndex = Math.floor(Math.random() * incorrectOptions.length);
  return incorrectOptions[randomIndex];
};

describe('useQuiz', () => {
  it('初期状態が正しいこと', () => {
    const { result } = renderHook(() => useQuiz(mockQuestions));

    expect(result.current.currentQuestionIndex).toBe(0);
    expect(result.current.quizStatus).toBe('ongoing');
    expect(result.current.timeLeft).toBe(QUIZ_QUESTION_TIME);
  });

  it('正しい答えを選択した場合、quizStatusがcorrectになること', () => {
    const { result } = renderHook(() => useQuiz(mockQuestions));

    act(() => {
      result.current.checkAnswer(mockQuestions[0].correct_option);
    });

    expect(result.current.quizStatus).toBe('correct');
  });

  it('不正解を選択した場合、quizStatusがincorrectになること', () => {
    const { result } = renderHook(() => useQuiz(mockQuestions));
    const incorrectOption = getIncorrectOption(mockQuestions[0].correct_option);

    act(() => {
      result.current.checkAnswer(incorrectOption);
    });

    expect(result.current.quizStatus).toBe('incorrect');
  });

  it('次の質問に進むと、選択肢と進行状況がリセットされること', () => {
    const { result } = renderHook(() => useQuiz(mockQuestions));

    act(() => {
      result.current.checkAnswer(mockQuestions[0].correct_option);
    });

    expect(result.current.quizStatus).toBe('correct');

    act(() => {
      result.current.nextQuestionOrResult();
    });

    expect(result.current.currentQuestionIndex).toBe(1);
    expect(result.current.quizStatus).toBe('ongoing');
  });

  it('最後の質問で正解した場合、/resultに遷移すること', () => {
    const { result } = renderHook(() => useQuiz(mockQuestions));

    act(() => {
      result.current.checkAnswer(mockQuestions[0].correct_option);
    });

    act(() => {
      result.current.nextQuestionOrResult();
    });

    act(() => {
      result.current.checkAnswer(mockQuestions[1].correct_option);
    });

    act(() => {
      result.current.nextQuestionOrResult();
    });

    expect(pushMock).toHaveBeenCalledWith('/result');
  });

  it('タイムアウトした場合、quizStatusがincorrectになること', () => {
    const { result } = renderHook(() => useQuiz(mockQuestions));

    // jest.advanceTimersByTime(QUIZ_QUESTION_TIME * 1000)だと、なぜか一秒しか進まないので、for文で回す
    for (let i = 0; i < QUIZ_QUESTION_TIME; i++) {
      act(() => {
        jest.advanceTimersByTime(1000);
      });
    }

    expect(result.current.quizStatus).toBe('incorrect');
  });

  it('正解の選択肢を選んだ場合、タイマーが停止すること', () => {
    const { result } = renderHook(() => useQuiz(mockQuestions));
    const passTime = 2;

    for (let i = 0; i < passTime; i++) {
      act(() => {
        jest.advanceTimersByTime(1000);
      });
    }

    act(() => {
      result.current.checkAnswer(mockQuestions[0].correct_option);
    });

    expect(result.current.quizStatus).toBe('correct');
    expect(result.current.timeLeft).toBe(QUIZ_QUESTION_TIME - passTime);

    for (let i = 0; i < passTime; i++) {
      act(() => {
        jest.advanceTimersByTime(1000);
      });
    }

    expect(result.current.timeLeft).toBe(QUIZ_QUESTION_TIME - passTime);
  });

  it('不正解の選択肢を選んだ場合、タイマーが停止すること', () => {
    const { result } = renderHook(() => useQuiz(mockQuestions));
    const passTime = 2;
    const incorrectOption = getIncorrectOption(mockQuestions[0].correct_option);

    for (let i = 0; i < passTime; i++) {
      act(() => {
        jest.advanceTimersByTime(1000);
      });
    }

    act(() => {
      result.current.checkAnswer(incorrectOption);
    });

    expect(result.current.quizStatus).toBe('incorrect');
    expect(result.current.timeLeft).toBe(QUIZ_QUESTION_TIME - passTime);

    for (let i = 0; i < passTime; i++) {
      act(() => {
        jest.advanceTimersByTime(1000);
      });
    }

    expect(result.current.timeLeft).toBe(QUIZ_QUESTION_TIME - passTime);
  });
});
