export const ACTS = {
  notice: {
    name: "Notice",
    back: "You just met.",
    rule: "A question about tonight. Answer out loud.",
  },
  want: {
    name: "Want",
    back: "Say it before you do it.",
    rule: "Out loud. The dare in this part stays dressed.",
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
  ["th-01", "What did you notice about me tonight before we said a word?"],
  ["th-02", "When tonight did you decide you wanted to leave with me?"],
  ["th-03", "What's something you almost said when we met, and then kept?"],
  ["th-04", "What are you hoping the rest of tonight is, if we stop performing?"],
  ["th-05", "What's one true thing about you that usually takes time, that you want me to know tonight?"],
  ["th-06", "What made you stay instead of calling the night?"],
  ["th-07", "Which ten seconds from tonight do you keep replaying?"],
  ["th-08", "What do you want me to remember about the first time I looked at you?"],
];

const playful = [
  ["pl-01", "Who's doing a better job of pretending this is an ordinary first meeting?"],
  ["pl-02", "What's the most obvious thing about tonight that we're both ignoring?"],
  ["pl-03", "What would the honest text from the bathroom say?"],
  ["pl-04", "What's a slightly embarrassing fact that always comes out on a first night?"],
  ["pl-05", "If we had met at the door instead of later, where would tonight be by now?"],
  ["pl-06", "What move did you rehearse on the way here and then not use?"],
  ["pl-07", "Who noticed the other one first? You can be petty."],
  ["pl-08", "What was the least smooth moment tonight, and why did it still work?"],
];

const likely = [
  ["lk-01", "Who is more likely to kiss first tonight and then look surprised at themselves?"],
  ["lk-02", "Who is more likely to get shy the second the door closes?"],
  ["lk-03", "Who is more likely to laugh during the first real kiss?"],
  ["lk-04", "Who is more likely to text first tomorrow and pretend it was casual?"],
  ["lk-05", "Who noticed the other one first tonight?"],
  ["lk-06", "Who is more likely to say they should head out, and then not move?"],
  ["lk-07", "Who is more likely to pretend they do this all the time?"],
  ["lk-08", "Who is more likely to remember exactly what the other person was wearing?"],
  ["lk-09", "Who is more likely to make the bold move and then need a second to recover?"],
  ["lk-10", "Who is more likely to want the lights lower before anything else?"],
];

const want = [
  ["wa-01", "When tonight did you want to touch me, and decide not to yet?"],
  ["wa-02", "Where do you want my mouth first?"],
  ["wa-03", "What did I do tonight that hit harder than I meant it to?"],
  ["wa-04", "How do you want our first real kiss to go?"],
  ["wa-05", "What are you curious about, on my body, that feels early to admit?"],
  ["wa-06", "If we stay in this room, how do you want the next ten minutes?"],
  ["wa-07", "What do you want to try because we don't have a habit yet?"],
  ["wa-08", "Say the line you've been editing in your head all night."],
  ["wa-09", "Do you want me to ask in a full sentence, or come closer and let you pull me in?"],
  ["wa-10", "Where do you want my hands when the talking stops?"],
];

const light = [
  {
    id: "lt-01",
    text: "Kiss them for thirty seconds, the way you've been thinking about it since you met. Hands on a jaw, a waist, or in their hair.",
    softer: "One slow kiss. Stop while it's still sweet.",
    note: "A first kiss can live here. Stay dressed.",
  },
  {
    id: "lt-02",
    text: "Put your mouth on their neck. No hands until they pull you in.",
    softer: "Kiss the side of their neck once, then their mouth.",
    note: "You just met. Let them decide how close.",
  },
  {
    id: "lt-03",
    text: "Tell them the next place you want your mouth tonight. Then kiss that place once, through their clothes.",
    softer: "Tell them, and kiss their mouth instead.",
    note: "Through clothes.",
  },
  {
    id: "lt-04",
    text: "Pull them in by the waist. Kiss them like you'll have to behave afterward. Then behave for one minute.",
    softer: "A long kiss with your hands at their waist. Then pause.",
    note: "Stay dressed.",
  },
  {
    id: "lt-05",
    text: "Hold their eyes until one of you smiles. Then kiss that smile. It can be the first real one.",
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
    text: "Lick and kiss them wherever you want, through their clothes. You just met, so go slowly enough that they can feel you choose the spot.",
    softer: "Kiss them wherever they tap, through their clothes. Two spots, then back to their mouth.",
    note: "Clothes stay on.",
  },
  {
    id: "tz-02",
    clothes: true,
    text: "Pick the spot you've been looking at all night. Lick a slow line over the fabric, then kiss that same spot twice.",
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
    text: "Sit in their lap, facing them. One slow grind, clothed, like meeting tonight was the point. Then kiss them.",
    softer: "Sit in their lap and kiss them. Skip the grind.",
    note: "Clothes stay on.",
  },
  {
    id: "tz-05",
    text: "Guide their hand over your clothes to the place you want a new person thinking about. Leave it there while you kiss.",
    softer: "Put their hand on your waist or your hip, over clothes, and kiss them.",
    note: "Over clothes. They can move their hand.",
  },
  {
    id: "tz-06",
    text: "Trace them from throat to thigh with one finger, over clothes. They stay still. You go slower than a first night makes you want to.",
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
    text: "Whisper one specific thing you want before this first night is over. Then do only the clothed version of the first step.",
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
    note: "You're guessing. That's the game.",
  })),
  want: talk("question", want),
  light: light.map((card) => ({ ...card, kind: "dare" })),
  tease: tease.map((card) => ({ ...card, kind: "dare" })),
  ice: [
    {
      id: "ice",
      kind: "dare",
      anchor: true,
      text: "Put an ice cube in your mouth and kiss them. Pass it back and forth until it melts or one of you laughs. Hands on a jaw or a waist — nothing under clothes yet. No ice around? Take a cold sip and kiss them with a cool mouth. Let it be a first kiss worth keeping.",
      softer: "Skip the ice. Kiss them slowly with a hand on their jaw, and let it last.",
      note: "Nothing under clothes yet.",
    },
  ],
  touch: [
    {
      id: "touch",
      kind: "dare",
      anchor: true,
      text: "You don't know their body yet. Take turns, one minute each, touching over clothes on the private places — chest, ass, between the legs. The person being touched says there, slower, or not yet. Kiss them when the minute ends.",
      softer: "Same minute, but keep it to waist, hips, and chest, over clothes. They still say there, slower, or not yet.",
      note: "Clothes stay on. They set the pace.",
    },
  ],
  hands: [
    {
      id: "hands",
      kind: "dare",
      anchor: true,
      text: "First time under their clothes, and only if they want skin. Slide a hand under — a little fingering, or a little stroking — slow, and only while they want it. They move your hand. They decide how far. A tap means back to kissing over clothes, and that still counts. If either of you wants to stay dressed, touch over the clothes like you mean it.",
      softer: "Stay over the clothes. Touch them there for one slow minute, and let them guide your hand.",
      note: "Their hand can move yours. A tap means stop.",
    },
  ],
  show: [
    {
      id: "sh-01",
      kind: "dare",
      text: "Take a nude right now. One photo, you naked, and hand them the phone. Let them look as long as they want. Delete it after unless you both want to keep it.",
      softer: "Take the photo in underwear, or under a sheet, and show them that.",
      note: "A photo of you. Delete it unless you both want it kept.",
    },
    {
      id: "sh-02",
      kind: "dare",
      text: "Show them your favorite nude of yourself. Tell them what you like about it. If you don't have one saved, take one now and show them that.",
      softer: "Describe that photo instead of opening it, or show a clothed picture you like of yourself.",
      note: "A photo of you, not of anyone else.",
    },
    {
      id: "sh-03",
      kind: "dare",
      text: "Let them take a sexy photo of you, nude, however they want it. They choose the pose, the angle, and how much of you is in frame. You can shift, cover, or stop. Look at it together. Delete it unless you both want to keep it.",
      softer: "They still direct the photo. You keep one piece of clothing on.",
      note: "They direct it. You can stop. Delete it unless you both want it.",
    },
    {
      id: "sh-04",
      kind: "dare",
      text: "They tell you one thing to do. You do that thing. If you don't want the one they picked, they name a different one, or you skip.",
      softer: "They tell you one thing that keeps some clothes on. You do that.",
      note: "One thing. A no means they pick again, or you skip.",
    },
  ],
  finale: [
    {
      id: "finale",
      kind: "finale",
      text: "Last card. You met tonight. Pick the ending together. Both of you have to want it.",
      note: "Any hesitation means the phone goes face down.",
    },
  ],
};

