import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';
import { ChatCompletionCreateParamsBase } from 'openai/resources/chat/completions';
// import getOpenAIClient from '../../../services/openai/client';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  const { method } = req;
  // const openai = getOpenAIClient();
  let chatHistory: ChatCompletionCreateParamsBase['messages'] = [
    { role: 'system', content: 'You are a helpful assistant.' },
  ];
  let prompt = req.body.prompt;
  if (prompt !== null) {
    chatHistory.push({ role: 'user', content: prompt });
  }

  const endpoint = req.query.endpoint;

  if (method === 'POST') {
    if (endpoint === 'stream') {
      const response = await openai.chat.completions.create({
        messages: chatHistory,
        model: 'gpt-3.5-turbo',
        max_tokens: 1000,
        stream: true,
      });
      return new StreamingTextResponse(OpenAIStream(response));
    } else {
      try {
        // Replace the streaming API call with a single completion request
        if (prompt !== null) {
          chatHistory.push({ role: 'user', content: prompt });
        }
        const completion = await openai.chat.completions.create({
          messages: chatHistory,
          model: 'gpt-3.5-turbo',
          max_tokens: 1000,
        });

        // Assuming the completion response has the structure you need
        // Adjust according to the actual response structure
        const message = completion.choices[0]?.message?.content || '';

        // Set the Content-Type to application/json for a regular JSON response
        // res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ message: message }));
      } catch (error) {
        console.error('Error generating completion:', error);
        res
          .status(500)
          .send(
            JSON.stringify({ message: 'Error generating chat completion' })
          );
      }
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
