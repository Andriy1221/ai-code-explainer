import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";
import { Length } from "../../models/models";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { language, length, input } = req.body;
  const prompt = `The following code is writting in ${language}. Explain the code and keep the answer length within ${length} sentences. Here is the code: ${input}`;
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    temperature: 0.3,
    max_tokens: 400,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}
