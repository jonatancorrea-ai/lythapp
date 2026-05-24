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
  const topic = whatToCommunicate?.trim() || "el futuro del trabajo y la creatividad";
  const audience = whoAreYouTalkingTo?.trim() || "profesionales digitales";
  const creator = whoAreYou?.trim() || "creador de contenido";

  const allStrategies = [
    // --- CREADORES DE CONTENIDO ---
    {
      hook: `Llevas meses creando contenido. Pero nadie te dijo que el algoritmo premia el patrón, no el talento.`,
      angulo: "verdad incómoda del ecosistema",
      enfoque: "desmitificación estratégica",
      formato: platform === "YouTube" ? "video editorial" : "carousel de ruptura",
      emocion: "uncomfortable truth",
      percentage: 94
    },
    {
      hook: `El creador que gana en 2025 no publica más. Publica diferente. Aquí la diferencia exacta:`,
      angulo: "ventaja competitiva oculta",
      enfoque: "contraintuitivo + accionable",
      formato: platform === "Threads" || platform === "X" ? "thread con gancho numérico" : "reel educativo",
      emocion: "feeling ahead of the curve",
      percentage: 91
    },
    {
      hook: `Dejé de obsesionarme con el engagement. Mis números subieron 3x. Esto es lo que cambié:`,
      angulo: "resultado paradójico personal",
      enfoque: "storytelling de proceso real",
      formato: "talking video con subtítulos",
      emocion: "curiosity + social proof",
      percentage: 96
    },
    {
      hook: `Tu contenido no tiene problema de calidad. Tiene problema de posicionamiento. Hay diferencia.`,
      angulo: "reencuadre del problema",
      enfoque: "diagnóstico directo",
      formato: platform === "Instagram" ? "carousel con texto fuerte" : "post reflexivo",
      emocion: "perspective shift",
      percentage: 89
    },

    // --- CONSULTORES ---
    {
      hook: `El consultor que cobra $500/hora y el que cobra $5,000/hora dicen lo mismo. La diferencia está en cómo lo enmarcan.`,
      angulo: "percepción de valor vs. valor real",
      enfoque: "contraste de posicionamiento",
      formato: platform === "LinkedIn" ? "post narrativo" : "carousel comparativo",
      emocion: "status anxiety + aspiración",
      percentage: 95
    },
    {
      hook: `Mis clientes no me pagan por mis horas. Me pagan por saber cuál palanca mover primero.`,
      angulo: "redefinición del rol del experto",
      enfoque: "autoridad silenciosa",
      formato: "post corto de impacto",
      emocion: "respect + deseo de aprender",
      percentage: 92
    },
    {
      hook: `La propuesta que perdí me enseñó más que las 10 que gané. Lo que descubrí sobre ${topic}:`,
      angulo: "vulnerabilidad estratégica",
      enfoque: "lección extraída del fracaso",
      formato: "storytelling de 3 actos",
      emocion: "empathy + credibilidad",
      percentage: 93
    },
    {
      hook: `Si tu cliente necesita que le expliques tu valor, ya perdiste la venta. Así se evita eso:`,
      angulo: "falla de comunicación de alto costo",
      enfoque: "diagnóstico + solución inmediata",
      formato: platform === "Threads" ? "thread directo" : "video corto",
      emocion: "recognition + urgencia",
      percentage: 90
    },

    // --- COACHES ---
    {
      hook: `El mayor enemigo de tus clientes no es la falta de información. Es la distancia entre saber y hacer.`,
      angulo: "insight psicológico del cambio",
      enfoque: "verdad sobre la transformación real",
      formato: "reflexión + llamada a la acción suave",
      emocion: "deep recognition",
      percentage: 97
    },
    {
      hook: `Nadie te contrata para que les des respuestas. Te contratan para que les hagas las preguntas que ellos no pueden hacerse.`,
      angulo: "redefinición del valor del coaching",
      enfoque: "filosofía de práctica",
      formato: platform === "Instagram" ? "reel hablado" : "post conceptual",
      emocion: "intellectual resonance",
      percentage: 93
    },
    {
      hook: `Mi cliente más transformado no fue el más talentoso. Fue el que dejó de esperar el momento perfecto.`,
      angulo: "caso real sin nombre",
      enfoque: "micro-historia con moraleja",
      formato: "storytelling conversacional",
      emocion: "hope + urgencia interna",
      percentage: 94
    },
    {
      hook: `El problema no es que ${audience} no sepa qué hacer. Es que no se creen capaces de hacerlo. Esa es la brecha real.`,
      angulo: "raíz psicológica del problema",
      enfoque: "empatía radical",
      formato: "post educativo emocional",
      emocion: "feeling seen + motivación",
      percentage: 96
    },

    // --- EMPRENDEDORES ---
    {
      hook: `Tardé 2 años en entender que mi negocio no tenía problema de producto. Tenía problema de claridad.`,
      angulo: "diagnóstico tardío de alto costo",
      enfoque: "confesión estratégica",
      formato: platform === "YouTube" ? "vlog reflexivo" : "post de texto largo",
      emocion: "painful recognition + esperanza",
      percentage: 95
    },
    {
      hook: `El negocio que construyes en modo supervivencia nunca escala. Aquí lo que tienes que cambiar primero:`,
      angulo: "trampa del emprendedor temprano",
      enfoque: "advertencia + hoja de ruta",
      formato: "carousel accionable",
      emocion: "urgencia + claridad",
      percentage: 91
    },
    {
      hook: `Antes de hablar de ${topic}, pregúntate: ¿estás construyendo un negocio o comprándote un trabajo?`,
      angulo: "pregunta que incomoda y reencuadra",
      enfoque: "provocación filosófica",
      formato: platform === "Threads" || platform === "X" ? "tweet de ruptura" : "reel directo",
      emocion: "cognitive dissonance + despertar",
      percentage: 92
    },
    {
      hook: `Los emprendedores que conozco que realmente escalan tienen una cosa en común: dejaron de ser los más ocupados del equipo.`,
      angulo: "paradoja de la productividad",
      enfoque: "observación de patrón",
      formato: "post reflexivo con datos",
      emocion: "permission to let go",
      percentage: 88
    },
  ];

  // Selecciona 4 estrategias variadas pseudo-aleatoriamente basadas en el input
  const seed = (whoAreYou + whatToCommunicate).length % allStrategies.length;
  const selected = [];
  for (let i = 0; i < 4; i++) {
    selected.push(allStrategies[(seed + i * 4) % allStrategies.length]);
  }
  return selected;
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
