import assert from "node:assert/strict";
import test from "node:test";
import { allCards, POOLS } from "./cards.js";
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
  "asshole",
  "open relationship",
  "cheating",
  "lose a layer",
];

test("a night is 13 cards and the heat only rises", () => {
  const session = buildSession([], rngFrom(7));
  assert.equal(session.length, 13);
  const rank = { close: 0, want: 1, tease: 2, almost: 3 };
  for (let i = 1; i < session.length; i += 1) {
    assert.ok(rank[session[i].act] >= rank[session[i - 1].act]);
  }
  assert.equal(session.at(-1).kind, "finale");
  assert.equal(new Set(session.map((card) => card.id)).size, session.length);
});

test("the night hits ice, a clothed lick or kiss, touch, then hands", () => {
  for (let seed = 1; seed <= 30; seed += 1) {
    const session = buildSession([], rngFrom(seed));
    const at = (pred) => session.findIndex(pred);
    const ice = at((card) => card.id === "ice");
    const clothes = at((card) => card.clothes);
    const touch = at((card) => card.id === "touch");
    const hands = at((card) => card.id === "hands");
    const light = at((card) => card.from === "light");
    assert.ok(light !== -1 && light < ice, `seed ${seed} light before ice`);
    assert.ok(ice < clothes, `seed ${seed} ice before clothes`);
    assert.ok(clothes < touch, `seed ${seed} clothes before touch`);
    assert.ok(touch < hands, `seed ${seed} touch before hands`);
    assert.ok(hands < session.length - 1);
  }
});

test("different nights draw different questions", () => {
  const firsts = new Set(
    Array.from({ length: 20 }, (_, seed) => buildSession([], rngFrom(seed + 3))[0].id),
  );
  assert.ok(firsts.size > 1);
});

test("hidden cards stay out, and anchors fall back softer", () => {
  const hidden = POOLS.thoughtful.map((card) => card.id);
  const session = buildSession(hidden, rngFrom(2));
  assert.equal(session[0].id, "fb-thoughtful");

  const softened = buildSession(["ice", "touch", "hands"], rngFrom(2));
  assert.match(softened.find((card) => card.id === "ice").text, /Skip the ice/);
  assert.match(softened.find((card) => card.id === "touch").text, /waist, hips, and chest/);
  assert.match(softened.find((card) => card.id === "hands").text, /Stay over the clothes/);
  assert.equal(softened.at(-1).id, "finale");
});

test("hiding every clothed dare still leaves a dressed tease", () => {
  const clothes = POOLS.tease.filter((card) => card.clothes).map((card) => card.id);
  const session = buildSession(clothes, rngFrom(4));
  assert.equal(session.length, 13);
  const tease = session.filter((card) => card.from === "tease");
  assert.equal(tease.length, 2);
  assert.ok(tease.every((card) => !card.clothes));
});

test("the deck stays on a date, not a debate or a stunt", () => {
  const blob = allCards()
    .flatMap((card) => [card.text, card.softer, card.note])
    .filter(Boolean)
    .join("\n")
    .toLowerCase();
  for (const word of BANNED) {
    assert.equal(blob.includes(word), false, word);
  }
});
