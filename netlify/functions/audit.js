export async function handler(event) {
  try {
    const { url, channel } = JSON.parse(event.body);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        result: `
✅ Netlify Function is working!

Website: ${url}
Channel: ${channel}

This confirms:
• Frontend → Backend connection ✅
• Netlify Functions detected ✅
• POST request handled correctly ✅

Next step: connect OpenAI.
        `
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Function error",
        details: error.message
      })
    };
  }
}
