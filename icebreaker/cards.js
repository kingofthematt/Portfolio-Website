export const ACTS = {
  close: {
    name: "Close",
    back: "Talk first.",
    rule: "A question. Answer out loud.",
  },
  want: {
    name: "Want",
    back: "Say the true version.",
    rule: "Say it out loud. The dare in this part stays dressed.",
  },
  tease: {
    name: "Tease",
    back: "Clothes stay on.",
    rule: "A dare. Either of you can soften it.",
  },
  almost: {
    name: "Almost",
    back: "They set the pace.",
    rule: "They lead. Stopping still counts.",
  },
};

const thoughtful = [
  ["th-01", "What's a part of me you fell for that you didn't expect to care about?"],
  ["th-02", "When do you feel most like yourself with me?"],
  ["th-03", "What's something you've never thanked me for?"],
  ["th-04", "What do you hope we still do in ten years — the small version, not the movie version?"],
  ["th-05", "What's a way I make an ordinary day feel less ordinary?"],
  ["th-06", "Tell me a moment you were proud of me and kept to yourself."],
  ["th-07", "What do you want more of from me that has nothing to do with sex?"],
  ["th-08", "What's something I do, not in bed, that makes you feel wanted?"],
];

const playful = [
  ["pl-01", "What's the most ridiculous thing you find hot about me? Be specific."],
  ["pl-02", "Who's more dangerous: me trying to behave, or you when you think you're being subtle?"],
  ["pl-03", "What's a face I make that you find unfair?"],
  ["pl-04", "If we had to flirt using only the food in this room, what's your move?"],
  ["pl-05", "What's the pettiest thing you want to steal from me tonight? A hoodie counts."],
  ["pl-06", "Tell me a story about us that makes you laugh before it makes you want me."],
  ["pl-07", "Who cracks first tonight, and what's going to do it?"],
  ["pl-08", "What's an ordinary habit of mine you pretend to mind and actually love?"],
];

const likely = [
  ["lk-01", "Who is more likely to kiss first and then pretend it was an accident?"],
  ["lk-02", "Who is more likely to get shy the second something actually works?"],
  ["lk-03", "Who is more likely to laugh in the middle of a perfect kiss?"],
  ["lk-04", "Who is more likely to send the text that ruins the other person's focus?"],
  ["lk-05", "Who is more likely to steal the blanket and then offer to share, for a price?"],
  ["lk-06", "Who is more likely to say they're fine and be extremely not fine?"],
  ["lk-07", "Who is more likely to turn a forehead kiss into a problem?"],
  ["lk-08", "Who is more likely to plan on behaving tonight and fail immediately?"],
  ["lk-09", "Who is more likely to remember this night in the middle of an ordinary Tuesday?"],
  ["lk-10", "Who is more likely to ask for the softer version and then not want it?"],
];

const want = [
  ["wa-01", "What's a look I give you that makes you want me immediately?"],
  ["wa-02", "Where do you want my mouth first, once we're allowed to take our time?"],
  ["wa-03", "What's the sexiest non-sexual thing I do?"],
  ["wa-04", "How do you want to be kissed when you're already turned on?"],
  ["wa-05", "What am I wearing, or not wearing, in the version of tonight you keep picturing?"],
  ["wa-06", "If we were strangers and you had one hour, how would you seduce me?"],
  ["wa-07", "What's something soft I do that lands dirty anyway?"],
  ["wa-08", "Say the sentence you hope I whisper in your ear later."],
  ["wa-09", "What's hotter to you tonight: me asking shyly, or me telling you?"],
  ["wa-10", "Where do you want my hands the second we're alone?"],
];

