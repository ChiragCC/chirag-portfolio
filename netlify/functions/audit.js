import OpenAI from "openai";

export async function handler(event) {
  try {
    console.log("Function invoked");
    console.log("Method:", event.httpMethod);

    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is missing");
    }

    console.log("API key found");

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    console.log("OpenAI client created");

    const res = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: "Reply with OK" }
      ],
      temperature: 0
    });

    console.log("OpenAI responded");

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: "OpenAI connected",
        reply: res.choices[0].message.content
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
