export async function handler(event) {
  try {
    const { url, channel } = JSON.parse(event.body || "{}");

    if (!url || !channel) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing url or channel" })
      };
    }

    const prompt = `
You are a senior marketing analytics consultant.

Audit the website: ${url}
Primary channel: ${channel}

Analyze:
- Conversion funnel
- Tracking & analytics gaps
- Attribution issues
- CRO improvements
- Growth opportunities

Give clear, actionable bullet points.
    `;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: prompt
      })
    });

    const data = await response.json();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        result: data.output_text
      })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
}
