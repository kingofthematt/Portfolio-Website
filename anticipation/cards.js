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
    back: "Do it.",
    rule: "A dare. Do it, or take off a layer.",
  },
  almost: {
    name: "Almost",
    back: "No more hints.",
    rule: "Do the card, or take off a layer. End the night if you're actually done.",
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
  ["dp-11", "What do you want done to you tonight, if we get that far?"],
  ["dp-12", "Where do you want my mouth, once the clothes stop mattering?"],
  ["dp-13", "What's something you like in bed that you don't usually say out loud?"],
  ["dp-14", "Tell me how you want to be touched. Be specific."],
];

const LAYER =
  "You don't do this one. Take off a layer while they watch. A shoe counts once. After that it has to be a real piece of clothing.";

const light = [
  {
    id: "lt-01",
    text: "Kiss them with your mouth open. Put a hand on their ass and leave it there.",
    softer: LAYER,
    note: "Pass, and a layer comes off.",
  },
  {
    id: "lt-02",
    text: "Kiss down their neck until you hit the collar. Stay on skin unless they move the shirt.",
    softer: LAYER,
    note: "Pass, and a layer comes off.",
  },
  {
    id: "lt-03",
    text: "Name the first place you want your mouth. Kiss it through their clothes, and don't rush it.",
    softer: LAYER,
    note: "Pass, and a layer comes off.",
  },
  {
    id: "lt-04",
    text: "Pull them into your lap. Kiss them, and let your hands go anywhere they don't move them from.",
    softer: LAYER,
    note: "Pass, and a layer comes off.",
  },
  {
    id: "lt-05",
    text: "Bite their lip, then kiss them. Hand under the hem of their shirt, on skin.",
    softer: LAYER,
    note: "Pass, and a layer comes off.",
  },
  {
    id: "lt-06",
    text: "Get your mouth on their chest, over the shirt, and stay until they make a sound.",
    softer: LAYER,
    note: "Pass, and a layer comes off.",
  },
];

