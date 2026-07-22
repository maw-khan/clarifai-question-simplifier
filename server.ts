import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const PORT = 3000;
let aiClient: GoogleGenAI | null = null;

// Lazy initialization of Gemini client
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // API endpoint for simplifying study questions
  app.post("/api/simplify", async (req, res) => {
    try {
      const { question } = req.body;
      if (!question || typeof question !== "string" || !question.trim()) {
        return res.status(400).json({ error: "Please enter a question." });
      }

      // Initialize client lazily
      const ai = getGeminiClient();

      const systemInstruction = `You are an educational assistant.

Your task is NOT to solve the student's question directly.

Given a study question, return ONLY the following four sections:

1. Simplified Question
- Rewrite the question in simple, easy-to-understand language.
- Keep it under 25 words.

2. Explanation
- Briefly explain what the question is asking.
- Maximum 50 words.

3. Key Concepts
- List exactly 3 or 4 short bullet points.
- Only include the important concepts needed to understand the question.

4. Helpful Hint
- Give one short hint that helps the student think about the solution.
- Do not reveal or solve the final answer.
- Maximum 30 words.

Rules:
- Be concise.
- Do not add introductions or conclusions.
- Do not answer the question itself.
- Keep the entire response under approximately 150 words.
- Return the output in the exact format below.

OUTPUT FORMAT

Simplified Question:
...

Explanation:
...

Key Concepts:
- ...
- ...
- ...
- ...

Helpful Hint:
...`;

      const prompt = `Study Question:
${question}

Please respond using the required output format only.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-lite",
        contents: prompt,
        config: {
          systemInstruction,
        },
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("Unable to simplify the question right now. Please try again.");
      }

      // Parser for the specified format
      const cleanText = responseText.replace(/\*\*/g, "").trim();

      const simplifiedQuestionRegex = /(?:Simplified Question|1\.\s+Simplified\s+Question):\s*([\s\S]*?)(?=(?:Explanation|2\.\s+Explanation|Key\s+Concepts|3\.\s+Key\s+Concepts|Helpful\s+Hint|4\.\s+Helpful\s+Hint):|$)/i;
      const explanationRegex = /(?:Explanation|2\.\s+Explanation):\s*([\s\S]*?)(?=(?:Key\s+Concepts|3\.\s+Key\s+Concepts|Helpful\s+Hint|4\.\s+Helpful\s+Hint):|$)/i;
      const keyConceptsRegex = /(?:Key\s+Concepts|3\.\s+Key\s+Concepts):\s*([\s\S]*?)(?=(?:Helpful\s+Hint|4\.\s+Helpful\s+Hint):|$)/i;
      const helpfulHintRegex = /(?:Helpful\s+Hint|4\.\s+Helpful\s+Hint):\s*([\s\S]*?)$/i;

      const sqMatch = cleanText.match(simplifiedQuestionRegex);
      const expMatch = cleanText.match(explanationRegex);
      const kcMatch = cleanText.match(keyConceptsRegex);
      const hhMatch = cleanText.match(helpfulHintRegex);

      let simplifiedQuestion = sqMatch ? sqMatch[1].trim() : "";
      let explanation = expMatch ? expMatch[1].trim() : "";
      let keyConceptsRaw = kcMatch ? kcMatch[1].trim() : "";
      let helpfulHint = hhMatch ? hhMatch[1].trim() : "";

      // Fallback parser if regex fails
      if (!simplifiedQuestion && !explanation) {
        const paragraphs = cleanText.split(/\n{2,}/);
        if (paragraphs.length >= 4) {
          simplifiedQuestion = paragraphs[0].replace(/^(?:Simplified Question|1\.\s+Simplified\s+Question):\s*/i, "").trim();
          explanation = paragraphs[1].replace(/^(?:Explanation|2\.\s+Explanation):\s*/i, "").trim();
          keyConceptsRaw = paragraphs[2].replace(/^(?:Key\s+Concepts|3\.\s+Key\s+Concepts):\s*/i, "").trim();
          helpfulHint = paragraphs[3].replace(/^(?:Helpful\s+Hint|4\.\s+Helpful\s+Hint):\s*/i, "").trim();
        }
      }

      // Convert raw key concepts bullets into strings
      const keyConcepts = keyConceptsRaw
        .split(/\n+/)
        .map((line) => line.trim())
        .filter((line) => line.length > 0)
        .map((line) => line.replace(/^[-*•\s\d\.]+\s*/, "").trim())
        .filter((line) => line.length > 0);

      // Default values to prevent empty responses
      if (!simplifiedQuestion) simplifiedQuestion = "Could not parse simplified question.";
      if (!explanation) explanation = "Could not parse explanation.";
      if (keyConcepts.length === 0) keyConcepts.push("No key concepts extracted.");
      if (!helpfulHint) helpfulHint = "Could not parse helpful hint.";

      res.json({
        simplifiedQuestion,
        explanation,
        keyConcepts,
        helpfulHint,
      });
    } catch (error: any) {
      console.error("Gemini simplification error:", error);
      res.status(500).json({
        error: "Unable to simplify the question right now. Please try again.",
      });
    }
  });

  // Serve static assets or use Vite in dev mode
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
