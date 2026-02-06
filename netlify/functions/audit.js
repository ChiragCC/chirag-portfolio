import OpenAI from "openai";

export async function handler() {
  try {
    const client = new OpenAI({
      apiKey: process.env.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
    });

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: "Reply only with OK" }
      ],
      temperature: 0
    });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: "OpenAI connected",
        reply: response.choices[0].message.content
      })
    };

  } catch (error) {
    console.error("Function crash:", error);

    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: "Function failed",
        error: error.message
      })
    };
  }
}
