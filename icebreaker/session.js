import { ACTS, FALLBACKS, POOLS, SCRIPT } from "./cards.js";

function soften(card) {
  return {
    ...card,
    text: card.softer || card.text,
    note: "The version you kept.",
    softer: null,
    softened: true,
  };
}

function facing(card, act) {
  if (card.kind === "dare") {
    return { back: "A dare.", rule: card.note || act.rule };
  }
  if (card.kind === "likely") {
    return { back: "Who of us.", rule: "Point at who. Argue if it's close." };
  }
  if (card.kind === "finale") {
    return { back: "Last card.", rule: "Both of you have to want it." };
  }
  return { back: act.back, rule: act.rule };
}

function resolve(card, removed) {
  if (!card) return null;
  if (card.kind === "finale" || card.locked) return card;
  if (!removed.has(card.id)) return card;
  if (card.anchor && card.softer) return soften(card);
  return null;
}

function pick(pool, removed, used, rng, { filter, avoid } = {}) {
  let choices = pool.filter((card) => !removed.has(card.id) && !used.has(card.id));
  if (filter) {
    const filtered = choices.filter(filter);
    if (filtered.length) choices = filtered;
  }
  if (avoid) {
    const filtered = choices.filter((card) => !avoid(card));
    if (filtered.length) choices = filtered;
  }
  if (!choices.length) return null;
  const index = Math.floor(rng() * choices.length);
  return choices[index];
}

export function buildSession(removedIds = [], rng = Math.random) {
  const removed = new Set(removedIds);
  const used = new Set();

  return SCRIPT.map((beat) => {
    const act = ACTS[beat.act];
    let card = null;

    if (beat.fixed) {
      card = resolve(POOLS[beat.pool][0], removed);
    } else {
      card = pick(POOLS[beat.pool], removed, used, rng, {
        filter: beat.clothes ? (item) => item.clothes : null,
        avoid: beat.avoidClothes ? (item) => item.clothes : null,
      });
      card = resolve(card, removed) || FALLBACKS[beat.pool];
    }

    if (!card) card = FALLBACKS[beat.pool] || POOLS[beat.pool][0];
    if (used.has(card.id)) {
      card = { ...card, id: `${card.id}-${beat.act}` };
    }
    used.add(card.id);
    const face = facing(card, act);

    return {
      ...card,
      act: beat.act,
      from: beat.pool,
      actName: act.name,
      back: face.back,
      rule: face.rule,
    };
  });
}