export const SCRIPT = [
  { act: "notice", pool: "thoughtful" },
  { act: "notice", pool: "playful" },
  { act: "notice", pool: "likely" },
  { act: "want", pool: "want" },
  { act: "want", pool: "light" },
  { act: "want", pool: "want" },
  { act: "want", pool: "likely" },
  { act: "tease", pool: "ice", fixed: true },
  { act: "tease", pool: "tease", avoidClothes: true },
  { act: "tease", pool: "tease", clothes: true },
  { act: "almost", pool: "touch", fixed: true },
  { act: "almost", pool: "hands", fixed: true },
  { act: "almost", pool: "show" },
  { act: "almost", pool: "finale", fixed: true },
];

export const FALLBACKS = {
  thoughtful: {
    id: "fb-thoughtful",
    kind: "question",
    locked: true,
    text: "Tell them one true thing you thought when you first saw them tonight.",
  },
  playful: {
    id: "fb-playful",
    kind: "question",
    locked: true,
    text: "What's already funny about the two of you, on night one?",
  },
  likely: {
    id: "fb-likely",
    kind: "likely",
    locked: true,
    text: "Who is more likely to reach for the other one first tonight?",
    note: "You're guessing.",
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
    text: "Kiss them slowly, like it's new, because it is. Hands at their waist. Stop while you're both still dressed.",
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
    text: "Show them one photo of yourself that you think is sexy. Clothes or none, your call.",
    softer: "Describe the photo instead of opening it.",
    note: "A photo of you.",
  },
};

export function allCards() {
  return Object.values(POOLS).flat();
}
