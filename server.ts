import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Parse incoming request JSON bodies
app.use(express.json());

// Initialize the GoogleenAI SDK server-side
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Configure the strategy generation route
app.post("/api/generate-strategy", async (req, res) => {
  try {
    const { niche, customTopic, depth, tone, creativity } = req.body;
    
    if (!niche) {
      return res.status(400).json({ error: "El nicho es obligatorio." });
    }

    // Determine the temperature according to creativity intensity
    let temperature = 0.82;
    if (creativity === "Estándar / Conservadora") {
      temperature = 0.50;
    } else if (creativity === "Vanguardista / Creativa") {
      temperature = 0.85;
    } else if (creativity === "Disruptiva / Extrema") {
      temperature = 1.15;
    }

    const prompt = `Actúa como un estratega de contenido de élite para la marca premium "LYTH AI".
Genera una estrategia de contenido moderna, sofisticada y con estética pulida de vanguardia.
Queremos 5 tendencias innovadoras y ganchos de contenido viral en español para el sector de "${niche}"${customTopic ? ` enfocados específicamente en el tema: "${customTopic}"` : ''}.

NOTAS DE REFINAMIENTO SELECCIONADAS POR EL USUARIO:
- Profundidad de tendencia: "${depth || "Estándar"}". Asegúrate de que las tendencias reflejen este enfoque de profundidad de manera coherente en su explicación técnica.
- Tono del gancho (hook): "${tone || "Audaz / Provocativo"}". Ajusta las palabras, expresiones, y la intriga a este estilo de tono de voz exacto.
- Estilo del ángulo: "${creativity || "Vanguardista / Creativa"}". Haz que los ángulos y formatos elegidos reflejen este nivel de innovación disruptiva.

REGLAS DE FORMATO Y CONTENIDO (Debes seguir estrictamente esto):
1. 'tendencia': El título de la tendencia o tema emergente del mercado (máximo 60 caracteres). No incluyas números de ranking en el texto.
2. 'hook': Un gancho sumamente ingenioso (máximo 120 caracteres) para atrapar al lector en los primeros 3 segundos, redactado segun el tono de gancho indicado.
3. 'angulo': Una de estas opciones exactamente según combine mejor: "Opinión Incómoda", "Caso de Estudio", "Storytelling", "Fun Fact", "Guía Rápida", "Alerta de Tendencia", "Detrás de Escena", "Análisis de Datos".
4. 'formato': Una de estas opciones exactamente según combine mejor con el ángulo: "Short Video", "Carrusel", "Hilo Detallado", "Video Tutorial", "Infografía", "Post Editorial", "Demo Técnica".
5. 'plataforma': La combinación perfecta donde brille, por ejemplo: "TikTok / Reels", "LinkedIn", "Twitter / X", "YouTube Shorts", "Instagram", "LinkedIn / Medium".
6. 'percentage': Un valor de crecimiento exponencial (ej. número entero entre 75 y 100 representing +75% a +100%).
`;

    // Query Gemini 3.5 Flash for fast, powerful structured generation
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "Eres el estratega principal de LYTH AI. Respondes con estrategias de contenido ingeniosas y de vanguardia según las pautas de refinamiento del usuario.",
        temperature: temperature,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              tendencia: { 
                type: Type.STRING, 
                description: "Título elegante de la tendencia emergente" 
              },
              hook: { 
                type: Type.STRING, 
                description: "Gancho persuasivo, directo o polémico para abrir el post" 
              },
              angulo: { 
                type: Type.STRING, 
                description: "Ángulo estratégico de entrega" 
              },
              formato: { 
                type: Type.STRING, 
                description: "Formato visual recomendado" 
              },
              plataforma: { 
                type: Type.STRING, 
                description: "Redes sociales ideales" 
              },
              percentage: { 
                type: Type.INTEGER, 
                description: "Porcentaje de incremento de demanda (entre 72 y 99)" 
              }
            },
            required: ["tendencia", "hook", "angulo", "formato", "plataforma", "percentage"]
          }
        }
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("No se recibió respuesta de texto del motor inteligente.");
    }

    const strategies = JSON.parse(resultText.trim());
    return res.json({ strategies });

  } catch (error: any) {
    console.error("Error en la llamada de Gemini API:", error);
    return res.status(500).json({ 
      error: "Ocurrió un error al procesar la estrategia con Gemini.",
      details: error.message || error 
    });
  }
});

// Setup Vite Dev server or Serve static files in production
async function runServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting in DEVELOPMENT mode with Vite Middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting in PRODUCTION mode with static files serving...");
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[LYTH AI] Server running dynamically on http://localhost:${PORT}`);
  });
}

runServer().catch(err => {
  console.error("Falla crítica al iniciar el servidor de LYTH AI:", err);
});
