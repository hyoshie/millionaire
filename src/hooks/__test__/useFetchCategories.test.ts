import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';
import { useFetchCategories } from '../useFetchCategories';
import { Category } from 'src/types';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// テスト用のカテゴリーデータ
const mockCategories: Category[] = [
  {
    id: 1,
    name: 'カテゴリー1',
    description: 'カテゴリー1の説明',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 2,
    name: 'カテゴリー2',
    description: 'カテゴリー2の説明',
    created_at: new Date(),
    updated_at: new Date(),
  },
];

describe('useFetchCategories', () => {
  it('カテゴリーデータの取得に成功した場合、カテゴリーデータが返されること', async () => {
    mockedAxios.get.mockResolvedValue({ data: mockCategories });

    const { result, waitForNextUpdate } = renderHook(() => useFetchCategories());

    expect(result.current.isLoading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.categories).toEqual(mockCategories);
    expect(result.current.error).toBe(null);
  });

  it('カテゴリーデータの取得に失敗した場合、エラーを返すこと', async () => {
    const errorMessage = 'カテゴリーデータ取得に失敗しました。';
    mockedAxios.get.mockRejectedValue(new Error(errorMessage));

    const { result, waitForNextUpdate } = renderHook(() => useFetchCategories());

    expect(result.current.isLoading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.categories).toEqual([]);
    expect(result.current.error.message).toBe(errorMessage);
  });
});
