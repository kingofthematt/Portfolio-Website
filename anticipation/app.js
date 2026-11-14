import { ACTS, DRAW, POOLS, allCards } from "./cards.js";
import { cutCard, cutIds, normalize } from "./deck.js";
import { buildSession } from "./session.js";

const KEY = "anticipation-deleted-v1";
const OLD_KEY = "anticipation-hidden-v1";
const ACT_ORDER = ["surface", "deeper", "tease", "almost"];

const ENDINGS = {
  early: {
    title: "You can stop here.",
    body: "Stopping counts. Face the phone down whenever you want, or keep going from the same card.",
  },
  shower: {
    title: "Go start the water.",
    body: "One of you gets in. The other stays and watches: turn when they say, soap slowly, come to the glass. They can step in with you. Leave this phone outside the bathroom. If you won't do the show, a layer comes off where they can see.",
  },
  film: {
    title: "A short film, then it's gone.",
    body: "Only if you both want a record of tonight. Take turns recording about twenty seconds of each other's body — only the parts you both agree to show. Watch each clip once, together. Then delete them before you do anything else. If either of you hesitates, don't record. Kiss them instead.",
  },
  kiss: {
    title: "Put the phone face down.",
    body: "You met tonight. You talked, you teased, you got your hands on each other. The rest of this first night doesn't need a card.",
  },
};

const state = {
  screen: "home",
  session: [],
  index: 0,
  revealed: false,
  showingSofter: false,
  ending: null,
  gate: null,
  cut: loadCut(),
  confirmId: null,
};

let gateTimer = 0;

const app = document.querySelector("#app");

document.addEventListener("click", (event) => {
  const target = event.target.closest("[data-action]");
  if (!target || !app.contains(target)) return;
  const action = target.dataset.action;
  if (action === "start") start();
  if (action === "flip") reveal();
  if (action === "next") advance();
  if (action === "dismiss-gate") dismissGate();
  if (action === "softer") {
    state.showingSofter = true;
    render();
  }
  if (action === "original") {
    state.showingSofter = false;
    render();
  }
  if (action === "skip") advance();
  if (action === "hide") {
    const card = current();
    if (!card) return;
    if (state.confirmId === card.id) deleteById(card.id);
    else {
      state.confirmId = card.id;
      render();
    }
  }
  if (action === "deck") openDeck();
  if (action === "ask-delete") {
    state.confirmId = target.dataset.id || null;
    render();
  }
  if (action === "cancel-delete") {
    state.confirmId = null;
    render();
  }
  if (action === "confirm-delete") deleteById(target.dataset.id);
  if (action === "end") {
    dismissGate();
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
    dismissGate();
    state.screen = "home";
    state.session = [];
    state.ending = null;
    state.confirmId = null;
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
  dismissGate();
  state.session = buildSession(cutIds(state.cut));
  state.confirmId = null;
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
  state.confirmId = null;
  if (state.gate) return;
  if (state.index >= state.session.length - 1) return;
  const previous = current().act;
  state.index += 1;
  state.revealed = false;
  state.showingSofter = false;
  const next = current();
  if (next.act !== previous || next.kind === "finale") {
    openGate(next.kind === "finale" ? "finale" : next.act);
    return;
  }
  render();
}

function openGate(act) {
  state.gate = act;
  render();
  clearTimeout(gateTimer);
  gateTimer = setTimeout(dismissGate, 2200);
}

function dismissGate() {
  clearTimeout(gateTimer);
  if (!state.gate) return;
  state.gate = null;
  render();
}

function openDeck() {
  dismissGate();
  state.screen = "deck";
  state.confirmId = null;
  render();
}

function deleteById(id) {
  const card = findCard(id);
  if (!card) return false;
  const next = cutCard(state.cut, card, new Date().toISOString());
  if (next === state.cut) return false;
  state.cut = next;
  state.confirmId = null;
  saveCut();
  pullFromSession(id);
  if (state.screen === "play" && state.session.length === 0) {
    state.screen = "deck";
  }
  render();
  return true;
}

function pullFromSession(id) {
  const index = state.session.findIndex((card) => card.id === id);
  if (index === -1) return;
  const wasCurrent = index === state.index;
  state.session.splice(index, 1);
  if (state.index > index) state.index -= 1;
  if (state.index >= state.session.length) state.index = Math.max(0, state.session.length - 1);
  if (wasCurrent) {
    state.revealed = false;
    state.showingSofter = false;
  }
}

function findCard(id) {
  if (!id) return null;
  for (const act of ACT_ORDER) {
    const card = POOLS[act].find((item) => item.id === id);
    if (card) return { ...card, act };
  }
  return state.session.find((card) => card.id === id) || allCards().find((card) => card.id === id) || null;
}

function current() {
  return state.session[state.index];
}

function loadCut() {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved) return normalize(JSON.parse(saved));
    const older = normalize(JSON.parse(localStorage.getItem(OLD_KEY) || "[]"));
    if (older.length) localStorage.setItem(KEY, JSON.stringify(older));
    return older;
  } catch {
    return [];
  }
}

