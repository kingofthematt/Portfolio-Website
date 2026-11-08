import { allCards } from "./cards.js";
import { buildSession } from "./session.js";

const KEY = "icebreaker-hidden-v1";
const ACT_ORDER = ["close", "want", "tease", "almost"];

const ENDINGS = {
  early: {
    title: "You can stop here.",
    body: "Stopping counts. Face the phone down whenever you want, or keep going from the same card.",
  },
  shower: {
    title: "Go start the water.",
    body: "One of you gets in. The other stays close enough to watch. Turn, slow down, or come to the glass when they ask. They can step in with you, or stay there and tell you what they want when you get out. Leave this phone outside the bathroom.",
  },
  film: {
    title: "A short film, then it's gone.",
    body: "Take turns recording about twenty seconds of each other's body — only the parts you both agree to show. Watch each clip once, together. Then delete them before you do anything else. If either of you hesitates, don't record. Kiss them instead.",
  },
  kiss: {
    title: "Put the phone face down.",
    body: "You talked. You teased. You got your hands on each other. The rest of the night doesn't need a card.",
  },
};

const state = {
  screen: "home",
  session: [],
  index: 0,
  revealed: false,
  showingSofter: false,
  ending: null,
  removed: loadRemoved(),
};

const app = document.querySelector("#app");

document.addEventListener("click", (event) => {
  const target = event.target.closest("[data-action]");
  if (!target || !app.contains(target)) return;
  const action = target.dataset.action;
  if (action === "start") start();
  if (action === "flip") reveal();
  if (action === "next") advance();
  if (action === "softer") {
    state.showingSofter = true;
    render();
  }
  if (action === "original") {
    state.showingSofter = false;
    render();
  }
  if (action === "skip") advance();
  if (action === "hide") hideCurrent();
  if (action === "end") {
    state.ending = "early";
    state.screen = "end";
    render();
  }
  if (action === "choose") {
    state.ending = target.dataset.ending;
    state.screen = "end";
    render();
  }
  if (action === "resume") {
    state.screen = "play";
    if (state.ending && state.ending !== "early") state.revealed = true;
    state.ending = null;
    render();
  }
  if (action === "home") {
    state.screen = "home";
    state.session = [];
    state.ending = null;
    render();
  }
  if (action === "restore") restore(target.dataset.id);
  if (action === "restore-all") {
    state.removed = new Set();
    saveRemoved();
    render();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.target.closest("button, a, summary")) return;
  if (state.screen !== "play" || state.revealed) return;
  if (event.key === " " || event.key === "Enter") {
    event.preventDefault();
    reveal();
  }
});

render();

function start() {
  state.session = buildSession([...state.removed]);
  state.index = 0;
  state.revealed = false;
  state.showingSofter = false;
  state.ending = null;
  state.screen = "play";
  render();
}

function reveal() {
  if (state.revealed) return;
  state.revealed = true;
  state.animateIn = true;
  render();
}

function advance() {
  if (state.index >= state.session.length - 1) return;
  state.index += 1;
  state.revealed = false;
  state.showingSofter = false;
  render();
}

function hideCurrent() {
  const card = current();
  if (!card || card.locked || card.kind === "finale") return;
  state.removed.add(card.id);
  saveRemoved();
  if (card.anchor && card.softer && !card.softened) {
    card.text = card.softer;
    card.softer = null;
    card.softened = true;
    card.note = "The version you kept.";
    state.showingSofter = false;
    render();
    return;
  }
  if (state.index >= state.session.length - 1) {
    state.ending = "kiss";
    state.screen = "end";
    render();
    return;
  }
  advance();
}

function restore(id) {
  state.removed.delete(id);
  saveRemoved();
  render();
}

function current() {
  return state.session[state.index];
}

function loadRemoved() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || "[]");
    return new Set(Array.isArray(raw) ? raw.filter((id) => typeof id === "string") : []);
  } catch {
    return new Set();
  }
}

function saveRemoved() {
  localStorage.setItem(KEY, JSON.stringify([...state.removed]));
}

function esc(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char]);
}

function render() {
  const animateIn = state.animateIn;
  state.animateIn = false;
  const view = state.screen === "play" ? renderPlay(animateIn) : state.screen === "end" ? renderEnd() : renderHome();
  app.innerHTML = `<main class="shell">${view}</main>`;
  if (animateIn) {
    const scene = app.querySelector(".card-scene");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => scene?.classList.add("is-open"));
    });
  }
  window.scrollTo(0, 0);
}

