import { renderHook, act } from '@testing-library/react-hooks';
import axios from 'axios';
import { useFetchAnswerFromAudience } from '../useFetchAnswerFromAudience';
import { Question, OptionPercentage } from '@/types';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockResponse: OptionPercentage[] = [
  { option: 'a', percentage: 30 },
  { option: 'b', percentage: 40 },
  { option: 'c', percentage: 20 },
  { option: 'd', percentage: 10 },
];

const mockQuestion: Question = {
  id: 1,
  category_id: 1,
  question: 'テストの質問',
  option_a: '選択肢A',
  option_b: '選択肢B',
  option_c: '選択肢C',
  option_d: '選択肢D',
  correct_option: 'a',
  difficulty: 'easy',
  created_at: new Date(),
  updated_at: new Date(),
};

describe('useFetchAnswerFromAudience', () => {
  it('Audienceからの回答取得に成功した場合、回答データが返されること', async () => {
    mockedAxios.post.mockResolvedValue({ data: { message: mockResponse } });

    const { result } = renderHook(() => useFetchAnswerFromAudience());

    expect(result.current.isLoading).toBe(true);

    let answer;
    await act(async () => {
      answer = await result.current.fetchAnswerFromAudience(mockQuestion);
    });

    expect(result.current.isLoading).toBe(false);
    expect(answer).toEqual(mockResponse);
    expect(result.current.error).toBe(null);
  });

  it('Audienceからの回答取得に失敗した場合、エラーを返すこと', async () => {
    const errorMessage = 'Audienceからの回答取得に失敗しました';
    mockedAxios.post.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useFetchAnswerFromAudience());

    expect(result.current.isLoading).toBe(true);

    await act(async () => {
      await result.current.fetchAnswerFromAudience(mockQuestion);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error.message).toEqual(errorMessage);
  });
});
