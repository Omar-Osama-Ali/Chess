// FLAGVERSE storage - wraps localStorage, safe against private-mode failures.
const FVStorage = (function () {
  const SETTINGS_KEY = "flagverse_settings_v1";
  const PROGRESS_KEY = "flagverse_progress_v1";

  const DEFAULT_SETTINGS = {
    mode: "randomMix",
    region: "world",
    customCountries: [],
    difficulty: "normal",
    questionCount: 10,
    timerEnabled: true,
    timerSeconds: 20,
    hintsEnabled: true,
    allowRepeats: false,
  };

  const DEFAULT_PROGRESS = {
    bestScore: 0,
    questionsAnswered: 0,
    correctAnswered: 0,
    bestStreak: 0,
    completedGames: 0,
    regionCounts: {},
    modeStats: {}, // { modeId: { played, correct, total } }
    unlockedLevel: 1, // 1..6
  };

  function safeGet(key, fallback) {
    try {
      const raw = window.localStorage.getItem(key);
      if (!raw) return structuredCloneSafe(fallback);
      const parsed = JSON.parse(raw);
      return Object.assign(structuredCloneSafe(fallback), parsed);
    } catch (e) {
      return structuredCloneSafe(fallback);
    }
  }

  function structuredCloneSafe(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function safeSet(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      return false;
    }
  }

  function getSettings() {
    return safeGet(SETTINGS_KEY, DEFAULT_SETTINGS);
  }

  function saveSettings(partial) {
    const current = getSettings();
    const next = Object.assign({}, current, partial);
    safeSet(SETTINGS_KEY, next);
    return next;
  }

  function getProgress() {
    return safeGet(PROGRESS_KEY, DEFAULT_PROGRESS);
  }

  function saveProgress(partial) {
    const current = getProgress();
    const next = Object.assign({}, current, partial);
    safeSet(PROGRESS_KEY, next);
    return next;
  }

  // Record the outcome of a completed single-player game.
  function recordGameResult(result) {
    const p = getProgress();
    p.questionsAnswered += result.total;
    p.correctAnswered += result.correct;
    p.completedGames += 1;
    if (result.score > p.bestScore) p.bestScore = result.score;
    if (result.bestStreak > p.bestStreak) p.bestStreak = result.bestStreak;

    p.regionCounts = p.regionCounts || {};
    p.regionCounts[result.region] = (p.regionCounts[result.region] || 0) + 1;

    p.modeStats = p.modeStats || {};
    const m = p.modeStats[result.mode] || { played: 0, correct: 0, total: 0 };
    m.played += 1;
    m.correct += result.correct;
    m.total += result.total;
    p.modeStats[result.mode] = m;

    // Simple level unlock: accuracy >= 70% on a difficulty unlocks the next.
    const diffOrder = ["easy", "normal", "hard", "expert", "insane"];
    const diffIndex = diffOrder.indexOf(result.difficulty);
    const accuracy = result.total > 0 ? result.correct / result.total : 0;
    if (diffIndex >= 0 && accuracy >= 0.7) {
      const unlockLevel = Math.min(6, diffIndex + 2);
      if (unlockLevel > p.unlockedLevel) p.unlockedLevel = unlockLevel;
    }

    safeSet(PROGRESS_KEY, p);
    return p;
  }

  function favoriteRegion() {
    const p = getProgress();
    const counts = p.regionCounts || {};
    let best = null;
    let bestCount = 0;
    Object.keys(counts).forEach((r) => {
      if (counts[r] > bestCount) {
        best = r;
        bestCount = counts[r];
      }
    });
    return best;
  }

  return {
    getSettings,
    saveSettings,
    getProgress,
    saveProgress,
    recordGameResult,
    favoriteRegion,
    DEFAULT_SETTINGS,
    DEFAULT_PROGRESS,
  };
})();
