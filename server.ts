import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(express.json());

// Inicialización segura
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

app.post("/api/generate-strategy", async (req, res) => {
  try {
    const { whoAreYou, whoAreYouTalkingTo, whatToCommunicate, platform } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `Actúa como un estratega creativo. Genera ideas de contenido para ${whoAreYou} hablando a ${whoAreYouTalkingTo} sobre ${whatToCommunicate} en ${platform}. Responde solo en formato JSON puro.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    // Limpiamos el texto por si trae bloques de código
    const cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
    res.json(JSON.parse(cleaned));
  } catch (error) {
    console.error("Error en API:", error);
    res.status(500).json({ error: "Error en el motor" });
  }
});

// Esto es lo que Vercel necesita para funcionar
export default app;
