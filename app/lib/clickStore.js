import fs from "fs/promises";
import path from "path";

const STORE_DIR = process.env.VERCEL
  ? path.join("/tmp", "tire-search-engine-marketing")
  : path.join(process.cwd(), "data", "marketing");
const STORE_FILE = path.join(STORE_DIR, "outbound-clicks.json");
const MAX_EVENTS = 5000;

function clean(value = "", max = 500) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, max);
}

async function readStore() {
  try {
    const raw = await fs.readFile(STORE_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed.events) ? parsed.events : [];
  } catch {
    return [];
  }
}

export async function getOutboundClicks(limit = 200) {
  const events = await readStore();
  return events.slice(-limit).reverse();
}

export async function recordOutboundClick(event = {}) {
  const normalized = {
    merchant: clean(event.merchant, 80),
    placement: clean(event.placement, 120),
    tireSize: clean(event.tireSize, 40),
    destination: clean(event.destination, 500),
    path: clean(event.path, 240),
    referrer: clean(event.referrer, 500),
    userAgent: clean(event.userAgent, 500),
    timestamp: new Date().toISOString()
  };

  console.info("tse_outbound_click", normalized);

  await fs.mkdir(STORE_DIR, { recursive: true });
  const events = await readStore();
  await fs.writeFile(
    STORE_FILE,
    JSON.stringify({ events: [...events, normalized].slice(-MAX_EVENTS), updatedAt: new Date().toISOString() }, null, 2),
    "utf8"
  );

  return normalized;
}
