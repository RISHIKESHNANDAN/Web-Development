import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: '123456',
  dangerouslyAllowBrowser: true
})

console.log(openai.apiKey);