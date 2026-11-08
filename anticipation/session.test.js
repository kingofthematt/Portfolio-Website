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

test("a night is 20 cards and the heat only rises", () => {
  const session = buildSession([], rngFrom(7));
  assert.equal(session.length, 20);
  const rank = { notice: 0, want: 1, tease: 2, almost: 3 };
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

test("each night shows two nude or do-this cards after hands", () => {
  const seen = new Set();
  for (let seed = 1; seed <= 40; seed += 1) {
    const session = buildSession([], rngFrom(seed));
    const hands = session.findIndex((card) => card.id === "hands");
    const shows = session.flatMap((card, index) => (card.from === "show" ? [index] : []));
    assert.equal(shows.length, 2, `seed ${seed}`);
    assert.ok(shows[0] > hands, `seed ${seed}`);
    assert.ok(shows[1] < session.length - 1, `seed ${seed}`);
    assert.notEqual(session[shows[0]].id, session[shows[1]].id);
    seen.add(session[shows[0]].id);
    seen.add(session[shows[1]].id);
  }
  assert.deepEqual([...seen].sort(), ["sh-01", "sh-02", "sh-03", "sh-04"]);
  const blob = POOLS.show.map((card) => card.text.toLowerCase()).join("\n");
  assert.match(blob, /take a nude right now/);
  assert.match(blob, /favorite nude of yourself/);
  assert.match(blob, /however they want it/);
  assert.match(blob, /one thing to do/);
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
  assert.equal(session.length, 20);
  const tease = session.filter((card) => card.from === "tease");
  assert.equal(tease.length, 4);
  assert.ok(tease.every((card) => !card.clothes));
});

test("the deck is a first night, not a shared history", () => {
  const session = buildSession([], rngFrom(11));
  assert.equal(session[0].act, "notice");
  assert.equal(session[0].actName, "Notice");
  const blob = allCards()
    .flatMap((card) => [card.text, card.softer, card.note])
    .filter(Boolean)
    .join("\n")
    .toLowerCase();
  for (const phrase of ["ten years", "thanked", "fell for", "proud of me", "anniversary", "last time we"]) {
    assert.equal(blob.includes(phrase), false, phrase);
  }
  const tonight = blob.match(/tonight/g) || [];
  assert.ok(tonight.length >= 8, `expected first-night language, found ${tonight.length}`);
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
