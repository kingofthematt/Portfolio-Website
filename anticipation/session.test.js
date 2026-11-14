import assert from "node:assert/strict";
import test from "node:test";
import { allCards, DRAW, POOLS } from "./cards.js";
import { buildSession } from "./session.js";

function rngFrom(seed) {
  let state = (seed * 9973 + 12345) % 2147483647;
  if (state <= 0) state = 1;
  return () => {
    state = (state * 48271) % 2147483647;
    return state / 2147483647;
  };
}

const BANNED = [
  "abortion",
  "politics",
  "political",
  "religion",
  "pickleball",
  "thermostat",
  "deepthroat",
  "open relationship",
  "cheating",
];

test("each stage has a deep pile and a night only deals eight", () => {
  for (const [name, pool] of Object.entries(POOLS)) {
    assert.ok(pool.length >= 15 && pool.length <= 25, `${name} has ${pool.length}`);
  }
  const session = buildSession([], rngFrom(7));
  assert.equal(session.length, DRAW * 4 + 1);
  for (const act of ["surface", "deeper", "tease", "almost"]) {
    const dealt = session.filter((card) => card.from === act && card.kind !== "finale");
    assert.equal(dealt.length, DRAW, act);
  }
  assert.equal(session.at(-1).kind, "finale");
  const rank = { surface: 0, deeper: 1, tease: 2, almost: 3 };
  for (let i = 1; i < session.length; i += 1) {
    assert.ok(rank[session[i].act] >= rank[session[i - 1].act]);
  }
  assert.equal(new Set(session.map((card) => card.id)).size, session.length);
});

test("different nights deal different cards", () => {
  const firsts = new Set(
    Array.from({ length: 12 }, (_, seed) => buildSession([], rngFrom(seed + 3))[0].id),
  );
  assert.ok(firsts.size > 1);
});

test("hidden cards stay out of the deal", () => {
  const hidden = POOLS.surface.map((card) => card.id);
  const session = buildSession(hidden, rngFrom(2));
  const surface = session.filter((card) => card.from === "surface");
  assert.equal(surface.length, 1);
  assert.equal(surface[0].id, "fb-surface");
});

test("the daring stage keeps the lines that were asked for", () => {
  const blob = POOLS.tease.map((card) => card.text).join("\n");
  assert.match(blob, /Makeout with an ice cube in your mouth until it melts all the way/);
  assert.match(blob, /Ask 1 sexual question you wouldn't normally ask by now/);
  assert.match(blob, /What's the first thing you thought when we first met/);
  assert.ok(POOLS.tease.some((card) => card.softer && /Take off a layer/.test(card.softer)));
  const almost = POOLS.almost.map((card) => card.text).join("\n");
  assert.match(almost, /Finger them/);
  assert.match(almost, /Finger their asshole/);
  assert.match(almost, /head for five minutes/);
  assert.match(almost, /Eat their ass/);
});

test("the deck stays on a date, not a debate", () => {
  const blob = allCards()
    .flatMap((card) => [card.text, card.softer, card.note])
    .filter(Boolean)
    .join("\n")
    .toLowerCase();
  for (const word of BANNED) assert.equal(blob.includes(word), false, word);
  assert.equal(blob.includes("first impression of me"), true);
});
