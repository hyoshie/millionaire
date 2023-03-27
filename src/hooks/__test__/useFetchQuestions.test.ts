import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';
import { useFetchQuestions } from '../useFetchQuestions';
import { CorrectOption, Difficulty, Question } from '@/types';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

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

describe('useFetchQuestions', () => {
  it('質問データの取得に成功した場合、質問データが返されること', async () => {
    mockedAxios.get.mockResolvedValue({ data: mockQuestions });

    const { result, waitForNextUpdate } = renderHook(() => useFetchQuestions());

    expect(result.current.isLoading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.questions).toEqual(mockQuestions);
    expect(result.current.error).toBe(null);
  });

  it('質問データの取得に失敗した場合、エラーを返すこと', async () => {
    const errorMessage = '質問データ取得に失敗しました。';
    mockedAxios.get.mockRejectedValue(new Error(errorMessage));

    const { result, waitForNextUpdate } = renderHook(() => useFetchQuestions());

    expect(result.current.isLoading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.questions).toEqual([]);
    expect(result.current.error.message).toBe(errorMessage);
  });
});
