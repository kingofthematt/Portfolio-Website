import assert from "node:assert/strict";
import test from "node:test";
import { cutCard, cutIds, normalize } from "./deck.js";

test("a cut card is stored once and stays out", () => {
  const card = { id: "sf-01", kind: "question", text: "What's your first impression of me?", act: "surface" };
  const once = cutCard([], card, "2026-11-13T20:00:00.000Z");
  const twice = cutCard(once, card, "2026-11-13T21:00:00.000Z");
  assert.equal(twice.length, 1);
  assert.equal(twice[0].text, card.text);
  assert.equal(twice[0].at, "2026-11-13T20:00:00.000Z");
  assert.deepEqual(cutIds(twice), ["sf-01"]);
});

test("the last card cannot be cut", () => {
  const finale = { id: "finale", kind: "finale", text: "Last card." };
  assert.deepEqual(cutCard([], finale, "2026-11-13T20:00:00.000Z"), []);
});

test("older hidden ids become permanent cuts", () => {
  const records = normalize(["sf-02", { id: "sf-02", text: "duplicate" }, { id: "dp-01", text: "Kept", act: "deeper", at: "2026-11-13T20:00:00.000Z" }]);
  assert.deepEqual(cutIds(records), ["sf-02", "dp-01"]);
  assert.equal(records[1].text, "Kept");
});
