export function normalize(raw) {
  if (!Array.isArray(raw)) return [];
  const seen = new Set();
  const records = [];
  for (const item of raw) {
    const record = asRecord(item);
    if (!record || seen.has(record.id)) continue;
    seen.add(record.id);
    records.push(record);
  }
  return records;
}

export function cutCard(records, card, at) {
  if (!card || card.kind === "finale" || card.locked) return records;
  if (records.some((record) => record.id === card.id)) return records;
  return [
    ...records,
    {
      id: card.id,
      text: card.text || "",
      act: card.act || "",
      at,
    },
  ];
}

export function cutIds(records) {
  return records.map((record) => record.id);
}

function asRecord(item) {
  if (typeof item === "string" && item) {
    return { id: item, text: "", act: "", at: "" };
  }
  if (!item || typeof item.id !== "string" || !item.id) return null;
  return {
    id: item.id,
    text: typeof item.text === "string" ? item.text : "",
    act: typeof item.act === "string" ? item.act : "",
    at: typeof item.at === "string" ? item.at : "",
  };
}