function saveCut() {
  localStorage.setItem(KEY, JSON.stringify(state.cut));
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
  const view =
    state.screen === "play"
      ? renderPlay(animateIn)
      : state.screen === "end"
        ? renderEnd()
        : state.screen === "deck"
          ? renderDeck()
          : renderHome();
  if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
  app.innerHTML = `<main class="shell">${view}</main>`;
  const snapTop = () => {
    app.scrollTop = 0;
    window.scrollTo(0, 0);
  };
  snapTop();
  requestAnimationFrame(snapTop);
  if (animateIn) {
    const scene = app.querySelector(".card-scene");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => scene?.classList.add("is-open"));
    });
  }
}

function renderHome() {
  const cutNote = state.cut.length ? `<p class="cut-count">${state.cut.length} cut from the deck.</p>` : "";
  return `<p class="eyebrow">First night</p>
    <h1>Anticipation</h1>
    <p class="lede">${DRAW} cards a stage, drawn from a bigger pile. Then it moves on.</p>
    <p class="adult">For two adults who both want this. End the night whenever you want. Passing a dare costs a layer.</p>
    <button type="button" class="btn btn-primary" data-action="start">Start tonight</button>
    <button type="button" class="btn btn-line deck-link" data-action="deck">The deck</button>
    ${cutNote}
    <ol class="arc">
      <li class="act-surface"><strong>Surface</strong><span>First impressions, and what you've already noticed. Eight, then the next stage.</span></li>
      <li class="act-deeper"><strong>Deeper</strong><span>More personal, then a kiss that doesn't stay polite.</span></li>
      <li class="act-tease"><strong>Tease</strong><span>Ice, a question you wouldn't usually ask, mouths and hands.</span></li>
      <li class="act-almost"><strong>Almost</strong><span>Fingering, a faceless photo, a nude or a layer, a shower show.</span></li>
    </ol>`;
}

