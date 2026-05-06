import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.post("/", async (req, res) => {
  const apiKey = process.env.GROQ_API_KEY;
  const { userText } = req.body;

  if (!userText) {
    return res.status(400).json({ error: "Missing userText" });
  }

  try {
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
    res.json(data);

  } catch (error) {
    console.error("Groq API error:", error);
    res.status(500).json({ error: "Groq API failed" });
  }
});

export default router;
