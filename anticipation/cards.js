export const DRAW = 8;

export const ACTS = {
  surface: {
    name: "Surface",
    back: "Easy.",
    rule: "Answer like you're actually talking.",
    gate: "Small talk. Mean it.",
  },
  deeper: {
    name: "Deeper",
    back: "A little further.",
    rule: "Say the true version.",
    gate: "A little further now.",
  },
  tease: {
    name: "Tease",
    back: "Do it.",
    rule: "A dare. Do it, or take off a layer.",
    gate: "Dares. Pass, and a layer comes off.",
  },
  almost: {
    name: "Almost",
    back: "No more hints.",
    rule: "Do the card, or take off a layer.",
    gate: "This is the part you came for.",
  },
};

const LAYER =
  "You don't do this one. Take off a layer while they watch. A shoe counts once. After that it has to be a real piece of clothing.";

function q(id, text) {
  return { id, kind: "question", text };
}

function d(id, text) {
  return { id, kind: "dare", text, softer: LAYER, note: "Pass, and a layer comes off." };
}

export const POOLS = {
  surface: [
    q("sf-01", "What's your first impression of me?"),
    q("sf-02", "What did you notice about me before we started talking?"),
    q("sf-03", "What are you into right now that you could talk about for an hour?"),
    q("sf-04", "What do you do on a Saturday when nobody needs you?"),
    q("sf-05", "What kind of music do you put on when you're in a good mood?"),
    q("sf-06", "What made you say yes to tonight?"),
    q("sf-07", "Where do you go when you want to be out of the house but off duty?"),
    q("sf-08", "What's something you taught yourself?"),
    q("sf-09", "What's the best trip you've taken?"),
    q("sf-10", "What does a good weeknight look like for you?"),
    q("sf-11", "Who got you into the thing you like most?"),
    q("sf-12", "Have you thought about kissing me yet?"),
    q("sf-13", "If we had a free afternoon and you were in charge, what are we doing?"),
    q("sf-14", "What would make you move closer?"),
    q("sf-15", "What about me is distracting you?"),
    q("sf-16", "What's a place in this city you like showing people?"),
    q("sf-17", "Who is more likely to suggest one more stop?"),
    q("sf-18", "What's the last thing you got excited about?"),
    q("sf-19", "What did you want to be when you were a kid, and how close did you get?"),
    q("sf-20", "What's the most spontaneous thing you've done this year?"),
    q("sf-21", "What's something about you that surprises people?"),
    q("sf-22", "What song have you had on repeat?"),
    q("sf-23", "Couch, a long walk, or a late breakfast. Which Saturday is yours?"),
    q("sf-24", "What's a compliment you've been holding since we met?"),
    q("sf-25", "How can I tell when you're actually having a good time?"),
  ],
  deeper: [
    q("dp-01", "What have you wanted to do to me all night?"),
    q("dp-02", "What do you want more of right now?"),
    q("dp-03", "When do you feel most like yourself?"),
    q("dp-04", "What did you think tonight was going to be?"),
    q("dp-05", "Were you planning to stay out, or did the night change your mind?"),
    q("dp-06", "What's something people usually get wrong about you?"),
    q("dp-07", "What do you want us to do tonight, if we get that far?"),
    q("dp-08", "Where do you want to be kissed first?"),
    q("dp-09", "What's something you like in bed that you don't say out loud?"),
    q("dp-10", "How do you want to be touched? Then ask me."),
    q("dp-11", "What about me do you keep coming back to?"),
    q("dp-12", "Do you want to leave together?"),
    q("dp-13", "What's one thing I should know before we go further?"),
    q("dp-14", "What's the boldest thing you've wanted to try with someone?"),
    d("dp-15", "Kiss them deep. Hand on their ass if they pull you in."),
    d("dp-16", "Kiss their neck. Stay there until they pull you up."),
    d("dp-17", "Pull them into your lap and kiss them. Hands wherever they allow."),
    d("dp-18", "Tell them the first place you want your mouth. Then kiss it."),
    q("dp-19", "What's the most attractive thing I do without realizing it?"),
    q("dp-20", "What puts you in the mood?"),
    q("dp-21", "Do you like making the first move?"),
    q("dp-22", "Have you pictured me naked?"),
    q("dp-23", "What's a fantasy you haven't said out loud?"),
    q("dp-24", "Would you rather be teased slowly, or surprised?"),
    q("dp-25", "If I whispered in your ear right now, what would you want me to say?"),
  ],
  tease: [
    d("tz-01", "Makeout with an ice cube in your mouth until it melts all the way"),
    d("tz-02", "Ask 1 sexual question you wouldn't normally ask by now"),
    q("tz-03", "What's the first thing you thought when we first met"),
    d("tz-04", "Lick and kiss them through their clothes, wherever they tap."),
    d("tz-05", "Put your mouth on the place you keep looking at. Through the clothes."),
    d("tz-06", "Straddle them and grind while you kiss."),
    d("tz-07", "Put their hand between your legs and hold it there."),
    d("tz-08", "Pull their shirt up and kiss the skin."),
    d("tz-09", "Fingers just under the waistband. Not inside yet."),
    d("tz-10", "Tell them what you want. Start it over their clothes."),
    d("tz-11", "Put your mouth on their chest. Let them keep you there."),
    d("tz-12", "Kiss along their waistband until they pull you up or pull you further."),
    d("tz-13", "Bite their lip. Then kiss them for a full minute."),
    d("tz-14", "Sit in their lap and ask what they want. Do a little of it."),
    d("tz-15", "Kiss them. One hand in their hair, one on their waist."),
    d("tz-16", "Whisper the dirtiest thing you actually mean. Then kiss them."),
    d("tz-17", "Tell them you want them. Don't move until they do."),
    d("tz-18", "Kiss their chest, their stomach, or their inner thigh. They pick."),
    d("tz-19", "Kiss the inside of their wrist. Then their mouth."),
    d("tz-20", "Make out for two minutes. Hands stay above the waist."),
    d("tz-21", "They pick a spot. Kiss it through their clothes for thirty seconds."),
    d("tz-22", "Stand between their knees and kiss them. Don't sit down yet."),
    d("tz-23", "Tell them, in one sentence, how you want to fuck them. Then only kiss them."),
    d("tz-24", "Undo one button, or one clasp. Stop there."),
    d("tz-25", "Let them grind on your thigh. Clothes stay on."),
  ],
  almost: [
    d("al-01", "Finger them, slow. They say faster, deeper, or stop. Switch if you both want."),
    d("al-02", "Take a photo of the body part you like most on them. Their face stays out of the frame. If they refuse, they take off a layer."),
    d("al-03", "Show them your most recent nude, or your favorite nude of all time. If you won't, take off a layer."),
    d("al-04", "Shower show. One of you gets in. The other watches. Leave the phone outside."),
    d("al-05", "Take a nude right now and hand them the phone."),
    d("al-06", "Let them take a nude of you, however they want the pose."),
    d("al-07", "They name one thing. You do it if you want it too."),
    d("al-08", "Hand between their legs, under the clothes, for one minute."),
    d("al-09", "Mouth between their legs. Clothes stay on until they move them."),
    d("al-10", "Take one piece of their clothing off. Use your hands, or your mouth."),
    d("al-11", "Touch yourself, and put their hand on you too."),
    d("al-12", "Kiss them while you finger them. They set the pace."),
    d("al-13", "Your turn. They finger you, or you move their hand there."),
    d("al-14", "Ask if they want to come. If yes, your hand. If not, kiss them and stay."),
    d("al-15", "Shower together. Hands allowed. Phone stays outside."),
    d("al-16", "Put their hand on you, on skin, and leave it until they move it."),
    d("al-17", "Say you want to fuck them. Then wait."),
    d("al-18", "One minute. Mouth and hands wherever they'll let you. Clothes optional."),
    d("al-19", "Finger their asshole. If either of you won't, the one who backed out takes off a layer."),
    d("al-20", "Give them head for five minutes. If you won't, take off a layer."),
    d("al-21", "Eat their ass. If you won't, take off a layer."),
    d("al-22", "Go down on them until they pull you up. If you won't, take off a layer."),
    d("al-23", "Their turn. They go down on you. If they won't, they take off a layer."),
    d("al-24", "Use your mouth and your fingers at the same time. They say faster, deeper, or stop."),
    d("al-25", "Ask if they want you inside them. Wait for the answer. If nobody asks, take off a layer."),
  ],
};

export const FINALE = {
  id: "finale",
  kind: "finale",
  text: "Last card. Pick how the night leaves the phone. Both of you have to want it.",
  note: "Any hesitation means the phone goes face down.",
};

export const FALLBACKS = {
  surface: q("fb-surface", "What's your first impression of me?"),
  deeper: q("fb-deeper", "What do you want more of right now?"),
  tease: d("fb-tease", "Kiss them wherever they tap, through their clothes."),
  almost: d("fb-almost", "Finger them, or take off a layer."),
};

export function allCards() {
  return [...Object.values(POOLS).flat(), FINALE];
}
