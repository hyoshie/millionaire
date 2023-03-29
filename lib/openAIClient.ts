import { Configuration, OpenAIApi } from 'openai';
import { OPENAI_API_KEY } from '@/config';

export const openaiConfiguration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
export const openai = new OpenAIApi(openaiConfiguration);
