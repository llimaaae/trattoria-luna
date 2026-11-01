# Trattoria Luna 🍝

Site de portfólio para um restaurante italiano fictício — sabores que atravessam gerações.

## Stack

- **Next.js 16** (App Router, Turbopack, Cache Components)
- **TypeScript**
- **Tailwind CSS v4** (`@theme` no CSS global)
- **Framer Motion** (animações)
- **sharp** (otimização de imagens WebP)
- **Playwright** (testes E2E + screenshots)

## Como rodar

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de produção (Turbopack)
```

Testes + screenshots (precisa `npm run dev` rodando):

```bash
node scripts/screenshots.mjs   # salva em /screenshots (360px e 1280px)
```

## Variáveis de ambiente

Copie `.env.example` para `.env.local`. Na Vercel, configure em **Settings > Environment Variables** e faça **redeploy** depois de adicionar:

| Variável | Descrição |
|---|---|
| `NEXT_PUBLIC_GA_ID` | ID do Google Analytics 4 (ex.: `G-XXXXXXXXXX`). Analytics só carrega se existir. |
| `CHAT_PROVIDER` | Provedor do chatbot IA: `anthropic` \| `openai` \| `gemini` |
| `CHAT_API_KEY` | Chave da IA. **Vazia = modo fallback** (respostas por FAQ/palavras-chave). Nunca vai para o cliente. |
| `CHAT_MODEL` | Modelo (opcional). Padrões: `claude-3-5-sonnet-20241022`, `gpt-4-turbo-preview`, `gemini-1.5-flash` |

> Workflow chatbot: publique sem chave (fallback ativo) → adicione as 3 variáveis na Vercel → redeploy → IA ativa sem mudar código.

## Funcionalidades

- Home completa (hero, destaques, sobre, depoimentos, galeria, localização, CTA)
- Cardápio com 27 itens, 6 categorias, filtros por categoria/tags e busca
- Busca global no header (pratos + páginas, com destaque do termo, atalho `/`)
- Reservas com validação completa e tela de confirmação (demonstrativo)
- Chatbot `/api/chat` com 3 provedores de IA + fallback FAQ + rate limit (10/min por IP)
- Botão flutuante de WhatsApp (número fictício)
- SEO: metadata por página, Open Graph, sitemap, robots, JSON-LD (Restaurant + Menu)
- GA4 com eventos (CTAs, reserva enviada, uso do chatbot)
- Acessibilidade: HTML semântico, foco visível, aria-labels, `prefers-reduced-motion`
- 404 personalizada

## Identidade visual

Ver **[BRAND.md](./BRAND.md)**: paleta terracota/creme/oliva/dourado, Playfair Display + Inter.

## Decisões de design

- **Tailwind v4**: cores via `@theme` no `globals.css` (não `tailwind.config`) — projetos criados com `create-next-app` atual usam v4 por padrão.
- **Favicon**: `app/icon.svg` (Next.js serve como `icon.svg`, GP-safe).
- **`new Date()`**: nunca em Server/prerender — Fixo via `useEffect`/estado (Footer, reservas).
- **Componentes**: `"use client"` em qualquer componente que use `motion` ou estado, mesmo em páginas server-rendered.
- **Imagens**: Pexels (licença livre), baixadas e otimizadas em WebP via `scripts/optimize-images.mjs`; créditos em **[CREDITS.md](./CREDITS.md)**.
- **Idioma**: pt-BR, preços em R$.

## Créditos de imagem

Ver **[CREDITS.md](./CREDITS.md)** — todas as fotos são do Pexels (uso comercial livre).
