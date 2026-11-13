import { ACTS, DRAW, FALLBACKS, FINALE, POOLS } from "./cards.js";

const ACT_ORDER = ["surface", "deeper", "tease", "almost"];

function facing(card, act) {
  if (card.kind === "dare") {
    return { back: "A dare.", rule: card.note || act.rule };
  }
  if (card.kind === "finale") {
    return { back: "Last card.", rule: "Both of you have to want it." };
  }
  return { back: act.back, rule: act.rule };
}

function decorate(card, actName) {
  const act = ACTS[actName] || ACTS.almost;
  const face = facing(card, act);
  return {
    ...card,
    act: actName,
    from: actName,
    actName: act.name,
    back: face.back,
    rule: face.rule,
  };
}

function drawFrom(pool, removed, rng) {
  const available = pool.filter((card) => !removed.has(card.id));
  const copy = [...available];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, DRAW);
}

export function buildSession(removedIds = [], rng = Math.random) {
  const removed = new Set(removedIds);
  const cards = [];

  for (const act of ACT_ORDER) {
    let picked = drawFrom(POOLS[act], removed, rng);
    if (!picked.length) picked = [FALLBACKS[act]];
    for (const card of picked) cards.push(decorate(card, act));
  }

  cards.push(decorate(FINALE, "almost"));
  return cards;
}
