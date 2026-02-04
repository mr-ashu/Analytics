
import dayjs from "dayjs";

//  random for determinism
function seededRandom(seed: string) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
  }
  return () => {
    h += h << 13; h ^= h >>> 7;
    h += h << 3; h ^= h >>> 17;
    h += h << 5;
    return (h >>> 0) / 4294967295;
  };
}

// Simulate error 
function maybeThrowError() {
  if (Math.random() < 0.1) {
    throw new Error("Simulated API error");
  }
}

export type TimeSeriesPoint = {
  date: string;
  value: number;
};

export type TopNItem = {
  name: string;
  count: number;
};


export async function getTimeSeries({ projectId = '', event = '', breakdown = '', from = '', to = '' } = {}): Promise<TimeSeriesPoint[]> {
  await new Promise((r) => setTimeout(r, 300));
  maybeThrowError();
  // Deterministic seed based on filters
  const seed = `${projectId}|${event}|${breakdown}|${from}|${to}`;
  const rand = seededRandom(seed);
  const days = 7;
  return Array.from({ length: days }).map((_, i) => ({
    date: dayjs(from || undefined).add(i, "day").format("YYYY-MM-DD"),
    value: Math.floor(rand() * 100),
  }));
}


export async function getTopN({ projectId = '', event = '', breakdown = '', from = '', to = '' } = {}): Promise<TopNItem[]> {
  await new Promise((r) => setTimeout(r, 300));
  maybeThrowError();
  const seed = `${projectId}|${event}|${breakdown}|${from}|${to}`;
  const rand = seededRandom(seed + 'topn');
  const items = ["Store A", "Store B", "Store C", "Store D", "Store E", "Store F"];
  return items.map((name, i) => ({
    name,
    count: Math.floor(rand() * 500),
  }));
}
