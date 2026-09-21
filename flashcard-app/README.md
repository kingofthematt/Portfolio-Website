# Flashcards

A self-contained flashcard app. You type in your own cards, group them into
categories, and study with two buttons:

- **Need to learn more** — the card goes back in the pile with extra weight, so it
  comes back sooner and more often than the rest.
- **Already know** — the card is retired and will not be shown again.

Progress is saved in the browser automatically, so closing the tab and coming back
later picks up exactly where you left off. Retired cards stay retired until you
choose to bring them back.

## Running it

It is plain HTML, CSS, and JavaScript with no build step and no dependencies.

**Easiest:** open `index.html` in any browser.

**With the included local server** (matches how the rest of the tooling here works):

```bash
python start_server.py
```

Then visit <http://localhost:8010>. On Windows you can double-click
`start_server.bat` instead.

## Using it

1. **Create a category** (for example "Security+ Acronyms").
2. **Add cards** one at a time with `+ Add card`, or click `Paste a list` to add
   many at once — one card per line, front and back separated by `|`, a tab, or `--`:

   ```
   Phishing | Fake message that baits credentials
   Port 22  | SSH
   ```

3. **Study** from the home screen (all categories at once) or from inside a single
   category. Tap the card to flip it, then grade yourself.

Keyboard shortcuts while studying: `space` flips the card, `1` is "need to learn
more", `2` is "already know".

## How the weighting works

Every card carries a draw weight:

| Event | Weight |
| --- | --- |
| New card | 5 |
| Each "need to learn more" | +4, capped at 25 |
| "Already know" | removed from the pool |

The next card is chosen by weighted random draw, so a card you have missed three
times is drawn roughly three times as often as a fresh one. Cards drawn in the last
few turns are damped to 25% of their weight so the same card does not repeat
back-to-back, and the card you just answered is never shown immediately again
(unless it is the only one left).

Because the draw is random rather than a fixed queue, the hard cards keep coming
back at unpredictable intervals instead of in a memorized order.

## Saved progress

Everything lives in `localStorage` under the key `flashcards.state.v1` — cards,
categories, per-card miss counts, and retired status. Nothing is sent anywhere.

Because the data is per-browser:

- Use **Backup & reset → Export backup file** (gear icon, top right) to save a JSON
  file, and **Import backup file** to load it on another browser or device.
- Private/incognito windows may block saving; the app shows a warning when that
  happens.

Other options under the gear icon:

- **Reset progress, keep all cards** — everything becomes unseen again.
- **Delete everything** — wipes cards, categories, and progress.

Per category, from inside the category screen, you can reset just that category's
progress, rename it, or delete it. Individual retired cards have a **Study again**
button that puts just that card back in the rotation.

## Files

```
flashcard-app/
├── index.html         # markup for all three screens and the sheets
├── styles.css         # styling
├── app.js             # state, storage, scheduler, rendering
├── start_server.py    # optional local web server on port 8010
├── start_server.bat   # Windows launcher for the server
└── README.md
```
