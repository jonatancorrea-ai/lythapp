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

  const isIG = platform === "Instagram";
  const isTikTok = platform === "TikTok";
  const isThreads = platform === "Threads";
  const isX = platform === "X";
  const isYT = platform === "YouTube";
  const isLinkedIn = platform === "LinkedIn";

  const videoFormat = isTikTok || isIG ? "reel directo a cámara" : isYT ? "video editorial" : "talking video";
  const textFormat = isThreads || isX ? "thread de ruptura" : isLinkedIn ? "post narrativo" : "carousel";
  const shortFormat = isThreads || isX ? "tweet provocador" : isIG ? "caption de impacto" : "post corto";

  const all = [

    // --- CREADORES DE CONTENIDO ---
    {
      hook: `Llevas meses publicando sobre ${topic} y el algoritmo te ignora. No es tu contenido. Es tu patrón.`,
      angulo: "verdad incómoda del ecosistema",
      enfoque: "desmitificación estratégica",
      formato: textFormat,
      emocion: "uncomfortable truth",
      percentage: 94
    },
    {
      hook: `El creador que más crece hablando de ${topic} en 2026 no publica más. Publica con más intención.`,
      angulo: "ventaja competitiva oculta",
      enfoque: "contraintuitivo + accionable",
      formato: videoFormat,
      emocion: "feeling ahead of the curve",
      percentage: 91
    },
    {
      hook: `Dejé de obsesionarme con el engagement al hablar de ${topic}. Mis números subieron 3x. Te cuento qué cambié:`,
      angulo: "resultado paradójico personal",
      enfoque: "storytelling de proceso real",
      formato: videoFormat,
      emocion: "curiosity + social proof",
      percentage: 96
    },
    {
      hook: `Tu contenido sobre ${topic} no tiene problema de calidad. Tiene problema de posicionamiento. Son cosas distintas.`,
      angulo: "reencuadre del problema",
      enfoque: "diagnóstico directo",
      formato: textFormat,
      emocion: "perspective shift",
      percentage: 89
    },
    {
      hook: `El 90% de los creadores que hablan de ${topic} cometen este error en los primeros 3 segundos. Yo lo cometí durante un año.`,
      angulo: "falla de atención",
      enfoque: "advertencia + confesión",
      formato: videoFormat,
      emocion: "fear of missing out + empatía",
      percentage: 93
    },
    {
      hook: `Publicar sobre ${topic} sin narrativa clara es como gritar en un estadio vacío. Nadie escucha, todos scrollean.`,
      angulo: "ausencia de estrategia",
      enfoque: "metáfora disruptiva",
      formato: shortFormat,
      emocion: "uncomfortable truth",
      percentage: 87
    },

    // --- CONSULTORES Y EXPERTOS ---
    {
      hook: `El consultor que cobra $500 y el que cobra $5,000 hablan de ${topic} con las mismas palabras. La diferencia: cómo enmarcan el problema.`,
      angulo: "percepción de valor vs. valor real",
      enfoque: "contraste de posicionamiento",
      formato: isLinkedIn ? "post narrativo" : textFormat,
      emocion: "status anxiety + aspiración",
      percentage: 95
    },
    {
      hook: `Mis clientes no me pagan por hablar de ${topic}. Me pagan por saber exactamente qué palanca mover primero.`,
      angulo: "redefinición del rol del experto",
      enfoque: "autoridad silenciosa",
      formato: shortFormat,
      emocion: "respect + deseo de aprender",
      percentage: 92
    },
    {
      hook: `La propuesta sobre ${topic} que perdí me enseñó más que las 10 que gané. Aquí lo que descubrí:`,
      angulo: "vulnerabilidad estratégica",
      enfoque: "lección extraída del fracaso",
      formato: textFormat,
      emocion: "empathy + credibilidad",
      percentage: 93
    },
    {
      hook: `Si tienes que explicarle tu valor a un cliente cuando hablas de ${topic}, ya perdiste la venta antes de empezar.`,
      angulo: "falla de comunicación de alto costo",
      enfoque: "diagnóstico + solución inmediata",
      formato: shortFormat,
      emocion: "recognition + urgencia",
      percentage: 90
    },
    {
      hook: `${audience} no busca otro experto en ${topic}. Busca a alguien que entienda su problema específico, no el genérico.`,
      angulo: "saturación del mercado",
      enfoque: "diferenciación radical",
      formato: textFormat,
      emocion: "identity validation",
      percentage: 91
    },
    {
      hook: `Cobrar más por hablar de ${topic} no es cuestión de años de experiencia. Es cuestión de cómo presentas el problema.`,
      angulo: "posicionamiento de precio",
      enfoque: "reencuadre mental",
      formato: videoFormat,
      emocion: "aspiration + clarity",
      percentage: 94
    },

    // --- COACHES Y TRANSFORMACIÓN ---
    {
      hook: `El mayor enemigo de ${audience} con ${topic} no es la falta de información. Es la distancia entre saber y realmente hacer.`,
      angulo: "insight psicológico del cambio",
      enfoque: "verdad sobre la transformación real",
      formato: textFormat,
      emocion: "deep recognition",
      percentage: 97
    },
    {
      hook: `Nadie te contrata para dar respuestas sobre ${topic}. Te contratan para hacer las preguntas que ellos no pueden hacerse solos.`,
      angulo: "redefinición del valor del coaching",
      enfoque: "filosofía de práctica",
      formato: isIG ? "reel hablado" : shortFormat,
      emocion: "intellectual resonance",
      percentage: 93
    },
    {
      hook: `Mi cliente más transformado con ${topic} no fue el más talentoso. Fue el que dejó de esperar el momento perfecto.`,
      angulo: "caso real sin nombre",
      enfoque: "micro-historia con moraleja",
      formato: textFormat,
      emocion: "hope + urgencia interna",
      percentage: 94
    },
    {
      hook: `${audience} sabotea su progreso con ${topic} de 3 formas muy específicas. La tercera es la más silenciosa y la más cara.`,
      angulo: "patrón de autosabotaje",
      enfoque: "listado con tensión",
      formato: textFormat,
      emocion: "self-recognition + urgencia",
      percentage: 95
    },
    {
      hook: `Cambiar la perspectiva de alguien sobre ${topic} en menos de 60 segundos es posible. Aquí exactamente cómo:`,
      angulo: "demostración de método",
      enfoque: "prueba en tiempo real",
      formato: videoFormat,
      emocion: "curiosity + social proof",
      percentage: 92
    },

    // --- EMPRENDEDORES ---
    {
      hook: `Tardé 2 años en darme cuenta de que mi problema con ${topic} no era de estrategia. Era de claridad. Hay diferencia.`,
      angulo: "diagnóstico tardío de alto costo",
      enfoque: "confesión estratégica",
      formato: isYT ? "vlog reflexivo" : textFormat,
      emocion: "painful recognition + esperanza",
      percentage: 95
    },
    {
      hook: `El negocio que construyes alrededor de ${topic} en modo supervivencia tiene un techo bajo. Siempre.`,
      angulo: "trampa del emprendedor temprano",
      enfoque: "advertencia + hoja de ruta",
      formato: textFormat,
      emocion: "urgencia + claridad",
      percentage: 91
    },
    {
      hook: `Con ${topic}: ¿estás construyendo un negocio o comprándote un trabajo muy caro? La diferencia importa más de lo que crees.`,
      angulo: "pregunta que incomoda y reencuadra",
      enfoque: "provocación filosófica",
      formato: shortFormat,
      emocion: "cognitive dissonance + despertar",
      percentage: 92
    },
    {
      hook: `Los emprendedores que escalan con ${topic} en 2026 tienen algo en común: dejaron de ser los más ocupados de su equipo.`,
      angulo: "paradoja de la productividad",
      enfoque: "observación de patrón",
      formato: textFormat,
      emocion: "permission to let go",
      percentage: 88
    },
    {
      hook: `La razón por la que tu competencia crece con ${topic} y tú no tiene muy poco que ver con el producto o servicio.`,
      angulo: "diferencia invisible",
      enfoque: "diagnóstico de mercado",
      formato: textFormat,
      emocion: "uncomfortable comparison",
      percentage: 94
    },

    // --- FREELANCERS Y AGENCIAS ---
    {
      hook: `Como freelance que trabaja con ${topic}, el problema no es conseguir clientes. Es conseguir los clientes correctos.`,
      angulo: "calidad vs. cantidad de clientes",
      enfoque: "reencuadre de objetivos",
      formato: shortFormat,
      emocion: "recognition + claridad",
      percentage: 92
    },
    {
      hook: `Las agencias que dominan ${topic} en 2026 no ganaron por tener más servicios. Ganaron por especializarse más.`,
      angulo: "paradoja de la especialización",
      enfoque: "observación de industria",
      formato: textFormat,
      emocion: "strategic clarity",
      percentage: 90
    },
    {
      hook: `Cobrar por proyecto vs. cobrar por retainer en ${topic}: la mayoría elige mal y lo descubre tarde.`,
      angulo: "modelo de negocio equivocado",
      enfoque: "comparación directa",
      formato: textFormat,
      emocion: "financial recognition",
      percentage: 91
    },
    {
      hook: `El freelance que habla de ${topic} y cobra 5x más que tú no trabaja 5x más. Posiciona 5x mejor.`,
      angulo: "posicionamiento de precio",
      enfoque: "contraste de realidad",
      formato: shortFormat,
      emocion: "aspiration + urgencia",
      percentage: 93
    },
    {
      hook: `Si tu propuesta de ${topic} necesita más de una página para explicarse, el problema no es la longitud. Es la claridad.`,
      angulo: "complejidad innecesaria",
      enfoque: "simplificación radical",
      formato: shortFormat,
      emocion: "aha moment",
      percentage: 89
    },

    // --- CREADORES DE CURSOS Y PRODUCTOS DIGITALES ---
    {
      hook: `El curso sobre ${topic} que más vende en 2026 no es el más completo. Es el que promete la transformación más específica.`,
      angulo: "promesa de transformación",
      enfoque: "insight de mercado digital",
      formato: textFormat,
      emocion: "strategic clarity + aspiración",
      percentage: 94
    },
    {
      hook: `Lancé mi primer producto sobre ${topic} y fracasó. El segundo funcionó. La diferencia fue una sola pregunta que no me hice antes.`,
      angulo: "lección de lanzamiento",
      enfoque: "historia personal + revelación",
      formato: videoFormat,
      emocion: "curiosity + empatía",
      percentage: 96
    },
    {
      hook: `La gente no compra cursos de ${topic}. Compra la versión de sí mismos que tendrá cuando lo termine.`,
      angulo: "psicología de compra",
      enfoque: "reencuadre de producto",
      formato: shortFormat,
      emocion: "identity aspiration",
      percentage: 95
    },
    {
      hook: `Tener 500 alumnos en un curso de ${topic} que pagan poco vs. 50 que pagan bien: los números no mienten.`,
      angulo: "modelo de negocio de cursos",
      enfoque: "comparación numérica",
      formato: textFormat,
      emocion: "financial clarity",
      percentage: 91
    },
    {
      hook: `El mayor error al crear contenido gratuito sobre ${topic} es dar tanto que nadie necesita comprarte nada.`,
      angulo: "trampa del contenido gratuito",
      enfoque: "advertencia estratégica",
      formato: shortFormat,
      emocion: "recognition + corrección",
      percentage: 90
    },

    // --- FOUNDERS DE SAAS Y APPS ---
    {
      hook: `El SaaS de ${topic} que más crece en 2026 no tiene más features. Tiene menos fricción en el onboarding.`,
      angulo: "simplicidad como ventaja competitiva",
      enfoque: "insight de producto",
      formato: textFormat,
      emocion: "strategic clarity",
      percentage: 93
    },
    {
      hook: `Construí ${topic} pensando en todos. Creció cuando lo construí para un perfil muy específico. Lección cara.`,
      angulo: "nicho vs. mercado masivo",
      enfoque: "historia de pivot",
      formato: videoFormat,
      emocion: "painful recognition + esperanza",
      percentage: 95
    },
    {
      hook: `El churn en ${topic} no lo resuelves con más features. Lo resuelves entendiendo qué prometiste vs. qué entregaste.`,
      angulo: "brecha de expectativas",
      enfoque: "diagnóstico de retención",
      formato: textFormat,
      emocion: "recognition + solución",
      percentage: 92
    },
    {
      hook: `Antes de construir cualquier feature nueva de ${topic}, una pregunta: ¿cuántos usuarios la pidieron vs. cuántos la usarán?`,
      angulo: "trampa de las peticiones de usuarios",
      enfoque: "principio de producto",
      formato: shortFormat,
      emocion: "strategic pause",
      percentage: 89
    },

    // --- MARCAS PERSONALES EN TRANSICIÓN ---
    {
      hook: `Cambiar de nicho hacia ${topic} sin perder tu audiencia es posible. La mayoría lo hace al revés y pierde las dos cosas.`,
      angulo: "transición de nicho",
      enfoque: "guía de cambio estratégico",
      formato: textFormat,
      emocion: "hope + claridad",
      percentage: 93
    },
    {
      hook: `Pasé de hablar de X a hablar de ${topic}. Perdí el 30% de mis seguidores. Gané el 200% de mis ingresos.`,
      angulo: "trade-off de transición",
      enfoque: "datos personales reales",
      formato: shortFormat,
      emocion: "courage + aspiración",
      percentage: 96
    },
    {
      hook: `La gente que te seguía antes no es necesariamente la gente que necesitas para hablar de ${topic}. Y eso está bien.`,
      angulo: "redefinición de audiencia",
      enfoque: "permiso para pivotear",
      formato: textFormat,
      emocion: "relief + clarity",
      percentage: 88
    },
    {
      hook: `Reinventarte como referente en ${topic} cuando ya tienes una audiencia previa tiene un truco que nadie explica bien.`,
      angulo: "transición con audiencia existente",
      enfoque: "estrategia de pivot",
      formato: videoFormat,
      emocion: "curiosity + exclusividad",
      percentage: 91
    },

    // --- CREADORES DE COMUNIDADES ---
    {
      hook: `Una comunidad de 200 personas muy comprometidas con ${topic} vale más que 20,000 seguidores pasivos. Siempre.`,
      angulo: "calidad vs. cantidad",
      enfoque: "redefinición de éxito",
      formato: shortFormat,
      emocion: "strategic clarity",
      percentage: 92
    },
    {
      hook: `La comunidad de ${topic} que construí casi muere en el mes 3. Lo que la salvó no fue más contenido.`,
      angulo: "crisis de comunidad",
      enfoque: "historia de supervivencia",
      formato: videoFormat,
      emocion: "curiosity + empatía",
      percentage: 94
    },
    {
      hook: `${audience} no quiere otra comunidad de ${topic}. Quiere sentir que pertenece a algo que los entiende de verdad.`,
      angulo: "psicología de pertenencia",
      enfoque: "insight de comunidad",
      formato: textFormat,
      emocion: "deep recognition",
      percentage: 93
    },
    {
      hook: `El error que destruye comunidades de ${topic}: optimizar para el número de miembros en vez del nivel de conversación.`,
      angulo: "métrica equivocada",
      enfoque: "advertencia de comunidad",
      formato: shortFormat,
      emocion: "recognition + corrección",
      percentage: 90
    },

    // --- SALUD Y BIENESTAR ---
    {
      hook: `Lo que ${audience} cree que sabe sobre ${topic} y salud está basado en información de hace 10 años. Ha cambiado mucho.`,
      angulo: "información desactualizada",
      enfoque: "actualización de conocimiento",
      formato: videoFormat,
      emocion: "curiosity + urgencia",
      percentage: 93
    },
    {
      hook: `El problema con ${topic} no es la disciplina. Es que nadie te enseñó el sistema correcto para tu tipo de vida.`,
      angulo: "sistema vs. fuerza de voluntad",
      enfoque: "reencuadre de hábitos",
      formato: textFormat,
      emocion: "relief + hope",
      percentage: 95
    },
    {
      hook: `Llevo años trabajando con ${audience} en ${topic}. El patrón más común que destruye el progreso no es el que imaginas.`,
      angulo: "patrón oculto de fracaso",
      enfoque: "observación clínica humanizada",
      formato: videoFormat,
      emocion: "curiosity + recognition",
      percentage: 94
    },
    {
      hook: `La ciencia sobre ${topic} dice una cosa. La industria del bienestar vende otra. Aquí la diferencia real:`,
      angulo: "ciencia vs. marketing",
      enfoque: "desmitificación basada en evidencia",
      formato: textFormat,
      emocion: "intellectual tension + claridad",
      percentage: 92
    },

    // --- CREADORES FINANCIEROS ---
    {
      hook: `Lo que te enseñaron sobre ${topic} y dinero en la escuela es básicamente el manual para no construir riqueza.`,
      angulo: "educación financiera fallida",
      enfoque: "crítica al sistema + alternativa",
      formato: videoFormat,
      emocion: "anger + esperanza",
      percentage: 96
    },
    {
      hook: `${audience} gana más dinero que hace 3 años y se siente igual de ahogado financieramente. ${topic} explica por qué.`,
      angulo: "trampa del ingreso creciente",
      enfoque: "diagnóstico financiero",
      formato: textFormat,
      emocion: "recognition + urgencia",
      percentage: 95
    },
    {
      hook: `El primer paso para mejorar tu situación financiera con ${topic} no es ganar más. Es entender a dónde va lo que ya tienes.`,
      angulo: "secuencia financiera correcta",
      enfoque: "reencuadre de prioridades",
      formato: shortFormat,
      emocion: "clarity + alivio",
      percentage: 93
    },
    {
      hook: `Invertir en ${topic} sin entender tu propio perfil de riesgo es como manejar con los ojos cerrados. Funciona hasta que no funciona.`,
      angulo: "riesgo ignorado",
      enfoque: "advertencia con analogía",
      formato: videoFormat,
      emocion: "fear + urgencia",
      percentage: 91
    },
    {
      hook: `La independencia financiera con ${topic} no es para ricos. Es para personas con sistemas, no con sueldos altos.`,
      angulo: "desmitificación de la riqueza",
      enfoque: "accesibilidad + sistema",
      formato: textFormat,
      emocion: "hope + empowerment",
      percentage: 94
    },

    // --- TENDENCIAS Y ACTUALIDAD 2026 ---
    {
      hook: `Lo que está pasando con ${topic} en 2026 no es una tendencia pasajera. Es un cambio estructural que ya empezó.`,
      angulo: "perspectiva de largo plazo",
      enfoque: "predicción fundamentada",
      formato: textFormat,
      emocion: "future clarity + urgencia",
      percentage: 92
    },
    {
      hook: `Mientras todos hablan de ${topic} de la misma forma, hay una oportunidad enorme que nadie está aprovechando todavía.`,
      angulo: "brecha de mercado 2026",
      enfoque: "observación de oportunidad",
      formato: videoFormat,
      emocion: "feeling ahead",
      percentage: 95
    },
    {
      hook: `${topic} en 2026 ya no es lo que era. Los que siguen usando el playbook del año pasado lo van a sentir pronto.`,
      angulo: "obsolescencia de estrategia",
      enfoque: "advertencia de actualización",
      formato: shortFormat,
      emocion: "fear + urgencia de adaptación",
      percentage: 91
    },

    // --- PERSONAL BRAND Y AUTORIDAD ---
    {
      hook: `Como ${creator} que habla de ${topic}, tu mayor competencia no es quien más sabe. Es quien más se entiende.`,
      angulo: "claridad vs. expertise",
      enfoque: "posicionamiento de marca",
      formato: shortFormat,
      emocion: "identity shift",
      percentage: 91
    },
    {
      hook: `Tener opiniones claras sobre ${topic} te va a hacer perder seguidores. Y ganar los clientes que realmente quieres.`,
      angulo: "trade-off de posicionamiento",
      enfoque: "declaración polarizante",
      formato: shortFormat,
      emocion: "courage + claridad",
      percentage: 95
    },
    {
      hook: `El contenido sobre ${topic} que más convierte no es el más informativo ni el más viral. Es el más honesto.`,
      angulo: "paradoja de la conversión",
      enfoque: "autenticidad estratégica",
      formato: textFormat,
      emocion: "trust + resonance",
      percentage: 93
    },
    {
      hook: `Construir autoridad en ${topic} sin audiencia previa es posible en 2026. El método es contraintuitivo.`,
      angulo: "punto de partida desde cero",
      enfoque: "proceso documentado",
      formato: videoFormat,
      emocion: "hope + credibilidad",
      percentage: 94
    },

    // --- REFLEXIONES Y FILOSOFÍA ---
    {
      hook: `Nadie habla del costo real de no resolver ${topic} a tiempo. Yo lo viví y cometí el error de esperar demasiado.`,
      angulo: "costo de la inacción",
      enfoque: "historia personal de consecuencias",
      formato: videoFormat,
      emocion: "fear + empatía",
      percentage: 96
    },
    {
      hook: `${topic} es más simple de lo que ${audience} cree. Lo hemos complicado todos juntos y nadie lo admite.`,
      angulo: "simplificación radical",
      enfoque: "desmitificación directa",
      formato: shortFormat,
      emocion: "relief + clarity",
      percentage: 90
    },
    {
      hook: `Lo que nadie dice sobre ${topic}: el 80% del resultado viene del 20% del esfuerzo. Aquí exactamente cuál es ese 20%:`,
      angulo: "principio de Pareto aplicado",
      enfoque: "foco estratégico",
      formato: textFormat,
      emocion: "efficiency + hope",
      percentage: 94
    },
    {
      hook: `La obsesión de ${audience} con ${topic} es real. El problema es que están optimizando la parte incorrecta del sistema.`,
      angulo: "optimización equivocada",
      enfoque: "reencuadre de prioridades",
      formato: textFormat,
      emocion: "uncomfortable truth",
      percentage: 93
    }
  ];

  const seed = ((whoAreYou + whatToCommunicate + platform).length) % all.length;
  const step = Math.max(1, Math.floor(all.length / 4));
  return [
    all[seed % all.length],
    all[(seed + step) % all.length],
    all[(seed + step * 2) % all.length],
    all[(seed + step * 3) % all.length]
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
