import { renderHook, act } from '@testing-library/react-hooks';
import { Question, CorrectOption, Difficulty } from '../../types';
import { useQuiz } from '../useQuiz';

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
    correct_option: 'a' as CorrectOption,
    option_a: '選択肢1',
    option_b: '選択肢2',
    option_c: '選択肢3',
    option_d: '選択肢4',
    difficulty: 'easy' as Difficulty,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 2,
    category_id: 2,
    question: 'テスト質問2',
    correct_option: 'b' as CorrectOption,
    option_a: '選択肢1',
    option_b: '選択肢2',
    option_c: '選択肢3',
    option_d: '選択肢4',
    difficulty: 'easy' as Difficulty,
    created_at: new Date(),
    updated_at: new Date(),
  },
];

describe('useQuiz', () => {
  it('初期状態が正しいこと', () => {
    const { result } = renderHook(() => useQuiz(mockQuestions));

    expect(result.current.currentQuestionIndex).toBe(0);
    expect(result.current.selectedOption).toBe(null);
    expect(result.current.isCorrect).toBe(null);
  });

  it('正しい答えを選択した場合、isCorrectがtrueになること', () => {
    const { result } = renderHook(() => useQuiz(mockQuestions));

    act(() => {
      result.current.checkAnswer(mockQuestions[0].correct_option);
    });

    expect(result.current.isCorrect).toBe(true);
  });

  it('不正解を選択した場合、isCorrectがfalseになること', () => {
    const { result } = renderHook(() => useQuiz(mockQuestions));

    act(() => {
      result.current.checkAnswer('b' as CorrectOption);
    });

    expect(result.current.isCorrect).toBe(false);
  });

  it('次の質問に進むと、選択肢と正誤がリセットされること', () => {
    const { result } = renderHook(() => useQuiz(mockQuestions));

    act(() => {
      result.current.checkAnswer(mockQuestions[0].correct_option);
    });

    expect(result.current.isCorrect).toBe(true);

    act(() => {
      result.current.nextQuestionOrResult();
    });

    expect(result.current.currentQuestionIndex).toBe(1);
    expect(result.current.selectedOption).toBe(null);
    expect(result.current.isCorrect).toBe(null);
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
});
