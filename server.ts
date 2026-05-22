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

// Local fallback database generator to simulate curation when API Key is missing or fails
function getFallbackStrategies(niche: string, customTopic?: string, depth?: string, tone?: string, creativity?: string) {
  const nicheLower = (niche || "").toLowerCase();
  let baseStrategies = [];
  
  if (nicheLower.includes("ia") || nicheLower.includes("inteligencia") || nicheLower.includes("artificial")) {
    baseStrategies = [
      {
        hook: "¿De verdad crees que la IA reemplazará a los redactores? El peligro real es el programador que ya no escribe código.",
        angulo: "uncomfortable opinion",
        enfoque: "hot take",
        formato: "short thread",
        emocion: "uncomfortable truth",
        percentage: 97
      },
      {
        hook: "Tu privacidad local vale oro. Tu laptop de casa puede correr modelos de 30B parámetros sin filtrar un byte a la nube.",
        angulo: "identity shift",
        enfoque: "personal experience",
        formato: "screenshot-style post",
        emocion: "feeling ahead",
        percentage: 89
      },
      {
        hook: "Dejemos de hablar de prompts. Si tu app de IA no tiene un bucle recursivo de autocrítica offline, estás construyendo humo.",
        angulo: "creator economy tension",
        enfoque: "disruptive",
        formato: "hook + reflection",
        emocion: "curiosity tension",
        percentage: 94
      },
      {
        hook: "He auditado 14 proyectos SaaS que dicen usar 'Agentes Inteligentes'. El 90% son simples scripts de Python con delay.",
        angulo: "execution vs consumption",
        enfoque: "observation",
        formato: "conversational post",
        emocion: "creator frustration",
        percentage: 91
      }
    ];
  } else if (nicheLower.includes("marketing")) {
    baseStrategies = [
      {
        hook: "La personalización por nombre está muerta. El verdadero truco actual son audios dinámicos clonados con inflexión humana.",
        angulo: "internet behavior shift",
        enfoque: "hot take",
        formato: "talking video",
        emocion: "uncomfortable truth",
        percentage: 93
      },
      {
        hook: "Google está devorando todo tu tráfico orgánico. El SEO moderno es ser indexado como la respuesta directa de Gemini.",
        angulo: "future prediction",
        enfoque: "prediction",
        formato: "carousel",
        emocion: "future anxiety",
        percentage: 96
      },
      {
        hook: "Reemplacé a un influencer de un millón de seguidores por tres creadores devotos con 4k. Dupliqué ventas en una semana.",
        angulo: "execution vs consumption",
        enfoque: "storytelling",
        formato: "conversational post",
        emocion: "social proof tension",
        percentage: 88
      },
      {
        hook: "El 90% de los ganchos de venta fracasan porque huelen a embudo publicitario desde el primer segundo.",
        angulo: "uncomfortable opinion",
        enfoque: "disruptive",
        formato: "hook + reflection",
        emocion: "perspective shift",
        percentage: 85
      }
    ];
  } else if (nicheLower.includes("redes") || nicheLower.includes("sociales") || nicheLower.includes("social")) {
    baseStrategies = [
      {
        hook: "Los likes en el feed dejaron de importar. La verdadera conversión de alto valor está ocurriendo dentro de los DMs.",
        angulo: "internet behavior shift",
        enfoque: "observation",
        formato: "conversational post",
        emocion: "uncomfortable truth",
        percentage: 91
      },
      {
        hook: "La era de la estética pulida terminó. La gente desliza de largo cuando detecta que tu video fue grabado por un equipo de cine.",
        angulo: "uncomfortable opinion",
        enfoque: "hot take",
        formato: "POV",
        emocion: "perspective shift",
        percentage: 95
      },
      {
        hook: "Threads es el espacio para los que se cansaron de LinkedIn pero no toleran la hostilidad constante de Twitter.",
        angulo: "social observation",
        enfoque: "reflection",
        formato: "screenshot-style post",
        emocion: "emotional resonance",
        percentage: 86
      },
      {
        hook: "El algoritmo de TikTok premia el error sutil. Si repites la toma perfecta, matas la retención biológica.",
        angulo: "uncomfortable opinion",
        enfoque: "disruptive",
        formato: "talking video",
        emocion: "curiosity tension",
        percentage: 89
      }
    ];
  } else if (nicheLower.includes("tecnología") || nicheLower.includes("tecnologia") || nicheLower.includes("tech")) {
    baseStrategies = [
      {
        hook: "El fin de las pantallas portátiles comenzó. He usado visores integrados una semana y mi monitor se siente prehistórico.",
        angulo: "social observation",
        enfoque: "personal experience",
        formato: "mini story",
        emocion: "aspirational energy",
        percentage: 94
      },
      {
        hook: "Lanzar software hoy en día no es una proeza técnica. Lo verdaderamente difícil es defender tu atención en un feed saturado.",
        angulo: "creator economy tension",
        enfoque: "reflection",
        formato: "hook + reflection",
        emocion: "creator frustration",
        percentage: 90
      },
      {
        hook: "Tus contraseñas tradicionales quedarán obsoletas este año. La carrera silenciosa por el cifrado cuántico ya está activa.",
        angulo: "future prediction",
        enfoque: "prediction",
        formato: "short thread",
        emocion: "future anxiety",
        percentage: 92
      },
      {
        hook: "La arquitectura sin servidores es genial hasta que recibes la primera factura de un ataque DDoS que no supiste esquivar.",
        angulo: "uncomfortable opinion",
        enfoque: "hot take",
        formato: "conversational post",
        emocion: "uncomfortable truth",
        percentage: 85
      }
    ];
  } else if (nicheLower.includes("productividad")) {
    baseStrategies = [
      {
        hook: "Apagué todas mis notificaciones y borré Slack del móvil. Completé más trabajo en 3 días que en las últimas 2 semanas.",
        angulo: "uncomfortable opinion",
        enfoque: "personal experience",
        formato: "mini story",
        emocion: "perspective shift",
        percentage: 95
      },
      {
        hook: "Tener 50 aplicaciones integradas no es orden. Es solo un cementerio digital automatizado para calmar tu ansiedad.",
        angulo: "execution vs consumption",
        enfoque: "hot take",
        formato: "hook + reflection",
        emocion: "creator frustration",
        percentage: 92
      },
      {
        hook: "El cerebro humano no acumula ideas, solo genera conexiones. Todo tu Notion de 40 páginas es solo ruido inactivo si no ejecutas.",
        angulo: "identity shift",
        enfoque: "reflection",
        formato: "screenshot-style post",
        emocion: "uncomfortable truth",
        percentage: 89
      },
      {
        hook: "La verdadera productividad consiste en saber aburrirte sin mirar la pantalla del iPhone durante 15 minutos seguidos.",
        angulo: "social observation",
        enfoque: "hot take",
        formato: "talking video",
        emocion: "perspective shift",
        percentage: 87
      }
    ];
  } else {
    baseStrategies = [
      {
        hook: `Lo que nadie te está diciendo sobre el futuro de ${niche} hoy en las fuentes de prestigio global.`,
        angulo: "uncomfortable opinion",
        enfoque: "hot take",
        formato: "short thread",
        emocion: "uncomfortable truth",
        percentage: 88
      },
      {
        hook: `La técnica fundamental que revolucionará la forma en que entiendes ${niche ? niche : 'tu sector'} este trimestre.`,
        angulo: "future prediction",
        enfoque: "prediction",
        formato: "carousel",
        emocion: "future anxiety",
        percentage: 86
      },
      {
        hook: `Fórmula explicada paso a paso de cómo esta táctica superó las expectativas de la industria sin presupuestos millonarios.`,
        angulo: "execution vs consumption",
        enfoque: "storytelling",
        formato: "conversational post",
        emocion: "social proof tension",
        percentage: 90
      },
      {
        hook: `Lo que pasa a puerta cerrada cuando se diseñan estrategias de escala sobre este tema.`,
        angulo: "creator economy tension",
        enfoque: "reflection",
        formato: "hook + reflection",
        emocion: "creator frustration",
        percentage: 84
      }
    ];
  }

  // If a custom topic is requested, adapt the fallback content to reference it beautifully
  if (customTopic) {
    baseStrategies = baseStrategies.map(item => {
      let topicPrefix = `¿Quieres dominar ${customTopic}? `;
      if (tone && tone.includes("Polémico")) {
        topicPrefix = `El gran error sobre ${customTopic}: `;
      } else if (tone && tone.includes("Educativo")) {
        topicPrefix = `Clase rápida sobre ${customTopic}: `;
      }
      return {
        ...item,
        hook: `${topicPrefix}${item.hook.charAt(0).toLowerCase()}${item.hook.slice(1)}`
      };
    });
  }

  return baseStrategies;
}

