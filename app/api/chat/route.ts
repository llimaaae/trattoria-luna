import { NextRequest, NextResponse } from "next/server";

const RATE_LIMIT_MAP = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT_MAX = 10;

// Fallback FAQ responses
const FALLBACK_RESPONSES: Record<string, string> = {
  horario: "Estamos abertos de terça a domingo:\n• Terça a Quinta: 18h-23h\n• Sexta e Sábado: 12h-15h e 18h-00h\n• Domingo: 12h-16h e 18h-22h\n• Segunda: Fechado",
  endereco: "Rua das Acácias, 123 - Moinhos de Vento, Porto Alegre - RS, 90570-000",
  telefone: "Telefone: (51) 3000-1234\nE-mail: contato@trattorialuna.com.br",
  reserva: "Para reservar sua mesa, visite nossa página de reservas ou ligue para (51) 3000-1234.",
  cardapio: "Confira nosso cardápio completo em /cardapio. Temos entradas, massas, carnes, peixes, risottos e sobremesas autênticas.",
  preco: "Nossos pratos variam entre R$ 22 (sobremesas) e R$ 98 (pratos especiais). Visite o cardápio para detalhes.",
  estacionamento: "Temos convênio com estacionamento próximo. Consulte no local.",
  vegetariano: "Sim! Temos várias opções vegetarianas como Burrata, Pappardelle ai Funghi, Ravioli de Ricota e Risotto ai Funghi.",
  default: "Desculpe, não entendi. Posso ajudar com: horários, endereço, telefone, reservas, cardápio ou opções vegetarianas.",
};

function detectIntent(message: string): string {
  const lower = message.toLowerCase();
  if (/(horário|horario|abre|fecha|aberto|funcionamento|quando)/.test(lower)) return "horario";
  if (/(endereço|endereco|localização|localizacao|onde|fica|como chegar)/.test(lower)) return "endereco";
  if (/(telefone|contato|ligar|falar|whatsapp)/.test(lower)) return "telefone";
  if (/(reserva|mesa|agendar|booking)/.test(lower)) return "reserva";
  if (/(cardápio|cardapio|menu|pratos|comida)/.test(lower)) return "cardapio";
  if (/(preço|preco|valor|quanto custa)/.test(lower)) return "preco";
  if (/(estacionamento|estacionar|vaga|parking)/.test(lower)) return "estacionamento";
  if (/(vegetariano|vegano|vegan|sem carne)/.test(lower)) return "vegetariano";
  return "default";
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = RATE_LIMIT_MAP.get(ip);

  if (!record || now > record.resetTime) {
    RATE_LIMIT_MAP.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count++;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Muitas requisições. Aguarde um momento." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { message, history = [] } = body;

    if (!message || typeof message !== "string" || message.length > 500) {
      return NextResponse.json(
        { error: "Mensagem inválida" },
        { status: 400 }
      );
    }

    const apiKey = process.env.CHAT_API_KEY;
    const provider = process.env.CHAT_PROVIDER || "anthropic";
    const model = process.env.CHAT_MODEL;

    // FALLBACK MODE: No API key
    if (!apiKey) {
      const intent = detectIntent(message);
      const response = FALLBACK_RESPONSES[intent] || FALLBACK_RESPONSES.default;
      
      return NextResponse.json({
        response,
        mode: "fallback",
        suggestions: ["Ver cardápio", "Fazer reserva", "Horários de funcionamento"],
      });
    }

    // AI MODE: Use configured provider
    const systemPrompt = `Você é o assistente virtual da Trattoria Luna, um restaurante italiano autêntico.

INFORMAÇÕES IMPORTANTES:
- Endereço: Rua das Acácias, 123 - Moinhos de Vento, Porto Alegre - RS
- Telefone: (51) 3000-1234
- Horários: Ter-Qui 18h-23h, Sex-Sáb 12h-15h e 18h-00h, Dom 12h-16h e 18h-22h, Segunda fechado
- Especialidades: Massas frescas artesanais, carnes braseadas, risottos, sobremesas italianas
- Pratos destacados: Tagliatelle al Ragù (R$ 68), Ossobuco alla Milanese (R$ 92), Tiramisù (R$ 28)
- Opções vegetarianas: Burrata, Pappardelle ai Funghi, Ravioli, Risotto ai Funghi

INSTRUÇÕES:
- Responda em português do Brasil, de forma acolhedora e breve (máximo 3 frases)
- Nunca invente pratos, preços ou informações que não foram fornecidas
- Para reservas, direcione para /reservas ou telefone
- Se não souber, seja honesto e sugira contato direto
- Use tom caloroso mas profissional

Responda a pergunta do cliente agora.`;

    let aiResponse: string;

    try {
      if (provider === "anthropic") {
        const response = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
            "anthropic-version": "2023-06-01",
          },
          body: JSON.stringify({
            model: model || "claude-3-5-sonnet-20241022",
            max_tokens: 300,
            messages: [
              ...history.slice(-6).map((msg: any) => ({
                role: msg.role,
                content: msg.content,
              })),
              { role: "user", content: message },
            ],
            system: systemPrompt,
          }),
          signal: AbortSignal.timeout(10000),
        });

        if (!response.ok) {
          throw new Error(`Anthropic API error: ${response.status}`);
        }

        const data = await response.json();
        aiResponse = data.content[0].text;
      } else if (provider === "openai") {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: model || "gpt-4-turbo-preview",
            messages: [
              { role: "system", content: systemPrompt },
              ...history.slice(-6),
              { role: "user", content: message },
            ],
            max_tokens: 300,
            temperature: 0.7,
          }),
          signal: AbortSignal.timeout(10000),
        });

        if (!response.ok) {
          throw new Error(`OpenAI API error: ${response.status}`);
        }

        const data = await response.json();
        aiResponse = data.choices[0].message.content;
      } else if (provider === "gemini") {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model || "gemini-1.5-flash"}:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    { text: systemPrompt },
                    ...history.slice(-6).flatMap((msg: any) => [{ text: msg.content }]),
                    { text: message },
                  ],
                },
              ],
              generationConfig: { maxOutputTokens: 300 },
            }),
            signal: AbortSignal.timeout(10000),
          }
        );

        if (!response.ok) {
          throw new Error(`Gemini API error: ${response.status}`);
        }

        const data = await response.json();
        aiResponse = data.candidates[0].content.parts[0].text;
      } else {
        throw new Error("Provider inválido");
      }

      return NextResponse.json({
        response: aiResponse,
        mode: "ai",
      });
    } catch (error) {
      console.error("AI API error, falling back:", error);
      
      // Fallback on AI error
      const intent = detectIntent(message);
      const response = FALLBACK_RESPONSES[intent] || FALLBACK_RESPONSES.default;
      
      return NextResponse.json({
        response,
        mode: "fallback",
        suggestions: ["Ver cardápio", "Fazer reserva", "Horários de funcionamento"],
      });
    }
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Erro ao processar mensagem" },
      { status: 500 }
    );
  }
}
