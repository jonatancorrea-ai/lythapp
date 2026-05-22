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

// Lazy-initialize the Google GenAI SDK server-side to prevent crashing on startup if the API key is missing
let aiInstance: GoogleGenAI | null = null;
function getAIInstance() {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "" || apiKey === "undefined") {
      throw new Error("GEMINI_API_KEY is not configured.");
    }
    aiInstance = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

// Helper to safely clean and parse JSON that might contain markdown blocks
function cleanAndParseJSON(text: string) {
  let cleaned = text.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\n?/i, "");
    cleaned = cleaned.replace(/\n?```$/, "");
  }
  return JSON.parse(cleaned.trim());
}

// Local fallback database generator to simulate curation when API Key is missing or fails.
// It dynamically adapts to user inputs to create personalized other-level emotional social hooks.
function getFallbackStrategies(whoAreYou: string, whoAreYouTalkingTo: string, whatToCommunicate: string, platform: string) {
  const role = whoAreYou || "Creador / Especialista";
  const audience = whoAreYouTalkingTo || "Profesionales y creadores";
  const msg = whatToCommunicate || "la evolución del ecosistema digital actual";
  const limitWords = (str: string, max: number) => {
    const s = str.trim();
    return s.length > max ? s.slice(0, max) + "..." : s;
  };

  const cleanMsg = limitWords(msg, 60);

  // We craft organic premium templates tailored strictly to user's parameters.
  // This feels like real human copywriting even in fallback mode.
  return [
    {
      hook: `¿De verdad crees que ${cleanMsg} resolverá tu negocio? El gran peligro real para los ${audience} es otro.`,
      angulo: "opinión incómoda",
      enfoque: "hot take",
      formato: platform === "Instagram" || platform === "TikTok" ? "talking video" : "short thread",
      emocion: "uncomfortable truth",
      percentage: Math.floor(Math.random() * 8) + 91
    },
    {
      hook: `He auditado docenas de marcas intentando comunicar ${cleanMsg}. El 90% comete este error básico.`,
      angulo: "ejecución vs consumo",
      enfoque: "experiencia personal",
      formato: platform === "Threads" || platform === "X" ? "tweet" : "carousel",
      emocion: "feeling ahead",
      percentage: Math.floor(Math.random() * 8) + 85
    },
    {
      hook: `La razón por la que destacar hablando sobre ${cleanMsg} ya no depende del mérito técnico. Depende de esto:`,
      angulo: "tensión del creador",
      enfoque: "reflexión",
      formato: "hook + reflection",
      emocion: "creator frustration",
      percentage: Math.floor(Math.random() * 10) + 88
    },
    {
      hook: `A los ${audience} no les importa la teoría sobre ${cleanMsg}. Quieren ver la fricción de tu proceso real.`,
      angulo: "cambio de comportamiento",
      enfoque: "disruptivo",
      formato: "conversational post",
      emocion: "perspective shift",
      percentage: Math.floor(Math.random() * 12) + 78
    }
  ];
}

// Configure the strategy generation route
app.post("/api/generate-strategy", async (req, res) => {
  try {
    const { whoAreYou, whoAreYouTalkingTo, whatToCommunicate, platform } = req.body;
    
    if (!whatToCommunicate) {
      return res.status(400).json({ error: "El campo 'qué quieres comunicar' es obligatorio." });
    }

    console.log(`[LYTH API] Recibida petición de estrategia premium:`, { whoAreYou, whoAreYouTalkingTo, whatToCommunicate, platform });

    // Validate if GEMINI_API_KEY is available and is a real key (not placeholder)
    const apiKey = process.env.GEMINI_API_KEY;
    const isKeyPlaceholder = !apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "" || apiKey === "undefined";

    if (isKeyPlaceholder) {
      console.warn(`[LYTH API] GEMINI_API_KEY no está configurada o es de prueba. Retornando curación premium adaptativa.`);
      const fallback = getFallbackStrategies(whoAreYou, whoAreYouTalkingTo, whatToCommunicate, platform);
      return res.json({ strategies: fallback, isFallback: true });
    }

    const prompt = `Actúa como un estratega creativo y curador de contenido de élite: "LYTH".
Tu propósito NO es generar contenido automatizado y genérico de IA. Tu misión es transformar ideas y conceptos sencillos en estrategias de contenido social-first premium, calibrando la psicología viral, comunicación emocional y formatos nativos.

DATOS DE ENTRADA ESTRATÉGICA PROPORCIONADOS POR EL USUARIO:
- ¿Quién soy / Mi rol?: "${whoAreYou || "Creador / Profesional premium"}"
- ¿A quién le hablo?: "${whoAreYouTalkingTo || "Mi nicho y audiencia ideal"}"
- ¿Qué quiero comunicar?: "${whatToCommunicate}"
- ¿Dónde quiero publicarlo?: "${platform || "Cualquier plataforma social moderna (X, Threads, Instagram o TikTok)"}"

Tu output debe constar exactamente de entre 3 y 5 ideas de contenido altamente curadas, pulidas y de altísima calidad. Calidad sobre cantidad.

REGLAS DE FORMATO Y CONTENIDO (Sigue esto de manera estricta):
1. "hook": Un gancho sumamente inteligente y magnético (máximo 120 caracteres) nativo de la plataforma seleccionada ("${platform}"). Debe crear tensión, curiosidad, fricción emocional o contradicción de inmediato. EVITA clichés obsoletos corporativos de IA o ganchos secos estilo "5 consejos para" o "descubre cómo".
2. "angulo": La perspectiva de comunicación estratégica (ejemplos válidos: "opinión incómoda", "cambio de comportamiento", "tensión del creador", "predicción de futuro", "shift de identidad", "ejecución vs consumo", "contradicción emocional", "observación social").
3. "enfoque": El estilo de ejecución (ejemplos válidos: "storytelling", "hot take", "reflexión", "predicción", "opinión", "conversacional", "educativo", "disruptivo", "experiencia personal", "observación de internet").
4. "formato": El formato de post ideal y nativo para la plataforma seleccionada (ejemplos válidos: "short thread", "tweet", "mini story", "talking video", "carousel", "POV", "conversational post", "hook + reflection", "screenshot-style post", "personal insight").
5. "emocion": El motor psicológico del engagement (ejemplos válidos: "curiosity tension", "uncomfortable truth", "aspirational energy", "subtle urgency", "identity validation", "emotional resonance", "future anxiety", "feeling ahead", "social proof tension", "creator frustration", "perspective shift").
6. "percentage": Un número entero del 75 al 100 que representa el "Índice de Retención Tracción" estimado de la atención.

Escribe el gancho ("hook") directamente en ESPAÑOL fluido, pulido, sofisticado y sumamente humano. Usa la jerga de la economía de creadores e internet culture sin rodeos ni explicaciones corporativas. Sin emojis innecesivos.
`;

    const response = await getAIInstance().models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        systemInstruction: "Eres LYTH, un estratega creativo premium de inteligencia artificial que ayuda a creadores, marcas y profesionales a estructurar ideas de contenido social-first que se sienten humanas, emocionalmente inteligentes, estratégicamente afiladas y de nivel elite. Eludes clichés corporativos, lenguaje de IA obvio y ganchos predecibles.",
        temperature: 0.85,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              hook: { 
                type: Type.STRING, 
                description: "Scroll-stopping highly curated opening hook idea in Spanish, native to social-first platforms" 
              },
              angulo: { 
                type: Type.STRING, 
                description: "Strategic communication perspective or tension behind the idea in Spanish (lowercase)" 
              },
              enfoque: { 
                type: Type.STRING, 
                description: "Execution style or communication approach in Spanish (lowercase)" 
              },
              formato: { 
                type: Type.STRING, 
                description: "The ideal creator-native post layout in Spanish (lowercase)" 
              },
              emocion: { 
                type: Type.STRING, 
                description: "The emotional energy or psychological driver in Spanish/English (lowercase)" 
              },
              percentage: { 
                type: Type.INTEGER, 
                description: "Estimated tracción or attention score between 75 and 100" 
              }
            },
            required: ["hook", "angulo", "enfoque", "formato", "emocion", "percentage"]
          }
        }
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("No se recibió respuesta de texto del motor inteligente.");
    }

    const strategies = cleanAndParseJSON(resultText);
    return res.json({ strategies, isFallback: false });

  } catch (error: any) {
    console.error("Error en la llamada de Gemini API, aplicando fallback de seguridad:", error);
    try {
      const { whoAreYou, whoAreYouTalkingTo, whatToCommunicate, platform } = req.body;
      const fallback = getFallbackStrategies(whoAreYou, whoAreYouTalkingTo, whatToCommunicate, platform);
      return res.json({ 
        strategies: fallback, 
        isFallback: true, 
        warning: `Usando base de curación interna por latencia o error de conexión de API.` 
      });
    } catch (fallbackError) {
      return res.status(500).json({ 
        error: "Ocurrió un error crítico al procesar la estrategia.",
        details: error.message || error 
      });
    }
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
