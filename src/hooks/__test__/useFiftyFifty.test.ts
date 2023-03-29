import { act, renderHook } from '@testing-library/react-hooks';
import { QUIZ_OPTIONS } from '@/constants';
import { useFiftyFifty } from '@/hooks/useFiftyFifty';
import { Option, Question } from '@/types';

// const mockQuestion: Question = {
//   id: 1,
//   category_id: 1,
//   question: 'テスト質問1',
//   correct_option: 'a',
//   option_a: '選択肢1',
//   option_b: '選択肢2',
//   option_c: '選択肢3',
//   option_d: '選択肢4',
//   difficulty: 'easy',
//   created_at: new Date(),
//   updated_at: new Date(),
// };
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

describe('useFiftyFifty', () => {
  let result: any;

  it('正しい答え以外の選択肢が2つ非表示になっていること', () => {
    const question = mockQuestions[0];
    result = renderHook(() => useFiftyFifty(question)).result;
    act(() => {
      result.current.handleFiftyFifty();
    });

    const { hiddenOptions } = result.current;

    expect(hiddenOptions.length).toBe(2);
    expect(hiddenOptions).not.toContain(question.correct_option);
  });

  // // 100回テストを実行して、非表示になる選択肢がランダムであることを確認する
  it('非表示になる選択肢はランダムであること', () => {
    const question = mockQuestions[0];
    const testCounts = 100;
    const hiddenOptionsCount: Record<Option, number> = {
      a: 0,
      b: 0,
      c: 0,
      d: 0,
    };

    for (let i = 0; i < testCounts; i++) {
      const { result } = renderHook(() => useFiftyFifty(question));
      act(() => {
        result.current.handleFiftyFifty();
      });
      const { hiddenOptions } = result.current;

      hiddenOptions.forEach((option: Option) => {
        hiddenOptionsCount[option]++;
      });
    }

    // aは正解の選択肢なので、非表示になることはない
    const isRandom =
      hiddenOptionsCount.a == 0 &&
      hiddenOptionsCount.b > 0 &&
      hiddenOptionsCount.c > 0 &&
      hiddenOptionsCount.d > 0;

    expect(isRandom).toBe(true);
  });

  it('質問が変わるたびにhiddenOptionsがリセットされること', () => {
    const { result, rerender } = renderHook(({ question }) => useFiftyFifty(question), {
      initialProps: { question: mockQuestions[0] },
    });

    act(() => {
      result.current.handleFiftyFifty();
    });

    const hiddenOptions1 = result.current.hiddenOptions;

    // 質問をmockQuestion[1]に変更
    rerender({ question: mockQuestions[1] });

    const hiddenOptionsAfterChange = result.current.hiddenOptions;

    expect(hiddenOptionsAfterChange.length).toBe(0);
    expect(hiddenOptionsAfterChange).not.toEqual(hiddenOptions1);
  });
});
