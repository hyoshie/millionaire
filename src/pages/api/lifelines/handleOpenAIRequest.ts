import { type NextApiRequest } from 'next';
import { openai } from 'lib/openAIClient';

export async function handleOpenAIRequest(req: NextApiRequest, chatPrompt: string) {
  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: ``,
        },
        {
          role: 'system',
          content: `${chatPrompt}`,
        },
      ],
    });

    const rawMessage = completion.data.choices[0].message?.content;
    const message = rawMessage?.replace(/\n/g, '').trim();
    return message;
  } catch (error: Error | any) {
    throw error;
  }
}
