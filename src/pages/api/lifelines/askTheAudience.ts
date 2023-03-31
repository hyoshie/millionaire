import { type NextApiRequest, type NextApiResponse } from 'next';
import { handleOpenAIRequest } from './handleOpenAIRequest';
import { Question } from '@/types';
import { openAIConfiguration } from 'lib/openAIClient';

const chatTypeToPrompt = (currentQuestion: Question) => {
  // TODO: ここでランダムに回答の精度が決まるようにする
  const prompts = `答えは下の回答例のようなjson形式のみで返してください。その他の言葉は入れないでください。
	回答例１：[{"option": "A", "percentage": 40},{"option": "B","percentage": 30},{"option": "C","percentage": 13},{"option": "D","percentage": 17}]
	回答例２：[{"option": "A", "percentage": 20},{"option": "B","percentage": 12},{"option": "C","percentage": 38},{"option": "D","percentage": 30}]
	
	問題：${currentQuestion.question}
	選択肢：A: ${currentQuestion.option_a}, B: ${currentQuestion.option_b}, C: ${currentQuestion.option_c}, D: ${currentQuestion.option_d}
	
	上記の4択問題について、一般的な回答割合を教えて。絶対に一つのoptionのpercentageが100にはならないように。できるだけ拮抗する結果を出して。その他のoptionはありません。`;
  return prompts;
};

// bodyにchatTypeを含める。chatTypeはbegin, middle, endのいずれか。
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (openAIConfiguration.apiKey === undefined) {
    res.status(500).json({
      error: {
        message: 'No API key',
      },
    });
    return;
  }

  const currentQuestion = req.body.currentQuestion;
  const chatPrompt = chatTypeToPrompt(currentQuestion);

  try {
    const message = await handleOpenAIRequest(req, chatPrompt);
    res.status(200).json({ message });
  } catch (error: Error | any) {
    if (error.response !== undefined) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ error: { message: error.message } });
    }
  }
}