const light = [
  {
    id: "lt-01",
    text: "Kiss them for thirty seconds. Hands stay on a jaw, a waist, or in their hair.",
    softer: "One slow kiss. Stop while it's still sweet.",
    note: "A warm-up. Stay dressed.",
  },
  {
    id: "lt-02",
    text: "Put your mouth on their neck. No hands until they pull you in.",
    softer: "Kiss the side of their neck once, then their mouth.",
    note: "Stay dressed.",
  },
  {
    id: "lt-03",
    text: "Tell them the next place you want your mouth. Then kiss that place once, through their clothes.",
    softer: "Tell them, and kiss their mouth instead.",
    note: "Through clothes.",
  },
  {
    id: "lt-04",
    text: "Pull them in by the waist. Kiss them like you have to be good afterward. Then actually be good for one minute.",
    softer: "A long kiss with your hands at their waist. Then pause.",
    note: "Stay dressed.",
  },
  {
    id: "lt-05",
    text: "Hold their eyes, close enough to kiss, until one of you smiles. Then kiss the smile.",
    softer: "Ten seconds of eye contact, then one kiss.",
    note: "No hands below the waist.",
  },
  {
    id: "lt-06",
    text: "Trace their collarbone with your mouth. Nowhere lower yet.",
    softer: "Kiss their shoulder, over clothes, then their mouth.",
    note: "Stay above the chest.",
  },
];

const tease = [
  {
    id: "tz-01",
    clothes: true,
    text: "Lick and kiss them wherever you want, through their clothes. Linger on the places you're saving for later.",
    softer: "Kiss them wherever they tap, through their clothes. Two spots, then back to their mouth.",
    note: "Clothes stay on.",
  },
  {
    id: "tz-02",
    clothes: true,
    text: "Pick the spot you keep looking at. Lick a slow line over the fabric, then kiss that same spot twice.",
    softer: "Kiss that spot twice through the fabric. Skip the lick.",
    note: "Clothes stay on.",
  },
  {
    id: "tz-03",
    clothes: true,
    text: "Kiss their chest, their stomach, or the inside of a thigh — through their clothes. They choose. If they only smile, you choose.",
    softer: "They point to a shoulder, a hip, or a knee. Kiss it through clothes.",
    note: "Clothes stay on.",
  },
  {
    id: "tz-04",
    text: "Sit in their lap, facing them. One slow grind, clothed, like you're allowed to want it and not have it yet. Then kiss them.",
    softer: "Sit in their lap and kiss them. Skip the grind.",
    note: "Clothes stay on.",
  },
  {
    id: "tz-05",
    text: "Guide their hand over your clothes to the place you want them thinking about. Leave it there while you kiss.",
    softer: "Put their hand on your waist or your hip, over clothes, and kiss them.",
    note: "Over clothes. They can move their hand.",
  },
  {
    id: "tz-06",
    text: "Trace them from throat to thigh with one finger, over clothes. They stay still. You go slower than you want to.",
    softer: "Trace from their shoulder to their wrist, then kiss them.",
    note: "Over clothes.",
  },
  {
    id: "tz-07",
    text: "Suck their lower lip. Hands at the waist. If they rush, hold their wrists gently and keep the kiss slow.",
    softer: "A slow kiss. Your hands stay at their waist.",
    note: "Stay dressed.",
  },
  {
    id: "tz-08",
    text: "Press your whole body against theirs, fully clothed, until one of you makes a sound. Kiss them before you get practical.",
    softer: "A full-body hug that lasts, then a kiss.",
    note: "Clothes stay on.",
  },
  {
    id: "tz-09",
    text: "Whisper one specific thing you want after this game. Then do only the clothed version of the first step.",
    softer: "Whisper it, then kiss them. Save the rest.",
    note: "Clothes stay on.",
  },
  {
    id: "tz-10",
    clothes: true,
    text: "Kiss along their waistband, over the clothes, and stop right where they'd have to ask you to keep going.",
    softer: "Kiss their stomach once, through their shirt, then their mouth.",
    note: "Clothes stay on.",
  },
];

function talk(kind, pairs) {
  return pairs.map(([id, text]) => ({ id, kind, text }));
}

