import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI, Type } from "@google/genai";

let aiInstance: GoogleGenAI | null = null;

function getAIInstance() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "" || apiKey === "undefined") {
    throw new Error("GEMINI_API_KEY no configurada.");
  }
  if (!aiInstance) {
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
}

function cleanAndParseJSON(text: string) {
  let cleaned = text.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\n?/i, "").replace(/\n?```$/, "");
  }
  return JSON.parse(cleaned.trim());
}

function getFallbackStrategies(whoAreYou: string, whoAreYouTalkingTo: string, whatToCommunicate: string, platform: string) {
  const audience = whoAreYouTalkingTo || "Profesionales y creadores";
  const msg = whatToCommunicate || "la evolución del ecosistema digital actual";
  const limitWords = (str: string, max: number) => str.trim().length > max ? str.trim().slice(0, max) + "..." : str.trim();
  const cleanMsg = limitWords(msg, 60);

  return [
    { hook: `¿De verdad crees que ${cleanMsg} resolverá tu negocio? El gran peligro real para los ${audience} es otro.`, angulo: "opinión incómoda", enfoque: "hot take", formato: platform === "Instagram" || platform === "TikTok" ? "talking video" : "short thread", emocion: "uncomfortable truth", percentage: Math.floor(Math.random() * 8) + 91 },
    { hook: `He auditado docenas de marcas intentando comunicar ${cleanMsg}. El 90% comete este error básico.`, angulo: "ejecución vs consumo", enfoque: "experiencia personal", formato: platform === "Threads" || platform === "X" ? "tweet" : "carousel", emocion: "feeling ahead", percentage: Math.floor(Math.random() * 8) + 85 },
    { hook: `La razón por la que destacar hablando sobre ${cleanMsg} ya no depende del mérito técnico. Depende de esto:`, angulo: "tensión del creador", enfoque: "reflexión", formato: "hook + reflection", emocion: "creator frustration", percentage: Math.floor(Math.random() * 10) + 88 },
    { hook: `A los ${audience} no les importa la teoría sobre ${cleanMsg}. Quieren ver la fricción de tu proceso real.`, angulo: "cambio de comportamiento", enfoque: "disruptivo", formato: "conversational post", emocion: "perspective shift", percentage: Math.floor(Math.random() * 12) + 78 }
  ];
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { whoAreYou, whoAreYouTalkingTo, whatToCommunicate, platform } = req.body;

  if (!whatToCommunicate) return res.status(400).json({ error: "El campo 'qué quieres comunicar' es obligatorio." });

  const apiKey = process.env.GEMINI_API_KEY;
  const isKeyPlaceholder = !apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "" || apiKey === "undefined";

  if (isKeyPlaceholder) {
    const fallback = getFallbackStrategies(whoAreYou, whoAreYouTalkingTo, whatToCommunicate, platform);
    return res.json({ strategies: fallback, isFallback: true });
  }

  try {
    const prompt = `Actúa como un estratega creativo y curador de contenido de élite: "LYTH".

Tu propósito NO es generar contenido automatizado y genérico de IA. Tu misión es transformar ideas y conceptos sencillos en estrategias de contenido social-first premium, calibrando la psicología viral, comunicación emocional y formatos nativos.

DATOS DE ENTRADA ESTRATÉGICA PROPORCIONADOS POR EL USUARIO:
- ¿Quién soy / Mi rol?: "${whoAreYou || "Creador / Profesional premium"}"
- ¿A quién le hablo?: "${whoAreYouTalkingTo || "Mi nicho y audiencia ideal"}"
- ¿Qué quiero comunicar?: "${whatToCommunicate}"
- ¿Dónde quiero publicarlo?: "${platform || "Cualquier plataforma social moderna"}"

Tu output debe constar exactamente de entre 3 y 5 ideas de contenido altamente curadas. Calidad sobre cantidad.

REGLAS:
1. "hook": Gancho magnético máximo 120 caracteres, nativo de ${platform}. Crea tensión, curiosidad o contradicción. EVITA clichés de IA.
2. "angulo": Perspectiva estratégica (ej: "opinión incómoda", "tensión del creador", "predicción de futuro").
3. "enfoque": Estilo de ejecución (ej: "storytelling", "hot take", "reflexión", "disruptivo").
4. "formato": Formato nativo para ${platform} (ej: "short thread", "carousel", "talking video").
5. "emocion": Motor psicológico (ej: "curiosity tension", "uncomfortable truth", "perspective shift").
6. "percentage": Número entero del 75 al 100 — índice de retención estimado.

Escribe el hook en ESPAÑOL fluido y humano. Sin emojis innecesarios.`;

    const response = await getAIInstance().models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        systemInstruction: "Eres LYTH, un estratega creativo premium que ayuda a creadores y marcas a estructurar ideas de contenido social-first humanas, emocionalmente inteligentes y de nivel elite. Eludes clichés corporativos y ganchos predecibles.",
        temperature: 0.7,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              hook: { type: Type.STRING },
              angulo: { type: Type.STRING },
              enfoque: { type: Type.STRING },
              formato: { type: Type.STRING },
              emocion: { type: Type.STRING },
              percentage: { type: Type.INTEGER }
            },
            required: ["hook", "angulo", "enfoque", "formato", "emocion", "percentage"]
          }
        }
      }
    });

    const strategies = cleanAndParseJSON(response.text!);
    return res.json({ strategies, isFallback: false });

  } catch (error: any) {
    const fallback = getFallbackStrategies(whoAreYou, whoAreYouTalkingTo, whatToCommunicate, platform);
    return res.json({ strategies: fallback, isFallback: true, warning: "Usando curación interna por error de API." });
  }
}
