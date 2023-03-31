import { type NextApiRequest, type NextApiResponse } from 'next';
import { handleOpenAIRequest } from './handleOpenAIRequest';
import { openAIConfiguration } from 'lib/openAIClient';

const name = 'タカシ';
const characteristic = 'くだけた口調。敬語は使わない。日本語で話す。';

const chatTypeToPrompt = (userInput: string) => {
  const prompts = `Act as a chitchat AI named ${name}.
	Follow ${name}'s characteristic described and write a message.
	${name}'s characteristic configuration: "${characteristic}"
	Keep the message to 40 words or less. Begin with a brief greeting and engage in casual conversation about ${userInput}. Avoid providing a direct answer and instead offer several hints. Conclude with words of encouragement.`;
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

  const userInput = req.body.userInput;
  const chatPrompt = chatTypeToPrompt(userInput);

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