const tease = [
  {
    id: "tz-01",
    clothes: true,
    text: "Lick and kiss them wherever you want, through their clothes. Then keep your mouth there.",
    softer: LAYER,
    note: "Clothes stay on. Pass, and a layer comes off.",
  },
  {
    id: "tz-02",
    clothes: true,
    text: "Put your mouth on the place you keep looking at. Through the fabric. Stay until they pull you up or pull you closer.",
    softer: LAYER,
    note: "Clothes stay on. Pass, and a layer comes off.",
  },
  {
    id: "tz-03",
    clothes: true,
    text: "Kiss their chest, their stomach, or the inside of a thigh, through their clothes. They pick. If they don't, you do, and you don't come back up right away.",
    softer: LAYER,
    note: "Clothes stay on. Pass, and a layer comes off.",
  },
  {
    id: "tz-04",
    text: "Straddle their lap and grind while you kiss them. Their hands can go under your shirt.",
    softer: LAYER,
    note: "Pass, and a layer comes off.",
  },
  {
    id: "tz-05",
    text: "Put their hand between your legs, over your clothes, and hold it there while you kiss them.",
    softer: LAYER,
    note: "Over clothes. Pass, and a layer comes off.",
  },
  {
    id: "tz-06",
    text: "Pull their shirt up. Use your mouth on the skin you just uncovered.",
    softer: LAYER,
    note: "Pass, and a layer comes off.",
  },
  {
    id: "tz-07",
    text: "Slide your fingers just under their waistband. Stay on the outside. Let them decide if you go further.",
    softer: LAYER,
    note: "Pass, and a layer comes off.",
  },
  {
    id: "tz-08",
    text: "Tell them, in one sentence, what you want to do to them. Then start it. Clothes can come off only if they help.",
    softer: LAYER,
    note: "Pass, and a layer comes off.",
  },
  {
    id: "tz-09",
    text: "Let them get their mouth on your chest. You hold still. Shirt off if you're willing. If you're not, the shirt stays and their mouth stays on it.",
    softer: LAYER,
    note: "Pass, and a layer comes off.",
  },
  {
    id: "tz-10",
    clothes: true,
    text: "Kiss along their waistband, over their clothes, and don't stop until they ask you to go past it or come back up.",
    softer: LAYER,
    note: "Clothes stay on. Pass, and a layer comes off.",
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
      text: "Put an ice cube in your mouth and kiss them. Pass it back and forth until it melts. Hands can wander. No ice? Take a cold sip, then kiss them with your mouth open. If you won't, take off a layer.",
      softer: LAYER,
      note: "Pass, and a layer comes off.",
    },
  ],
  touch: [
    {
      id: "touch",
      kind: "dare",
      anchor: true,
      text: "One minute each. Hand on their chest, their ass, and between their legs. Over clothes is the minimum. Under the shirt if they let you. They say there, harder, or not that. If you won't touch them, take off a layer.",
      softer: LAYER,
      note: "Pass, and a layer comes off.",
    },
  ],
  hands: [
    {
      id: "hands",
      kind: "dare",
      anchor: true,
      text: "Finger them. Get a hand inside their clothes and stay there, slow, until they say faster, deeper, or stop. A tap means your hand comes out. If either of you won't, the one who backed out takes off a layer.",
      softer: LAYER,
      note: "A tap means stop. Pass, and a layer comes off.",
    },
  ],
  part: [
    {
      id: "part",
      kind: "dare",
      anchor: true,
      text: "Take a photo of the body part you like most on them. Their face stays out of the frame. Show them, then delete it unless you both want it kept. If they refuse the photo, they take off a layer.",
      softer: LAYER,
      note: "Their face stays out. Refuse, and a layer comes off.",
    },
  ],
  nudes: [
    {
      id: "nudes",
      kind: "dare",
      anchor: true,
      text: "Show them your most recent nude, or your favorite nude of all time. Hand them the phone and let them look. Nothing saved? Take one now and that counts. If you won't show either, take off a layer.",
      softer: LAYER,
      note: "A photo of you. Refuse, and a layer comes off.",
    },
  ],
  shower: [
    {
      id: "shower",
      kind: "dare",
      anchor: true,
      text: "Shower show. One of you gets in. The other stays and watches: turn when they say, soap slowly, come to the glass. They can step in with you. Leave this phone outside. If you won't do the show, take off a layer where they can see.",
      softer: LAYER,
      note: "Phone stays outside. Pass, and a layer comes off.",
    },
  ],
  show: [
    {
      id: "sh-01",
      kind: "dare",
      text: "Take a nude right now. One photo, you, and hand them the phone. Let them look. Delete it unless you both want to keep it. If you won't, take off a layer.",
      softer: LAYER,
      note: "A photo of you. Refuse, and a layer comes off.",
    },
    {
      id: "sh-03",
      kind: "dare",
      text: "Let them take a photo of you, nude, however they want the pose and the frame. You can move or cover. Look at it together. Delete it unless you both want it. If you won't, take off a layer.",
      softer: LAYER,
      note: "They direct it. Refuse, and a layer comes off.",
    },
    {
      id: "sh-04",
      kind: "dare",
      text: "They tell you one thing to do. You do it. If you won't do that thing, take off a layer.",
      softer: LAYER,
      note: "One thing. Refuse, and a layer comes off.",
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
  { act: "almost", pool: "part", fixed: true },
  { act: "almost", pool: "nudes", fixed: true },
  { act: "almost", pool: "shower", fixed: true },
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
    text: "Kiss them with your mouth open. A hand on their ass. If you won't, take off a layer.",
    softer: LAYER,
    note: "Pass, and a layer comes off.",
  },
  tease: {
    id: "fb-tease",
    kind: "dare",
    locked: true,
    text: "Kiss them wherever they tap, through their clothes. If you won't, take off a layer.",
    softer: LAYER,
    note: "Pass, and a layer comes off.",
  },
  part: {
    id: "fb-part",
    kind: "dare",
    locked: true,
    text: "The photo is off the table. Take off a layer instead.",
    note: "A layer comes off.",
  },
  nudes: {
    id: "fb-nudes",
    kind: "dare",
    locked: true,
    text: "No photo. Take off a layer instead.",
    note: "A layer comes off.",
  },
  shower: {
    id: "fb-shower",
    kind: "dare",
    locked: true,
    text: "No shower. Take off a layer where they can see.",
    note: "A layer comes off.",
  },
  show: {
    id: "fb-show",
    kind: "dare",
    locked: true,
    text: "Show them one photo of yourself with nothing on, or take off a layer.",
    softer: LAYER,
    note: "A photo of you, or a layer.",
  },
};

export function allCards() {
  return Object.values(POOLS).flat();
}
