(function () {
    'use strict';

    var STORE_KEY = 'flashcards.state.v1';

    /* Draw weights. A brand new card starts at NEW_WEIGHT; every "need to learn more"
       adds MISS_STEP, so a struggling card is drawn several times as often as a fresh
       one. Cards marked "already know" leave the pool entirely. */
    var NEW_WEIGHT = 5;
    var MISS_STEP = 4;
    var MAX_WEIGHT = 25;
    var RECENT_PENALTY = 0.25;

    var state = { version: 1, categories: [], cards: [] };
    var storageWorks = true;

    var view = { name: 'home', categoryId: null };
    var session = null;
    var cardFilter = 'all';
    var searchTerm = '';
    var editingCardId = null;
    var editingCategoryId = null;
    var confirmAction = null;
    var openSheetId = null;
    var toastTimer = null;

    var el = {};

    /* ------------------------------------------------------------------ utils */

    function $(id) {
        return document.getElementById(id);
    }

    function uid(prefix) {
        return prefix + '-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 8);
    }

    function esc(value) {
        return String(value).replace(/[&<>"']/g, function (ch) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
        });
    }

    function plural(count, word, pluralWord) {
        if (count === 1) return count + ' ' + word;
        return count + ' ' + (pluralWord || word + 's');
    }

    function clampText(value, max) {
        var text = String(value).replace(/\s+/g, ' ').trim();
        return text.length > max ? text.slice(0, max - 1) + '\u2026' : text;
    }

    /* ------------------------------------------------------------------ storage */

    function normalize(raw) {
        var clean = { version: 1, categories: [], cards: [] };
        if (!raw || typeof raw !== 'object') return clean;

        var seenCategories = {};
        (Array.isArray(raw.categories) ? raw.categories : []).forEach(function (item) {
            if (!item || typeof item.name !== 'string' || !item.name.trim()) return;
            var id = typeof item.id === 'string' && item.id ? item.id : uid('cat');
            if (seenCategories[id]) return;
            seenCategories[id] = true;
            clean.categories.push({
                id: id,
                name: item.name.trim().slice(0, 80),
                createdAt: Number(item.createdAt) || Date.now()
            });
        });

        (Array.isArray(raw.cards) ? raw.cards : []).forEach(function (item) {
            if (!item || typeof item.front !== 'string' || !item.front.trim()) return;
            var categoryId = seenCategories[item.categoryId] ? item.categoryId : null;
            if (!categoryId) {
                if (!clean.categories.length) {
                    var fallback = { id: uid('cat'), name: 'Imported', createdAt: Date.now() };
                    clean.categories.push(fallback);
                    seenCategories[fallback.id] = true;
                }
                categoryId = clean.categories[0].id;
            }
            var status = item.status === 'known' || item.status === 'learning' ? item.status : 'new';
            var weight = Number(item.weight);
            clean.cards.push({
                id: typeof item.id === 'string' && item.id ? item.id : uid('card'),
                categoryId: categoryId,
                front: item.front.trim(),
                back: typeof item.back === 'string' ? item.back.trim() : '',
                status: status,
                weight: weight >= 1 && weight <= MAX_WEIGHT ? weight : NEW_WEIGHT,
                misses: Number(item.misses) || 0,
                reps: Number(item.reps) || 0,
                lastSeenAt: Number(item.lastSeenAt) || null,
                createdAt: Number(item.createdAt) || Date.now()
            });
        });

        return clean;
    }

    function load() {
        var raw;
        try {
            raw = localStorage.getItem(STORE_KEY);
        } catch (err) {
            storageWorks = false;
            return { version: 1, categories: [], cards: [] };
        }
        if (!raw) return { version: 1, categories: [], cards: [] };
        try {
            return normalize(JSON.parse(raw));
        } catch (err) {
            return { version: 1, categories: [], cards: [] };
        }
    }

    function save() {
        try {
            localStorage.setItem(STORE_KEY, JSON.stringify(state));
        } catch (err) {
            storageWorks = false;
            el.storageWarning.hidden = false;
        }
    }

    /* ------------------------------------------------------------------ queries */

    function getCategory(id) {
        for (var i = 0; i < state.categories.length; i++) {
            if (state.categories[i].id === id) return state.categories[i];
        }
        return null;
    }

    function getCard(id) {
        for (var i = 0; i < state.cards.length; i++) {
            if (state.cards[i].id === id) return state.cards[i];
        }
        return null;
    }

    function cardsInScope(scope) {
        if (scope === 'all') return state.cards.slice();
        return state.cards.filter(function (card) {
            return card.categoryId === scope;
        });
    }

    function poolForScope(scope) {
        return cardsInScope(scope).filter(function (card) {
            return card.status !== 'known';
        });
    }

    function countsFor(cards) {
        var counts = { total: cards.length, fresh: 0, learning: 0, known: 0 };
        cards.forEach(function (card) {
            if (card.status === 'known') counts.known++;
            else if (card.status === 'learning') counts.learning++;
            else counts.fresh++;
        });
        counts.remaining = counts.total - counts.known;
        return counts;
    }

    function scopeName(scope) {
        if (scope === 'all') return 'All categories';
        var category = getCategory(scope);
        return category ? category.name : 'Cards';
    }

    /* ------------------------------------------------------------------ mutations */

    function addCategory(name) {
        var category = { id: uid('cat'), name: name.trim().slice(0, 80), createdAt: Date.now() };
        state.categories.push(category);
        save();
        return category;
    }

    function addCard(categoryId, front, back) {
        var card = {
            id: uid('card'),
            categoryId: categoryId,
            front: front.trim(),
            back: back.trim(),
            status: 'new',
            weight: NEW_WEIGHT,
            misses: 0,
            reps: 0,
            lastSeenAt: null,
            createdAt: Date.now()
        };
        state.cards.push(card);
        return card;
    }

    function deleteCard(id) {
        state.cards = state.cards.filter(function (card) {
            return card.id !== id;
        });
        save();
    }

    function resetCardProgress(card) {
        card.status = 'new';
        card.weight = NEW_WEIGHT;
        card.misses = 0;
        card.reps = 0;
        card.lastSeenAt = null;
    }

    /* ------------------------------------------------------------------ study session */

    function startSession(scope) {
        session = {
            scope: scope,
            currentId: null,
            revealed: false,
            recent: [],
            history: [],
            reviewed: 0,
            markedLearning: 0,
            markedKnown: 0
        };
        drawCard();
        navigate('study', scope === 'all' ? null : scope);
    }

    /* Weighted random draw. Cards seen in the last few draws are damped so the same
       card does not appear twice in a row while still keeping the extra weight. */
    function drawCard() {
        var pool = poolForScope(session.scope);
        if (!pool.length) {
            session.currentId = null;
            session.revealed = false;
            return;
        }

        var windowSize = Math.min(3, Math.floor(pool.length / 2));
        var recent = windowSize > 0 ? session.recent.slice(-windowSize) : [];

        var candidates = pool.filter(function (card) {
            return recent.indexOf(card.id) === -1;
        });
        if (!candidates.length) candidates = pool;

        var total = 0;
        var weights = candidates.map(function (card) {
            var weight = card.weight;
            if (session.recent.indexOf(card.id) !== -1) weight *= RECENT_PENALTY;
            weight = Math.max(weight, 0.2);
            total += weight;
            return weight;
        });

        var roll = Math.random() * total;
        var picked = candidates[candidates.length - 1];
        for (var i = 0; i < candidates.length; i++) {
            roll -= weights[i];
            if (roll <= 0) {
                picked = candidates[i];
                break;
            }
        }

        session.currentId = picked.id;
        session.revealed = false;
        session.recent.push(picked.id);
        if (session.recent.length > 12) session.recent.shift();
    }

    function snapshot(card) {
        return {
            status: card.status,
            weight: card.weight,
            misses: card.misses,
            reps: card.reps,
            lastSeenAt: card.lastSeenAt
        };
    }

    function grade(knowsIt) {
        if (!session || !session.currentId) return;
        var card = getCard(session.currentId);
        if (!card) return;

        session.history.push({ cardId: card.id, before: snapshot(card), knowsIt: knowsIt });
        if (session.history.length > 40) session.history.shift();

        card.reps++;
        card.lastSeenAt = Date.now();

        if (knowsIt) {
            card.status = 'known';
            session.markedKnown++;
        } else {
            card.status = 'learning';
            card.misses++;
            card.weight = Math.min(card.weight + MISS_STEP, MAX_WEIGHT);
            session.markedLearning++;
        }

        session.reviewed++;
        save();
        drawCard();
        renderStudy();
    }

    function undoLast() {
        if (!session || !session.history.length) return;
        var entry = session.history.pop();
        var card = getCard(entry.cardId);
        if (!card) {
            renderStudy();
            return;
        }

        card.status = entry.before.status;
        card.weight = entry.before.weight;
        card.misses = entry.before.misses;
        card.reps = entry.before.reps;
        card.lastSeenAt = entry.before.lastSeenAt;

        session.reviewed = Math.max(0, session.reviewed - 1);
        if (entry.knowsIt) session.markedKnown = Math.max(0, session.markedKnown - 1);
        else session.markedLearning = Math.max(0, session.markedLearning - 1);

        session.currentId = card.id;
        session.revealed = true;
        save();
        renderStudy();
        showToast('Put that card back');
    }

    /* ------------------------------------------------------------------ navigation */

    function navigate(name, categoryId, fromHistory) {
        view = { name: name, categoryId: categoryId || null };

        if (!fromHistory) {
            history.pushState({ name: name, categoryId: view.categoryId }, '');
        }

        ['home', 'study', 'cards'].forEach(function (screen) {
            $('screen-' + screen).classList.toggle('is-active', screen === name);
        });
        el.backBtn.hidden = name === 'home';
        window.scrollTo(0, 0);
        render();
    }

    /* ------------------------------------------------------------------ rendering */

    function render() {
        el.storageWarning.hidden = storageWorks;
        if (view.name === 'home') renderHome();
        else if (view.name === 'study') renderStudy();
        else renderCards();
    }

    function statBlock(value, label, modifier) {
        return '<div class="stat' + (modifier ? ' ' + modifier : '') + '"><b>' + value +
            '</b><span>' + esc(label) + '</span></div>';
    }

    function renderHome() {
        var counts = countsFor(state.cards);

        el.homeStats.innerHTML =
            statBlock(counts.total, 'Cards') +
            statBlock(counts.remaining, 'To review', 'is-learning') +
            statBlock(counts.known, 'Retired', 'is-known');

        var hasCards = counts.total > 0;
        el.homeStats.hidden = !hasCards;
        el.studyAllBtn.hidden = !hasCards;
        el.studyAllBtn.disabled = counts.remaining === 0;
        el.studyAllBtn.textContent = counts.remaining === 0
            ? 'All cards retired \u2014 nothing to review'
            : 'Study all categories (' + counts.remaining + ')';

        el.homeEmpty.hidden = state.categories.length > 0;

        el.categoryList.innerHTML = state.categories.map(function (category) {
            var catCounts = countsFor(cardsInScope(category.id));
            var percent = catCounts.total ? Math.round((catCounts.known / catCounts.total) * 100) : 0;
            var sub = catCounts.total
                ? plural(catCounts.total, 'card') + ' \u00b7 ' + catCounts.remaining + ' to review \u00b7 ' +
                  catCounts.known + ' retired'
                : 'Empty \u2014 add your first card';

            return '' +
                '<div class="row-card">' +
                    '<div class="row-top">' +
                        '<h3 class="row-title">' + esc(category.name) + '</h3>' +
                        '<span class="badge' + (percent === 100 && catCounts.total ? ' is-known' : '') + '">' +
                            percent + '%</span>' +
                    '</div>' +
                    '<p class="row-sub">' + esc(sub) + '</p>' +
                    '<div class="progress"><div class="progress-fill" style="width:' + percent + '%"></div></div>' +
                    '<div class="row-actions">' +
                        '<button class="btn btn-know btn-sm" type="button" data-study="' + esc(category.id) + '"' +
                            (catCounts.remaining ? '' : ' disabled') + '>Study</button>' +
                        '<button class="btn btn-ghost btn-sm" type="button" data-open="' + esc(category.id) + '">Cards</button>' +
                    '</div>' +
                '</div>';
        }).join('');
    }

    function renderStudy() {
        if (!session) {
            navigate('home', null);
            return;
        }

        var scopeCards = cardsInScope(session.scope);
        var counts = countsFor(scopeCards);
        var percent = counts.total ? Math.round((counts.known / counts.total) * 100) : 0;

        el.studyTitle.textContent = scopeName(session.scope);
        el.studyProgress.style.width = percent + '%';
        el.studyChips.innerHTML =
            '<span class="chip chip-static">' + counts.remaining + ' left</span>' +
            '<span class="chip chip-static">' + counts.learning + ' learning</span>' +
            '<span class="chip chip-static">' + counts.known + ' retired</span>' +
            '<span class="chip chip-static">' + session.reviewed + ' this session</span>';

        var card = session.currentId ? getCard(session.currentId) : null;

        if (!card) {
            el.studyStage.hidden = true;
            el.studyDone.hidden = false;
            if (!counts.total) {
                el.doneTitle.textContent = 'No cards here yet';
                el.doneText.textContent = 'Add some cards and come back.';
                el.doneResetBtn.hidden = true;
            } else {
                el.doneTitle.textContent = 'Done \u2014 everything is retired';
                el.doneText.textContent = 'You marked all ' + plural(counts.total, 'card') +
                    ' in ' + scopeName(session.scope) + ' as already known. ' +
                    'Bring them back whenever you want another pass.';
                el.doneResetBtn.hidden = false;
            }
            return;
        }

        el.studyStage.hidden = false;
        el.studyDone.hidden = true;

        el.cardFront.textContent = card.front;
        el.cardBack.textContent = card.back || '(no answer written for this card)';

        var metaBits = [];
        if (card.misses > 0) metaBits.push('Missed ' + plural(card.misses, 'time'));
        if (session.scope === 'all') metaBits.push(scopeName(card.categoryId));
        el.cardMeta.textContent = metaBits.join(' \u00b7 ');

        el.flashcard.classList.toggle('is-flipped', session.revealed);
        el.revealBtn.hidden = session.revealed;
        el.gradeRow.hidden = !session.revealed;
        el.undoBtn.disabled = session.history.length === 0;
    }

    function renderCards() {
        var category = getCategory(view.categoryId);
        if (!category) {
            navigate('home', null);
            return;
        }

        var all = cardsInScope(category.id);
        var counts = countsFor(all);

        el.cardsTitle.textContent = category.name;
        el.cardsStats.innerHTML =
            statBlock(counts.total, 'Cards') +
            statBlock(counts.learning, 'Learning', 'is-learning') +
            statBlock(counts.known, 'Retired', 'is-known');
        el.studyThisBtn.disabled = counts.remaining === 0;
        el.studyThisBtn.textContent = counts.remaining === 0
            ? (counts.total ? 'All cards retired' : 'No cards yet')
            : 'Study this category (' + counts.remaining + ')';

        var term = searchTerm.trim().toLowerCase();
        var visible = all.filter(function (card) {
            if (cardFilter === 'learning' && card.status !== 'learning') return false;
            if (cardFilter === 'new' && card.status !== 'new') return false;
            if (cardFilter === 'known' && card.status !== 'known') return false;
            if (!term) return true;
            return (card.front + ' ' + card.back).toLowerCase().indexOf(term) !== -1;
        });

        visible.sort(function (a, b) {
            var rank = { learning: 0, new: 1, known: 2 };
            if (rank[a.status] !== rank[b.status]) return rank[a.status] - rank[b.status];
            return b.misses - a.misses || a.createdAt - b.createdAt;
        });

        if (!visible.length) {
            el.cardList.innerHTML = '<div class="empty"><h3>Nothing to show</h3><p>' +
                (all.length ? 'No cards match this filter or search.' : 'This category has no cards yet.') +
                '</p></div>';
            return;
        }

        el.cardList.innerHTML = visible.map(function (card) {
            var badge = card.status === 'known'
                ? '<span class="badge is-known">Retired</span>'
                : card.status === 'learning'
                    ? '<span class="badge is-learning">Learning</span>'
                    : '<span class="badge">Not seen</span>';

            var sub = card.back ? clampText(card.back, 120) : 'No answer yet';
            if (card.misses > 0) sub += ' \u00b7 missed ' + plural(card.misses, 'time');

            return '' +
                '<div class="row-card">' +
                    '<div class="row-top">' +
                        '<h3 class="row-title">' + esc(clampText(card.front, 140)) + '</h3>' +
                        badge +
                    '</div>' +
                    '<p class="row-sub">' + esc(sub) + '</p>' +
                    '<div class="row-actions">' +
                        '<button class="btn btn-ghost btn-sm" type="button" data-edit="' + esc(card.id) + '">Edit</button>' +
                        (card.status === 'known'
                            ? '<button class="btn btn-ghost btn-sm" type="button" data-relearn="' + esc(card.id) + '">Study again</button>'
                            : '') +
                    '</div>' +
                '</div>';
        }).join('');
    }

    /* ------------------------------------------------------------------ sheets */

    function openSheet(id) {
        closeSheet();
        openSheetId = id;
        $(id).hidden = false;
        el.sheetBackdrop.hidden = false;
    }

    function closeSheet() {
        if (openSheetId) $(openSheetId).hidden = true;
        openSheetId = null;
        el.sheetBackdrop.hidden = true;
        el.cardSheetError.hidden = true;
        el.categorySheetError.hidden = true;
        el.bulkSheetError.hidden = true;
    }

    function showToast(message) {
        el.toast.textContent = message;
        el.toast.hidden = false;
        clearTimeout(toastTimer);
        toastTimer = setTimeout(function () {
            el.toast.hidden = true;
        }, 2200);
    }

    function askConfirm(title, text, label, action) {
        el.confirmTitle.textContent = title;
        el.confirmText.textContent = text;
        el.confirmOkBtn.textContent = label;
        confirmAction = action;
        openSheet('confirmSheet');
    }

    function openCardSheet(cardId, presetCategoryId) {
        if (!state.categories.length) {
            openCategorySheet(null);
            showToast('Make a category first');
            return;
        }

        editingCardId = cardId || null;
        var card = cardId ? getCard(cardId) : null;

        el.cardCategoryInput.innerHTML = state.categories.map(function (category) {
            return '<option value="' + esc(category.id) + '">' + esc(category.name) + '</option>';
        }).join('');

        el.cardSheetTitle.textContent = card ? 'Edit card' : 'New card';
        el.cardFrontInput.value = card ? card.front : '';
        el.cardBackInput.value = card ? card.back : '';
        el.cardCategoryInput.value = card ? card.categoryId
            : (presetCategoryId || view.categoryId || state.categories[0].id);
        el.cardDeleteBtn.hidden = !card;
        el.cardSaveBtn.textContent = card ? 'Save changes' : 'Save card';

        openSheet('cardSheet');
        el.cardFrontInput.focus();
    }

    function openCategorySheet(categoryId) {
        editingCategoryId = categoryId || null;
        var category = categoryId ? getCategory(categoryId) : null;
        el.categorySheetTitle.textContent = category ? 'Rename category' : 'New category';
        el.categoryNameInput.value = category ? category.name : '';
        openSheet('categorySheet');
        el.categoryNameInput.focus();
    }

    /* ------------------------------------------------------------------ bulk + backup */

    function parseBulk(text) {
        var rows = [];
        text.split('\n').forEach(function (line) {
            if (!line.trim()) return;
            var parts = line.split(/\t|\s\|\s|\||\s--\s/);
            var front = (parts.shift() || '').trim();
            var back = parts.join(' ').trim();
            if (front) rows.push({ front: front, back: back });
        });
        return rows;
    }

    function exportBackup() {
        var payload = JSON.stringify(state, null, 2);
        var blob = new Blob([payload], { type: 'application/json' });
        var url = URL.createObjectURL(blob);
        var link = document.createElement('a');
        var stamp = new Date().toISOString().slice(0, 10);
        link.href = url;
        link.download = 'flashcards-backup-' + stamp + '.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(function () {
            URL.revokeObjectURL(url);
        }, 1000);
        showToast('Backup downloaded');
    }

    function importBackup(file) {
        var reader = new FileReader();
        reader.onload = function () {
            var imported;
            try {
                imported = normalize(JSON.parse(String(reader.result)));
            } catch (err) {
                showToast('That file is not a valid backup');
                return;
            }
            if (!imported.cards.length && !imported.categories.length) {
                showToast('No cards found in that file');
                return;
            }
            askConfirm(
                'Replace everything?',
                'Importing loads ' + plural(imported.cards.length, 'card') + ' and ' +
                    plural(imported.categories.length, 'category', 'categories') +
                    ', replacing what is on this device.',
                'Import',
                function () {
                    state = imported;
                    session = null;
                    save();
                    navigate('home', null);
                    showToast('Backup imported');
                }
            );
        };
        reader.readAsText(file);
    }

    function loadSampleDeck() {
        var security = addCategory('Security+ Basics');
        var networking = addCategory('Networking Ports');

        [
            ['What does the CIA triad stand for?', 'Confidentiality, Integrity, Availability'],
            ['What is phishing?', 'A fake message that baits someone into giving up credentials or data'],
            ['What is MFA?', 'Multi-factor authentication: two or more different proofs of identity'],
            ['What is the principle of least privilege?', 'Give each account only the access it needs to do its job'],
            ['What is a zero-day?', 'A vulnerability being exploited before a patch exists']
        ].forEach(function (pair) {
            addCard(security.id, pair[0], pair[1]);
        });

        [
            ['Port 22', 'SSH'],
            ['Port 443', 'HTTPS'],
            ['Port 53', 'DNS'],
            ['Port 3389', 'RDP']
        ].forEach(function (pair) {
            addCard(networking.id, pair[0], pair[1]);
        });

        save();
        renderHome();
        showToast('Sample deck loaded');
    }

    /* ------------------------------------------------------------------ events */

    function wire() {
        el.backBtn.addEventListener('click', function () {
            history.back();
        });

        el.dataBtn.addEventListener('click', function () {
            openSheet('dataSheet');
        });

        /* ---- home ---- */
        el.studyAllBtn.addEventListener('click', function () {
            startSession('all');
        });

        el.newCategoryBtn.addEventListener('click', function () {
            openCategorySheet(null);
        });

        el.emptyNewCategoryBtn.addEventListener('click', function () {
            openCategorySheet(null);
        });

        el.sampleDeckBtn.addEventListener('click', loadSampleDeck);

        el.categoryList.addEventListener('click', function (event) {
            var studyId = event.target.getAttribute && event.target.getAttribute('data-study');
            var openId = event.target.getAttribute && event.target.getAttribute('data-open');
            if (studyId) startSession(studyId);
            else if (openId) {
                cardFilter = 'all';
                searchTerm = '';
                el.cardSearch.value = '';
                setFilterChip('all');
                navigate('cards', openId);
            }
        });

        /* ---- study ---- */
        el.flashcard.addEventListener('click', toggleReveal);
        el.flashcard.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggleReveal();
            }
        });
        el.revealBtn.addEventListener('click', toggleReveal);

        el.learnBtn.addEventListener('click', function () {
            grade(false);
        });

        el.knowBtn.addEventListener('click', function () {
            grade(true);
        });

        el.undoBtn.addEventListener('click', undoLast);

        el.editCurrentBtn.addEventListener('click', function () {
            if (session && session.currentId) openCardSheet(session.currentId);
        });

        el.doneHomeBtn.addEventListener('click', function () {
            navigate('home', null);
        });

        el.doneResetBtn.addEventListener('click', function () {
            if (!session) return;
            var scope = session.scope;
            askConfirm(
                'Bring retired cards back?',
                'Every card in ' + scopeName(scope) + ' goes back into the rotation and its progress resets.',
                'Bring them back',
                function () {
                    cardsInScope(scope).forEach(resetCardProgress);
                    save();
                    startSession(scope);
                    showToast('Cards are back in the rotation');
                }
            );
        });

        /* ---- cards screen ---- */
        el.addCardBtn.addEventListener('click', function () {
            openCardSheet(null, view.categoryId);
        });

        el.bulkAddBtn.addEventListener('click', function () {
            el.bulkInput.value = '';
            openSheet('bulkSheet');
            el.bulkInput.focus();
        });

        el.studyThisBtn.addEventListener('click', function () {
            if (view.categoryId) startSession(view.categoryId);
        });

        el.renameCategoryBtn.addEventListener('click', function () {
            openCategorySheet(view.categoryId);
        });

        el.cardSearch.addEventListener('input', function () {
            searchTerm = el.cardSearch.value;
            renderCards();
        });

        el.cardFilters.addEventListener('click', function (event) {
            var filter = event.target.getAttribute && event.target.getAttribute('data-filter');
            if (!filter) return;
            cardFilter = filter;
            setFilterChip(filter);
            renderCards();
        });

        el.cardList.addEventListener('click', function (event) {
            var target = event.target;
            if (!target.getAttribute) return;
            var editId = target.getAttribute('data-edit');
            var relearnId = target.getAttribute('data-relearn');
            if (editId) openCardSheet(editId);
            else if (relearnId) {
                var card = getCard(relearnId);
                if (card) {
                    resetCardProgress(card);
                    save();
                    renderCards();
                    showToast('Back in the rotation');
                }
            }
        });

        el.resetCategoryBtn.addEventListener('click', function () {
            var category = getCategory(view.categoryId);
            if (!category) return;
            askConfirm(
                'Reset progress?',
                'Every card in ' + category.name + ' becomes unseen again. The cards themselves are kept.',
                'Reset progress',
                function () {
                    cardsInScope(category.id).forEach(resetCardProgress);
                    save();
                    renderCards();
                    showToast('Progress reset');
                }
            );
        });

        el.deleteCategoryBtn.addEventListener('click', function () {
            var category = getCategory(view.categoryId);
            if (!category) return;
            var count = cardsInScope(category.id).length;
            askConfirm(
                'Delete ' + category.name + '?',
                'This also deletes ' + plural(count, 'card') + ' in it. This cannot be undone.',
                'Delete',
                function () {
                    state.cards = state.cards.filter(function (card) {
                        return card.categoryId !== category.id;
                    });
                    state.categories = state.categories.filter(function (item) {
                        return item.id !== category.id;
                    });
                    save();
                    navigate('home', null);
                    showToast('Category deleted');
                }
            );
        });

        /* ---- card sheet ---- */
        el.cardSaveBtn.addEventListener('click', function () {
            var front = el.cardFrontInput.value.trim();
            var back = el.cardBackInput.value.trim();
            var categoryId = el.cardCategoryInput.value;

            if (!front) {
                el.cardSheetError.textContent = 'The front of the card needs some text.';
                el.cardSheetError.hidden = false;
                return;
            }

            if (editingCardId) {
                var card = getCard(editingCardId);
                if (card) {
                    card.front = front;
                    card.back = back;
                    card.categoryId = categoryId;
                }
                save();
                closeSheet();
                render();
                showToast('Card updated');
                return;
            }

            addCard(categoryId, front, back);
            save();
            el.cardFrontInput.value = '';
            el.cardBackInput.value = '';
            el.cardFrontInput.focus();
            el.cardSheetError.hidden = true;
            if (view.categoryId !== categoryId && view.name === 'cards') navigate('cards', categoryId);
            else render();
            showToast('Card added \u2014 keep going');
        });

        el.cardCancelBtn.addEventListener('click', closeSheet);

        el.cardDeleteBtn.addEventListener('click', function () {
            var id = editingCardId;
            if (!id) return;
            askConfirm('Delete this card?', 'It will be removed for good.', 'Delete', function () {
                if (session && session.currentId === id) {
                    deleteCard(id);
                    drawCard();
                } else {
                    deleteCard(id);
                }
                render();
                showToast('Card deleted');
            });
        });

        /* ---- category sheet ---- */
        el.categorySaveBtn.addEventListener('click', function () {
            var name = el.categoryNameInput.value.trim();
            if (!name) {
                el.categorySheetError.textContent = 'Give the category a name.';
                el.categorySheetError.hidden = false;
                return;
            }

            if (editingCategoryId) {
                var category = getCategory(editingCategoryId);
                if (category) category.name = name.slice(0, 80);
                save();
                closeSheet();
                render();
                showToast('Renamed');
                return;
            }

            var created = addCategory(name);
            closeSheet();
            navigate('cards', created.id);
            showToast('Category created \u2014 add your cards');
        });

        el.categoryCancelBtn.addEventListener('click', closeSheet);

        /* ---- bulk sheet ---- */
        el.bulkSaveBtn.addEventListener('click', function () {
            var rows = parseBulk(el.bulkInput.value);
            if (!rows.length) {
                el.bulkSheetError.textContent = 'Add at least one line, like: Term | Definition';
                el.bulkSheetError.hidden = false;
                return;
            }
            var categoryId = view.categoryId || (state.categories[0] && state.categories[0].id);
            if (!categoryId) return;
            rows.forEach(function (row) {
                addCard(categoryId, row.front, row.back);
            });
            save();
            closeSheet();
            render();
            showToast('Added ' + plural(rows.length, 'card'));
        });

        el.bulkCancelBtn.addEventListener('click', closeSheet);

        /* ---- data sheet ---- */
        el.exportBtn.addEventListener('click', exportBackup);

        el.importBtn.addEventListener('click', function () {
            el.importFile.click();
        });

        el.importFile.addEventListener('change', function () {
            var file = el.importFile.files && el.importFile.files[0];
            el.importFile.value = '';
            if (file) importBackup(file);
        });

        el.resetAllProgressBtn.addEventListener('click', function () {
            askConfirm(
                'Reset all progress?',
                'Every card in every category becomes unseen again. Nothing is deleted.',
                'Reset progress',
                function () {
                    state.cards.forEach(resetCardProgress);
                    session = null;
                    save();
                    navigate('home', null);
                    showToast('Progress reset');
                }
            );
        });

        el.wipeBtn.addEventListener('click', function () {
            askConfirm(
                'Delete everything?',
                'All categories, cards, and progress on this device are erased. Export a backup first if you want to keep them.',
                'Delete everything',
                function () {
                    state = { version: 1, categories: [], cards: [] };
                    session = null;
                    save();
                    navigate('home', null);
                    showToast('Everything cleared');
                }
            );
        });

        el.dataCloseBtn.addEventListener('click', closeSheet);

        /* ---- confirm sheet ---- */
        el.confirmOkBtn.addEventListener('click', function () {
            var action = confirmAction;
            confirmAction = null;
            closeSheet();
            if (action) action();
        });

        el.confirmCancelBtn.addEventListener('click', function () {
            confirmAction = null;
            closeSheet();
        });

        el.sheetBackdrop.addEventListener('click', function () {
            confirmAction = null;
            closeSheet();
        });

        /* ---- global ---- */
        window.addEventListener('popstate', function (event) {
            var entry = event.state;
            if (entry && entry.name) navigate(entry.name, entry.categoryId, true);
            else navigate('home', null, true);
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && openSheetId) {
                confirmAction = null;
                closeSheet();
                return;
            }
            if (openSheetId || view.name !== 'study') return;
            var tag = (event.target.tagName || '').toLowerCase();
            if (tag === 'input' || tag === 'textarea' || tag === 'select') return;

            if (event.key === ' ') {
                event.preventDefault();
                toggleReveal();
            } else if (event.key === '1' && session && session.revealed) {
                grade(false);
            } else if (event.key === '2' && session && session.revealed) {
                grade(true);
            }
        });
    }

    function toggleReveal() {
        if (!session || !session.currentId) return;
        session.revealed = !session.revealed;
        renderStudy();
    }

    function setFilterChip(filter) {
        var chips = el.cardFilters.querySelectorAll('.chip');
        for (var i = 0; i < chips.length; i++) {
            chips[i].classList.toggle('is-active', chips[i].getAttribute('data-filter') === filter);
        }
    }

    /* ------------------------------------------------------------------ boot */

    function init() {
        [
            'backBtn', 'dataBtn', 'storageWarning', 'homeStats', 'studyAllBtn', 'newCategoryBtn',
            'categoryList', 'homeEmpty', 'emptyNewCategoryBtn', 'sampleDeckBtn', 'studyTitle',
            'studyChips', 'studyProgress', 'studyStage', 'flashcard', 'cardFront', 'cardBack',
            'cardMeta', 'revealBtn', 'gradeRow', 'learnBtn', 'knowBtn', 'undoBtn', 'editCurrentBtn',
            'studyDone', 'doneTitle', 'doneText', 'doneResetBtn', 'doneHomeBtn', 'cardsTitle',
            'cardsStats', 'addCardBtn', 'bulkAddBtn', 'studyThisBtn', 'renameCategoryBtn',
            'cardSearch', 'cardFilters', 'cardList', 'resetCategoryBtn', 'deleteCategoryBtn',
            'sheetBackdrop', 'cardSheetTitle', 'cardFrontInput', 'cardBackInput', 'cardCategoryInput',
            'cardSheetError', 'cardSaveBtn', 'cardCancelBtn', 'cardDeleteBtn', 'categorySheetTitle',
            'categoryNameInput', 'categorySheetError', 'categorySaveBtn', 'categoryCancelBtn',
            'bulkInput', 'bulkSheetError', 'bulkSaveBtn', 'bulkCancelBtn', 'exportBtn', 'importBtn',
            'importFile', 'resetAllProgressBtn', 'wipeBtn', 'dataCloseBtn', 'confirmTitle',
            'confirmText', 'confirmOkBtn', 'confirmCancelBtn', 'toast'
        ].forEach(function (id) {
            el[id] = $(id);
        });

        state = load();
        wire();
        history.replaceState({ name: 'home', categoryId: null }, '');
        navigate('home', null, true);
    }

    document.addEventListener('DOMContentLoaded', init);
})();
