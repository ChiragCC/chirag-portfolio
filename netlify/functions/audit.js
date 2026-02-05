import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function handler(event) {
  try {
    const { url, channel } = JSON.parse(event.body);

    const prompt = `
You are a senior marketing analytics consultant.

Audit the website: ${url}
Channel focus: ${channel}

Analyze:
- Conversion funnel
- Tracking & analytics gaps
- Attribution issues
- CRO improvements
- Growth opportunities

Return clear bullet-point actionable insights.
    `;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.4
    });

    const result = completion.choices[0].message.content;

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ result })
    };

  } catch (error) {
    console.error("Audit error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "AI audit failed",
        details: error.message
      })
    };
  }
}