export const POOLS = {
  thoughtful: talk("question", thoughtful),
  playful: talk("question", playful),
  likely: likely.map(([id, text]) => ({
    id,
    kind: "likely",
    text,
    note: "Point at who. Argue if it's close.",
  })),
  want: talk("question", want),
  light: light.map((card) => ({ ...card, kind: "dare" })),
  tease: tease.map((card) => ({ ...card, kind: "dare" })),
  ice: [
    {
      id: "ice",
      kind: "dare",
      anchor: true,
      text: "Put an ice cube in your mouth and kiss them. Pass it back and forth until it melts or one of you laughs. Hands on a jaw or a waist — nothing under clothes yet. No ice around? Take a cold sip and kiss them with a cool mouth.",
      softer: "Skip the ice. Kiss them slowly with a hand on their jaw, and let it last.",
      note: "Nothing under clothes yet.",
    },
  ],
  touch: [
    {
      id: "touch",
      kind: "dare",
      anchor: true,
      text: "Take turns. For one minute each, touch each other over your clothes on the private places — chest, ass, between the legs. Whoever is being touched says there, slower, or not yet. Kiss them when the minute ends.",
      softer: "Same minute, but keep it to waist, hips, and chest, over clothes. They still say there, slower, or not yet.",
      note: "Clothes stay on. They set the pace.",
    },
  ],
  hands: [
    {
      id: "hands",
      kind: "dare",
      anchor: true,
      text: "Only if they want skin. Slide a hand under their clothes — a little fingering, or a little stroking — slow, and only while they want it. They move your hand. They decide how far. A tap means back to kissing over clothes, and that still counts. If either of you wants to stay dressed, touch over the clothes like you mean it.",
      softer: "Stay over the clothes. Touch them there for one slow minute, and let them guide your hand.",
      note: "Their hand can move yours. A tap means stop.",
    },
  ],
  finale: [
    {
      id: "finale",
      kind: "finale",
      text: "Last card. Pick the ending together. Both of you have to want it.",
      note: "If there's any hesitation, put the phone down and keep kissing.",
    },
  ],
};

export const SCRIPT = [
  { act: "close", pool: "thoughtful" },
  { act: "close", pool: "playful" },
  { act: "close", pool: "likely" },
  { act: "want", pool: "want" },
  { act: "want", pool: "light" },
  { act: "want", pool: "want" },
  { act: "want", pool: "likely" },
  { act: "tease", pool: "ice", fixed: true },
  { act: "tease", pool: "tease", avoidClothes: true },
  { act: "tease", pool: "tease", clothes: true },
  { act: "almost", pool: "touch", fixed: true },
  { act: "almost", pool: "hands", fixed: true },
  { act: "almost", pool: "finale", fixed: true },
];

export const FALLBACKS = {
  thoughtful: {
    id: "fb-thoughtful",
    kind: "question",
    locked: true,
    text: "Tell them one true thing you're glad is true about the two of you.",
  },
  playful: {
    id: "fb-playful",
    kind: "question",
    locked: true,
    text: "What's something we do that would make no sense to anyone else and perfect sense to us?",
  },
  likely: {
    id: "fb-likely",
    kind: "likely",
    locked: true,
    text: "Who is more likely to reach for the other one first?",
    note: "Point at who.",
  },
  want: {
    id: "fb-want",
    kind: "question",
    locked: true,
    text: "What do you want from me in the next ten minutes?",
  },
  light: {
    id: "fb-light",
    kind: "dare",
    locked: true,
    text: "Kiss them slowly. Hands at their waist. Stop while you're both still dressed.",
    softer: "One kiss. Then breathe.",
    note: "Stay dressed.",
  },
  tease: {
    id: "fb-tease",
    kind: "dare",
    locked: true,
    text: "Kiss them wherever they tap, through their clothes.",
    softer: "Kiss their mouth, slowly.",
    note: "Clothes stay on.",
  },
};

export function allCards() {
  return Object.values(POOLS).flat();
}
