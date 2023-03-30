import { renderHook, act } from '@testing-library/react-hooks';
import axios from 'axios';
import { useFetchAnswerFromGPT } from '../useFetchAnswerFromGPT';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockResponse = {
  message: 'GPTからの回答',
};

describe('useFetchAnswerFromGPT', () => {
  it('GPTからの回答取得に成功した場合、回答データが返されること', async () => {
    mockedAxios.post.mockResolvedValue({ data: mockResponse });

    const { result } = renderHook(() => useFetchAnswerFromGPT());

    expect(result.current.isLoading).toBe(true);

    await act(async () => {
      const answer = await result.current.fetchAnswerFromGPT('テスト入力');

      expect(result.current.isLoading).toBe(false);
      expect(answer).toEqual(mockResponse.message);
      expect(result.current.error).toBe(null);
    });
  });

  it('GPTからの回答取得に失敗した場合、エラーを返すこと', async () => {
    const errorMessage = 'GPTからの回答取得に失敗しました。';
    mockedAxios.post.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useFetchAnswerFromGPT());

    expect(result.current.isLoading).toBe(true);

    await act(async () => {
      try {
        await result.current.fetchAnswerFromGPT('テスト入力');
      } catch (error) {
        const typedError = error as Error;
        expect(result.current.isLoading).toBe(false);
        expect(typedError.message).toBe(errorMessage);
        expect(result.current.error.message).toBe(errorMessage);
      }
    });
  });
});
