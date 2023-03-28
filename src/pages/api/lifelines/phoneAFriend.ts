import { type NextApiRequest, type NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const name = 'タカシ';
const characteristic = 'くだけた口調。敬語は使わない。日本語で話す。';

const chatTypeToPrompt = (userInput: string) => {
  const prompts = `The message should be no more than 50 words. It should start with a brief greeting, followed by some casual conversation about ${userInput}. The message should provide a 10% answer and a 50% hint, with the remaining content being random talk. Lastly, it should end with words of encouragement.`;
  return prompts;
};

// bodyにchatTypeを含める。chatTypeはbegin, middle, endのいずれか。
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (configuration.apiKey === undefined) {
    res.status(500).json({
      error: {
        message: 'No API key',
      },
    });
    return;
  }

  const userInput = req.body.userInput;
  const chatPrompt = chatTypeToPrompt(userInput);

  try {
    // OpenAIのAPIの使い方は以下を参考にした
    // https://platform.openai.com/docs/api-reference/chat/create?lang=node.js
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: `教えてchatGPT`,
        },
        {
          role: 'system',
          content: `Act as a chitchat AI named ${name}.
          Follow ${name}'s characteristic described and write a message.
          ${name}'s characteristic configuration: "${characteristic}"
          ${chatPrompt}`,
        },
      ],
    });
    const rawMessage = completion.data.choices[0].message?.content;

    // 改行が入るので削除
    // TODO: openAIのAPIで改行が入る理由要調査
    const message = rawMessage?.replace(/\n/g, '').trim();

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
