import { Configuration, OpenAIApi } from 'openai';
import { OPENAI_API_KEY } from '@/config';

export const openAIConfiguration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
export const openAI = new OpenAIApi(openAIConfiguration);
