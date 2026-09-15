// FLAGVERSE UI - screen rendering and event wiring.
const FVUi = (function () {
  const COUNTRIES = window.COUNTRIES;

  const MODE_OPTIONS = [
    { key: "flagToCountry", label: "Flag → Country" },
    { key: "countryToFlag", label: "Country → Flag" },
    { key: "capitalToCountry", label: "Capital" },
    { key: "countryToContinent", label: "Continent" },
    { key: "continentToCountry", label: "Continent → Country" },
    { key: "threeClues", label: "Three Clues" },
    { key: "speedRound", label: "Speed Round" },
    { key: "mapChallenge", label: "Map Challenge" },
    { key: "randomMix", label: "Random Mix" },
  ];

  const MODE_LABEL = {};
  MODE_OPTIONS.forEach((m) => (MODE_LABEL[m.key] = m.label));

  const MODE_DESC = {
    flagToCountry: "See a flag, pick the country.",
    countryToFlag: "See a country, pick its flag.",
    capitalToCountry: "See a capital, pick its country.",
    countryToContinent: "See a country, pick its continent.",
    continentToCountry: "See a continent, pick a matching country.",
    threeClues: "Three clues. Fewer clues, more points.",
    speedRound: "Fast, short-timer mixed questions.",
    mapChallenge: "Tap the country on the map.",
    randomMix: "A bit of everything, in one game.",
  };

  const REGION_OPTIONS = [
    { key: "world", label: "World" },
    { key: "africa", label: "Africa" },
    { key: "asia", label: "Asia" },
    { key: "europe", label: "Europe" },
    { key: "northAmerica", label: "N. America" },
    { key: "southAmerica", label: "S. America" },
    { key: "oceania", label: "Oceania" },
    { key: "middleEast", label: "Middle East" },
    { key: "custom", label: "Custom" },
  ];
  const REGION_LABEL = {};
  REGION_OPTIONS.forEach((r) => (REGION_LABEL[r.key] = r.label));

  const DIFFICULTY_OPTIONS = [
    { key: "easy", label: "Easy", sub: "Famous, clear" },
    { key: "normal", label: "Normal", sub: "Common mix" },
    { key: "hard", label: "Hard", sub: "Less obvious" },
    { key: "expert", label: "Expert", sub: "Small, island" },
    { key: "insane", label: "INSANE", sub: "Minimal hints" },
  ];
  const DIFFICULTY_LABEL = {};
  DIFFICULTY_OPTIONS.forEach((d) => (DIFFICULTY_LABEL[d.key] = d.label));

  const COUNT_OPTIONS = [5, 10, 20, 30];
  const TIMER_DURATIONS = [10, 15, 20, 30];
  const PLAYER_OPTIONS = [1, 2, 3, 4];
  const LEVEL_NAMES = ["Easy", "Normal", "Medium", "Hard", "Expert", "INSANE"];

  // Which hints make sense for a given underlying question mode.
  const HINTS_BY_MODE = {
    flagToCountry: ["fifty", "continent", "neighbor", "time"],
    countryToFlag: ["fifty", "continent", "neighbor", "time"],
    capitalToCountry: ["fifty", "continent", "neighbor", "flag", "time"],
    countryToContinent: ["fifty", "neighbor", "time"],
    continentToCountry: ["fifty", "neighbor", "flag", "time"],
    threeClues: ["fifty", "time"],
    mapChallenge: ["time"],
  };
  const HINT_LABEL = {
    fifty: "50/50",
    continent: "Show Continent",
    neighbor: "Show Neighbor",
    flag: "Reveal Flag",
    time: "+10 Seconds",
  };

  let draft = null;
  let session = null;
  let timerHandle = null;
  let timeLeft = 0;
  let cluesRevealed = 1;
  let autoAdvanceHandle = null;
  let exploreInited = false;
  let hintsUsedThisQuestion = new Set();
  let quizMapReady = false;

  function icon(name) {
    return FVIcons[name] || "";
  }
  function el(id) {
    return document.getElementById(id);
  }
  function clearNode(node) {
    if (node) node.innerHTML = "";
  }

  // ---------- NAVIGATION ----------
  function showScreen(id) {
    document.querySelectorAll(".fv-screen").forEach((s) => s.classList.remove("fv-active"));
    const target = el("screen-" + id);
    if (target) target.classList.add("fv-active");
    document.querySelectorAll(".fv-nav-item").forEach((b) => {
      b.classList.toggle("fv-active", b.getAttribute("data-nav") === id);
    });
    window.scrollTo(0, 0);

    if (id === "home") renderHome();
    if (id === "modes") renderModes();
    if (id === "setup") renderSetup();
    if (id === "explore") renderExplore();
    if (id === "progress") renderProgress();
  }

  // ---------- HOME ----------
  function renderHome() {
    const p = FVStorage.getProgress();
    const stats = [
      { label: "Best Score", value: p.bestScore || 0 },
      { label: "Answered", value: p.questionsAnswered || 0 },
      { label: "Level", value: LEVEL_NAMES[(p.unlockedLevel || 1) - 1] },
    ];
    el("home-stats").innerHTML = stats
      .map(
        (s) =>
          `<div class="fv-stat"><div class="fv-stat-value">${s.value}</div><div class="fv-stat-label">${s.label}</div></div>`
      )
      .join("");
  }

  // ---------- MODES ----------
  function renderModes() {
    el("modes-list").innerHTML = MODE_OPTIONS.map(
      (m) => `
      <button class="fv-card fv-mode-card" data-mode="${m.key}">
        <span>
          <span class="fv-mode-card-title">${m.label}</span>
          <span class="fv-mode-card-desc">${MODE_DESC[m.key]}</span>
        </span>
        <span class="fv-mode-card-chev">${icon("chevronRight")}</span>
      </button>`
    ).join("");

    el("modes-list").querySelectorAll("[data-mode]").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (!draft) draft = loadDraft();
        draft.mode = btn.getAttribute("data-mode");
        showScreen("setup");
      });
    });
  }

  // ---------- SETUP ----------
  function loadDraft() {
    const s = FVStorage.getSettings();
    return Object.assign({}, s, { players: (s.players && s.players.length ? s.players : ["Player 1"]) });
  }

  function renderChoiceGrid(containerId, options, selectedKey, onSelect) {
    const container = el(containerId);
    if (!container) return;
    container.innerHTML = options
      .map(
        (o) =>
          `<button class="fv-choice${o.key === selectedKey ? " fv-selected" : ""}" data-key="${o.key}">${o.label}${
            o.sub ? `<span class="fv-choice-sub">${o.sub}</span>` : ""
          }</button>`
      )
      .join("");
    container.querySelectorAll("[data-key]").forEach((btn) => {
      btn.addEventListener("click", () => onSelect(btn.getAttribute("data-key")));
    });
  }

  function renderSetup() {
    if (!draft) draft = loadDraft();

    renderChoiceGrid("setup-mode-grid", MODE_OPTIONS, draft.mode, (key) => {
      draft.mode = key;
      renderSetup();
    });

    renderChoiceGrid("setup-region-grid", REGION_OPTIONS, draft.region, (key) => {
      draft.region = key;
      renderSetup();
    });

    el("setup-custom-wrap").style.display = draft.region === "custom" ? "block" : "none";
    if (draft.region === "custom") renderCustomSection();

    renderChoiceGrid("setup-difficulty-grid", DIFFICULTY_OPTIONS, draft.difficulty, (key) => {
      draft.difficulty = key;
      renderSetup();
    });

    renderChoiceGrid(
      "setup-count-grid",
      COUNT_OPTIONS.map((n) => ({ key: String(n), label: String(n) })),
      String(draft.questionCount),
      (key) => {
        draft.questionCount = Number(key);
        renderSetup();
      }
    );

    const timerToggle = el("setup-timer-toggle");
    timerToggle.classList.toggle("fv-on", !!draft.timerEnabled);
    timerToggle.setAttribute("aria-pressed", String(!!draft.timerEnabled));
    timerToggle.onclick = () => {
      draft.timerEnabled = !draft.timerEnabled;
      renderSetup();
    };
    el("setup-timer-sub").textContent = draft.timerEnabled
      ? `${draft.timerSeconds} seconds per question`
      : "No time pressure";
    el("setup-timer-duration-wrap").style.display = draft.timerEnabled ? "block" : "none";
    renderChoiceGrid(
      "setup-timer-duration-grid",
      TIMER_DURATIONS.map((n) => ({ key: String(n), label: n + "s" })),
      String(draft.timerSeconds),
      (key) => {
        draft.timerSeconds = Number(key);
        renderSetup();
      }
    );

    const hintsToggle = el("setup-hints-toggle");
    hintsToggle.classList.toggle("fv-on", !!draft.hintsEnabled);
    hintsToggle.setAttribute("aria-pressed", String(!!draft.hintsEnabled));
    hintsToggle.onclick = () => {
      draft.hintsEnabled = !draft.hintsEnabled;
      renderSetup();
    };

    const repeatsToggle = el("setup-repeats-toggle");
    repeatsToggle.classList.toggle("fv-on", !!draft.allowRepeats);
    repeatsToggle.setAttribute("aria-pressed", String(!!draft.allowRepeats));
    repeatsToggle.onclick = () => {
      draft.allowRepeats = !draft.allowRepeats;
      renderSetup();
    };

    renderChoiceGrid(
      "setup-players-grid",
      PLAYER_OPTIONS.map((n) => ({ key: String(n), label: n === 1 ? "1 (Solo)" : String(n) })),
      String((draft.players || ["Player 1"]).length),
      (key) => {
        const n = Number(key);
        const names = [];
        for (let i = 0; i < n; i++) names.push((draft.players && draft.players[i]) || `Player ${i + 1}`);
        draft.players = names;
        renderSetup();
      }
    );

    const namesWrap = el("setup-player-names");
    if ((draft.players || []).length > 1) {
      namesWrap.style.display = "block";
      namesWrap.innerHTML = draft.players
        .map(
          (name, i) =>
            `<label class="fv-field-label" for="player-name-${i}">Player ${i + 1} name</label><input id="player-name-${i}" class="fv-player-name-input" data-idx="${i}" maxlength="14" value="${String(name).replace(/"/g, "&quot;")}" placeholder="Player ${i + 1} name" autocomplete="nickname" />`
        )
        .join("");
      namesWrap.querySelectorAll("input").forEach((input) => {
        input.addEventListener("input", () => {
          const idx = Number(input.getAttribute("data-idx"));
          draft.players[idx] = input.value || `Player ${idx + 1}`;
        });
      });
    } else {
      namesWrap.style.display = "none";
    }
  }

  // ---------- CUSTOM COUNTRIES + FOCUS SETS ----------
  // Re-renders only the custom panel, so typing in the search box doesn't
  // rebuild (and blur) the rest of the setup screen.
  function renderCustomSection() {
    const selected = new Set((draft.customCountries || []).map((c) => c.toUpperCase()));

    // Focus set list
    const sets = FVFocusSets.list();
    el("setup-focus-set-list").innerHTML = sets.length
      ? sets
          .map((s) => {
            const isActive =
              s.codes.length === selected.size && s.codes.every((c) => selected.has(c));
            return `<div class="fv-focus-set${isActive ? " fv-selected" : ""}">
              <button class="fv-focus-set-main" data-set="${s.id}">
                ${escapeHtml(s.name)}
                <span class="fv-focus-set-count">${s.codes.length} countries${s.builtIn ? " · preset" : ""}</span>
              </button>
              ${s.builtIn ? "" : `<button class="fv-focus-set-del" data-del="${s.id}" aria-label="Delete set">${icon("close")}</button>`}
            </div>`;
          })
          .join("")
      : `<p style="font-size:13px;">No sets yet. Pick countries below and save them as a set.</p>`;

    el("setup-focus-set-list").querySelectorAll("[data-set]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const s = FVFocusSets.getById(btn.getAttribute("data-set"));
        if (!s) return;
        draft.customCountries = s.codes.slice();
        el("setup-set-name").value = s.builtIn ? "" : s.name;
        renderCustomSection();
      });
    });

    el("setup-focus-set-list").querySelectorAll("[data-del]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-del");
        const s = FVFocusSets.getById(id);
        if (s && confirm(`Delete the set "${s.name}"?`)) {
          FVFocusSets.remove(id);
          renderCustomSection();
        }
      });
    });

    // Country picker, filtered by the search box
    const query = (el("setup-custom-search").value || "").trim().toLowerCase();
    const visible = COUNTRIES.slice()
      .sort((a, b) => a.name.localeCompare(b.name))
      .filter((c) => !query || c.name.toLowerCase().includes(query));

    el("setup-custom-count").textContent = `${selected.size} selected`;
    el("setup-custom-grid").innerHTML = visible.length
      ? visible
          .map(
            (c) =>
              `<button class="fv-choice${selected.has(c.code) ? " fv-selected" : ""}" data-code="${c.code}">${escapeHtml(c.name)}</button>`
          )
          .join("")
      : `<p style="font-size:13px;grid-column:1/-1;">No countries match that search.</p>`;

    el("setup-custom-grid").querySelectorAll("[data-code]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const code = btn.getAttribute("data-code");
        const set = new Set((draft.customCountries || []).map((c) => c.toUpperCase()));
        if (set.has(code)) set.delete(code);
        else set.add(code);
        draft.customCountries = Array.from(set);
        renderCustomSection();
      });
    });
  }

  function wireCustomControls() {
    el("setup-custom-search").addEventListener("input", () => {
      if (draft && draft.region === "custom") renderCustomSection();
    });

    el("btn-custom-clear").addEventListener("click", () => {
      draft.customCountries = [];
      renderCustomSection();
    });

    el("btn-save-focus-set").addEventListener("click", () => {
      const name = (el("setup-set-name").value || "").trim();
      const codes = draft.customCountries || [];
      if (!name) {
        alert("Give the set a name first.");
        return;
      }
      if (codes.length < 4) {
        alert("Pick at least 4 countries before saving a set.");
        return;
      }
      FVFocusSets.save(name, codes);
      el("setup-set-name").value = "";
      renderCustomSection();
    });
  }

  function persistDraftAsSettings() {
    FVStorage.saveSettings({
      mode: draft.mode,
      region: draft.region,
      customCountries: draft.customCountries,
      difficulty: draft.difficulty,
      questionCount: draft.questionCount,
      timerEnabled: draft.timerEnabled,
      timerSeconds: draft.timerSeconds,
      hintsEnabled: draft.hintsEnabled,
      allowRepeats: draft.allowRepeats,
    });
  }

  function startGameFromDraft() {
    if (draft.region === "custom" && (!draft.customCountries || draft.customCountries.length < 4)) {
      alert("Pick at least 4 countries for a Custom region, or choose a different region.");
      return;
    }
    persistDraftAsSettings();
    beginSession(draft);
  }

  function playNow() {
    const settings = FVStorage.getSettings();
    const config = Object.assign({}, settings, { players: ["Player 1"] });
    beginSession(config);
  }

  // ---------- QUIZ SESSION ----------
  function beginSession(config) {
    session = FVGame.createSession(config, COUNTRIES);
    quizMapReady = false;
    if (!session.queue.length) {
      alert("Not enough countries for that combination. Try a wider region or lower difficulty.");
      return;
    }
    el("quiz-mode-title").textContent = MODE_LABEL[config.mode] || "Quiz";
    showScreen("quiz");
    renderQuizQuestion();
  }

  function quitQuiz() {
    stopTimer();
    session = null;
    showScreen("home");
  }

  function renderPlayerBanner() {
    const banner = el("quiz-player-banner");
    if (session.players.length > 1) {
      banner.style.display = "block";
      const p = FVGame.currentPlayer(session);
      banner.innerHTML = `<strong>${escapeHtml(p.name)}</strong>'s turn`;
    } else {
      banner.style.display = "none";
    }
  }

  function updateTopline() {
    el("quiz-progress-label").textContent = `Question ${session.index + 1} / ${session.queue.length}`;
    el("quiz-progress-fill").style.width = `${(session.index / session.queue.length) * 100}%`;
    const player = FVGame.currentPlayer(session);
    const streakEl = el("quiz-streak");
    if (player.streak > 1) {
      streakEl.style.display = "inline-flex";
      streakEl.textContent = `${player.streak} STREAK`;
    } else {
      streakEl.style.display = "none";
    }
  }

  function renderQuizQuestion() {
    hintsUsedThisQuestion = new Set();
    cluesRevealed = 1;
    const q = FVGame.currentQuestion(session);
    if (!q) return;

    updateTopline();
    renderPlayerBanner();

    el("quiz-feedback").classList.remove("fv-show", "fv-good", "fv-bad");
    el("btn-next-question").style.display = "none";

    const area = el("quiz-question-area");
    clearNode(area);

    switch (q.mode) {
      case "flagToCountry":
        renderFlagToCountry(area, q);
        break;
      case "countryToFlag":
        renderCountryToFlag(area, q);
        break;
      case "capitalToCountry":
        renderCapitalToCountry(area, q);
        break;
      case "countryToContinent":
        renderCountryToContinent(area, q);
        break;
      case "continentToCountry":
        renderContinentToCountry(area, q);
        break;
      case "threeClues":
        renderThreeClues(area, q);
        break;
      case "mapChallenge":
        renderMapChallenge(area, q);
        break;
    }

    renderHints(q);

    if (session.config.timerEnabled && q.mode !== "mapChallenge") {
      startTimer(session.config.timerSeconds);
    } else if (session.config.timerEnabled && q.mode === "mapChallenge") {
      startTimer(session.config.timerSeconds, true);
    } else {
      el("quiz-timer").style.display = "none";
    }
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  function optionButtonsHtml(q, isFlagGrid) {
    return `<div class="fv-options${isFlagGrid ? " fv-options-flags" : ""}" id="quiz-options">${q.options
      .map((o, i) => {
        if (isFlagGrid) {
          return `<button class="fv-option" data-code="${o.code}" aria-label="Select ${escapeHtml(o.label)}"><img src="${o.flag}" alt="Flag of ${escapeHtml(o.label)}" /></button>`;
        }
        return `<button class="fv-option" data-code="${o.code}">${o.flag ? `<img src="${o.flag}" alt="Flag of ${escapeHtml(o.label)}" style="width:28px;border-radius:3px;" />` : ""}${escapeHtml(o.label)}</button>`;
      })
      .join("")}</div>`;
  }

  function wireOptions(q) {
    el("quiz-options")
      .querySelectorAll(".fv-option")
      .forEach((btn) => {
        btn.addEventListener("click", () => handleAnswer(q, btn.getAttribute("data-code"), btn));
      });
  }

  function renderFlagToCountry(area, q) {
    area.innerHTML = `
      <div class="fv-question-flag-wrap"><img class="fv-question-flag" src="${q.flag}" alt="Flag for the country in this question" /></div>
      <div class="fv-question-prompt">${q.prompt}</div>
      ${optionButtonsHtml(q, false)}
    `;
    wireOptions(q);
  }

  function renderCountryToFlag(area, q) {
    area.innerHTML = `
      <div class="fv-question-prompt">${escapeHtml(q.prompt)}</div>
      <div class="fv-question-sub">Tap the matching flag below.</div>
      ${optionButtonsHtml(q, true)}
    `;
    wireOptions(q);
  }

  function renderCapitalToCountry(area, q) {
    area.innerHTML = `
      <div class="fv-question-sub">Which country has this capital?</div>
      <div class="fv-capital-display">${escapeHtml(q.capital)}</div>
      <div id="quiz-hint-extra"></div>
      ${optionButtonsHtml(q, false)}
    `;
    wireOptions(q);
  }

  function renderCountryToContinent(area, q) {
    area.innerHTML = `
      <div class="fv-question-flag-wrap"><img class="fv-question-flag" style="max-width:200px;" src="${q.flag}" alt="Flag for the country in this question" /></div>
      <div class="fv-question-prompt">${escapeHtml(q.prompt)}</div>
      ${optionButtonsHtml(q, false)}
    `;
    wireOptions(q);
  }

  function renderContinentToCountry(area, q) {
    area.innerHTML = `
      <div class="fv-question-prompt">${escapeHtml(q.prompt)}</div>
      <div id="quiz-hint-extra"></div>
      ${optionButtonsHtml(q, false)}
    `;
    wireOptions(q);
  }

  function renderThreeClues(area, q) {
    area.innerHTML = `
      <div class="fv-question-prompt">${q.prompt}</div>
      <ul class="fv-clue-list" id="quiz-clue-list">
        ${q.clues
          .map((c, i) => `<li class="${i < cluesRevealed ? "" : "fv-locked"}" data-clue="${i}">Clue ${i + 1}: ${i < cluesRevealed ? escapeHtml(c) : "•••••••••••••"}</li>`)
          .join("")}
      </ul>
      <button class="fv-btn fv-btn-ghost fv-btn-sm" id="btn-reveal-clue" style="margin-bottom:16px;">Reveal Next Clue</button>
      ${optionButtonsHtml(q, false)}
    `;
    wireOptions(q);
    const revealBtn = el("btn-reveal-clue");
    revealBtn.disabled = cluesRevealed >= q.clues.length;
    revealBtn.addEventListener("click", () => {
      if (cluesRevealed >= q.clues.length) return;
      cluesRevealed += 1;
      const li = el("quiz-clue-list").querySelector(`[data-clue="${cluesRevealed - 1}"]`);
      li.classList.remove("fv-locked");
      li.textContent = `Clue ${cluesRevealed}: ${q.clues[cluesRevealed - 1]}`;
      revealBtn.disabled = cluesRevealed >= q.clues.length;
    });
  }

  function renderMapChallenge(area, q) {
    area.innerHTML = `
      <div class="fv-question-sub">Find on the map</div>
      <div class="fv-question-prompt" style="display:flex;align-items:center;justify-content:center;gap:10px;">
        <img src="${q.flag}" alt="Flag" style="width:34px;border-radius:3px;border:1px solid var(--border);" />
        ${escapeHtml(q.countryName)}
      </div>
      <div class="fv-map-wrap" id="quiz-map-wrap">
        <svg id="quiz-map-svg"></svg>
        <div class="fv-map-controls">
          <button class="fv-map-zoom-btn" id="quiz-zoom-in">${icon("plus")}</button>
          <button class="fv-map-zoom-btn" id="quiz-zoom-out">${icon("minus")}</button>
          <button class="fv-map-zoom-btn" id="quiz-zoom-reset">${icon("reset")}</button>
        </div>
      </div>
    `;

    FVMap.init("#quiz-map-svg", COUNTRIES).then(() => {
      FVMap.getFeaturesForRegion(session.config.region, COUNTRIES).then((features) => {
        const boundsKey = FVMap.boundsKeyForCountry(q.answer, session.config.region);
        FVMap.render(features, {
          interactive: true,
          onSelect: (country, feature) => handleMapAnswer(q, country, feature),
          regionBoundsKey: boundsKey,
        });
      });
    });

    wireMapZoomButtons("quiz");
  }

  function wireMapZoomButtons(prefix) {
    const zoomIn = el(`${prefix}-zoom-in`);
    const zoomOut = el(`${prefix}-zoom-out`);
    const reset = el(`${prefix}-zoom-reset`);
    if (zoomIn) zoomIn.onclick = () => FVMap.zoomBy(1.6);
    if (zoomOut) zoomOut.onclick = () => FVMap.zoomBy(1 / 1.6);
    if (reset) reset.onclick = () => FVMap.zoomReset();
  }

  // ---------- HINTS ----------
  function renderHints(q) {
    const row = el("quiz-hint-row");
    if (!session.config.hintsEnabled) {
      row.style.display = "none";
      row.innerHTML = "";
      return;
    }
    const list = HINTS_BY_MODE[q.mode] || [];
    if (session.config.timerEnabled === false) {
      // remove time hint if no timer running
    }
    const usable = list.filter((h) => h !== "time" || session.config.timerEnabled);
    if (!usable.length) {
      row.style.display = "none";
      row.innerHTML = "";
      return;
    }
    row.style.display = "flex";
    row.innerHTML = usable
      .map((h) => `<button class="fv-hint-chip" data-hint="${h}">${HINT_LABEL[h]}</button>`)
      .join("");
    row.querySelectorAll("[data-hint]").forEach((btn) => {
      btn.addEventListener("click", () => useHint(btn.getAttribute("data-hint"), q, btn));
    });
  }

  function useHint(kind, q, btn) {
    if (hintsUsedThisQuestion.has(kind)) return;
    hintsUsedThisQuestion.add(kind);
    btn.disabled = true;

    if (kind === "fifty") {
      const wrongButtons = Array.from(el("quiz-options").querySelectorAll(".fv-option")).filter(
        (b) => b.getAttribute("data-code") !== q.correctCode
      );
      FVQuestions.shuffle(wrongButtons)
        .slice(0, 2)
        .forEach((b) => {
          b.disabled = true;
          b.style.visibility = "hidden";
        });
    } else if (kind === "continent") {
      showInlineHint(`Continent: ${q.answer.continent}`);
    } else if (kind === "neighbor") {
      const n = q.answer.neighbors && q.answer.neighbors.length
        ? COUNTRIES.find((c) => c.code === q.answer.neighbors[0])
        : null;
      showInlineHint(n ? `Borders: ${n.name}` : "No land neighbors - it's an island nation.");
    } else if (kind === "flag") {
      showInlineHint(
        `<img src="${FVQuestions.flagUrl(q.answer.code)}" style="width:64px;border-radius:4px;clip-path:inset(0 40% 0 0);border:1px solid var(--border);" alt="" />`
      );
    } else if (kind === "time") {
      timeLeft += 10;
      updateTimerDisplay();
    }
  }

  function showInlineHint(html) {
    const extra = el("quiz-hint-extra");
    if (extra) {
      extra.innerHTML = `<div class="fv-card" style="padding:10px 14px;margin-bottom:14px;">${html}</div>`;
      return;
    }
    // Fallback: prepend above options if the mode has no dedicated slot.
    const options = el("quiz-options");
    if (options) {
      const div = document.createElement("div");
      div.className = "fv-card";
      div.style.cssText = "padding:10px 14px;margin-bottom:14px;";
      div.innerHTML = html;
      options.parentNode.insertBefore(div, options);
    }
  }

  // ---------- TIMER ----------
  function startTimer(seconds, mapMode) {
    stopTimer();
    timeLeft = seconds;
    const timerEl = el("quiz-timer");
    timerEl.style.display = "inline";
    updateTimerDisplay();
    timerHandle = setInterval(() => {
      timeLeft -= 1;
      updateTimerDisplay();
      if (timeLeft <= 0) {
        stopTimer();
        if (mapMode) {
          handleMapAnswer(FVGame.currentQuestion(session), null, null);
        } else {
          const q = FVGame.currentQuestion(session);
          handleAnswer(q, null, null);
        }
      }
    }, 1000);
  }

  function stopTimer() {
    if (timerHandle) clearInterval(timerHandle);
    timerHandle = null;
  }

  function updateTimerDisplay() {
    const timerEl = el("quiz-timer");
    timerEl.textContent = `${Math.max(0, timeLeft)}s`;
    timerEl.classList.toggle("fv-timer-low", timeLeft <= 5);
  }

  // ---------- ANSWER HANDLING ----------
  function handleAnswer(q, selectedCode, btnEl) {
    stopTimer();
    const buttons = Array.from(el("quiz-options").querySelectorAll(".fv-option"));
    buttons.forEach((b) => (b.disabled = true));

    const meta = { secondsRemaining: timeLeft, cluesUsed: q.mode === "threeClues" ? cluesRevealed : undefined };
    const result = FVGame.submitAnswer(session, selectedCode, meta);

    buttons.forEach((b) => {
      if (b.getAttribute("data-code") === q.correctCode) b.classList.add("fv-correct");
      else if (b.getAttribute("data-code") === selectedCode) b.classList.add("fv-incorrect");
    });

    finishAnswerUI(result, q);
  }

  function handleMapAnswer(q, country, feature) {
    if (!q || q.mode !== "mapChallenge") return;
    stopTimer();
    const selectedCode = country ? country.code : null;
    const meta = { secondsRemaining: timeLeft };
    const result = FVGame.submitAnswer(session, selectedCode, meta);
    FVMap.showResult(q.correctN3, feature ? feature.id : null);
    document.querySelectorAll("#quiz-map-svg path.fv-country").forEach((el) => {
      el.classList.remove("fv-interactive");
      el.style.cursor = "default";
    });
    finishAnswerUI(result, q, country ? country.name : null);
  }

  function finishAnswerUI(result, q, tappedName) {
    const player = FVGame.currentPlayer(session);
    const feedback = el("quiz-feedback");
    feedback.classList.add("fv-show", result.isCorrect ? "fv-good" : "fv-bad");
    const correctCountry = q.mode === "mapChallenge" || q.mode === "countryToContinent" ? null : q.answer;

    let title = result.isCorrect ? "Correct" : "Incorrect";
    let sub = "";
    if (result.isCorrect) {
      sub = `+${result.points} points`;
      if (player.streak > 1) sub += ` · ${player.streak} streak`;
    } else {
      const correctLabel = q.mode === "countryToContinent" ? q.correctCode : q.mode === "mapChallenge" ? q.countryName : q.answer.name;
      if (q.mode === "mapChallenge" && tappedName) {
        sub = `You selected ${tappedName}. Correct answer: ${correctLabel}.`;
      } else {
        sub = `Correct answer: ${correctLabel}`;
      }
    }
    el("quiz-feedback-title").textContent = title;
    el("quiz-feedback-sub").textContent = sub;

    el("quiz-hint-row").querySelectorAll("[data-hint]").forEach((b) => (b.disabled = true));
    updateTopline();

    const nextBtn = el("btn-next-question");
    nextBtn.style.display = "block";
    nextBtn.onclick = () => {
      clearTimeout(autoAdvanceHandle);
      goNext();
    };

    if (session.players.length === 1) {
      clearTimeout(autoAdvanceHandle);
      autoAdvanceHandle = setTimeout(() => goNext(), 1400);
    }
  }

  function goNext() {
    const finished = FVGame.advance(session);
    if (finished) {
      const summary = FVGame.summary(session);
      if (session.players.length === 1) {
        FVStorage.recordGameResult({
          score: summary.single.score,
          correct: summary.single.correct,
          total: summary.totalQuestions,
          bestStreak: summary.single.bestStreak,
          region: summary.region,
          mode: summary.mode,
          difficulty: summary.difficulty,
        });
      }
      renderResult(summary);
      showScreen("result");
    } else {
      renderQuizQuestion();
    }
  }

  // ---------- RESULT ----------
  function renderResult(summary) {
    const container = el("result-content");
    if (summary.players.length === 1) {
      const p = summary.single;
      container.innerHTML = `
        <div class="fv-result-score"><div class="fv-big">${p.score}</div><p>points</p></div>
        <div class="fv-result-grid">
          <div class="fv-result-item"><div class="fv-label">Correct</div><div class="fv-val">${p.correct}</div></div>
          <div class="fv-result-item"><div class="fv-label">Incorrect</div><div class="fv-val">${p.wrong}</div></div>
          <div class="fv-result-item"><div class="fv-label">Accuracy</div><div class="fv-val">${p.accuracy}%</div></div>
          <div class="fv-result-item"><div class="fv-label">Best Streak</div><div class="fv-val">${p.bestStreak}</div></div>
          <div class="fv-result-item"><div class="fv-label">Time</div><div class="fv-val">${Math.round(summary.timeMs / 1000)}s</div></div>
          <div class="fv-result-item"><div class="fv-label">Difficulty</div><div class="fv-val">${DIFFICULTY_LABEL[summary.difficulty] || summary.difficulty}</div></div>
          <div class="fv-result-item"><div class="fv-label">Region</div><div class="fv-val">${REGION_LABEL[summary.region] || summary.region}</div></div>
          <div class="fv-result-item"><div class="fv-label">Mode</div><div class="fv-val">${MODE_LABEL[summary.mode] || summary.mode}</div></div>
        </div>
      `;
    } else {
      const ranked = summary.players.slice().sort((a, b) => b.score - a.score);
      container.innerHTML = `
        <div class="fv-result-score"><div class="fv-big">${escapeHtml(summary.winner.name)}</div><p>wins!</p></div>
        <div class="fv-card">
          ${ranked
            .map(
              (p, i) => `
            <div class="fv-player-row">
              <span class="fv-player-rank">${i === 0 ? `<span class="fv-crown">${icon("trophy")}</span>` : i + 1}</span>
              <span style="flex:1;font-weight:600;">${escapeHtml(p.name)}</span>
              <span style="color:var(--text-faint);font-size:13px;margin-right:10px;">${p.correct}/${summary.totalQuestions}</span>
              <span style="font-family:var(--font-display);font-weight:700;color:var(--gold-strong);">${p.score}</span>
            </div>`
            )
            .join("")}
        </div>
      `;
    }
  }

  // ---------- EXPLORE MAP ----------
  function renderExplore() {
    if (exploreInited) return;
    exploreInited = true;
    FVMap.init("#explore-map-svg", COUNTRIES).then(() => {
      FVMap.getFeaturesForRegion("world", COUNTRIES).then((features) => {
        FVMap.render(features, {
          interactive: true,
          onSelect: (country) => renderExplorePanel(country),
        });
      });
    });
    wireMapZoomButtons("explore");
  }

  function renderExplorePanel(country) {
    const panel = el("explore-panel");
    if (!country) {
      panel.style.display = "block";
      panel.innerHTML = `<p>This territory isn't in the FLAGVERSE country list.</p>`;
      return;
    }
    const neighborNames = (country.neighbors || [])
      .map((code) => {
        const n = COUNTRIES.find((c) => c.code === code);
        return n ? n.name : null;
      })
      .filter(Boolean);

    panel.style.display = "block";
    panel.innerHTML = `
      <div class="fv-explore-head">
        <img class="fv-explore-flag" src="${FVQuestions.flagUrl(country.code)}" alt="" />
        <div>
          <div style="font-family:var(--font-display);font-size:18px;font-weight:700;">${escapeHtml(country.name)}</div>
          <div style="font-size:13px;color:var(--text-faint);">${escapeHtml(country.continent)}</div>
        </div>
      </div>
      <div class="fv-row"><span class="fv-row-label">Capital</span><span>${escapeHtml(country.capital)}</span></div>
      <div class="fv-row"><span class="fv-row-label">Continent</span><span>${escapeHtml(country.continent)}</span></div>
      <div class="fv-row"><span class="fv-row-label">ISO Code</span><span>${country.code}</span></div>
      <div class="fv-row"><span class="fv-row-label">Neighbors</span><span style="text-align:right;max-width:60%;">${
        neighborNames.length ? escapeHtml(neighborNames.join(", ")) : "None (island / isolated)"
      }</span></div>
    `;
  }

  // ---------- PROGRESS ----------
  function renderProgress() {
    const p = FVStorage.getProgress();
    const accuracy = p.questionsAnswered > 0 ? Math.round((p.correctAnswered / p.questionsAnswered) * 100) : 0;
    const favRegion = FVStorage.favoriteRegion();

    let modeRows = "";
    const modeStats = p.modeStats || {};
    const modeKeys = Object.keys(modeStats);
    if (modeKeys.length) {
      modeRows = modeKeys
        .map((k) => {
          const m = modeStats[k];
          const acc = m.total > 0 ? Math.round((m.correct / m.total) * 100) : 0;
          return `<div class="fv-row"><span class="fv-row-label">${MODE_LABEL[k] || k}</span><span>${m.played} games · ${acc}%</span></div>`;
        })
        .join("");
    }

    el("progress-content").innerHTML = `
      <div class="fv-result-grid">
        <div class="fv-result-item"><div class="fv-label">Best Score</div><div class="fv-val">${p.bestScore}</div></div>
        <div class="fv-result-item"><div class="fv-label">Questions Answered</div><div class="fv-val">${p.questionsAnswered}</div></div>
        <div class="fv-result-item"><div class="fv-label">Accuracy</div><div class="fv-val">${accuracy}%</div></div>
        <div class="fv-result-item"><div class="fv-label">Best Streak</div><div class="fv-val">${p.bestStreak}</div></div>
        <div class="fv-result-item"><div class="fv-label">Games Completed</div><div class="fv-val">${p.completedGames}</div></div>
        <div class="fv-result-item"><div class="fv-label">Current Level</div><div class="fv-val">${LEVEL_NAMES[(p.unlockedLevel || 1) - 1]}</div></div>
      </div>
      <div class="fv-card" style="margin-top:14px;">
        <div class="fv-section-title">Favorite Region</div>
        <p>${favRegion ? REGION_LABEL[favRegion] || favRegion : "Play a few games to see this."}</p>
      </div>
      ${
        modeRows
          ? `<div class="fv-card"><div class="fv-section-title">Mode Performance</div>${modeRows}</div>`
          : ""
      }
      ${
        p.questionsAnswered === 0
          ? `<div class="fv-empty-state">No games played yet. Progress here is real and only updates from games you actually play.</div>`
          : ""
      }
    `;
  }

  // ---------- WIRING ----------
  function injectStaticIcons() {
    el("btn-top-settings").innerHTML = icon("settings");
    el("btn-play-now").innerHTML = `${icon("play")} PLAY NOW`;
    el("btn-quit-quiz").innerHTML = icon("close");
    el("btn-quit-quiz").setAttribute("aria-label", "Quit quiz");
    document.querySelectorAll('[data-nav="home"].fv-back-btn').forEach((b) => { b.innerHTML = icon("back"); b.setAttribute("aria-label", "Back to home"); });
    el("explore-zoom-in").innerHTML = icon("zoomIn");
    el("explore-zoom-out").innerHTML = icon("zoomOut");
    el("explore-zoom-reset").innerHTML = icon("reset");

    const navIcons = { home: "home", setup: "play", modes: "grid", explore: "mapPin", progress: "chart", settings: "settings" };
    document.querySelectorAll(".fv-nav-item").forEach((btn) => {
      const key = btn.getAttribute("data-nav");
      btn.querySelector(".fv-nav-icon").innerHTML = icon(navIcons[key]);
    });
  }

  function wireStatic() {
    injectStaticIcons();

    document.querySelectorAll("[data-nav]").forEach((btn) => {
      btn.addEventListener("click", () => showScreen(btn.getAttribute("data-nav")));
    });

    el("btn-top-settings").addEventListener("click", () => showScreen("settings"));
    el("btn-play-now").addEventListener("click", playNow);
    el("btn-choose-mode").addEventListener("click", () => showScreen("modes"));
    el("btn-explore-map").addEventListener("click", () => showScreen("explore"));
    el("btn-start-game").addEventListener("click", startGameFromDraft);
    wireCustomControls();
    el("btn-quit-quiz").addEventListener("click", () => {
      if (confirm("Quit this game? Your progress in this round will be lost.")) quitQuiz();
    });
    el("btn-play-again").addEventListener("click", () => {
      if (!draft) draft = loadDraft();
      beginSession(draft);
    });
    el("btn-reset-progress").addEventListener("click", () => {
      if (confirm("Reset all local progress? This cannot be undone.")) {
        FVStorage.saveProgress(FVStorage.DEFAULT_PROGRESS);
        renderHome();
        alert("Progress reset.");
      }
    });
  }

  function init() {
    wireStatic();
    showScreen("home");
  }

  return { init };
})();
