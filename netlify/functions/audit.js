import OpenAI from "openai";

export async function handler(event) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is missing");
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: "Reply with only the word OK"
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: "OpenAI connected",
        reply: response.output_text
      })
    };

  } catch (err) {
    console.error("Audit function error:", err);

    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error: err.message
      })
    };
  }
}
