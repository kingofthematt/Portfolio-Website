export const ACTS = {
  surface: {
    name: "Surface",
    back: "Easy.",
    rule: "Answer like you're actually talking. Details are better than a speech.",
  },
  deeper: {
    name: "Deeper",
    back: "A little further.",
    rule: "Still a conversation. Say the true version, not the impressive one.",
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

const impression = [
  ["im-01", "What's your first impression of me?"],
  ["im-02", "What did you notice about me before we started talking?"],
  ["im-03", "What about me made you want to keep the conversation going?"],
  ["im-04", "If a friend asked what I was like, what would you say so far?"],
  ["im-05", "What's one thing about me that doesn't match what you expected?"],
  ["im-06", "When you first saw me, what did you assume I was doing here?"],
];

const easy = [
  ["ea-01", "What do you do on a Saturday when nobody needs anything from you?"],
  ["ea-02", "What's the last thing you got excited about, even if it was small?"],
  ["ea-03", "What kind of music do you put on when you're in a good mood?"],
  ["ea-04", "What's a meal you order so often the menu is a formality?"],
  ["ea-05", "Where do you go when you want to be out of the house but off duty?"],
  ["ea-06", "What's something you taught yourself?"],
  ["ea-07", "What's the best trip you've taken, and what made it good?"],
  ["ea-08", "What does a good weeknight look like for you?"],
  ["ea-09", "Who got you into the thing you like most?"],
  ["ea-10", "What's a place you take people when you want them to like your city?"],
];

const hobby = [
  ["hb-01", "What are you into right now that you could talk about for an hour?"],
  ["hb-02", "What's a hobby you started casually and then actually got good at?"],
  ["hb-03", "If we had a free afternoon and you were in charge, what are we doing?"],
  ["hb-04", "What's a skill you have that never comes up on a first night?"],
  ["hb-05", "What have you been watching, reading, or playing lately?"],
  ["hb-06", "What sport, game, or class would you talk me into?"],
  ["hb-07", "What's something you follow, collect, or know a slightly unreasonable amount about?"],
  ["hb-08", "What are you trying to get better at?"],
  ["hb-09", "What's the thing your friends call you for?"],
  ["hb-10", "What's a spot in this city you think more people should know about?"],
];

const likely = [
  ["lk-01", "Who is more likely to have a very specific coffee order?"],
  ["lk-02", "Who is more likely to suggest one more stop before heading home?"],
  ["lk-03", "Who is more likely to remember a song after hearing it once?"],
  ["lk-04", "Who is more likely to turn a loose plan into a whole night?"],
  ["lk-05", "Who talks with their hands more?"],
  ["lk-06", "Who is more likely to know a strange fact about wherever we are?"],
  ["lk-07", "Who is more likely to text first tomorrow?"],
  ["lk-08", "Who is more likely to have a hobby nobody else here has heard of?"],
];

const deeper = [
  ["dp-01", "What's something you've gotten better at this year?"],
  ["dp-02", "What do you want more of in your life right now?"],
  ["dp-03", "When do you feel most like yourself?"],
  ["dp-04", "What's a story you actually like telling?"],
  ["dp-05", "What are you looking forward to this month?"],
  ["dp-06", "What's a small thing that makes a night with someone good?"],
  ["dp-07", "What did you think tonight was going to be, before you got here?"],
  ["dp-08", "Were you planning to stay out, or did the night change your mind?"],
  ["dp-09", "What's something people usually get wrong about you?"],
  ["dp-10", "If we only had tonight, what's one thing you'd want me to know about you?"],
];

const light = [
  {
    id: "lt-01",
    text: "Kiss them for thirty seconds. Hands on their jaw, their waist, or in their hair.",
    softer: "One slow kiss. Then stop.",
    note: "Stay dressed.",
  },
  {
    id: "lt-02",
    text: "Kiss the side of their neck, then their mouth.",
    softer: "Kiss their cheek, then their mouth.",
    note: "Stay dressed.",
  },
  {
    id: "lt-03",
    text: "Name one place you want to kiss them. Kiss it once, through their clothes.",
    softer: "Name the place, then kiss their mouth.",
    note: "Through clothes.",
  },
  {
    id: "lt-04",
    text: "Pull them in by the waist and kiss them. Wait a full minute before either of you does anything else.",
    softer: "A long kiss, hands at their waist. Then pause.",
    note: "Stay dressed.",
  },
  {
    id: "lt-05",
    text: "Look at them until one of you smiles. Then kiss them.",
    softer: "Ten seconds of eye contact, then one kiss.",
    note: "Hands stay above the waist.",
  },
  {
    id: "lt-06",
    text: "Kiss along their collarbone. Stop there.",
    softer: "Kiss their shoulder, over clothes, then their mouth.",
    note: "Stay above the chest.",
  },
];

const tease = [
  {
    id: "tz-01",
    clothes: true,
    text: "Lick and kiss them wherever you want, through their clothes. Take your time.",
    softer: "Kiss two places they point to, through their clothes, then come back to their mouth.",
    note: "Clothes stay on.",
  },
  {
    id: "tz-02",
    clothes: true,
    text: "Pick the place you keep looking at. Kiss it through the fabric, slowly, twice.",
    softer: "Kiss that place once, through the fabric.",
    note: "Clothes stay on.",
  },
  {
    id: "tz-03",
    clothes: true,
    text: "Kiss their chest, their stomach, or the inside of a thigh, through their clothes. They choose. If they don't, you do.",
    softer: "They point to a shoulder, a hip, or a knee. Kiss it through clothes.",
    note: "Clothes stay on.",
  },
  {
    id: "tz-04",
    text: "Sit in their lap, facing them. Kiss them. Stay dressed.",
    softer: "Sit beside them, close, and kiss them.",
    note: "Clothes stay on.",
  },
  {
    id: "tz-05",
    text: "Put their hand where you want it, over your clothes, and leave it there while you kiss.",
    softer: "Put their hand on your waist and kiss them.",
    note: "Over clothes. They can move their hand.",
  },
  {
    id: "tz-06",
    text: "With one finger, trace them from throat to thigh, over their clothes. Go slower than you want to.",
    softer: "Trace from their shoulder to their hand, then kiss them.",
    note: "Over clothes.",
  },
  {
    id: "tz-07",
    text: "Kiss them and stay at their mouth. Hands at their waist. If it speeds up, slow it back down.",
    softer: "One slow kiss. Hands at their waist.",
    note: "Stay dressed.",
  },
  {
    id: "tz-08",
    text: "Stand against them, fully clothed, until one of you laughs or gives in. Then kiss them.",
    softer: "A long hug, then a kiss.",
    note: "Clothes stay on.",
  },
  {
    id: "tz-09",
    text: "Tell them one thing you want to do later tonight. Then do only the clothed version of the first step.",
    softer: "Tell them, then kiss them. Save the rest.",
    note: "Clothes stay on.",
  },
  {
    id: "tz-10",
    clothes: true,
    text: "Kiss along their waistband, over their clothes, and stop where they'd have to ask you to continue.",
    softer: "Kiss their stomach once, through their shirt, then their mouth.",
    note: "Clothes stay on.",
  },
];

function talk(kind, pairs) {
  return pairs.map(([id, text]) => ({ id, kind, text }));
}

export const POOLS = {
  impression: talk("question", impression),
  easy: talk("question", easy),
  hobby: talk("question", hobby),
  likely: likely.map(([id, text]) => ({
    id,
    kind: "likely",
    text,
    note: "Point at who. Argue if it's close.",
  })),
  deeper: talk("question", deeper),
  light: light.map((card) => ({ ...card, kind: "dare" })),
  tease: tease.map((card) => ({ ...card, kind: "dare" })),
  ice: [
    {
      id: "ice",
      kind: "dare",
      anchor: true,
      text: "Put an ice cube in your mouth and kiss them. Pass it back and forth until it melts or one of you laughs. Hands on a jaw or a waist. Nothing under clothes. No ice? Take a cold sip, then kiss them.",
      softer: "Skip the ice. Kiss them slowly with a hand on their jaw, and let it last.",
      note: "Nothing under clothes.",
    },
  ],
  touch: [
    {
      id: "touch",
      kind: "dare",
      anchor: true,
      text: "Take turns. One minute each, over clothes, on the places you've been thinking about: chest, ass, between the legs. The person being touched says there, slower, or not yet. Kiss them when the minute ends.",
      softer: "Same minute, but keep it to waist, hips, and chest, over clothes. They still say there, slower, or not yet.",
      note: "Clothes stay on. They set the pace.",
    },
  ],
  hands: [
    {
      id: "hands",
      kind: "dare",
      anchor: true,
      text: "Only if they want skin. Slide a hand under their clothes. A little fingering, or a little stroking, slow, and only while they want it. They move your hand and decide how far. A tap means back to kissing, over clothes. If either of you wants to stay dressed, do it over the clothes and mean it.",
      softer: "Stay over the clothes. Touch them there for one slow minute, and let them guide your hand.",
      note: "Their hand can move yours. A tap means stop.",
    },
  ],
  show: [
    {
      id: "sh-01",
      kind: "dare",
      text: "Take a nude right now. One photo, you, and hand them the phone. Let them look. Delete it after unless you both want to keep it.",
      softer: "Take the photo in underwear, or under a sheet, and show them that.",
      note: "A photo of you. Delete it unless you both want it kept.",
    },
    {
      id: "sh-02",
      kind: "dare",
      text: "Show them your favorite nude of yourself, and tell them what you like about it. No photo saved? Take one now and show them that.",
      softer: "Describe the photo instead of opening it, or show a picture of yourself you like with clothes on.",
      note: "A photo of you, not of anyone else.",
    },
    {
      id: "sh-03",
      kind: "dare",
      text: "Let them take a photo of you, nude, however they want the pose and the frame. You can move, cover, or stop. Look at it together. Delete it unless you both want to keep it.",
      softer: "They still direct the photo. You keep one piece of clothing on.",
      note: "They direct it. You can stop. Delete it unless you both want it.",
    },
    {
      id: "sh-04",
      kind: "dare",
      text: "They tell you one thing to do. You do it. If you don't want that one, they name a different one, or you skip.",
      softer: "They tell you one thing to do with some clothes still on.",
      note: "One thing. A no means they pick again, or you skip.",
    },
  ],
  finale: [
    {
      id: "finale",
      kind: "finale",
      text: "Last card. Pick how the night leaves the phone. Both of you have to want it.",
      note: "Any hesitation means the phone goes face down.",
    },
  ],
};

export const SCRIPT = [
  { act: "surface", pool: "impression" },
  { act: "surface", pool: "easy" },
  { act: "surface", pool: "hobby" },
  { act: "surface", pool: "easy" },
  { act: "surface", pool: "likely" },
  { act: "surface", pool: "hobby" },
  { act: "surface", pool: "easy" },
  { act: "surface", pool: "hobby" },
  { act: "surface", pool: "likely" },
  { act: "deeper", pool: "deeper" },
  { act: "deeper", pool: "deeper" },
  { act: "deeper", pool: "deeper" },
  { act: "deeper", pool: "light" },
  { act: "deeper", pool: "deeper" },
  { act: "deeper", pool: "deeper" },
  { act: "tease", pool: "ice", fixed: true },
  { act: "tease", pool: "tease", avoidClothes: true },
  { act: "tease", pool: "tease", clothes: true },
  { act: "tease", pool: "tease", avoidClothes: true },
  { act: "tease", pool: "tease", clothes: true },
  { act: "tease", pool: "tease", avoidClothes: true },
  { act: "almost", pool: "touch", fixed: true },
  { act: "almost", pool: "hands", fixed: true },
  { act: "almost", pool: "show" },
  { act: "almost", pool: "show" },
  { act: "almost", pool: "finale", fixed: true },
];

export const FALLBACKS = {
  impression: {
    id: "fb-impression",
    kind: "question",
    locked: true,
    text: "What's your first impression of me?",
  },
  easy: {
    id: "fb-easy",
    kind: "question",
    locked: true,
    text: "What do you like doing when you have a day to yourself?",
  },
  hobby: {
    id: "fb-hobby",
    kind: "question",
    locked: true,
    text: "What's something you're into that you'd enjoy showing me?",
  },
  likely: {
    id: "fb-likely",
    kind: "likely",
    locked: true,
    text: "Who is more likely to suggest what we do next?",
    note: "Point at who.",
  },
  deeper: {
    id: "fb-deeper",
    kind: "question",
    locked: true,
    text: "What's something you want more of right now?",
  },
  light: {
    id: "fb-light",
    kind: "dare",
    locked: true,
    text: "Kiss them. Hands at their waist. Stay dressed.",
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
  show: {
    id: "fb-show",
    kind: "dare",
    locked: true,
    text: "Show them one photo of yourself that you think is attractive. Clothes or none, your choice.",
    softer: "Describe the photo instead of opening it.",
    note: "A photo of you.",
  },
};

export function allCards() {
  return Object.values(POOLS).flat();
}