function renderPlay(animateIn = false) {
  const card = current();
  const open = state.revealed;
  const text = state.showingSofter && card.softer ? card.softer : card.text;
  const note = state.showingSofter
    ? card.kind === "dare"
      ? "A layer comes off."
      : "Softer version."
    : card.note || "";
  const long = text.length > 170 ? " long" : "";
  const tall = text.length > 170 ? " is-tall" : "";
  const rail = ACT_ORDER.map((act) => {
    const rank = ACT_ORDER.indexOf(act);
    const currentRank = ACT_ORDER.indexOf(card.act);
    const cls = rank < currentRank ? "done" : rank === currentRank ? "now" : "";
    const name = ACTS[act].name;
    return `<li class="${cls}">${name}</li>`;
  }).join("");

  let actions = "";
  if (!open) {
    actions = `<button type="button" class="btn btn-primary" data-action="flip">Show the card</button>`;
  } else if (card.kind === "finale") {
    actions = `      <button type="button" class="choice" data-action="choose" data-ending="shower"><strong>Shower</strong><span>One of you in the water. The other gets the first real look, and can join.</span></button>
      <button type="button" class="choice" data-action="choose" data-ending="film"><strong>Film, then delete</strong><span>A short record of tonight. Watch it once. Delete it together.</span></button>
      <button type="button" class="choice choice-quiet" data-action="choose" data-ending="kiss"><strong>Phone down</strong><span>Keep kissing. The first night doesn’t need a script.</span></button>`;
  } else if (open) {
    const isDare = card.kind === "dare";
    const showingLayer = isDare && state.showingSofter;
    const primary = showingLayer ? "Layer's off" : isDare ? "We did it" : "Next";
    const softer = !card.softer
      ? ""
      : state.showingSofter
        ? `<button type="button" class="btn btn-line" data-action="original">${isDare ? "Do the dare" : "Original"}</button>`
        : `<button type="button" class="btn btn-line" data-action="softer">${isDare ? "Take off a layer" : "Softer"}</button>`;
    const skip = isDare ? "" : `<button type="button" class="btn btn-line" data-action="skip">Skip</button>`;
    const pair = softer && skip ? `<div class="btn-pair">${softer}${skip}</div>` : softer || skip;
    const hide = card.locked
      ? ""
      : `<button type="button" class="btn btn-ghost" data-action="hide">${state.confirmId === card.id ? "Delete forever" : "Delete from deck"}</button>`;
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
    ${state.gate ? renderGate(state.gate) : ""}
  </section>`;
}

function renderDeck() {
  const gone = new Set(cutIds(state.cut));
  const stages = ACT_ORDER.map((act) => {
    const cards = POOLS[act].filter((card) => !gone.has(card.id));
    const rows = cards
      .map((card) => {
        if (state.confirmId === card.id) {
          return `<li class="deck-row is-confirm">
            <span>${esc(card.text)}</span>
            <span class="confirm-actions">
              <button type="button" class="btn btn-line danger" data-action="confirm-delete" data-id="${esc(card.id)}">Delete forever</button>
              <button type="button" class="btn btn-ghost" data-action="cancel-delete">Keep it</button>
            </span>
          </li>`;
        }
        return `<li class="deck-row">
          <span>${esc(card.text)}</span>
          <button type="button" class="btn btn-ghost" data-action="ask-delete" data-id="${esc(card.id)}">Delete</button>
        </li>`;
      })
      .join("");
    return `<section class="deck-stage">
      <h2 class="act-${esc(act)}">${esc(ACTS[act].name)}</h2>
      <ul class="deck-list">${rows || `<li class="deck-empty">Nothing left in this stage.</li>`}</ul>
    </section>`;
  }).join("");
  const cutRows = [...state.cut]
    .slice()
    .reverse()
    .map((record) => {
      const text = record.text || findCard(record.id)?.text || record.id;
      const when = record.at ? formatWhen(record.at) : "Earlier";
      const act = ACTS[record.act]?.name || "";
      return `<li><span>${esc(text)}</span><small>${esc(act)} · ${esc(when)}</small></li>`;
    })
    .join("");
  const cutBlock = state.cut.length
    ? `<section class="deck-stage cut-stage">
        <h2>Cut</h2>
        <p class="adult">These are gone. The wording stays here so you can see which cards missed.</p>
        <ul class="cut-list">${cutRows}</ul>
      </section>`
    : "";
  return `<section class="deck">
    <div class="play-top">
      <p class="eyebrow">The deck</p>
      <button type="button" class="btn btn-ghost" data-action="home">Back</button>
    </div>
    <h1>Delete a card</h1>
    <p class="lede">It leaves the deal on this phone and does not come back.</p>
    ${stages}
    ${cutBlock}
  </section>`;
}

function formatWhen(iso) {
  const when = new Date(iso);
  if (Number.isNaN(when.getTime())) return "Earlier";
  const clock = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(when);
  return `${clock} PT`;
}

function renderGate(act) {
  const finale = act === "finale";
  const name = finale ? "Last card" : ACTS[act].name;
  const line = finale ? "Both of you have to want it." : ACTS[act].gate;
  return `<div class="stage-gate act-${esc(finale ? "almost" : act)}" data-action="dismiss-gate" role="button" tabindex="0">
    <p class="stage-kicker">Next</p>
    <h2>${esc(name)}</h2>
    <span class="stage-sweep"></span>
    <p>${esc(line)}</p>
  </div>`;
}

function renderEnd() {
  const ending = ENDINGS[state.ending] || ENDINGS.kiss;
  const backLabel = state.ending === "early" ? "Keep playing" : "Pick a different ending";
  return `<section class="end">
    <div class="end-top">
      <p class="eyebrow">Anticipation</p>
    </div>
    <h1>${esc(ending.title)}</h1>
    <p class="end-copy">${esc(ending.body)}</p>
    <button type="button" class="btn btn-primary" data-action="resume">${backLabel}</button>
    <button type="button" class="btn btn-ghost" data-action="home">Another first night</button>
  </section>`;
}
