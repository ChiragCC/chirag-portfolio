import OpenAI from "openai";

export async function handler() {
  try {
    // Create OpenAI client using Netlify env variable
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    console.log("Starting OpenAI health check...");

    // Simple test prompt
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: "Reply with only the word OK"
        }
      ],
      temperature: 0
    });

    console.log("OpenAI responded successfully");

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        status: "✅ OpenAI connected successfully",
        model: "gpt-4o-mini",
        reply: response.choices[0].message.content
      })
    };

  } catch (error) {
    console.error("OpenAI connection failed:", error);

    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        status: "❌ OpenAI connection failed",
        error: error.message
      })
    };
  }
}