// Configure the strategy generation route
app.post("/api/generate-strategy", async (req, res) => {
  try {
    const { niche, customTopic, depth, tone, creativity } = req.body;
    
    if (!niche) {
      return res.status(400).json({ error: "El nicho es obligatorio." });
    }

    console.log(`[LYTH API] Recibida petición de modelado de estrategia:`, { niche, customTopic, depth, tone, creativity });

    // Validate if GEMINI_API_KEY is available and is a real key (not placeholder)
    const apiKey = process.env.GEMINI_API_KEY;
    const isKeyPlaceholder = !apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "" || apiKey === "undefined";

    if (isKeyPlaceholder) {
      console.warn(`[LYTH API] GEMINI_API_KEY no está configurada o es de prueba. Retornando curación premium precargada.`);
      const fallback = getFallbackStrategies(niche, customTopic, depth, tone, creativity);
      return res.json({ strategies: fallback, isFallback: true });
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

    // Determine target official sources mapping dynamically to act as a curation agent
    const nicheLower = (niche || "").toLowerCase();
    let sourcesList = "";
    if (nicheLower.includes("ia") || nicheLower.includes("inteligencia") || nicheLower.includes("artificial")) {
      sourcesList = `
- FUENTES PRINCIPALES: OpenAI Blog, Anthropic News, Google AI Blog.
- FUENTES SECUNDARIAS: Hugging Face (Trending), The Rundown AI, Futurepedia.
`;
    } else if (nicheLower.includes("marketing")) {
      sourcesList = `
- FUENTES PRINCIPALES: HubSpot Research, Think with Google.
- FUENTES SECUNDARIAS: Marketing Brew, Neil Patel Blog, Search Engine Journal.
`;
    } else if (nicheLower.includes("redes") || nicheLower.includes("sociales") || nicheLower.includes("social")) {
      sourcesList = `
- FUENTES PRINCIPALES: Instagram Creators, TikTok Newsroom.
- FUENTES SECUNDARIAS: Social Media Today, Later Blog.
`;
    } else if (nicheLower.includes("tecnología") || nicheLower.includes("tecnologia") || nicheLower.includes("tech")) {
      sourcesList = `
- FUENTES PRINCIPALES: The Verge, TechCrunch.
- FUENTES SECUNDARIAS: Wired, Product Hunt (Top Products).
`;
    } else if (nicheLower.includes("productividad")) {
      sourcesList = `
- FUENTES PRINCIPALES: Notion Blog, Zapier / Make Blogs.
- FUENTES SECUNDARIAS: Harvard Business Review (Productivity), Thomas Frank Blog.
`;
    } else {
      sourcesList = `
- FUENTES PRINCIPALES: Blogs y portales oficiales del sector, foros de líderes y expertos.
- FUENTES SECUNDARIAS: Discusiones en Twitter/X y repositorios de tendencias emergentes.
`;
    }

    const prompt = `Actúa como un estratega creativo y curador de contenido de élite: "LYTH".
Tu propósito NO es generar contenido automatizado y genérico de IA. Tu misión es transformar ideas sencillas sobre "${niche}" en estrategias de contenido social-first premium, calibrando la psicología viral y la comunicación emocional.
${customTopic ? `CRÍTICO: Enfoca todas las ideas de estrategia estrictamente en torno a este concepto solicitado: "${customTopic}"` : ''}

NOTAS DE REFINAMIENTO SELECCIONADAS POR EL USUARIO:
- Profundidad requerida: "${depth || "Estándar"}". Haz que la sofisticación estratégica refleje este nivel.
- Tono del gancho (hook): "${tone || "Audaz / Provocativo"}". Ajusta la intriga y la fricción a este tono exacto.
- Estilo del ángulo: "${creativity || "Vanguardista / Creativa"}". Haz que los ángulos y formatos elegidos reflejen este nivel de innovación disruptiva.

Tu output debe constar exactamente de entre 3 y 5 ideas de contenido altamente curadas, pulidas y de altísima calidad. Calidad sobre cantidad.

REGLAS DE FORMATO Y CONTENIDO (Debes seguir estrictamente esto):
1. 'hook': Un gancho sumamente ingenioso (máximo 120 caracteres) nativo de plataformas sociales modernas. Debe crear tensión, curiosidad, fricción emocional, sorpresa o contradicción. EVITA ganchos corporativos típicos como "5 tips para", "descubre cómo", o "la guía definitiva".
2. 'angulo': La perspectiva de comunicación estratégica (ejemplos exactos: "opinión incómoda", "cambio de comportamiento", "tensión del creador", "predicción de futuro", "shift de identidad", "ejecución vs consumo", "contradicción emocional", "observación social").
3. 'enfoque': El estilo de ejecución o comunicación (ejemplos exactos: "storytelling", "hot take", "reflexión", "predicción", "opinión", "conversacional", "educativo", "disruptivo", "experiencia personal", "observación de internet").
4. 'formato': El formato ideal adaptado a Threads, X, TikTok o Instagram (ejemplos exactos: "short thread", "tweet", "mini story", "talking video", "carousel", "POV", "conversational post", "hook + reflection", "screenshot-style post", "personal insight").
5. 'emocion': La energía emocional impulsando el engagement (ejemplos exactos: "curiosity tension", "uncomfortable truth", "aspirational energy", "subtle urgency", "identity validation", "emotional resonance", "future anxiety", "feeling ahead", "social proof tension", "creator frustration", "perspective shift").
6. 'percentage': Un número entero del 75 al 100 que representa el "Índice de Retención Tracción" estimado.

Escribe de manera sumamente humana, natural, premium, con vocabulario de la economía de creadores e internet culture. NUNCA suenes corporativo, comercial, artificial ni a ChatGPT genérico. Sin emojis excesivos.
`;

    // Query Gemini 3.5 Flash for fast, powerful structured generation
    const response = await getAIInstance().models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "Eres LYTH, un estratega creativo premium de inteligencia artificial que ayuda a creadores, marcas y profesionales a estructurar ideas de contenido social-first que se sienten humanas, emocionalmente inteligentes, estratégicamente afiladas y de nivel elite. Eludes clichés corporativos, lenguaje robótico de IA o ganchos genéricos.",
        temperature: temperature,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              hook: { 
                type: Type.STRING, 
                description: "Scroll-stopping highly curated opening hook idea native to modern internet platforms" 
              },
              angulo: { 
                type: Type.STRING, 
                description: "Strategic communication perspective or tension behind the idea" 
              },
              enfoque: { 
                type: Type.STRING, 
                description: "Execution style or communication approach" 
              },
              formato: { 
                type: Type.STRING, 
                description: "The ideal creator-native post layout" 
              },
              emocion: { 
                type: Type.STRING, 
                description: "The emotional energy or psychological driver" 
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
    // If Gemini fails for any other factor (rate limites, network, key revoked, model latency), 
    // we seamlessly serve the beautiful local database so the user's workflow never breaks down.
    try {
      const { niche, customTopic, depth, tone, creativity } = req.body;
      const fallback = getFallbackStrategies(niche, customTopic, depth, tone, creativity);
      return res.json({ 
        strategies: fallback, 
        isFallback: true, 
        warning: `Usando base de curación interna por latencia o error de conexión de API. Detalle: ${error.message || error}` 
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
