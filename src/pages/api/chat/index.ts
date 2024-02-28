import OpenAI from 'openai';
// import getOpenAIClient from '../../../services/openai/client';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

let chatHistory = [{ role: 'system', content: 'You are a helpful assistant.' }];

export default async function handler(req, res) {
  const { method } = req;
  // const openai = getOpenAIClient();
  const prompt = req.body.input;
  console.log('prompt', prompt);

  switch (method) {
    case 'POST':
      try {
        // Replace the streaming API call with a single completion request
        const completion = await openai.chat.completions.create({
          messages: [{ role: "system", content: "You are a helpful assistant." }],
          model: "gpt-3.5-turbo",
          max_tokens: 1000,
        });
        console.log(completion, 'completion')

        // Assuming the completion response has the structure you need
        // Adjust according to the actual response structure
        const message = completion.choices[0]?.message?.content || '';
        console.log(message, 'message')

        // Set the Content-Type to application/json for a regular JSON response
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ message: message }));
      } catch (error) {
        console.error("Error generating completion:", error);
        res.status(500).send(JSON.stringify({ message: 'Error generating chat completion' }));
      }
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
