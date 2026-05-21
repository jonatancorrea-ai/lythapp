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
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

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
        tendencia: "Agentes Autónomos de Razonamiento (OpenAI & Anthropic)",
        hook: "¿Sigues usando prompts simples? El verdadero secreto ahora son los Agentes con bucle de autocrítica y depuración autónoma.",
        angulo: "Opinión Incómoda",
        formato: "Hilo Detallado",
        plataforma: "LinkedIn / Medium",
        percentage: 97
      },
      {
        tendencia: "Modelos Locales de Código Abierto (DeepSeek & Llama)",
        hook: "Tu privacidad vale oro. Cómo correr un modelo de calidad GPT-4 completamente gratis en tu laptop de casa hoy mismo.",
        angulo: "Guía Rápida",
        formato: "Demo Técnica",
        plataforma: "Twitter / X",
        percentage: 89
      },
      {
        tendencia: "Búsqueda con Grounding en Tiempo Real (Gemini API)",
        hook: "Google acaba de descifrar cómo detener las alucinaciones de la IA. Y lo mejor: puedes usarlo en tu propio software.",
        angulo: "Alerta de Tendencia",
        formato: "Video Tutorial",
        plataforma: "YouTube Shorts",
        percentage: 94
      },
      {
        tendencia: "Herramientas de Multi-agentes en Futurepedia",
        hook: "Encontré una IA que hace el trabajo de todo un departamento de marketing en 12 minutos... y no es ChatGPT.",
        angulo: "Caso de Estudio",
        formato: "Short Video",
        plataforma: "TikTok / Reels",
        percentage: 91
      },
      {
        tendencia: "Micro-fichas Técnicas de Hugging Face",
        hook: "El 90% de las empresas están pagando de más por IA. Aquí tienes las 3 librerías gratuitas que cambiarán tu flujo de código.",
        angulo: "Detrás de Escena",
        formato: "Carrusel",
        plataforma: "Instagram",
        percentage: 84
      }
    ];
  } else if (nicheLower.includes("marketing")) {
    baseStrategies = [
      {
        tendencia: "Motores de Hiper-personalización de Audio (HubSpot Research)",
        hook: "La personalización por nombre está muerta. La nueva tendencia es clonar voces en tiempo real para emails interactivos.",
        angulo: "Opinión Incómoda",
        formato: "Demo Técnica",
        plataforma: "LinkedIn",
        percentage: 93
      },
      {
        tendencia: "Optimización para Búsquedas Sin Clics (Think with Google)",
        hook: "Google se queda con todo tu tráfico. El SEO ya no es recibir visitas, sino ser la respuesta directa de Gemini.",
        angulo: "Análisis de Datos",
        formato: "Carrusel",
        plataforma: "LinkedIn / Medium",
        percentage: 96
      },
      {
        tendencia: "Creadores Sintéticos vs Influencers Reales (Marketing Brew)",
        hook: "¿Le pagarías a una modelo de IA? Esta marca duplicó sus ventas usando un bot virtual diseñado en Photoshop.",
        angulo: "Caso de Estudio",
        formato: "Short Video",
        plataforma: "TikTok / Reels",
        percentage: 88
      },
      {
        tendencia: "Indexación por Intención Convertida (Neil Patel Blog)",
        hook: "Escribir 50 artículos de blog ya no sirve de nada. Usa esta fórmula táctica de 3 páginas para captar leads de alto valor.",
        angulo: "Guía Rápida",
        formato: "Hilo Detallado",
        plataforma: "Twitter / X",
        percentage: 82
      },
      {
        tendencia: "SEO Semántico para Búsqueda Visual (Search Engine Journal)",
        hook: "La gente ya no lee tus títulos. El truco secreto para rankear primero en las búsquedas visuales de smartphones.",
        angulo: "Alerta de Tendencia",
        formato: "Infografía",
        plataforma: "Instagram",
        percentage: 85
      }
    ];
  } else if (nicheLower.includes("redes") || nicheLower.includes("sociales") || nicheLower.includes("social")) {
    baseStrategies = [
      {
        tendencia: "Canales de Difusión y Encuestas de Conversión (Instagram Creators)",
        hook: "Los likes en el feed están desapareciendo... El verdadero dinero hoy se hace en la bandeja de entrada privada.",
        angulo: "Opinión Incómoda",
        formato: "Post Editorial",
        plataforma: "Instagram",
        percentage: 91
      },
      {
        tendencia: "Micro-embudos de Compras en Retrato (TikTok Newsroom)",
        hook: "El truco psicológico detrás de los videos de 7 segundos que están vaciando las tarjetas de crédito de la Generación Z.",
        angulo: "Storytelling",
        formato: "Short Video",
        plataforma: "TikTok / Reels",
        percentage: 95
      },
      {
        tendencia: "Descentralización e Integración con Fediverso (Meta Threads)",
        hook: "Threads acaba de conectarse al Fediverso. Qué significa esto para el futuro de tus seguidores en redes sociales.",
        angulo: "Alerta de Tendencia",
        formato: "Hilo Detallado",
        plataforma: "Twitter / X",
        percentage: 86
      },
      {
        tendencia: "Automatización de Contenido Multi-Canal Orgánico (Later Blog)",
        hook: "Pasé de publicar 2 veces por semana a 3 veces por día sin volverme loco. Te revelo el software secreto.",
        angulo: "Detrás de Escena",
        formato: "Video Tutorial",
        plataforma: "LinkedIn",
        percentage: 89
      },
      {
        tendencia: "Estrategias de Retención con Hooks en Serie (Social Media Today)",
        hook: "La regla de los 2 segundos de oro. El motivo real por el cual la gente desliza tu video antes del primer parpadeo.",
        angulo: "Análisis de Datos",
        formato: "Carrusel",
        plataforma: "TikTok / Reels",
        percentage: 90
      }
    ];
  } else if (nicheLower.includes("tecnología") || nicheLower.includes("tecnologia") || nicheLower.includes("tech")) {
    baseStrategies = [
      {
        tendencia: "Vidrios Holográficos de Realidad Mixta (The Verge)",
        hook: "El fin de las pantallas físicas está cerca. He probado las nuevas gafas de realidad aumentada y todo lo demás parece primitivo.",
        angulo: "Detrás de Escena",
        formato: "Short Video",
        plataforma: "YouTube Shorts",
        percentage: 94
      },
      {
        tendencia: "Soberanía en la Nube y Centros de Datos Ecológicos (Wired)",
        hook: "Los nuevos centros de datos consumen tanta energía como ciudades enteras. La crisis energética silenciosa de internet.",
        angulo: "Análisis de Datos",
        formato: "Post Editorial",
        plataforma: "LinkedIn / Medium",
        percentage: 90
      },
      {
        tendencia: "Ecosistemas de Desarrollo sin Servidor No-Code (Product Hunt)",
        hook: "Lanzar un SaaS ya no requiere un equipo de programadores. Conseguí mis primeros clientes sin escribir una sola línea de código.",
        angulo: "Caso de Estudio",
        formato: "Carrusel",
        plataforma: "LinkedIn",
        percentage: 92
      },
      {
        tendencia: "Biomarcadores No Invasivos en Relojes Inteligentes (TechCrunch)",
        hook: "Tu reloj ahora sabe más de tu salud que tu médico de cabecera. La revolución oculta de los sensores biométricos.",
        angulo: "Alerta de Tendencia",
        formato: "Hilo Detallado",
        plataforma: "Twitter / X",
        percentage: 87
      },
      {
        tendencia: "Baterías de Estado Sólido para Dispositivos Portátiles (TechCrunch)",
        hook: "Imagina cargar tu smartphone una sola vez a la semana. La patente de energía que cambiará todos tus gadgets.",
        angulo: "Guía Rápida",
        formato: "Infografía",
        plataforma: "Twitter / X",
        percentage: 85
      }
    ];
  } else if (nicheLower.includes("productividad")) {
    baseStrategies = [
      {
        tendencia: "Botones Activos y Automatizaciones Nativa (Notion Blog)",
        hook: "¿Sigues copiando y pegando tareas? Cómo transformé mi Notion en un asistente autónomo con un simple clic.",
        angulo: "Guía Rápida",
        formato: "Video Tutorial",
        plataforma: "YouTube Shorts",
        percentage: 95
      },
      {
        tendencia: "Embajadores Multi-modales de Canvas (Zapier & Make Blogs)",
        hook: "Conectar Gmail con Slack es obsoleto. Deja que los nuevos disparadores visuales analicen facturas de forma autónoma.",
        angulo: "Demo Técnica",
        formato: "Carrusel",
        plataforma: "LinkedIn",
        percentage: 92
      },
      {
        tendencia: "Asistentes de Voz para Lluvia de Ideas (Thomas Frank Blog)",
        hook: "Canto mi brainstorming por notas de voz mientras camino y mi IA lo archiva todo ordenadamente en mis apuntes.",
        angulo: "Detrás de Escena",
        formato: "Short Video",
        plataforma: "TikTok / Reels",
        percentage: 89
      },
      {
        tendencia: "Descarga Cognitiva Automatizada (Harvard Business Review)",
        hook: "La paradoja de estar ocupado. O cómo delegar el 80% de tus decisiones operativas diarias a automatizaciones robustas.",
        angulo: "Opinión Incómoda",
        formato: "Post Editorial",
        plataforma: "LinkedIn",
        percentage: 87
      },
      {
        tendencia: "Bloqueo de Calendarios Dinámico Basado en Enfoque (Thomas Frank Blog)",
        hook: "He probado decenas de técnicas de gestión del tiempo. Esta es la única que detuvo por completo mi procrastinación.",
        angulo: "Caso de Estudio",
        formato: "Hilo Detallado",
        plataforma: "Twitter / X",
        percentage: 90
      }
    ];
  } else {
    baseStrategies = [
      {
        tendencia: `Nuevas Tendencias Emergentes en ${niche}`,
        hook: `Lo que nadie te está diciendo sobre el futuro de ${niche} hoy en las fuentes de prestigio global.`,
        angulo: "Alerta de Tendencia",
        formato: "Carrusel",
        plataforma: "LinkedIn",
        percentage: 88
      },
      {
        tendencia: `Análisis de Datos y Redes de Curation en ${niche}`,
        hook: `La técnica fundamental que revolucionará la forma en que entiendes ${niche ? niche : 'tu sector'} este trimestre.`,
        angulo: "Análisis de Datos",
        formato: "Hilo Detallado",
        plataforma: "Twitter / X",
        percentage: 86
      },
      {
        tendencia: `Casos de Éxito Disruptivos en el Sector`,
        hook: `Fórmula explicada paso a paso de cómo esta táctica superó las expectativas en tiempo récord.`,
        angulo: "Caso de Estudio",
        formato: "Short Video",
        plataforma: "TikTok / Reels",
        percentage: 90
      },
      {
        tendencia: `Secretos del Detrás de Escena de Creadores`,
        hook: `Lo que pasa a puerta cerrada cuando se diseñan estrategias de escala sobre este tema.`,
        angulo: "Detrás de Escena",
        formato: "Demo Técnica",
        plataforma: "LinkedIn / Medium",
        percentage: 84
      },
      {
        tendencia: `Guía Rápida y Táctica del Especialista`,
        hook: `Menos teoría y más ejecución. El checklist definitivo para dominar este concepto de inmediato.`,
        angulo: "Guía Rápida",
        formato: "Video Tutorial",
        plataforma: "YouTube Shorts",
        percentage: 91
      }
    ];
  }

  // If a custom topic is requested, adapt the fallback content to reference it beautifully
  if (customTopic) {
    baseStrategies = baseStrategies.map(item => {
      // Create intelligent tone-matched hook additions
      let topicPrefix = `¿Quieres dominar ${customTopic}? `;
      if (tone && tone.includes("Polémico")) {
        topicPrefix = `El gran error sobre ${customTopic}: `;
      } else if (tone && tone.includes("Educativo")) {
        topicPrefix = `Clase rápida sobre ${customTopic}: `;
      }
      return {
        ...item,
        tendencia: item.tendencia.includes("(") 
          ? `${item.tendencia.split(" (")[0]} de ${customTopic}` 
          : `${item.tendencia} para ${customTopic}`,
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

    const prompt = `Actúa como un agente de curación de contenidos y analista de tendencias de élite para la marca premium "LYTH AI".
Acabas de simular un escaneo exhaustivo en tiempo real de las siguientes fuentes oficiales específicas para el nicho "${niche}":
${sourcesList}

Tu misión es extraer las 5 tendencias en español (o adaptadas al español de manera ultra-profesional/líder) más relevantes, activas y comentadas HOY en ese conjunto de fuentes, aplicando un análisis de tracción/interés real.
${customTopic ? `CRÍTICO: Filtra y enfoca estas tendencias estrictamente alrededor de este tema/concepto solicitado: "${customTopic}"` : ''}

NOTAS DE REFINAMIENTO SELECCIONADAS POR EL USUARIO:
- Profundidad de tendencia: "${depth || "Estándar"}". Asegúrate de que las tendencias reflejen este enfoque de profundidad de manera coherente en su explicación técnica (general, detallada o científica).
- Tono del gancho (hook): "${tone || "Audaz / Provocativo"}". Ajusta las palabras, expresiones, y la intriga a este estilo de tono de voz exacto.
- Estilo del ángulo: "${creativity || "Vanguardista / Creativa"}". Haz que los ángulos y formatos elegidos reflejen este nivel de innovación disruptiva.

REGLAS DE FORMATO Y CONTENIDO (Debes seguir estrictamente esto):
1. 'tendencia': El título de la tendencia, concepto, herramienta o cambio algorítmico real extraído (máximo 60 caracteres). No incluyas números de ranking en el texto.
2. 'hook': Un gancho sumamente ingenioso (máximo 120 caracteres) para atrapar al lector en los primeros 3 segundos, redactado según el tono de gancho indicado.
3. 'angulo': Una de estas opciones exactamente según combine mejor: "Opinión Incómoda", "Caso de Estudio", "Storytelling", "Fun Fact", "Guía Rápida", "Alerta de Tendencia", "Detrás de Escena", "Análisis de Datos".
4. 'formato': Una de estas opciones exactamente según combine mejor con el ángulo: "Short Video", "Carrusel", "Hilo Detallado", "Video Tutorial", "Infografía", "Post Editorial", "Demo Técnica".
5. 'plataforma': La combinación perfecta donde brille, por ejemplo: "TikTok / Reels", "LinkedIn", "Twitter / X", "YouTube Shorts", "Instagram", "LinkedIn / Medium".
6. 'percentage': Un porcentaje de tracción/interés de búsqueda realista y dinámico para cada tendencia, representado como un número entero entre 75 y 100.
`;

    // Query Gemini 3.5 Flash for fast, powerful structured generation
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "Eres el estratega de contenido y curador jefe de LYTH AI. Respondes con estrategias de contenido ingeniosas de vanguardia basadas estrictamente en la simulación de análisis en tiempo real de fuentes oficiales de prestigio.",
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
