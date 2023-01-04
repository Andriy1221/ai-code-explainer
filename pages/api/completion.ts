import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body);
  const { input } = req.body;
  const prompt = `Explain the following code and use as few words as possible: ${input}`;
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    temperature: 0.3,
    max_tokens: 400,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}
