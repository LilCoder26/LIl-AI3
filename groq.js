export default async function handler(req, res) {
  const apiKey = process.env.GROQ_API_KEY;

  const { userText } = req.body;

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "llama3-8b-8192",
      messages: [
        { role: "user", content: userText }
      ],
      max_tokens: 200
    })
  });

  const data = await response.json();
  res.status(200).json(data);
}
