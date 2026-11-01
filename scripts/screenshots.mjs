import { chromium } from "playwright";
import { mkdirSync } from "fs";

const BASE = "http://localhost:3000";
mkdirSync("screenshots", { recursive: true });

const browser = await chromium.launch();
const results = [];

async function shot(page, name) {
  await page.waitForTimeout(800);
  await page.screenshot({ path: `screenshots/${name}.png` });
  results.push(`OK ${name}`);
}

// ---------- DESKTOP 1280 ----------
const desktop = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await desktop.newPage();

await page.goto(BASE, { waitUntil: "networkidle" });
await shot(page, "desktop-home-1280");

// Busca global
await page.getByRole("button", { name: "Buscar no site" }).click();
await page.getByLabel("Termo de busca").fill("risotto");
await shot(page, "desktop-busca-risotto-1280");
await page.keyboard.press("Escape");

// Cardápio: busca + filtro
await page.goto(`${BASE}/cardapio`, { waitUntil: "networkidle" });
await page.getByLabel("Buscar no cardápio").fill("nhoque");
await page.waitForTimeout(500);
await shot(page, "desktop-cardapio-busca-1280");
await page.getByLabel("Buscar no cardápio").fill("");
await page.getByRole("button", { name: "Massas" }).first().click();
await page.waitForTimeout(500);
await shot(page, "desktop-cardapio-filtro-massas-1280");

// Reserva: preencher e enviar
await page.goto(`${BASE}/reservas`, { waitUntil: "networkidle" });
await page.getByLabel("Nome completo *").fill("Maria da Silva");
await page.getByLabel("E-mail *").fill("maria@example.com");
await page.getByLabel("Telefone *").fill("(51) 99999-1234");
await page.getByLabel("Data *").fill("2026-11-15");
await page.getByLabel("Horário *").selectOption("20:00");
await page.getByLabel("Número de pessoas *").selectOption("4");
await page.getByLabel("Ocasião").selectOption("Aniversário");
await page.getByLabel("Observações").fill("Uma cadeirinha de bebê, por favor.");
await shot(page, "desktop-reserva-preenchida-1280");
await page.getByRole("button", { name: "Confirmar Reserva" }).click();
await page.waitForTimeout(1000);
await shot(page, "desktop-reserva-confirmada-1280");

// Chatbot fallback
await page.goto(BASE, { waitUntil: "networkidle" });
await page.getByRole("button", { name: "Abrir chat" }).click();
await page.getByLabel("Campo de mensagem").fill("Quais são os horários de funcionamento?");
await page.getByRole("button", { name: "Enviar mensagem" }).click();
await page.waitForTimeout(1500);
await shot(page, "desktop-chatbot-fallback-1280");

// 404
await page.goto(`${BASE}/pagina-inexistente`, { waitUntil: "networkidle" });
await shot(page, "desktop-404-1280");

await desktop.close();

// ---------- MOBILE 360 ----------
const mobile = await browser.newContext({ viewport: { width: 360, height: 800 } });
const mpage = await mobile.newPage();

await mpage.goto(BASE, { waitUntil: "networkidle" });
await shot(mpage, "mobile-home-360");

// Menu hambúrguer
await mpage.getByRole("button", { name: "Menu principal" }).click();
await shot(mpage, "mobile-menu-aberto-360");

await mpage.goto(`${BASE}/cardapio`, { waitUntil: "networkidle" });
await shot(mpage, "mobile-cardapio-360");

await mpage.goto(`${BASE}/reservas`, { waitUntil: "networkidle" });
await shot(mpage, "mobile-reservas-360");

await mobile.close();
await browser.close();

console.log(results.join("\n"));
