import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from "@google/generative-ai";

function getFallbackStrategies(whoAreYou: string, whoAreYouTalkingTo: string, whatToCommunicate: string, platform: string) {
  // ... (deja tu función getFallbackStrategies exactamente igual, no cambia nada)
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
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: "Eres LYTH, un estratega creativo premium que ayuda a creadores y marcas a estructurar ideas de contenido social-first humanas, emocionalmente inteligentes y de nivel elite. Eludes clichés corporativos y ganchos predecibles.",
      generationConfig: {
        temperature: 0.7,
        responseMimeType: "application/json",
      }
    });

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

Responde ÚNICAMENTE con un array JSON válido. Sin texto adicional, sin markdown, sin explicaciones.
Formato exacto:
[{"hook":"...","angulo":"...","enfoque":"...","formato":"...","emocion":"...","percentage":92}]

Escribe el hook en ESPAÑOL fluido y humano. Sin emojis innecesarios.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    let strategies;
    try {
      let cleaned = text.trim().replace(/^```(?:json)?\n?/i, "").replace(/\n?```$/, "");
      strategies = JSON.parse(cleaned.trim());
    } catch {
      strategies = getFallbackStrategies(whoAreYou, whoAreYouTalkingTo, whatToCommunicate, platform);
      return res.json({ strategies, isFallback: true, warning: "Error al parsear respuesta de Gemini." });
    }

    return res.json({ strategies, isFallback: false });

  } catch (error: any) {
    const fallback = getFallbackStrategies(whoAreYou, whoAreYouTalkingTo, whatToCommunicate, platform);
    return res.json({ strategies: fallback, isFallback: true, warning: "Usando curación interna por error de API." });
  }
}