function renderHome() {
  const hidden = [...state.removed]
    .map((id) => allCards().find((card) => card.id === id))
    .filter(Boolean);
  const hiddenBlock = hidden.length
    ? `<details class="hidden-panel">
        <summary>Hidden cards (${hidden.length})</summary>
        <ul class="hidden-list">
          ${hidden
            .map(
              (card) => `<li><span>${esc(card.text)}</span><button type="button" data-action="restore" data-id="${esc(card.id)}">Bring back</button></li>`,
            )
            .join("")}
        </ul>
        <button type="button" class="btn btn-ghost" data-action="restore-all">Bring them all back</button>
      </details>`
    : "";

  return `<p class="eyebrow">Date night</p>
    <h1>Icebreaker</h1>
    <p class="lede">Thirteen cards. A few true things, a few that make you laugh, then teasing that gets warmer — and then the phone goes face down.</p>
    <p class="adult">For two adults. Either of you can soften, skip, or stop.</p>
    <button type="button" class="btn btn-primary" data-action="start">Start the night</button>
    <ol class="arc">
      <li class="act-close"><strong>Close</strong><span>One real question, one funny one, one “who of us.”</span></li>
      <li class="act-want"><strong>Want</strong><span>Say the flirty part out loud. A clothed kiss in the middle.</span></li>
      <li class="act-tease"><strong>Tease</strong><span>Ice in a kiss, then hands and mouths through clothes.</span></li>
      <li class="act-almost"><strong>Almost</strong><span>Touch, maybe more, then a shower, a film you delete, or just the kiss.</span></li>
    </ol>
    ${hiddenBlock}`;
}

function renderPlay(animateIn = false) {
  const card = current();
  const open = state.revealed;
  const text = state.showingSofter && card.softer ? card.softer : card.text;
  const note = state.showingSofter ? "Softer version." : card.note || "";
  const long = text.length > 170 ? " long" : "";
  const tall = text.length > 170 ? " is-tall" : "";
  const rail = ACT_ORDER.map((act) => {
    const rank = ACT_ORDER.indexOf(act);
    const currentRank = ACT_ORDER.indexOf(card.act);
    const cls = rank < currentRank ? "done" : rank === currentRank ? "now" : "";
    const name = act === "close" ? "Close" : act === "want" ? "Want" : act === "tease" ? "Tease" : "Almost";
    return `<li class="${cls}">${name}</li>`;
  }).join("");

  let actions = "";
  if (!open) {
    actions = `<button type="button" class="btn btn-primary" data-action="flip">Show the card</button>`;
  } else if (card.kind === "finale") {
    actions = `<button type="button" class="choice" data-action="choose" data-ending="shower"><strong>Shower</strong><span>One of you in the water. The other watches, and can join.</span></button>
      <button type="button" class="choice" data-action="choose" data-ending="film"><strong>Film, then delete</strong><span>About twenty seconds each. Watch it once. Delete it together.</span></button>
      <button type="button" class="choice choice-quiet" data-action="choose" data-ending="kiss"><strong>Phone down</strong><span>Keep kissing. The rest of the night has no script.</span></button>`;
  } else if (open) {
    const primary = card.kind === "dare" ? "We did it" : "Next";
    const softer = !card.softer
      ? ""
      : state.showingSofter
        ? `<button type="button" class="btn btn-line" data-action="original">Original</button>`
        : `<button type="button" class="btn btn-line" data-action="softer">Softer</button>`;
    const skip = `<button type="button" class="btn btn-line" data-action="skip">Skip</button>`;
    const pair = softer ? `<div class="btn-pair">${softer}${skip}</div>` : skip;
    const hide = card.locked
      ? ""
      : `<button type="button" class="btn btn-ghost" data-action="hide">Not for us</button>`;
    actions = `<button type="button" class="btn btn-primary" data-action="next">${primary}</button>
      ${pair}
      ${hide}`;
  }

  return `<section class="play" data-act="${esc(card.act)}">
    <div class="play-top">
      <p class="count">${state.index + 1} of ${state.session.length}</p>
      <button type="button" class="btn btn-ghost" data-action="end">End night</button>
    </div>
    <ol class="act-rail">${rail}</ol>
    <div class="card-scene${tall}${open && !animateIn ? " is-open" : ""}" ${open ? "" : 'data-action="flip" role="button" tabindex="0" aria-label="Show the card"'}>
      <div class="card-flipper">
        <div class="card-face card-back">
          <p class="eyebrow">${esc(card.actName)}</p>
          <p class="back-title">${esc(card.back)}</p>
          <p class="rule">${esc(card.rule)}</p>
          <p class="tap">Tap the card</p>
        </div>
        <div class="card-face card-front">
          <p class="eyebrow">${esc(card.actName)} · ${esc(card.back)}</p>
          <p class="card-text ${long}">${esc(text)}</p>
          ${note ? `<p class="note">${esc(note)}</p>` : ""}
        </div>
      </div>
    </div>
    <div class="play-actions">${actions}</div>
  </section>`;
}

function renderEnd() {
  const ending = ENDINGS[state.ending] || ENDINGS.kiss;
  const backLabel = state.ending === "early" ? "Keep playing" : "Pick a different ending";
  return `<section class="end">
    <div class="end-top">
      <p class="eyebrow">Icebreaker</p>
    </div>
    <h1>${esc(ending.title)}</h1>
    <p class="end-copy">${esc(ending.body)}</p>
    <button type="button" class="btn btn-primary" data-action="resume">${backLabel}</button>
    <button type="button" class="btn btn-ghost" data-action="home">Another night</button>
  </section>`;
}
